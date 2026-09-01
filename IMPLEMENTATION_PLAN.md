# IMPLEMENTATION PLAN

## De Novo Protein Function Prediction Using Graph Transformers

> This document provides a concrete, step-by-step implementation plan: datasets, models, metrics, and code architecture.

---

## Table of Contents

1. [Environment Setup](#1-environment-setup)
2. [Dataset Selection & Preparation](#2-dataset-selection--preparation)
3. [Graph Construction](#3-graph-construction)
4. [Model Architecture](#4-model-architecture)
5. [Training Pipeline](#5-training-pipeline)
6. [Evaluation Metrics](#6-evaluation-metrics)
7. [Baseline Models](#7-baseline-models)
8. [Ablation Studies](#8-ablation-studies)
9. [Zero-Shot Evaluation Protocol](#9-zero-shot-evaluation-protocol)
10. [Codebase Structure](#10-codebase-structure)
11. [Compute Requirements](#11-compute-requirements)

---

## 1. Environment Setup

### Software Requirements

```bash
# Create environment
conda create -n protein-gt python=3.10
conda activate protein-gt

# Core dependencies
pip install torch>=2.0.0
pip install torch-geometric>=2.4.0
pip install pyg-lib torch-scatter torch-sparse -f https://data.pyg.org/whl/torch-2.0.0+cpu.html

# Bioinformatics
pip install fair-esm           # ESM-2 protein embeddings
pip install biopython           # PDB parsing
pip install prody               # protein structure analysis
pip install MDAnalysis          # structural analysis

# ML utilities
pip install scikit-learn
pip install pandas
pip install wandb               # experiment tracking
pip install einops              # tensor ops for transformer

# Visualization
pip install matplotlib seaborn plotly
```

### GPU Requirements

| Configuration | Minimum | Recommended |
|---|---|---|
| GPU | 1x RTX 3060 (12GB) | 1x RTX 3090/4090 (24GB) or A100 (40GB) |
| RAM | 16 GB | 32-64 GB |
| Disk | 50 GB | 200 GB (for PDB structures + ESM embeddings) |

---

## 2. Dataset Selection & Preparation

### 2.1 Primary Dataset: CAFA-5 Benchmark (Gene Ontology)

The **CAFA (Critical Assessment of Functional Annotation)** benchmark is the gold standard for protein function prediction.

- **Source**: https://www.biocomputing.ca/cafa/
- **Labels**: Gene Ontology (GO) terms across three ontologies:
  - **Molecular Function (MF)**: What the protein does (e.g., "kinase activity")
  - **Biological Process (BP)**: What pathway it participates in (e.g., "apoptosis")
  - **Cellular Component (CC)**: Where in the cell it is located (e.g., "nucleus")
- **Our focus**: **Molecular Function (MF)** — most directly relates structure to biochemical activity

**Fallback (simpler) dataset**: If CAFA-5 is not accessible, use:

### 2.2 Alternative Dataset: UniProt GOA + PDB Subset

Build a custom dataset from public resources:

```
1. Download PDB structures: from RCSB PDB (https://www.rcsb.org/)
2. Download GO annotations: from UniProt GOA (https://www.ebi.ac.uk/GOA/)
3. Filter: resolution < 3.0A, length 50-1000 residues, experimental evidence codes (EXP, IDA, IPI, IMP, IGI, IEP)
4. Split: sequence-clustered at 40% identity (using MMseqs2 or CD-HIT) to prevent data leakage
```

**Expected size**: ~10,000-20,000 proteins with GO labels

### 2.3 Secondary Dataset: Enzyme Commission (EC) Numbers

- **Source**: https://www.enzyme-db.org/ or BRENDA
- **Labels**: EC numbers (4-level hierarchical enzyme classification)
- **Why**: Clean, well-defined function labels; good for initial prototyping

### 2.4 Dataset Construction Script

```python
# dataset/download_and_prepare.py

import os
import json
import subprocess
from Bio import SeqIO, PDB

def download_pdb(pdb_id, output_dir):
    """Download PDB structure from RCSB."""
    url = f"https://files.rcsb.org/download/{pdb_id}.pdb"
    subprocess.run(["wget", "-q", "-P", output_dir, url])

def parse_go_annotations(obo_file, gaf_file):
    """Parse Gene Ontology annotations from GAF file."""
    # See: http://www.geneontology.org/GO.annotation.shtml
    go_terms = {}
    for record in open(gaf_file):
        if record.startswith("!"):
            continue
        fields = record.strip().split("\t")
        protein_id = fields[1]
        go_term = fields[4]
        evidence = fields[6]  # Evidence code
        if evidence in ("EXP", "IDA", "IPI", "IMP", "IGI", "IEP"):
            if protein_id not in go_terms:
                go_terms[protein_id] = []
            go_terms[protein_id].append(go_term)
    return go_terms

def build_dataset(pdb_dir, goa_file, min_resolution=3.0, min_length=50, max_length=1000):
    """Build dataset: PDB structure -> GO label pairs."""
    dataset = []
    for pdb_file in os.listdir(pdb_dir):
        if not pdb_file.endswith(".pdb"):
            continue
        pdb_id = pdb_file.replace(".pdb", "")
        # Parse structure, check resolution, filter length
        # Add to dataset with GO labels
        ...
    return dataset
```

### 2.5 Train/Val/Test Split Strategy

**Critical**: Must use sequence-based clustering to prevent data leakage.

```python
# Using MMseqs2 for sequence clustering
# Install: conda install -c conda-forge mmseqs2

# Cluster at 40% sequence identity
mmseqs easy-cluster input.fasta output tmp --min-seq-id 0.4

# Split by cluster:
# - Train: 70% of clusters
# - Val: 15% of clusters
# - Test: 15% of clusters (must not share sequence identity >40% with train)
```

---

## 3. Graph Construction

### 3.1 Node Features (Residue-Level)

Each **node** = one amino acid residue in the protein chain.

| Feature | Dimension | Source | Description |
|---|---|---|---|
| Amino acid type | 20 | Sequence | One-hot encoded (20 standard AA) |
| ESM-2 embedding | 320 (reduced from 640) | fair-esm | Pre-computed protein LM embeddings, PCA-reduced |
| Secondary structure | 3 | DSSP | Helix / Sheet / Coil (one-hot) |
| Solvent accessibility | 1 | DSSP / KD | Relative solvent accessibility (normalized 0-1) |
| Backbone dihedrals | 4 | PDB coords | sin(phi), cos(phi), sin(psi), cos(psi) |
| Residue depth | 1 | MSMS | Distance from solvent (optional) |
| **Total node dim** | **~329** | | |

```python
import esm
import torch
from Bio.PDB import PDBParser, DSSP

def extract_node_features(pdb_file, sequence):
    """Extract residue-level features for graph construction."""
    # 1. Amino acid one-hot
    aa_vocab = {aa: i for i, aa in enumerate("ACDEFGHIKLMNPQRSTVWY")}
    aa_onehot = torch.zeros(len(sequence), 20)
    for i, aa in enumerate(sequence):
        if aa in aa_vocab:
            aa_onehot[i, aa_vocab[aa]] = 1.0

    # 2. ESM-2 embedding (pre-computed or on-the-fly)
    model, alphabet = esm.pretrained.esm2_t12_35M_UR50D()
    batch_converter = alphabet.get_batch_converter()
    _, _, tokens = batch_converter([("protein", sequence)])
    with torch.no_grad():
        results = model(tokens, repr_layers=[12], return_contacts=False)
    esm_embed = results["representations"][12][0, 1:len(sequence)+1]

    # 3. Secondary structure from DSSP
    parser = PDBParser(QUIET=True)
    structure = parser.get_structure("protein", pdb_file)
    dssp = DSSP(list(structure[0])[0], pdb_file)
    ss_map = {"H": 0, "E": 1, "C": 2}
    ss_features = torch.zeros(len(sequence), 3)
    for i, key in enumerate(dssp.keys()):
        if key[1] in ss_map:
            ss_features[key[1], ss_map[key[1]]] = 1.0

    # 4. Solvent accessibility from DSSP
    rsa = torch.tensor([dssp[key][3] for key in dssp.keys()], dtype=torch.float)
    rsa = rsa / rsa.max()  # normalize

    # 5. Backbone dihedrals (phi, psi angles)
    phi_psi = extract_dihedrals(pdb_file)  # helper function

    # Concatenate all features
    node_features = torch.cat([aa_onehot, esm_embed, ss_features, rsa.unsqueeze(1), phi_psi], dim=1)
    return node_features
```

### 3.2 Edge Construction (Residue-Residue Contacts)

Three types of edges, forming a **multi-relational graph**:

| Edge Type | Definition | Example |
|---|---|---|
| **Sequence edges** | Adjacent residues in sequence | (i, i+1), (i, i+2), ... (i, i+k) for k=1..4 |
| **Spatial edges** | C-alpha distance < threshold (8-12A) | (i, j) where ||C_alpha_i - C_alpha_j|| < 10A |
| **Interaction edges** | Hydrogen bonds, hydrophobic contacts | From DSSP or contact map computation |

```python
import numpy as np
from Bio.PDB import PDBParser, NeighborSearch

def construct_edges(pdb_file, seq_length, distance_threshold=10.0):
    """Construct residue-level graph edges."""
    parser = PDBParser(QUIET=True)
    structure = parser.get_structure("protein", pdb_file)
    model = structure[0]

    # Extract C-alpha coordinates
    ca_coords = []
    for residue in model.get_residues():
        if "CA" in residue:
            ca_coords.append(residue["CA"].get_vector().get_array())
    ca_coords = np.array(ca_coords)

    edges = []
    edge_attrs = []

    # 1. Sequence edges (k-NN in sequence space, k=4)
    seq_range = 4
    for i in range(seq_length):
        for j in range(i+1, min(i+seq_range+1, seq_length)):
            edges.append([i, j])
            edges.append([j, i])
            edge_type = [1, 0, 0]  # sequence type
            seq_sep = abs(i - j) / seq_range
            edge_attrs.append(edge_type + [seq_sep])

    # 2. Spatial edges (distance threshold)
    ns = NeighborSearch(list(model.get_atoms()))
    for i in range(len(ca_coords)):
        nearby = ns.search(ca_coords[i], level="R")
        for res in nearby:
            res_id = res.get_id()[1]
            if res_id != i and res_id < seq_length:
                dist = np.linalg.norm(ca_coords[i] - ca_coords[min(res_id, len(ca_coords)-1)])
                if dist < distance_threshold:
                    edges.append([i, res_id])
                    edge_attrs.append([0, 1, 0] + [dist / distance_threshold])

    # Convert to PyG format
    edge_index = torch.tensor(edges, dtype=torch.long).t().contiguous()
    edge_attr = torch.tensor(edge_attrs, dtype=torch.float)
    return edge_index, edge_attr
```

---

## 4. Model Architecture

### 4.1 Graph Transformer (Graphormer-Style) — Primary Model

**Architecture overview**:

```
Input: Protein Graph (node features, edge features, edge index)
   │
   ├─ Positional Encoding (Laplacian PE or Random Walk PE)
   │
   ├─ Multi-Head Graph Attention Layer × L (L=4-6)
   │     ├─ Edge-gated attention: bias = f(edge features)
   │     ├─ Distance encoding in attention bias
   │     └─ Layer norm + residual
   │
   ├─ Global Readout (Attention Pooling)
   │
   └─ Classification Head
         ├─ Linear(dim, 256)
         ├─ ReLU
         ├─ Dropout(0.3)
         └─ Linear(256, num_GO_labels)  → Sigmoid
```

```python
import torch
import torch.nn as nn
import torch.nn.functional as F
from torch_geometric.nn import GraphTransformer, global_attention_pool
from torch_geometric.utils import add_self_loops

class ProteinGraphTransformer(nn.Module):
    def __init__(self, node_dim, edge_dim, hidden_dim=256, num_heads=8,
                 num_layers=4, num_go_labels=450, dropout=0.3):
        super().__init__()
        self.hidden_dim = hidden_dim

        # Node feature projection
        self.node_encoder = nn.Linear(node_dim, hidden_dim)

        # Edge feature projection (for attention bias)
        self.edge_encoder = nn.Linear(edge_dim, num_heads)

        # Laplacian positional encoding
        self.pos_encoder = LaplacianPositionalEncoding(hidden_dim)

        # Graph Transformer layers
        self.transformer_layers = nn.ModuleList([
            GraphTransformerLayer(hidden_dim, num_heads, edge_dim, dropout)
            for _ in range(num_layers)
        ])

        # Global attention pooling
        self.attention_pool = nn.Sequential(
            nn.Linear(hidden_dim, 1)
        )

        # Classification head (multi-label)
        self.classifier = nn.Sequential(
            nn.Linear(hidden_dim, 256),
            nn.ReLU(),
            nn.Dropout(dropout),
            nn.Linear(256, num_go_labels)
        )

    def forward(self, x, edge_index, edge_attr, batch):
        # Encode nodes
        x = self.node_encoder(x)

        # Add Laplacian positional encoding
        x = x + self.pos_encoder(x, edge_index)

        # Graph Transformer layers
        for layer in self.transformer_layers:
            x = layer(x, edge_index, edge_attr)

        # Global attention pooling
        attn_weights = self.attention_pool(x)
        graph_embedding = global_attention_pool(x, batch, attn_weights)

        # Classify
        logits = self.classifier(graph_embedding)
        return logits


class GraphTransformerLayer(nn.Module):
    def __init__(self, hidden_dim, num_heads, edge_dim, dropout=0.1):
        super().__init__()
        self.hidden_dim = hidden_dim
        self.num_heads = num_heads
        self.head_dim = hidden_dim // num_heads

        # Multi-head attention
        self.qkv = nn.Linear(hidden_dim, 3 * hidden_dim)
        self.edge_proj = nn.Linear(edge_dim, num_heads)

        # Feed-forward
        self.ff = nn.Sequential(
            nn.Linear(hidden_dim, hidden_dim * 4),
            nn.GELU(),
            nn.Dropout(dropout),
            nn.Linear(hidden_dim * 4, hidden_dim)
        )

        self.norm1 = nn.LayerNorm(hidden_dim)
        self.norm2 = nn.LayerNorm(hidden_dim)
        self.dropout = nn.Dropout(dropout)

    def forward(self, x, edge_index, edge_attr):
        # Self-attention with edge bias
        qkv = self.qkv(x).reshape(-1, 3, self.num_heads, self.head_dim)
        q, k, v = qkv.unbind(1)

        # Compute attention scores with edge bias
        attn = (q @ k.transpose(-2, -1)) / (self.head_dim ** 0.5)
        edge_bias = self.edge_proj(edge_attr).mean(dim=-1)
        attn = attn + edge_bias.unsqueeze(-1)

        attn = F.softmax(attn, dim=-1)
        attn = self.dropout(attn)

        out = (attn @ v).reshape(-1, self.hidden_dim)

        # Residual + norm
        x = self.norm1(x + out)
        x = self.norm2(x + self.ff(x))
        return x


class LaplacianPositionalEncoding(nn.Module):
    def __init__(self, dim):
        super().__init__()
        self.pe = nn.Linear(16, dim)  # 16 eigenvectors

    def forward(self, x, edge_index):
        # Compute Laplacian eigenvectors (simplified)
        # In practice, precompute or use a fast approximation
        from torch_geometric.utils import get_laplacian
        L = get_laplacian(edge_index, num_nodes=x.size(0))
        # Eigendecomposition (precomputed for efficiency)
        eigvecs = self.compute_laplacian_pe(L, k=16)
        return self.pe(eigvecs)
```

### 4.2 GEOM-Style Equivariant Transformer — Advanced Model (Optional)

For the **even semester** or if time permits:

```python
class EquivariantProteinTransformer(nn.Module):
    """
    SE(3)-equivariant transformer for protein graphs.
    Uses scalar + vector features.
    Reference: EGNN (Satorras et al., 2021), E3former (Zhang et al., 2025)
    """
    def __init__(self, node_dim, hidden_dim=128, num_layers=4):
        super().__init__()
        # Scalar encoder
        self.scalar_encoder = nn.Linear(node_dim, hidden_dim)
        # Vector encoder (for 3D coordinates)
        self.vector_encoder = nn.Linear(3, hidden_dim)

        self.layers = nn.ModuleList([
            EquivariantTransformerLayer(hidden_dim)
            for _ in range(num_layers)
        ])

        self.regressor = nn.Linear(hidden_dim, num_go_labels)

    def forward(self, x_scalar, x_vector, edge_index):
        h = self.scalar_encoder(x_scalar)
        v = self.vector_encoder(x_vector)

        for layer in self.layers:
            h, v = layer(h, v, edge_index)

        # Pool (mean)
        graph_h = global_mean_pool(h, batch)
        return self.regressor(graph_h)
```

---

## 5. Training Pipeline

### 5.1 Loss Function

For multi-label GO term prediction:

```python
class FocalBCELoss(nn.Module):
    """Binary Cross-Entropy with Focal Loss for class imbalance."""
    def __init__(self, gamma=2.0, alpha=0.25, pos_weight=None):
        super().__init__()
        self.gamma = gamma
        self.alpha = alpha
        self.pos_weight = pos_weight

    def forward(self, logits, targets):
        bce = F.binary_cross_entropy_with_logits(
            logits, targets,
            pos_weight=self.pos_weight,
            reduction='none'
        )
        pt = torch.exp(-bce)
        focal_loss = self.alpha * (1 - pt) ** self.gamma * bce
        return focal_loss.mean()
```

### 5.2 Training Loop

```python
import wandb
from torch.optim import AdamW
from torch.optim.lr_scheduler import CosineAnnealingLR

def train_epoch(model, loader, optimizer, loss_fn, device):
    model.train()
    total_loss = 0
    for batch in loader:
        batch = batch.to(device)
        optimizer.zero_grad()

        logits = model(batch.x, batch.edge_index, batch.edge_attr, batch.batch)
        loss = loss_fn(logits, batch.y)

        loss.backward()
        optimizer.step()
        total_loss += loss.item()
    return total_loss / len(loader)


def evaluate(model, loader, device):
    model.eval()
    all_preds = []
    all_labels = []
    with torch.no_grad():
        for batch in loader:
            batch = batch.to(device)
            logits = model(batch.x, batch.edge_index, batch.edge_attr, batch.batch)
            preds = torch.sigmoid(logits)
            all_preds.append(preds.cpu())
            all_labels.append(batch.y.cpu())
    all_preds = torch.cat(all_preds)
    all_labels = torch.cat(all_labels)
    return all_preds, all_labels


# Main training
config = {
    "lr": 1e-4,
    "epochs": 100,
    "batch_size": 32,
    "hidden_dim": 256,
    "num_heads": 8,
    "num_layers": 4,
    "dropout": 0.3,
    "weight_decay": 1e-4
}

wandb.init(project="protein-gt", config=config)

model = ProteinGraphTransformer(
    node_dim=329, edge_dim=4,
    hidden_dim=config["hidden_dim"],
    num_heads=config["num_heads"],
    num_layers=config["num_layers"],
    dropout=config["dropout"]
).to(device)

optimizer = AdamW(model.parameters(), lr=config["lr"], weight_decay=config["weight_decay"])
scheduler = CosineAnnealingLR(optimizer, T_max=config["epochs"])

# Compute pos_weight for class imbalance
pos_weight = compute_pos_weight(train_loader)  # from training data
loss_fn = FocalBCELoss(gamma=2.0, pos_weight=pos_weight)

for epoch in range(config["epochs"]):
    train_loss = train_epoch(model, train_loader, optimizer, loss_fn, device)
    val_preds, val_labels = evaluate(model, val_loader, device)
    scheduler.step()

    # Log metrics
    fmax = compute_fmax(val_preds, val_labels)
    wandb.log({"epoch": epoch, "train_loss": train_loss, "val_fmax": fmax})

    if epoch % 10 == 0:
        torch.save(model.state_dict(), f"checkpoints/epoch_{epoch}.pt")
```

---

## 6. Evaluation Metrics

### 6.1 Primary Metrics

| Metric | Formula | When to Use | Implementation |
|---|---|---|---|
| **Fmax** | max_t F1(t) across all thresholds t | Primary metric for GO prediction | See below |
| **Smin** | min over thresholds of semantic distance | Accounts for GO hierarchy | Needs GO DAG |
| **AUPR** | Area Under Precision-Recall Curve | Class imbalance present | `sklearn.metrics.average_precision_score` |
| **AUROC** | Area Under ROC Curve | Overall ranking quality | `sklearn.metrics.roc_auc_score` |

### 6.2 Fmax Computation

```python
import numpy as np
from sklearn.metrics import f1_score, precision_recall_curve

def compute_fmax(predictions, ground_truth, num_thresholds=50):
    """
    Compute Fmax: maximum F1 score across all classification thresholds.
    predictions: (N, L) probability scores
    ground_truth: (N, L) binary labels
    """
    thresholds = np.linspace(0, 1, num_thresholds)
    max_f1 = 0
    best_threshold = 0

    for t in thresholds:
        preds_binary = (predictions >= t).astype(float)
        # Micro-averaged F1
        f1 = f1_score(ground_truth, preds_binary, average='micro', zero_division=0)
        if f1 > max_f1:
            max_f1 = f1
            best_threshold = t

    return max_f1, best_threshold


def compute_aupr(predictions, ground_truth):
    """Compute micro-averaged AUPR (Area Under Precision-Recall Curve)."""
    from sklearn.metrics import average_precision_score
    return average_precision_score(ground_truth, predictions, average='micro')


def compute_auroc(predictions, ground_truth):
    """Compute micro-averaged AUROC."""
    from sklearn.metrics import roc_auc_score
    return roc_auc_score(ground_truth, predictions, average='micro')
```

### 6.3 Semantic Similarity (Smin) — Optional

Requires the Gene Ontology DAG structure:

```python
# Using goatools or networkx to compute semantic similarity
# Reference: Clark & Radivojac (2013)

def compute_semantic_distance(predictions, ground_truth, go_dag):
    """
    Smin = min_t semantic_distance(y, f_t)
    where semantic_distance uses GO hierarchy (Resnik or Lin similarity).
    """
    # Requires GO DAG (go-basic.obo)
    # See: https://github.com/tanghaibao/goatools
    from goatools.obo_parser import GODag
    go_dag = GODag("go-basic.obo")
    # Compute IC (information content) for each GO term
    # Then compute pairwise semantic distance
    ...
```

### 6.4 Evaluation Report Template

```python
def full_evaluation_report(preds, labels, threshold=None):
    """Generate complete evaluation report."""
    fmax, best_t = compute_fmax(preds, labels)
    aupr = compute_aupr(preds, labels)
    auroc = compute_auroc(preds, labels)

    # Per-term metrics (top-k most frequent GO terms)
    term_metrics = {}
    for term_idx in range(labels.shape[1]):
        if labels[:, term_idx].sum() > 0:  # skip empty labels
            term_f1 = f1_score(labels[:, term_idx], (preds[:, term_idx] >= best_t).astype(float))
            term_metrics[term_idx] = term_f1

    report = {
        "Fmax": fmax,
        "Best Threshold": best_t,
        "AUPR (micro)": aupr,
        "AUROC (micro)": auroc,
        "Mean per-term F1": np.mean(list(term_metrics.values())),
        "Median per-term F1": np.median(list(term_metrics.values())),
    }
    return report
```

---

## 7. Baseline Models

### 7.1 Baseline 1: ESM-2 Embedding + MLP (Sequence Baseline)

```python
import esm

class ESMBaseline(nn.Module):
    """Baseline: ESM-2 embedding -> mean pooling -> MLP."""
    def __init__(self, esm_dim=640, hidden=256, num_labels=450):
        super().__init__()
        self.esm_model = esm.pretrained.esm2_t12_35M_UR50D()
        self.classifier = nn.Sequential(
            nn.Linear(esm_dim, hidden),
            nn.ReLU(),
            nn.Dropout(0.3),
            nn.Linear(hidden, num_labels)
        )

    def forward(self, tokens):
        with torch.no_grad():
            results = self.esm_model(tokens, repr_layers=[12])
        # Mean pooling over sequence
        embed = results["representations"][12].mean(dim=1)
        return self.classifier(embed)
```

### 7.2 Baseline 2: GCN-Based Protein Function Predictor

```python
from torch_geometric.nn import GCNConv, global_mean_pool

class GCNBaseline(nn.Module):
    """Baseline: 2-layer GCN for protein function prediction."""
    def __init__(self, node_dim, hidden=128, num_labels=450):
        super().__init__()
        self.conv1 = GCNConv(node_dim, hidden)
        self.conv2 = GCNConv(hidden, hidden)
        self.classifier = nn.Linear(hidden, num_labels)

    def forward(self, x, edge_index, batch):
        x = F.relu(self.conv1(x, edge_index))
        x = F.relu(self.conv2(x, edge_index))
        x = global_mean_pool(x, batch)
        return self.classifier(x)
```

### 7.3 Baseline 3: GAT (Graph Attention Network)

```python
from torch_geometric.nn import GATConv

class GATBaseline(nn.Module):
    """Baseline: 2-layer GAT for protein function prediction."""
    def __init__(self, node_dim, hidden=128, heads=4, num_labels=450):
        super().__init__()
        self.conv1 = GATConv(node_dim, hidden, heads=heads)
        self.conv2 = GATConv(hidden * heads, hidden, heads=1)
        self.classifier = nn.Linear(hidden, num_labels)

    def forward(self, x, edge_index, batch):
        x = F.elu(self.conv1(x, edge_index))
        x = F.elu(self.conv2(x, edge_index))
        x = global_mean_pool(x, batch)
        return self.classifier(x)
```

### 7.4 Baseline 4: ProteinRPN (from paper, if code available)

```python
# Reference: https://github.com/[proteinrpn-repo-if-available]
# If not available, reimplement the key components:
# - Region proposal module
# - Hierarchy-aware node drop pooling
# - Graph Multiset Transformer
```

---

## 8. Ablation Studies

### Required Ablation Experiments

| Ablation | What to Remove/Change | Expected Impact |
|---|---|---|
| **No ESM embeddings** | Remove ESM features, use AA one-hot only | Measures contribution of sequence info |
| **No edge features** | Remove edge attributes, use unweighted edges | Tests importance of structural edge info |
| **No spatial edges** | Only sequence edges | Tests whether 3D structure matters |
| **No positional encoding** | Remove Laplacian PE | Tests importance of global graph structure |
| **Different pooling** | Compare mean vs. attention vs. max pooling | Optimal readout strategy |
| **Number of heads** | 1, 2, 4, 8 heads | Optimal attention heads |
| **Number of layers** | 1, 2, 4, 6 layers | Optimal depth |
| **Different thresholds** | C-alpha thresholds: 6A, 8A, 10A, 12A, 15A | Optimal graph connectivity |

```python
# Ablation experiment runner
ablation_configs = {
    "full_model": {"use_esm": True, "use_edge_features": True, "use_spatial": True, "use_pe": True},
    "no_esm": {"use_esm": False, "use_edge_features": True, "use_spatial": True, "use_pe": True},
    "no_edge_features": {"use_esm": True, "use_edge_features": False, "use_spatial": True, "use_pe": True},
    "no_spatial": {"use_esm": True, "use_edge_features": True, "use_spatial": False, "use_pe": True},
    "no_pe": {"use_esm": True, "use_edge_features": True, "use_spatial": True, "use_pe": False},
    "mean_pool": {"pooling": "mean"},
    "attn_pool": {"pooling": "attention"},
    "max_pool": {"pooling": "max"},
}

for name, config in ablation_configs.items():
    print(f"Running ablation: {name}")
    results = run_experiment(config)
    save_results(name, results)
```

---

## 9. Zero-Shot Evaluation Protocol

### What is Zero-Shot Evaluation?

Evaluate the model on **GO categories never seen during training** to test true generalization.

### Implementation

```python
def zero_shot_split(go_labels, test_ratio=0.2):
    """
    Split GO terms into seen (train) and unseen (test) categories.
    Unseen GO terms are those with NO proteins in the training set.
    """
    # Get all GO terms present in training set
    train_go_terms = set()
    for labels in train_labels:
        train_go_terms.update(np.where(labels > 0)[0])

    # Get all GO terms present in test set
    test_go_terms = set()
    for labels in test_labels:
        test_go_terms.update(np.where(labels > 0)[0])

    # Unseen GO terms = in test but not in train
    unseen_go_terms = test_go_terms - train_go_terms
    seen_go_terms = train_go_terms

    return seen_go_terms, unseen_go_terms


def evaluate_zero_shot(model, test_loader, unseen_terms, device):
    """Evaluate model performance on unseen GO categories."""
    model.eval()
    all_preds = []
    all_labels = []
    with torch.no_grad():
        for batch in test_loader:
            batch = batch.to(device)
            logits = model(batch.x, batch.edge_index, batch.edge_attr, batch.batch)
            preds = torch.sigmoid(logits)
            all_preds.append(preds.cpu())
            all_labels.append(batch.y.cpu())

    all_preds = torch.cat(all_preds)
    all_labels = torch.cat(all_labels)

    # Evaluate only on unseen GO terms
    unseen_preds = all_preds[:, list(unseen_terms)]
    unseen_labels = all_labels[:, list(unseen_terms)]

    fmax, _ = compute_fmax(unseen_preds.numpy(), unseen_labels.numpy())
    aupr = compute_aupr(unseen_preds.numpy(), unseen_labels.numpy())

    return {"zero_shot_Fmax": fmax, "zero_shot_AUPR": aupr}
```

---

## 10. Codebase Structure

```
protein-graph-transformer/
├── README.md
├── requirements.txt
├── setup.py
│
├── configs/
│   ├── default.yaml
│   ├── ablation_no_esm.yaml
│   └── ablation_no_spatial.yaml
│
├── data/
│   ├── raw/                          # Downloaded PDB files + GO annotations
│   ├── processed/                    # Processed graphs (PyG format)
│   └── download_and_prepare.py
│
├── src/
│   ├── __init__.py
│   ├── dataset.py                    # PyG Dataset class for proteins
│   ├── graph_construction.py         # PDB -> protein graph
│   ├── node_features.py              # Feature extraction (ESM, DSSP, etc.)
│   ├── models/
│   │   ├── __init__.py
│   │   ├── graph_transformer.py      # Our Graph Transformer model
│   │   ├── gcn_baseline.py
│   │   ├── gat_baseline.py
│   │   ├── esm_baseline.py
│   │   └── equivariant_transformer.py # Optional
│   ├── losses.py                     # FocalBCE, hierarchical loss
│   ├── metrics.py                    # Fmax, Smin, AUPR, AUROC
│   ├── train.py                      # Training loop
│   ├── evaluate.py                   # Evaluation + zero-shot
│   ├── ablations.py                  # Ablation study runner
│   └── utils.py
│
├── notebooks/
│   ├── 01_data_exploration.ipynb
│   ├── 02_graph_visualization.ipynb
│   ├── 03_results_analysis.ipynb
│   └── 04_attention_visualization.ipynb
│
├── scripts/
│   ├── run_training.sh
│   ├── run_ablations.sh
│   └── run_evaluation.sh
│
├── checkpoints/
│   └── best_model.pt
│
└── results/
    ├── metrics/
    ├── figures/
    └── tables/
```

### Dataset Class (PyTorch Geometric)

```python
# src/dataset.py
import os
import torch
from torch_geometric.data import Data, Dataset

class ProteinFunctionDataset(Dataset):
    def __init__(self, root, split="train", transform=None, pre_transform=None):
        super().__init__(root, transform, pre_transform)
        self.split = split
        self.labels = torch.load(os.path.join(root, f"{split}_labels.pt"))
        self.graph_paths = torch.load(os.path.join(root, f"{split}_graphs.pt"))

    def len(self):
        return len(self.labels)

    def get(self, idx):
        graph = torch.load(self.graph_paths[idx])
        graph.y = self.labels[idx]
        return graph
```

---

## 11. Compute Requirements

### ESM Embedding Extraction (One-Time)

```bash
# Extract embeddings for ~10K proteins with ESM-2 (35M params)
# Time: ~2-4 hours on 1x RTX 3090
# Memory: ~4GB GPU
python scripts/extract_esm_embeddings.py \
    --input_fasta data/raw/proteins.fasta \
    --output_dir data/processed/esm_embeddings \
    --model esm2_t12_35M_UR50D
```

### Graph Construction (One-Time)

```bash
# Build graphs for ~10K proteins
# Time: ~1-2 hours on CPU
python scripts/build_graphs.py \
    --pdb_dir data/raw/pdb/ \
    --esm_dir data/processed/esm_embeddings/ \
    --output_dir data/processed/graphs/
```

### Model Training

| Model | Params | Time/Epoch (RTX 3090) | Total Time (100 epochs) |
|---|---|---|---|
| ESM + MLP | ~30M | ~30s | ~50 min |
| GCN Baseline | ~500K | ~15s | ~25 min |
| GAT Baseline | ~1M | ~20s | ~35 min |
| Graph Transformer (Ours) | ~5M | ~45s | ~75 min |

### Expected Disk Usage

| Component | Size |
|---|---|
| PDB structures (~10K) | ~5 GB |
| ESM embeddings | ~2 GB |
| Processed graphs | ~3 GB |
| Checkpoints | ~1 GB |
| Results/figures | ~500 MB |
| **Total** | **~12 GB** |

---

## Quick Reference: Key Hyperparameters

| Hyperparameter | Value | Notes |
|---|---|---|
| Learning rate | 1e-4 | AdamW optimizer |
| Batch size | 32 | Adjust based on GPU memory |
| Hidden dim | 256 | |
| Attention heads | 8 | |
| Transformer layers | 4 | |
| Dropout | 0.3 | |
| Weight decay | 1e-4 | |
| Distance threshold (edges) | 10A | C-alpha distance |
| Sequence edge k | 4 | k-NN in sequence space |
| ESM model | esm2_t12_35M_UR50D | 35M params, 320-dim output |
| Max protein length | 1000 | Truncate longer proteins |
| Focal loss gamma | 2.0 | For class imbalance |
| Number of GO labels | ~450 | Top-level MF terms (filter by frequency) |

---

*This implementation plan is designed for the 12-week odd semester timeline.*
