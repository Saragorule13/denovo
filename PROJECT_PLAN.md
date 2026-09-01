# PROJECT PLAN

## De Novo Protein Function Prediction Using Graph Transformers

**Final-Year Major Project — Group Project**
**Plan Date:** 2025-09-01
**Target Submission (Odd Sem):** October 31, 2025
**Target Implementation (Odd Sem):** 60–70%

---

## Table of Contents

1. [Scope of the Project](#1-scope-of-the-project)
2. [Clearly Defined Objectives](#2-clearly-defined-objectives)
3. [Literature Survey](#3-literature-survey)
4. [Identification of Research Gaps](#4-identification-of-research-gaps)
5. [Proposed Methodology](#5-proposed-methodology)
6. [Implementation Plan (60–70% — Odd Semester)](#6-implementation-plan-6070--odd-semester)
7. [Team Role Distribution](#7-team-role-distribution)
8. [Tools and Dependencies](#8-tools-and-dependencies)
9. [Risk Mitigation](#9-risk-mitigation)
10. [Deliverables](#10-deliverables)
11. [Quick Start Checklist](#11-quick-start-checklist)

---

## 1. Scope of the Project

### What's In Scope

- Predicting **protein molecular function** (Gene Ontology GO terms) directly from protein **3D structure graphs** represented as residue-level graphs, without relying on evolutionary sequence similarity beyond embedding extraction
- Using **graph transformer** architectures to learn structure-function relationships
- Benchmarking against established baselines (ESM embeddings + MLP, GCN-based methods, ProteinRPN)
- Evaluating on **in-distribution** and **out-of-distribution (zero-shot)** test sets
- Writing a research paper with empirical results

### What's Out of Scope

- De novo protein **structure** prediction (use AlphaFold/ESMFold as fixed backends)
- Full de novo protein **design** / sequence generation
- Protein-protein interaction prediction (unless used as auxiliary task)
- Experimental wet-lab validation

---

## 2. Clearly Defined Objectives

### Primary Objective (Odd Semester — Oct deadline)

Build and evaluate a **graph transformer model** for de novo protein function prediction from 3D structure graphs, achieving a measurable improvement over baseline methods, and produce a **review/research paper** with results.

### Specific, Measurable Sub-Objectives

1. **Literature Survey** (Sept — Week 2): Survey 30+ papers across protein function prediction, graph transformers, and geometric deep learning for proteins
2. **Data Pipeline** (Sept — Week 3): Construct protein structure graphs from PDB/AlphaFold structures with appropriate edge features
3. **Baseline Models** (Sept — Week 4): Implement at least 2 baselines (ESM + MLP, GCN-based protein function predictor)
4. **Graph Transformer Model** (Sept-Oct — Week 5-6): Implement a graph transformer architecture (e.g., Graphormer-style or SE(3)-equivariant variant) for protein function prediction
5. **Evaluation and Analysis** (Oct — Week 7): Run experiments, ablation studies, zero-shot evaluation on held-out GO categories
6. **Paper Writing** (Oct — Week 8): Write, polish, and prepare for submission by end of October

### Secondary Objective (Even Semester)

- Extend to **multi-domain** protein function prediction
- Investigate **interpretability** (attention visualization, subgraph attribution)
- Explore **hierarchical** GO term prediction

---

## 3. Literature Survey

### Categories to Survey

| Category | Key Papers to Study |
|---|---|
| **Foundational Graph Transformers** | Graphormer (Ying et al., 2023), GraphiT (Cai et al., 2022), SAN (Kobayashi et al., 2022), SE(3)-equivariant transformers (Fuchs et al., 2020) |
| **Protein Structure Representation** | AlphaFold 2 (Jumper et al., Nature 2021), ESM-2/Fold (Lin et al., Science 2023), GVP-GNN (Bian et al., ICLR 2022), E3former (Zhang et al., arXiv 2025) |
| **Protein Function Prediction (Existing Methods)** | ProteinRPN (Mitra et al., arXiv 2024), DeepFRI (Gligorijevic et al., Cell Syst 2021), DeepGO/DeepGOZero (Elsayed et al.), STAR-GO (Akca et al., arXiv 2025), OneProt (Floege et al., arXiv 2024) |
| **Graph Neural Networks for Proteins** | GCN (Kipf and Welling), R-GCN (Schlichtkrull et al.), GemNet (Klics et al.), GearNet (Zhou et al., NeurIPS 2022) |
| **Protein Graph Datasets and Benchmarks** | Enzyme Commission (EC) numbers, Gene Ontology (GO) annotated datasets, CATH/ECOD structural classifications, TAPE benchmark, PDBbind |
| **Geometric and Equivariant Learning** | Tensor Field Networks (Thomas et al.), EGNN (Satorras et al., ICLR 2022), PaiNN (Batzner et al.) |

### Recommended Reading Workflow

- **Team Member A**: Foundational GT + protein representation (Week 1-2)
- **Team Member B**: Protein function prediction methods (Week 1-2)
- **Team Member C**: Datasets, baselines, and evaluation metrics (Week 1-2)
- **Weekly sync**: Share summaries, identify synthesis points

### Tools for Literature Management

- **Zotero** or **Mendeley** for reference management
- **Connected Papers** or **ResearchRabbit** to build a literature graph
- **Semantic Scholar API** or **scholar search** for recent papers
- **ArXiv sanity** for staying updated

---

## 4. Identification of Research Gaps

### Gap 1: Over-reliance on Sequence Evolution

Most existing methods (e.g., DeepFRI, ProtTrans, ESM2) rely heavily on **pre-trained sequence embeddings** from massive protein language models. While effective, this creates two limitations:

1. **Annotation bias**: Models can "cheat" by detecting sequence similarity to annotated proteins, not truly learning structure to function
2. **Zero-shot generalization**: Performance degrades significantly on novel or orphan proteins (no sequence homologs)

**Our opportunity**: A pure structure-based graph transformer would learn direct structure-function relationships, improving zero-shot generalization.

### Gap 2: Limited Geometric Reasoning in Current Graph Models

Existing GNN-based methods for proteins (e.g., DeepFRI, GCN-based) typically use **standard GNN layers** (GCN, GAT) that do not inherently respect SE(3) equivariance. They treat 3D coordinates as static features rather than reasoning about geometric structure.

**Our opportunity**: Integrate **geometric/equivariant features** into the graph transformer to better capture 3D structural motifs.

### Gap 3: No Unified Graph Transformer for Protein Function

While ProteinRPN (2024) uses GAT + Graph Multiset Transformer, and STAR-GO integrates GO ontology into transformers, **no work has yet applied a dedicated graph transformer architecture** (with geometric attention) specifically for **de novo** protein function prediction from structure.

**Our opportunity**: Be the first to apply a purpose-designed graph transformer for this task.

### Gap 4: Lack of Interpretability in Structure-to-Function Mapping

Most black-box models do not explain **which structural elements** drive function predictions. This is critical for biological insight.

**Our opportunity**: Leverage transformer attention maps to identify **function-critical structural motifs**.

### Gap 5: No Comprehensive Benchmark for Zero-Shot De Novo Function Prediction

Existing benchmarks conflate sequence similarity with true structural reasoning.

**Our opportunity**: Create a clean evaluation protocol that separates sequence-based and structure-based reasoning.

---

## 5. Proposed Methodology

### High-Level Architecture

```
Protein 3D Structure (PDB/AF2) -> Graph Construction -> Graph Transformer -> Function Prediction (GO terms)
                          |                                      |
                    ESM Embeddings (auxiliary)         Multi-label classifier
```

### 5.1 Graph Construction

**Nodes**: Each residue (amino acid) in the protein chain. Features:

- **Sequence embedding**: Pre-computed ESM-2 embeddings (320-1280 dim, reduced via PCA)
- **Amino acid type**: One-hot encoded (20 AA + gap/special tokens)
- **Secondary structure**: One-hot (Helix, Sheet, Coil) from DSSP
- **Solvent accessible surface area**: Normalized
- **Relative solvent accessibility**
- **Position-specific scoring matrix (PSSM)**: Optional, if available
- **Residue area difference** (contacts)

**Edges**: Residue-residue interactions. Types of edges:

1. **Sequence proximity edges**: Adjacent residues in sequence (|i-j| <= 1 for covalent backbone, up to +/-7 for local structure)
2. **Spatial proximity edges**: Residue pairs within a distance threshold (e.g., C-alpha < 20A), weighted by inverse distance
3. **Interaction edges**: Based on hydrogen bonding, hydrophobic contacts (computed from structure)

**Edge features**:

- Euclidean distance between C-alpha atoms
- Sequence separation (|i-j|)
- Edge type indicator (sequence vs. spatial vs. interaction)
- Relative orientation vectors (for equivariant models)

### 5.2 Model Architecture

#### Option A: Vanilla Graph Transformer (Graphormer-style)

- Multi-head attention over full graph with **distance encoding** (via Laplacian PE or random walk RWSE)
- Edge features incorporated through **edge gating** or **bias terms** in attention
- Feed-forward layers after each attention block
- Residual connections + layer norm
- Global pooling (attention-based or mean) -> GO term classifier

#### Option B: Geometric Graph Transformer (Equivariant)

- Node features include scalar + vector features (for directional information)
- **SE(3)-equivariant attention**: Incorporate relative positions directly in attention computation
- Uses **Tensor Field Networks** or **Vector Attention** (Fuchs et al., 2020)
- More physically principled, but more complex
- For 60-70% implementation, recommend starting with Option A and optionally exploring B for comparison

**Recommended choice for semester 1**: Graphormer-style GNN with geometric features, as it is well-documented and achievable within scope.

### 5.3 Function Prediction Head

- **Multi-label classification**: Each protein can have multiple GO terms (e.g., "kinase activity", "ATP binding")
- **Label encoding**: Binary vectors over the GO label space (e.g., 450 labels from the "molecular function" ontology)
- **Loss function**: **Binary cross-entropy** with class weighting or **focal loss** to handle label imbalance
- **Hierarchical loss**: Optionally use the GO DAG structure for consistency (propagate predictions through parent-child relationships)

### 5.4 Training Strategy

#### Phase 1 — Pretraining (optional, if time permits)

- Self-supervised objective: Masked node feature prediction / masked distance prediction on protein structures
- Pre-train on large unlabeled protein graph dataset, then fine-tune on labeled data

#### Phase 2 — Supervised Fine-Tuning

- Freeze or finetune ESM embeddings
- Train graph transformer on labeled data (protein -> GO term annotations)
- Use **cross-validation** (e.g., 5-fold CV based on sequence similarity splits to avoid data leakage)

### 5.5 Evaluation Metrics

- **Fmax** (max F1 score across thresholds) — primary metric for multi-label protein function prediction
- **Smin** (minimum semantic distance) — accounts for GO hierarchy
- **AUPR** (Area Under Precision-Recall curve)
- **AUROC** (Area Under ROC curve)
- **Zero-shot performance**: Evaluate on GO categories not seen during training

---

## 6. Implementation Plan (60–70% — Odd Semester)

### Timeline Overview (12 weeks from Sep)

| Week | Deliverable | Team Tasks |
|---|---|---|
| Week 1 | Project charter, team roles assigned, environment setup | All members |
| Week 2 | Literature survey complete, gap analysis | Research team |
| Week 3 | Dataset pipeline ready, graph construction implemented | Data team |
| Week 4 | ESM embedding extraction + baseline 1 (ESM+MLP) implemented | Model team |
| Week 5 | Baseline 2 (GCN-based) + Paper outline drafted | All teams |
| Week 6 | Graph transformer model architecture ready (Option A) | Model team |
| Week 7 | Model training, hyperparameter tuning, results collection | All teams |
| Week 8 | Ablation studies, zero-shot eval, analysis | Research team |
| Week 9-10 | Paper writing, results section, figures | Research team |
| Week 11 | Paper revision, internal review | All members |
| Week 12 | Final submission by end of October | All members |

### Detailed Weekly Tasks

#### Week 1: Setup and Planning (Sep 1-7)

**Goal**: Environment is ready, team roles are clear

- Setup shared repo (GitHub), project structure
- Install dependencies: PyTorch, PyTorch Geometric, BioPython, ProDy, ESM, OpenFold
- Team roles assignment:
  - **Data Engineer (Person 1)**: Graph construction, dataset processing
  - **Model Developer (Person 2)**: Graph transformer implementation, baselines
  - **Research Analyst (Person 3)**: Literature, paper writing, evaluation/analysis
  - *(Adjust for team size — rotate/collaborate as needed)*

#### Week 2: Literature Survey (Sep 8-14)

**Goal**: 30+ papers reviewed, gaps identified

- All team members read 10 papers each across categories
- **Deliverable**: Shared Zotero library + annotated bibliography
- **Deliverable**: Literature review section draft (1-2 pages)

#### Week 3: Data Pipeline (Sep 15-21)

**Goal**: Working code to convert PDB to protein graph

- Parse PDB files, extract C-alpha coordinates
- Compute residue-level features
- Build adjacency (sequence + spatial proximity)
- **Dataset**: Use a subset of the **CAFA** (Critical Assessment of Functional Annotation) dataset or **PDB to GO** annotations
- **Deliverable**: `data_pipeline.py`, graph dataset ready

#### Week 4: Baselines (Sep 22-28)

**Goal**: Two baselines working + ESM integration

- **Baseline 1**: ESM-2 embeddings -> mean pooling -> MLP classifier
- **Baseline 2**: GCN-based protein function predictor (2 GCN layers + global mean pool -> classifier)
- Extract ESM embeddings in batch
- **Deliverable**: Baseline training scripts, initial results

#### Week 5: Model Development I (Sep 29 - Oct 5)

**Goal**: Graph transformer architecture finalized

- Implement **Graphormer-style architecture** with edge features and attention bias
- Distance encoding (Laplacian PE or Random Walk PE)
- Test on dummy data
- Start paper methods section
- **Deliverable**: `model.py` with graph transformer

#### Week 6: Model Development II (Oct 6-12)

**Goal**: First training results

- Train graph transformer on full dataset
- Compare against baselines
- Hyperparameter tuning (learning rate, dropout, layers, heads)
- **Deliverable**: Initial results table

#### Week 7: Evaluation and Analysis (Oct 13-19)

**Goal**: Comprehensive results + ablation

- Run full evaluation (Fmax, AUPR, AUROC)
- Ablation study: remove edge features, different pooling, attention heads
- Zero-shot evaluation on held-out GO categories
- **Deliverable**: Results section draft, plots/figures

#### Week 8: Paper Draft Completion (Oct 20-26)

**Goal**: Complete draft with all sections

- Write abstract, introduction, related work, methodology, results, discussion, conclusion
- Create figures (model architecture, attention heatmaps, performance graphs)
- **Deliverable**: Complete paper draft (10-12 pages)

#### Week 9-10: Revision and Internal Review (Oct 27 - Nov 2)

**Goal**: Paper finalized

- Peer review within team
- Address comments, polish language
- Format for conference/journal submission (e.g., IEEE/ACM, Springer, or arXiv)
- **Deliverable**: Final paper ready for submission

#### Week 11-12: Submission and Wrap-up (Nov 3-10)

**Goal**: Paper submitted by end of October target, project wrap-up

- Submit to appropriate venue
- Create final project report/presentation
- **Deliverable**: Submitted paper, final presentation

---

## 7. Team Role Distribution

| Role | Responsibilities | Skills Needed |
|---|---|---|
| **Team Lead / Research Analyst** | Overall coordination, literature survey, paper writing (introduction, abstract, discussion) | Strong writing, literature synthesis |
| **Data Engineer** | Dataset curation, graph construction, data preprocessing pipelines | Python, BioPython, PDB parsing, PyTorch Geometric |
| **ML Engineer** | Model implementation (graph transformer, baselines), training, evaluation | PyTorch/PyTorch Geometric, GNNs, transformers |
| **All Members** | Code review, weekly syncs, results analysis, paper figures | Collaboration, reproducibility |

### Communication Plan

- **Daily**: Slack/Discord check-ins
- **Weekly**: 1.5-hour team meeting (Monday: plan, Friday: review)
- **Bi-weekly**: 30-min check-in with project advisor

---

## 8. Tools and Dependencies

### Software Stack

```
Python >= 3.9
├── PyTorch >= 2.0
├── PyTorch Geometric (PyG) — graph construction & GNN layers
├── BioPython — PDB parsing, sequence handling
├── fair-esm — protein language model embeddings
├── ProDy / MDAnalysis — structure analysis
├── RDKit — (optional) chemical feature extraction
├── scikit-learn — metrics, baselines
├── matplotlib / plotly / seaborn — visualization
├── PyTorch Lightning — training loop abstraction (optional)
└── DVC — data version control (team collaboration)
```

### Datasets

| Dataset | Use | Access |
|---|---|---|
| **CAFA** (Critical Assessment of Functional Annotation) | Benchmark for GO term prediction | Public, large |
| **PDB + GOA** (from UniProt) | Train/test data (structure -> function) | UniProt GOA files |
| **TAPE benchmark** | Evaluation on secondary tasks | Public |
| **CATH** | Structural classification (for graph construction) | Public |
| **EC dataset** | Enzyme function prediction | Public |

**Recommendation**: Start with a **subset of PDB structures** with known GO annotations — download PDB files + UniProt GO annotations, filter for quality (resolution < 3.0A, length < 1000aa), create train/val/test splits based on sequence clustering (to prevent data leakage).

### Computational Resources

- **GPU**: Minimum 1 x RTX 3090 or A100 (12-24 GB VRAM)
- **Cloud options**: Google Colab Pro, AWS SageMaker, Lambda Labs, or university HPC
- **Storage**: ~50-100 GB for PDB dataset + precomputed embeddings

---

## 9. Risk Mitigation

| Risk | Mitigation |
|---|---|
| **AlphaFold structures unavailable for some proteins** | Use PDB + predicted structures from ESMFold (free API) |
| **GO label sparsity / imbalance** | Use focal loss, class weighting, hierarchical label smoothing |
| **Graph construction too slow** | Pre-compute graphs offline, cache in efficient format (e.g., .npz, DGL/GraphStorm) |
| **Model does not beat baselines first try** | Start with well-tested Graphormer baseline, ensure fair comparison |
| **Paper deadline too tight** | Aim for 80% results by Week 7, write incrementally (not just Week 8-10) |
| **Team coordination issues** | Use GitHub Projects for task tracking, weekly retrospectives |

---

## 10. Deliverables

By end of Odd Semester:

1. **Working codebase**: `repo/` with graph construction, model, training, evaluation
2. **Trained model**: Checkpoint + evaluation metrics
3. **Research paper**: 10-12 page PDF with results (submitted by October 31)
4. **Presentation**: 15-min slide deck + live demo (if feasible)
5. **Final report**: Extended version of the paper (~15-20 pages, if required by institution)

---

## 11. Quick Start Checklist

- [ ] Create shared GitHub repo
- [ ] Set up conda environment: `conda create -n protein-gt python=3.9`
- [ ] Install PyTorch + PyTorch Geometric
- [ ] Clone/install `fair-esm` for embeddings
- [ ] Download initial PDB + GO dataset (start with ~500-1000 structures)
- [ ] Assign: Person 1 -- graph construction, Person 2 -- ESM embeddings + baseline, Person 3 -- literature survey
- [ ] Schedule first team meeting with advisor (if applicable)

---

## Key References

1. **AlphaFold 2**: Jumper et al., "Highly accurate protein structure prediction with AlphaFold," Nature, 2021
2. **ESM-2**: Lin et al., "Evolutionary-scale prediction of atomic-level protein structure with a language model," Science, 2023
3. **Graphormer**: Ying et al., "Do Transformers Really Perform Bad for Graph Representation?," ICLR, 2023
4. **GVP-GNN**: Bian et al., "Geometric Vector Perceptrons for Efficient Prediction," ICLR, 2022
5. **DeepFRI**: Gligorijevic et al., "Structure-based function prediction using graph convolutional networks," Nature Comms, 2021
6. **ProteinRPN**: Mitra et al., "Towards Accurate Protein Function Prediction with Graph-Based Region Proposals," arXiv, 2024
7. **STAR-GO**: Akca et al., "Improving Protein Function Prediction by Learning to Hierarchically Integrate Ontology-Informed Semantic Embeddings," arXiv, 2025
8. **OneProt**: Floege et al., "Towards Multi-Modal Protein Foundation Models," arXiv, 2024
9. **EGNN**: Satorras et al., "E(n) Equivariant Graph Neural Networks," ICML, 2021
10. **GearNet**: Zhou et al., "Structure-aware Protein Representation Learning," NeurIPS, 2022

---

*This document is the living project plan. Update weekly with progress.*
