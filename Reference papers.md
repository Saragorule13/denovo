# Curated IEEE-Level Research Papers (2024–2026+)
## De Novo Protein Function Prediction Using Graph Transformers

> **Selection criteria**: Published 2024 or later, in IEEE venues, top-tier ML conferences, or high-impact journals (Nature, Science, Cell, PNAS). Papers are grouped by relevance to this project.

---

## A. IEEE-Conference / IEEE-Journal Published (Explicit)

### 1. Multimodal Quantum Vision Transformer for Enzyme Commission Classification
- **Authors**: Murat Isik, Mandeep Kaur Saggi, Humaira Gowher, Sabre Kais
- **Venue**: IEEE International Conference on Quantum Artificial Intelligence (QAI) 2025
- **arXiv**: [2508.14844](https://arxiv.org/abs/2508.14844)
- **Year**: 2025
- **Relevance**: Integrates four biochemical modalities (sequence embeddings, quantum descriptors, molecular graphs, 2D images) with a Quantum Vision Transformer backbone. Achieves 85.1% top-1 accuracy for enzyme function classification. Demonstrates multimodal fusion with graph features for enzyme function — directly relevant to our project's approach of integrating structure graphs with other modalities.

---

## B. Transactions on Machine Learning Research (TMLR) — IEEE-Level

### 2. Transformers Trained on Proteins Can Learn to Attend to Euclidean Distance
- **Authors**: Isaac Ellmen, Constantin Schneider, Matthew I.J. Raybould, Charlotte M. Deane
- **Venue**: Transactions on Machine Learning Research (TMLR), 2025
- **arXiv**: [2502.01533](https://arxiv.org/abs/2502.01533)
- **Year**: 2025
- **Relevance**: Theoretically and empirically demonstrates that standard Transformers can function as independent structure models when passed coordinate embeddings. Shows how Transformers learn to filter attention as a 3D Gaussian with learned variance. Proves that pretraining protein Transformer encoders with structure improves downstream task performance. **Highly relevant** — provides the theoretical foundation for using plain Transformers on protein graphs.

---

## C. Top-Tier Machine Learning Conferences (ICML, NeurIPS, ICLR) — IEEE-Level Equivalent

### 3. Graphormer: Do Transformers Really Perform Bad for Graph Representation?
- **Authors**: Ying et al.
- **Venue**: ICLR 2023 (Poster)
- **Year**: 2023
- **Relevance**: Foundational paper on applying Transformers to graph-structured data. Introduces structural encoding schemes (Laplacian PE, RWSE) that enable attention mechanisms to reason about graph topology. **Essential reading** — this is the base architecture we will adapt for protein graphs.

### 4. From GNNs to Trees: Multi-Granular Interpretability for Graph Neural Networks (TIF)
- **Authors**: Jie Yang, Yuwen Wang, Kaixuan Chen, Tongya Zheng, Yihe Zhou, Zhenbang Xiao, Ji Cao, Mingli Song, Shunyu Liu
- **Venue**: ICLR 2025 (Accepted)
- **arXiv**: [2505.00364](https://arxiv.org/abs/2505.00364)
- **Year**: 2025
- **Relevance**: Introduces a Tree-like Interpretable Framework (TIF) for graph classification using hierarchical coarsening. Provides multi-granular interpretability — relevant to our goal of understanding which structural elements drive function predictions. The hierarchical approach could be adapted for multi-domain protein analysis.

### 5. Geometric Self-Supervised Pretraining on 3D Protein Structures using Subgraphs
- **Authors**: Michail Chatzianastasis, Yang Zhang, George Dasoulas, Michalis Vazirgiannis
- **Venue**: Submitted to top-tier venue, 2024
- **arXiv**: [2406.14142](https://arxiv.org/abs/2406.14142)
- **Year**: 2024
- **Relevance**: Proposes a novel self-supervised pretraining scheme for 3D GNNs on protein structures by predicting distances between local geometric centroids of subgraphs and the global centroid. Achieves up to 6% improvement on protein classification tasks. **Directly relevant** — provides the pretraining strategy we should consider.

### 6. OneProt: Towards Multi-Modal Protein Foundation Models
- **Authors**: Klemens Flöge, Srisruthi Udayakumar, Johanna Sommer, Marie Piraud, Stefan Kesselheim, Vincent Fortuin, Stephan Günneman, Karel J van der Weg, Holger Gohlke, Erinc Merdivan, Alina Bazarova
- **Venue**: Submitted to top-tier venue, 2024
- **arXiv**: [2411.04863](https://arxiv.org/abs/2411.04863)
- **Year**: 2024
- **Relevance**: Multi-modal protein foundation model integrating structural, sequence, text, and binding site data using ImageBind framework with GNN + transformer architectures. Demonstrates strong enzyme function prediction and binding site analysis. **Highly relevant** — shows the state-of-the-art in multi-modal protein representation including graph-based components.

### 7. ProtSCAPE: Mapping the Landscape of Protein Conformations in Molecular Dynamics
- **Authors**: Siddharth Viswanath, Dhananjay Bhaskar, David R. Johnson, Joao Felipe Rocha, Egbert Castro, Jackson D. Grady, Alex T. Grigas, Michael A. Perlmutter, Corey S. O'Hern, Smita Krishnaswamy
- **Venue**: 5th Molecular Machine Learning Conference (MoML 2024), Short Paper
- **arXiv**: [2410.20317](https://arxiv.org/abs/2410.20317)
- **Year**: 2024
- **Relevance**: Combines geometric scattering transform with transformer-based attention for protein dynamics from MD simulations. Uses protein structures as graphs with dual attention over residues and amino acids. **Relevant** — demonstrates geometric + transformer fusion for proteins.

### 8. Protein Secondary Structure Prediction Using 3D Graphs and Relation-Aware Message Passing Transformers (SSRGNet)
- **Authors**: Disha Varshney, Samarth Garg, Sarthak Tyagi, Deeksha Varshney, Nayan Deep, Asif Ekbal
- **Venue**: Submitted to top-tier venue, 2025
- **arXiv**: [2511.13685](https://arxiv.org/abs/2511.13685)
- **Year**: 2025
- **Relevance**: Combines pre-trained transformer protein language models with GCN/R-GCN on 3D residue graphs for secondary structure prediction. Uses message passing with sequential and structural connections. **Directly relevant** — demonstrates combining PLM embeddings with graph transformers on 3D protein structures.

---

## D. High-Impact Biology / Bioinformatics Journals

### 9. Evolutionary-scale Prediction of Atomic-level Protein Structure with a Language Model (ESM-2 / ESMFold)
- **Authors**: Zeming Lin, Halil Akin, Roshan Rao, Brian Hie, Zhongkai Zhu, Wenting Lu, Nikita Smetanin, Robert Verkuil, Ori Kabeli, Yaniv Shmueli, Allan dos Santos Costa, Maryam Fazel-Zarandi, Tom Sercu, Salvatore Candido, Alexander Rives
- **Venue**: Science, 2023
- **arXiv**: [2207.08716](https://arxiv.org/abs/2207.08716)
- **Year**: 2023 (updated 2024)
- **Relevance**: The foundational protein language model. ESM-2 provides the sequence embeddings we will use as node features. ESMFold provides structure prediction. **Essential reference** — our work builds on this foundation.

### 10. Highly Accurate Protein Structure Prediction with AlphaFold
- **Authors**: John Jumper, Richard Evans, Alexander Pritzel, Tim Green, Michael Figurnov, Olaf Ronneberger, Kathryn Tunyasuvunakool, Russ Bates, Zdeňek Žídek, Anna Potapenko, et al.
- **Venue**: Nature, 2021
- **Year**: 2021
- **Relevance**: AlphaFold provides the gold-standard 3D structures that we will use as input to our graph transformer. Essential reference for the structural biology context.

### 11. Biological Structure and Function Emerge from Scaling Unsupervised Learning to 250 Million Protein Sequences (ESM-1 / ESM-2 lineage)
- **Authors**: Alexander Rives, Joshua Meier, Tom Sercu, Siddharth Goyal, Zeming Lin, Jason Liu, Demi Guo, Myle Ott, C. Lawrence Zitnick, Jerry Ma, Rob Fergus
- **Venue**: PNAS, 2021
- **Year**: 2021
- **Relevance**: Introduced the Transformer protein language model paradigm. The foundational paper that established the sequence-to-structure paradigm. **Essential background**.

### 12. MSA Transformer
- **Authors**: Roshan Rao, Jason Liu, Robert Verkuil, Joshua Meier, John F. Canny, Pieter Abbeel, Tom Sercu, Alexander Rives
- **Venue**: bioRxiv / ICML 2021
- **Year**: 2021
- **Relevance**: Introduced MSA-based Transformer for protein structure prediction. Shows how attention over evolutionary information improves structure prediction. Relevant for understanding the attention mechanisms we will build upon.

---

## E. Directly Relevant: Graph Neural Networks for Protein Function

### 13. ProteinRPN: Towards Accurate Protein Function Prediction with Graph-Based Region Proposals
- **Authors**: Shania Mitra, Lei Huang, Manolis Kellis
- **Venue**: Submitted to top-tier venue, 2024
- **arXiv**: [2409.00610](https://arxiv.org/abs/2409.00610)
- **Year**: 2024
- **Relevance**: Introduces the Protein Region Proposal Network (ProteinRPN) for accurate protein function prediction using graph-based region proposals. Uses a hierarchy-aware node drop pooling layer, attention mechanisms, and a Graph Multiset Transformer with SupCon and InfoNCE losses. **The closest existing work** to our proposed approach — directly combines graph structures with Transformers for protein function prediction on 3D structures.

### 14. STAR-GO: Improving Protein Function Prediction by Learning to Hierarchically Integrate Ontology-Informed Semantic Embeddings
- **Authors**: Mehmet Efe Akça, Gökçe Uludoğan, Arzucan Özgür, İnci M. Baytaş
- **Venue**: Submitted 2025
- **arXiv**: [2512.05245](https://arxiv.org/abs/2512.05245)
- **Year**: 2025
- **Relevance**: Transformer-based framework for zero-shot protein function prediction that jointly models semantic and structural characteristics of GO terms. Achieves state-of-the-art performance and superior zero-shot generalization. **Highly relevant** — demonstrates the zero-shot evaluation protocol we should target.

### 15. PSBench: A Large-Scale Benchmark for Estimating the Accuracy of Protein Complex Structural Models (GATE)
- **Authors**: Pawan Neupane, Jian Liu, Jianlin Cheng
- **Venue**: Submitted to top-tier venue, 2025
- **arXiv**: [2505.22674](https://arxiv.org/abs/2505.22674)
- **Year**: 2025
- **Relevance**: Introduces GATE, a graph transformer-based estimation of model accuracy (EMA) method that ranked among top-performing methods at CASP16. Provides PSBench benchmark suite. **Relevant** — demonstrates graph transformers working at scale on protein structure tasks, and provides a benchmark suite.

### 16. An Energy-Adaptive Elastic Equivariant Transformer Framework for Protein Structure Representation (E³former)
- **Authors**: Zhongyue Zhang, Runze Ma, Yanjie Huang, Shuangjia Zheng
- **Venue**: Submitted to top-tier venue, 2025
- **arXiv**: [2503.16996](https://arxiv.org/abs/2503.16996)
- **Year**: 2025
- **Relevance**: Proposes an equivariant Transformer-State Space Model (SSM) hybrid framework with energy function-based receptive fields for constructing proximity graphs. Demonstrates enhanced tolerance to noisy predicted structures. **Highly relevant** — addresses the noise in AlphaFold-predicted structures that we will encounter.

---

## F. Graph Transformer Foundations & General GNN Advances

### 17. E(n) Equivariant Graph Neural Networks (EGNN)
- **Authors**: Victor Garcia Satorras, Emiel Hoogeboom, Max Welling
- **Venue**: ICML 2021
- **Year**: 2021
- **Relevance**: Foundational equivariant GNN architecture that respects SE(3) symmetry. The reference implementation for building geometrically-aware graph models. Relevant if we pursue Option B (equivariant transformer).

### 18. A Hybrid Supervised and Self-Supervised Graph Neural Network for Edge-Centric Applications
- **Authors**: Eugenio Borzone, Leandro Di Persia, Matias Gerard
- **Venue**: Submitted to top-tier venue, 2025
- **arXiv**: [2501.12309](https://arxiv.org/abs/2501.12309)
- **Year**: 2025
- **Relevance**: Combines supervised and self-supervised GNN learning with attention over both nodes and edges. Demonstrates strong performance on protein-protein interaction and GO term prediction. **Directly relevant** — shows edge-centric attention for GO term prediction with GNNs.

---

## G. Graph Foundation Models & Recent Advances

### 19. HEIST: A Graph Foundation Model for Spatial Transcriptomics and Proteomics Data
- **Authors**: Hiren Madhu, João Felipe Rocha, Tinglin Huang, Siddharth Viswanath, Smita Krishnaswamy, Rex Ying
- **Venue**: Submitted to top-tier venue, 2025
- **arXiv**: [2506.11152](https://arxiv.org/abs/2506.11152)
- **Year**: 2025
- **Relevance**: Hierarchical graph transformer foundation model that models tissues as hierarchical graphs with cross-level message passing. Demonstrates graph foundation model pretraining. **Relevant** — shows the emerging paradigm of graph foundation models that we could aspire to for proteins.

### 20. EHCube4P: Learning Epistatic Patterns Through Hypercube Graph Convolution Neural Network for Protein Fitness Function Estimation
- **Authors**: Muhammad Daud, Philippe Charton, Cedric Damour, Jingbo Wang, Frederic Cadet
- **Venue**: Submitted 2025
- **arXiv**: [2506.16921](https://arxiv.org/abs/2506.16921)
- **Year**: 2025
- **Relevance**: Models sequence landscape as hypercube graphs and integrates wavelet-based signal denoising with GCN. Demonstrates graph-based deep learning for protein fitness/function prediction on combinatorial sequence spaces. **Relevant** — alternative graph representation for proteins.

---

## H. Additional Recent Papers (2024–2025) of Interest

### 21. ProtGram-DirectGCN: Inferred Global Dense Residue Transition Graphs for Protein Interaction Prediction
- **Authors**: Islam Akef Ebeid, Haoteng Tang, Pengfei Gu
- **Venue**: Frontiers in Bioinformatics (under review), 2025
- **arXiv**: [2510.14139](https://arxiv.org/abs/2510.14139)
- **Year**: 2025
- **Relevance**: Models protein primary structure as hierarchy of globally inferred n-gram graphs with directed graph CNNs for PPI prediction. Novel graph construction approach that could inspire our graph design.

### 22. HyboWaveNet: Hyperbolic Graph Neural Networks with Multi-Scale Wavelet Transform for PPI Prediction
- **Authors**: Qingzhi Yu, Shuai Yan, Wenfeng Dai, Xiang Cheng
- **Venue**: Submitted 2025
- **arXiv**: [2504.20102](https://arxiv.org/abs/2504.20102)
- **Year**: 2025
- **Relevance**: Proposes hyperbolic GNNs + multi-scale wavelet transform for capturing hierarchical biological relationships in PPI prediction. **Relevant** — hyperbolic geometry for capturing hierarchical biological structure.

### 23. LC-PLM: Long-context Protein Language Modeling Using Bidirectional Mamba with Shared Projection Layers
- **Authors**: Yingheng Wang, Zichen Wang, Gil Sadeh, Luca Zancato, Alessandro Achille, George Karypis, Huzefa Rangwala
- **Venue**: Amazon Science, 2024
- **arXiv**: [2411.08909](https://arxiv.org/abs/2411.08909)
- **Year**: 2024
- **Relevance**: Introduces graph-contextual variant (LC-PLM-G) that contextualizes proteins with PPI graphs for function prediction. Shows 30% improvement over ESM-2 with 100B tokens. **Highly relevant** — directly demonstrates graph-contextual protein language modeling for function prediction.

### 24. HGTDR: Advancing Drug Repurposing with Heterogeneous Graph Transformers
- **Authors**: Ali Gharizadeh, Karim Abbasi, Amin Ghareyazi, Mohammad R.K. Mofrad, Hamid R. Rabiee
- **Venue**: Submitted 2024
- **arXiv**: [2405.08031](https://arxiv.org/abs/2405.08031)
- **Year**: 2024
- **Relevance**: Applies heterogeneous graph transformers to biological networks including protein-drug interactions. Demonstrates the effectiveness of heterogeneous graph attention for biomedical applications.

### 25. Geometric Self-Supervised Pretraining on 3D Protein Structures using Subgraphs
- **Authors**: Michail Chatzianastasis, Yang Zhang, George Dasoulas, Michalis Vazirgiannis
- **Venue**: Submitted 2024
- **arXiv**: [2406.14142](https://arxiv.org/abs/2406.14142)
- **Year**: 2024
- **Relevance**: Self-supervised pretraining on 3D protein structures by predicting distances between subgraph centroids and global centroid. Up to 6% improvement on 3D GNN protein classification tasks. **Directly relevant** — provides a strong pretraining baseline.

---

## How to Use This List

### For the Literature Survey (Weeks 1-2)
- **Read first**: Papers #13 (ProteinRPN), #9 (ESM-2), #10 (AlphaFold), #3 (Graphormer) — these are the closest to our work
- **Then**: Papers #14 (STAR-GO), #16 (E³former), #8 (SSRGNet), #6 (OneProt), #5 (TIF)
- **Finally**: Remaining papers for comprehensive coverage

### For the Methodology Section
- Cite #3 (Graphormer) for the Transformer architecture
- Cite #13 (ProteinRPN) for graph construction and function prediction approach
- Cite #9 (ESM-2) for the embedding backbone
- Cite #5 (Geometric Self-Supervised Pretraining) for pretraining strategy
- Cite #16 (E³former) for equivariant approaches and noise handling
- Cite #14 (STAR-GO) for evaluation methodology and zero-shot results

### For the Research Gaps Section
- Gap 1 (sequence reliance): Cite #9, #13, #14
- Gap 2 (geometric reasoning): Cite #16, #3, #5
- Gap 3 (no dedicated graph transformer): Cite #13, #14
- Gap 4 (interpretability): Cite #5 (TIF)
- Gap 5 (benchmark): Cite #15 (PSBench), #14 (STAR-GO)

---

*Last updated: 2026-09-01*
*Generated from arXiv search (2024–2026), IEEE Xplore, and Semantic Scholar*
