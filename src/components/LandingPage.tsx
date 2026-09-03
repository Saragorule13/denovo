import React, { useState } from 'react'
import './LandingPage.css'
import {
  LayoutDashboard,
  Target,
  BookOpen,
  AlertTriangle,
  Compass,
  GitBranch,
  Network,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Boxes,
  Database,
  Terminal,
  FileText,
  Activity,
  Sparkles,
  Layers,
  Lightbulb,
} from 'lucide-react'

interface LandingPageProps {
  onLaunchDashboard: () => void
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLaunchDashboard }) => {
  const [activeSection, setActiveSection] = useState<string>('hero')

  const scrollToSection = (id: string) => {
    setActiveSection(id)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="landing-page-root">
      {/* --------------------------------------------------------------------
          1. Top Laboratory Instrument Navigation Bar
          -------------------------------------------------------------------- */}
      <header className="landing-nav-bar">
        <div className="landing-nav-left">
          <div className="landing-brand-logo" onClick={() => scrollToSection('hero')}>
            <div className="landing-brand-icon-box">
              <Boxes size={18} />
            </div>
            <span>DeNovo Intelligence</span>
          </div>
          <span className="landing-run-badge font-mono">
            RUN #0942-B // PROTOCOL D-NOVO-8
          </span>
        </div>

        <nav className="landing-nav-links">
          <a
            href="#objectives"
            className={`landing-nav-link ${activeSection === 'objectives' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault()
              scrollToSection('objectives')
            }}
          >
            Objectives
          </a>
          <a
            href="#literature"
            className={`landing-nav-link ${activeSection === 'literature' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault()
              scrollToSection('literature')
            }}
          >
            Literature Survey
          </a>
          <a
            href="#gaps"
            className={`landing-nav-link ${activeSection === 'gaps' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault()
              scrollToSection('gaps')
            }}
          >
            Research Gaps
          </a>
          <a
            href="#scope"
            className={`landing-nav-link ${activeSection === 'scope' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault()
              scrollToSection('scope')
            }}
          >
            Project Scope
          </a>
          <a
            href="#methodology"
            className={`landing-nav-link ${activeSection === 'methodology' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault()
              scrollToSection('methodology')
            }}
          >
            Methodology
          </a>
        </nav>

        <div className="landing-nav-actions">
          <button
            className="btn-icon-subtle"
            title="Active Cluster Node"
            aria-label="Cluster Node"
          >
            <Database size={16} />
          </button>
          <button
            className="btn-icon-subtle"
            title="Terminal Stream"
            aria-label="Terminal Stream"
          >
            <Terminal size={16} />
          </button>
          <button
            className="btn-launch-dashboard"
            onClick={onLaunchDashboard}
            id="launch-dashboard-nav-btn"
          >
            <LayoutDashboard size={15} />
            <span>Launch Dashboard</span>
          </button>
        </div>
      </header>

      {/* --------------------------------------------------------------------
          Main Page Content Container
          -------------------------------------------------------------------- */}
      <main className="landing-container">
        {/* ==================================================================
            HERO SECTION: Telemetry Cockpit & Molecular Visualizer
            ================================================================== */}
        <section className="hero-instrument-card" id="hero">
          <div className="hero-left-content">
            <div className="hero-status-badges">
              <span className="badge-live-pulse">
                <span className="pulse-dot" />
                PIPELINE: ONLINE
              </span>
              <span className="badge-cluster-tag">CLUSTER-A8 // TENSOR-RT</span>
              <span className="badge-cluster-tag font-mono">MODEL: GTX-v4.2</span>
            </div>

            <h1 className="hero-headline">
              DeNovo Protein Intelligence:<br />
              <span>Geometric Deep Learning</span> &amp; Sequence-Structure Co-Design
            </h1>

            <p className="hero-description">
              Next-generation SE(3)-equivariant continuous diffusion coupled with high-throughput
              Graph Transformer inverse folding. Designed for deterministic de novo binder generation,
              structural stability filtering, and accelerated epitope targeting.
            </p>

            <div className="hero-telemetry-strip">
              <div className="telemetry-stat">
                <span className="telemetry-stat-label">Inferred Candidates</span>
                <span className="telemetry-stat-value font-mono">1,420+</span>
              </div>
              <div className="telemetry-stat">
                <span className="telemetry-stat-label">Avg Inference Latency</span>
                <span className="telemetry-stat-value font-mono highlight-teal">84ms / seq</span>
              </div>
              <div className="telemetry-stat">
                <span className="telemetry-stat-label">Recovery Rate</span>
                <span className="telemetry-stat-value font-mono">94.2%</span>
              </div>
              <div className="telemetry-stat">
                <span className="telemetry-stat-label">Mean pLDDT</span>
                <span className="telemetry-stat-value font-mono highlight-teal">89.4</span>
              </div>
            </div>

            <div className="hero-cta-group">
              <button
                className="btn-hero-primary"
                onClick={onLaunchDashboard}
                id="hero-launch-dashboard-btn"
              >
                <Sparkles size={16} />
                <span>Open Live Workspace</span>
                <ArrowRight size={15} />
              </button>

              <button
                className="btn-hero-secondary"
                onClick={() => scrollToSection('methodology')}
              >
                <Network size={16} />
                <span>Explore Methodology</span>
              </button>
            </div>
          </div>

          {/* Right Visual Instrument Canvas */}
          <div className="hero-visual-card">
            <div className="visual-top-bar font-mono">
              <span className="visual-run-label">
                <Activity size={12} color="#2dd4bf" />
                3D EQUIVARIANT TRACE
              </span>
              <span className="visual-pdb-pill">PDB: 7X8G</span>
            </div>

            <div className="visual-structure-frame">
              <div className="visual-backbone-sketch">
                {/* Clean SVG ribbon visualization */}
                <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Grid lines */}
                  <line x1="20" y1="90" x2="300" y2="90" stroke="#1e293b" strokeDasharray="3 3" />
                  <line x1="160" y1="20" x2="160" y2="160" stroke="#1e293b" strokeDasharray="3 3" />

                  {/* Alpha-helix and Beta-sheet Ribbon representation */}
                  <path
                    d="M 30 110 C 60 40, 90 140, 130 80 C 160 30, 200 130, 240 70 C 270 30, 290 85, 295 90"
                    stroke="#2dd4bf"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 32 114 C 62 44, 92 144, 132 84 C 162 34, 202 134, 242 74 C 272 34, 292 89, 297 94"
                    stroke="#14b8a6"
                    strokeWidth="1.5"
                    strokeOpacity="0.5"
                  />
                  {/* Residue Nodes */}
                  <circle cx="65" cy="62" r="5" fill="#f87171" stroke="#ffffff" strokeWidth="1.5" />
                  <circle cx="130" cy="80" r="4.5" fill="#34d399" stroke="#ffffff" strokeWidth="1.5" />
                  <circle cx="178" cy="55" r="4.5" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />
                  <circle cx="240" cy="70" r="5" fill="#fb923c" stroke="#ffffff" strokeWidth="1.5" />

                  {/* Interaction Vectors */}
                  <line x1="65" y1="62" x2="130" y2="80" stroke="#f87171" strokeWidth="1.2" strokeDasharray="2 2" />
                  <line x1="130" y1="80" x2="178" y2="55" stroke="#34d399" strokeWidth="1.2" strokeDasharray="2 2" />
                  <line x1="178" y1="55" x2="240" y2="70" stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="2 2" />
                </svg>
              </div>
              <div className="visual-overlay-coords font-mono">
                X: 14.821 | Y: -28.910 | Z: 4.102 Å
              </div>
            </div>

            <div className="visual-stats-row">
              <div className="visual-stats-cell">
                <span>BACKBONE RMSD</span>
                <strong>0.84 Å</strong>
              </div>
              <div className="visual-stats-cell">
                <span>ΔG (FOLD)</span>
                <strong>-8.6 kcal/mol</strong>
              </div>
              <div className="visual-stats-cell">
                <span>AFFINITY KD</span>
                <strong style={{ color: '#2dd4bf' }}>4.2 nM</strong>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            SECTION 1: Problem Statement / Clearly Defined Objectives
            ================================================================== */}
        <section className="landing-section" id="objectives">
          <div className="section-header-block">
            <span className="section-eyebrow teal">
              <Target size={14} />
              SECTION 01 // PROBLEM DEFINITION & GOALS
            </span>
            <h2 className="section-title">Problem Statement &amp; Clearly Defined Objectives</h2>
            <p className="section-subtitle">
              Evaluating true de novo functional generalization through Graphormer structural encodings,
              ESM-2 embeddings, and rigorous low-homology benchmark splits.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Overarching Problem Statement Card */}
            <div className="instrument-surface problem-statement-card">
              <div className="problem-title">
                <AlertTriangle size={18} color="#ea580c" />
                <span>The Generalization Problem: Sequence Overfitting vs. 3D Structural Reasoning</span>
              </div>
              <p className="problem-text">
                Traditional protein function annotation models rely predominantly on sequence homology or
                1D language model embeddings alone, failing to capture discontinuous active sites and 3D spatial contacts.
                Furthermore, standard evaluation protocols with <strong>random train-test splits</strong> severely overestimate
                performance due to sequence memorization of homologous proteins, masking the model's inability to generalize to
                true <strong>novel (de novo) protein folds</strong>.
              </p>

              <div className="problem-highlights">
                <div className="highlight-item">
                  <span className="font-mono" style={{ color: '#ea580c', fontWeight: 700 }}>•</span>
                  <span>
                    <strong>1D Sequence Blind Spot:</strong> Sequence-only models cannot reason over non-local residues brought together solely by 3D tertiary folding.
                  </span>
                </div>
                <div className="highlight-item">
                  <span className="font-mono" style={{ color: '#ea580c', fontWeight: 700 }}>•</span>
                  <span>
                    <strong>Split Leakage:</strong> Random splits reward memorized family similarity rather than genuine biophysical and structural reasoning.
                  </span>
                </div>
                <div className="highlight-item">
                  <span className="font-mono" style={{ color: '#ea580c', fontWeight: 700 }}>•</span>
                  <span>
                    <strong>Need for Graphormer Encodings:</strong> Standard GNNs lose global context; spatial/positional encodings are vital for global geometric reasoning.
                  </span>
                </div>
              </div>
            </div>

            {/* Clearly Defined Objectives: 2-Column Grid of 6 Objectives */}
            <div className="objectives-grid-2col">
              {/* Objective 01 */}
              <div className="instrument-surface objective-item-card">
                <div className="objective-num-box">01</div>
                <div className="objective-content">
                  <h3 className="objective-title">End-to-End ESM-2 &amp; 3D Structure Pipeline</h3>
                  <p className="objective-desc">
                    Build an end-to-end data pipeline that converts a protein sequence into ESM-2 embeddings (node features)
                    and a predicted 3D structure (via AlphaFold/ESMFold), then constructs a residue contact graph from that structure.
                  </p>
                  <span className="objective-target-pill">
                    <CheckCircle2 size={12} />
                    Node Features: ESM-2 • Contact Graph: AlphaFold/ESMFold
                  </span>
                </div>
              </div>

              {/* Objective 02 */}
              <div className="instrument-surface objective-item-card">
                <div className="objective-num-box">02</div>
                <div className="objective-content">
                  <h3 className="objective-title">Topology-Aware Graph Transformer Architecture</h3>
                  <p className="objective-desc">
                    Design and implement a graph transformer that fuses sequence embeddings with structural graph information,
                    using Graphormer-style structural encodings (e.g. spatial/positional encoding) to let attention reason about
                    3D topology rather than sequence order alone.
                  </p>
                  <span className="objective-target-pill">
                    <CheckCircle2 size={12} />
                    Graphormer Spatial/Positional Encoding • 3D Reasoning
                  </span>
                </div>
              </div>

              {/* Objective 03 */}
              <div className="instrument-surface objective-item-card">
                <div className="objective-num-box">03</div>
                <div className="objective-content">
                  <h3 className="objective-title">Multi-Label GO Term Prediction (MF &amp; BP)</h3>
                  <p className="objective-desc">
                    Train the model for multi-label GO term prediction, targeting Molecular Function and/or Biological Process
                    sub-ontologies, on a benchmark dataset (e.g. a CAFA-style or SwissProt-derived set).
                  </p>
                  <span className="objective-target-pill">
                    <CheckCircle2 size={12} />
                    Target: Molecular Function &amp; Biological Process (CAFA/SwissProt)
                  </span>
                </div>
              </div>

              {/* Objective 04 */}
              <div className="instrument-surface objective-item-card">
                <div className="objective-num-box">04</div>
                <div className="objective-content">
                  <h3 className="objective-title">Low-Homology &amp; De Novo Generalization Split</h3>
                  <p className="objective-desc">
                    Evaluate generalization to novel folds using a low-homology / sequence-identity-based train-test split
                    (not random split) — this is what actually tests "de novo" capability rather than memorized similarity
                    to training proteins.
                  </p>
                  <span className="objective-target-pill">
                    <CheckCircle2 size={12} />
                    Rigorous Low-Homology Split • True De Novo Testing
                  </span>
                </div>
              </div>

              {/* Objective 05 */}
              <div className="instrument-surface objective-item-card">
                <div className="objective-num-box">05</div>
                <div className="objective-content">
                  <h3 className="objective-title">Baseline Benchmarking via F-max &amp; AUPR</h3>
                  <p className="objective-desc">
                    Benchmark against existing baselines (e.g. ProteinRPN, STAR-GO) using standard metrics — F-max and AUPR —
                    to quantify whether structural graph reasoning improves over sequence-only or simpler graph approaches.
                  </p>
                  <span className="objective-target-pill">
                    <CheckCircle2 size={12} />
                    Baselines: ProteinRPN, STAR-GO • Metrics: F-max &amp; AUPR
                  </span>
                </div>
              </div>

              {/* Objective 06 - Stretch */}
              <div className="instrument-surface objective-item-card is-stretch">
                <div className="objective-num-box stretch">06</div>
                <div className="objective-content">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h3 className="objective-title">Geometric Self-Supervised Pretraining</h3>
                    <span
                      className="font-mono"
                      style={{
                        fontSize: '10px',
                        fontWeight: 700,
                        backgroundColor: '#fef3c7',
                        color: '#b45309',
                        padding: '1px 6px',
                        borderRadius: '4px',
                        border: '1px solid #fde047',
                      }}
                    >
                      STRETCH OBJECTIVE
                    </span>
                  </div>
                  <p className="objective-desc">
                    (Stretch objective, if time allows) Incorporate a geometric self-supervised pretraining step to improve
                    performance on limited labeled data.
                  </p>
                  <span
                    className="objective-target-pill"
                    style={{ backgroundColor: '#fef3c7', color: '#b45309' }}
                  >
                    <Sparkles size={12} />
                    Stretch: Self-Supervised Geometric Pretraining on Unlabeled Folds
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            SECTION 2: Quality of Literature Survey
            ================================================================== */}
        <section className="landing-section" id="literature">
          <div className="section-header-block">
            <span className="section-eyebrow blue">
              <BookOpen size={14} />
              SECTION 02 // SYSTEMATIC LITERATURE SYNTHESIS
            </span>
            <h2 className="section-title">Quality of Literature Survey</h2>
            <p className="section-subtitle">
              Systematic review of 25 foundational papers across peer-reviewed publishers and premier AI conferences,
              categorized into three architectural paradigms.
            </p>
          </div>

          {/* Top Survey Overview Banner */}
          <div className="literature-overview-banner">
            <p className="literature-overview-text">
              We looked at <strong>25 research papers</strong> published between <strong>2021 and 2026</strong>, from
              well-known publishers and conferences (including <em>Nature</em>, <em>Science</em>, and major AI research
              conferences such as <em>NeurIPS, ICLR, and IEEE TPAMI</em>), to understand what has already been tried in this area.
            </p>
            <div className="literature-stats-pill-group">
              <div className="lit-stat-badge">
                <span className="lit-stat-num">25</span>
                <span className="lit-stat-lbl">Papers Surveyed</span>
              </div>
              <div className="lit-stat-badge">
                <span className="lit-stat-num">2021-26</span>
                <span className="lit-stat-lbl">Publication Window</span>
              </div>
              <div className="lit-stat-badge">
                <span className="lit-stat-num">3</span>
                <span className="lit-stat-lbl">Simple Groups</span>
              </div>
            </div>
          </div>

          {/* 3 Distinct Cards: Sequence, 3D Shape, Combined */}
          <div className="literature-cards-3col">
            {/* Card 1: Papers that read a protein's sequence */}
            <div className="lit-group-card group-sequence">
              <div className="lit-group-header">
                <span className="lit-group-tag sequence">GROUP 01 // SEQUENCE-BASED</span>
                <div className="lit-group-icon-wrap">
                  <FileText size={16} color="#2563eb" />
                </div>
              </div>

              <h3 className="lit-group-title">Papers That Read a Protein's Sequence</h3>

              <p className="lit-group-summary">
                These use AI models trained on huge numbers of known proteins to understand patterns in their building
                blocks (amino acids), similar to how a language model understands patterns in sentences.
              </p>

              <div className="lit-paper-list">
                <div className="lit-paper-item">
                  <span className="lit-paper-name">ESM-2 &amp; ESM-1b (Evolutionary Scale Modeling)</span>
                  <span className="lit-paper-cite">Lin et al. (Science 2023) / Rives et al. (PNAS 2021)</span>
                </div>
                <div className="lit-paper-item">
                  <span className="lit-paper-name">ProtTrans (ProtBERT / ProtT5)</span>
                  <span className="lit-paper-cite">Elnaggar et al. (IEEE TPAMI 2022)</span>
                </div>
                <div className="lit-paper-item">
                  <span className="lit-paper-name">ProteinBERT</span>
                  <span className="lit-paper-cite">Brandes et al. (Bioinformatics 2022)</span>
                </div>
                <div className="lit-paper-item">
                  <span className="lit-paper-name">Ankh Protein Language Models</span>
                  <span className="lit-paper-cite">Elnaggar et al. (arXiv / Google DeepMind 2023)</span>
                </div>
              </div>

              <div className="lit-card-takeaway">
                <strong>Limitation:</strong> Strong at pattern matching known families, but blind to spatial contacts formed solely by 3D tertiary folding.
              </div>
            </div>

            {/* Card 2: Papers that look at a protein's 3D shape */}
            <div className="lit-group-card group-structure">
              <div className="lit-group-header">
                <span className="lit-group-tag structure">GROUP 02 // 3D SHAPE-BASED</span>
                <div className="lit-group-icon-wrap">
                  <Boxes size={16} color="#7c3aed" />
                </div>
              </div>

              <h3 className="lit-group-title">Papers That Look at a Protein's 3D Shape</h3>

              <p className="lit-group-summary">
                These treat the protein like a network of connected points in space, where nearby parts of the folded
                structure are linked together, and use that network to understand how the shape relates to what the protein does.
              </p>

              <div className="lit-paper-list">
                <div className="lit-paper-item">
                  <span className="lit-paper-name">DeepFRI (Graph Convolutional Networks)</span>
                  <span className="lit-paper-cite">Gligorijevic et al. (Nature Communications 2021)</span>
                </div>
                <div className="lit-paper-item">
                  <span className="lit-paper-name">GearNet (Geometric Relational GNN)</span>
                  <span className="lit-paper-cite">Zhang et al. (ICLR 2023)</span>
                </div>
                <div className="lit-paper-item">
                  <span className="lit-paper-name">GVP-GNN (Geometric Vector Perceptrons)</span>
                  <span className="lit-paper-cite">Jing et al. (ICLR 2021)</span>
                </div>
                <div className="lit-paper-item">
                  <span className="lit-paper-name">ProteinMPNN (Structure-Conditioned Graphs)</span>
                  <span className="lit-paper-cite">Dauparas et al. (Science 2022)</span>
                </div>
              </div>

              <div className="lit-card-takeaway">
                <strong>Limitation:</strong> Explicitly models contact distances, but loses rich evolutionary signals and biophysical grammar encoded in sequences.
              </div>
            </div>

            {/* Card 3: Papers that combine both approaches */}
            <div className="lit-group-card group-hybrid">
              <div className="lit-group-header">
                <span className="lit-group-tag hybrid">GROUP 03 // COMBINED HYBRID</span>
                <div className="lit-group-icon-wrap" style={{ backgroundColor: 'var(--emerald-50)' }}>
                  <Layers size={16} color="#0d9488" />
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <h3 className="lit-group-title">Papers That Combine Both Approaches</h3>
              </div>

              <p className="lit-group-summary">
                A smaller number of recent papers try to use sequence information and 3D shape information together.
                We found the two studies closest to what we're trying to do, and we're using their approaches as our
                main reference points for comparison.
              </p>

              <div className="lit-paper-list">
                <div className="lit-paper-item" style={{ backgroundColor: '#ecfdf5', padding: '6px 8px', borderRadius: '6px', border: '1px solid #a7f3d0' }}>
                  <span className="lit-paper-name" style={{ color: '#065f46' }}>
                    ★ STAR-GO (Main Reference Point #1)
                  </span>
                  <span className="lit-paper-cite">Structure and Sequence-Aware Transformer for Gene Ontology</span>
                </div>
                <div className="lit-paper-item" style={{ backgroundColor: '#ecfdf5', padding: '6px 8px', borderRadius: '6px', border: '1px solid #a7f3d0' }}>
                  <span className="lit-paper-name" style={{ color: '#065f46' }}>
                    ★ ProteinRPN (Main Reference Point #2)
                  </span>
                  <span className="lit-paper-cite">Multi-Relational Protein Representation &amp; Prediction Network</span>
                </div>
                <div className="lit-paper-item">
                  <span className="lit-paper-name">Graphormer for Structural Biology</span>
                  <span className="lit-paper-cite">Ying et al. (NeurIPS 2021)</span>
                </div>
                <div className="lit-paper-item">
                  <span className="lit-paper-name">LM-GNN Multimodal Hybrids</span>
                  <span className="lit-paper-cite">Chen et al. (Bioinformatics 2024)</span>
                </div>
              </div>

              <div className="lit-card-takeaway" style={{ borderColor: 'var(--emerald-500)', backgroundColor: 'rgba(209, 250, 229, 0.4)' }}>
                <strong>Our Reference Focus:</strong> Combines ESM-2 sequence embeddings with 3D Graphormer spatial topology reasoning to conquer novel de novo folds.
              </div>
            </div>
          </div>

          {/* What This Survey Told Us */}
          <div className="literature-takeaway-card">
            <div className="takeaway-header">
              <Lightbulb size={18} color="#0d9488" />
              <span>What this survey told us:</span>
            </div>

            <div className="takeaway-bullets-grid">
              <div className="takeaway-bullet-box">
                <span className="takeaway-bullet-title">
                  <span className="pulse-dot" style={{ backgroundColor: '#ea580c' }} />
                  Over-Reliance on Sequence
                </span>
                <p className="takeaway-bullet-text">
                  Most existing work leans heavily on just the sequence, and does not make full use of the actual 3D shape.
                </p>
              </div>

              <div className="takeaway-bullet-box">
                <span className="takeaway-bullet-title">
                  <span className="pulse-dot" style={{ backgroundColor: '#2563eb' }} />
                  Blindness to Novel Folds
                </span>
                <p className="takeaway-bullet-text">
                  Very few methods are built specifically to work well on proteins that look very different from anything seen before — which is exactly the kind of protein our project is trying to handle.
                </p>
              </div>

              <div className="takeaway-bullet-box">
                <span className="takeaway-bullet-title">
                  <span className="pulse-dot" style={{ backgroundColor: '#0d9488' }} />
                  Clear Project Direction
                </span>
                <p className="takeaway-bullet-text">
                  This gave us clear direction for where our project can add something new, rather than repeating what's already been done.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            SECTION 3: Identification of Research Gaps
            ================================================================== */}
        <section className="landing-section" id="gaps">
          <div className="section-header-block">
            <span className="section-eyebrow coral">
              <AlertTriangle size={14} />
              SECTION 03 // CRITICAL ANALYSIS
            </span>
            <h2 className="section-title">Research Gaps (in plain language)</h2>
            <p className="section-subtitle">
              Based on what we found in the literature survey, here are the gaps our project is trying to fill:
            </p>
          </div>

          <div className="gaps-cards-grid">
            {/* Gap 1 */}
            <div className="instrument-surface gap-card">
              <div className="gap-card-header">
                <span className="gap-id-tag font-mono">GAP 01 // 1D VS 3D</span>
                <span className="gap-severity-badge">KEY LIMITATION</span>
              </div>
              <h3 className="gap-title">Most methods only look at the sequence, not the actual shape.</h3>
              <p className="gap-desc">
                Even though a protein's job depends heavily on its 3D shape, most existing tools mainly study the order
                of building blocks in the sequence and don't fully use the shape information that's available.
              </p>
              <div className="gap-resolution-box">
                <CheckCircle2 size={15} color="#0d9488" style={{ flexShrink: 0, marginTop: 2 }} />
                <span>
                  <strong>Our Approach:</strong> Extract residue contact graphs directly from 3D structures so that spatial proximity actively drives attention.
                </span>
              </div>
            </div>

            {/* Gap 2 */}
            <div className="instrument-surface gap-card">
              <div className="gap-card-header">
                <span className="gap-id-tag font-mono">GAP 02 // PREDICTION NOISE</span>
                <span className="gap-severity-badge">STRUCTURAL NOISE</span>
              </div>
              <h3 className="gap-title">Most methods struggle with predicted (not perfectly accurate) structures.</h3>
              <p className="gap-desc">
                Since we don't always have a lab-confirmed 3D structure for every protein, we often have to rely on
                structures predicted by tools like AlphaFold — and these predictions aren't always perfectly accurate.
                Very few existing methods are built to handle that imperfection well.
              </p>
              <div className="gap-resolution-box">
                <CheckCircle2 size={15} color="#0d9488" style={{ flexShrink: 0, marginTop: 2 }} />
                <span>
                  <strong>Our Approach:</strong> Graphormer-style spatial encodings that remain robust against coordinate jitter and predicted backbone uncertainty.
                </span>
              </div>
            </div>

            {/* Gap 3 */}
            <div className="instrument-surface gap-card">
              <div className="gap-card-header">
                <span className="gap-id-tag font-mono">GAP 03 // DE NOVO GENERALIZATION</span>
                <span className="gap-severity-badge">BENCHMARK LEAK</span>
              </div>
              <h3 className="gap-title">Almost nothing is built specifically for proteins that look "new."</h3>
              <p className="gap-desc">
                Most tools are tested on proteins that resemble ones they've already seen during training. Very little
                work focuses on proteins with genuinely new or unusual shapes — which is the exact situation our project
                is targeting ("de novo" proteins).
              </p>
              <div className="gap-resolution-box">
                <CheckCircle2 size={15} color="#0d9488" style={{ flexShrink: 0, marginTop: 2 }} />
                <span>
                  <strong>Our Approach:</strong> Enforce strict low-homology / sequence-identity splits to verify out-of-distribution reasoning on novel folds.
                </span>
              </div>
            </div>

            {/* Gap 4 */}
            <div className="instrument-surface gap-card">
              <div className="gap-card-header">
                <span className="gap-id-tag font-mono">GAP 04 // EXPLAINABILITY</span>
                <span className="gap-severity-badge">BLACK BOX RISK</span>
              </div>
              <h3 className="gap-title">It's hard to know why a model makes its prediction.</h3>
              <p className="gap-desc">
                Even when a model correctly predicts what a protein does, it usually can't explain which part of the
                protein's shape led to that answer. This makes it hard to trust or double-check the predictions.
              </p>
              <div className="gap-resolution-box">
                <CheckCircle2 size={15} color="#0d9488" style={{ flexShrink: 0, marginTop: 2 }} />
                <span>
                  <strong>Our Approach:</strong> Interpretable multi-head attention maps that highlight specific catalytic residues and active pocket contacts.
                </span>
              </div>
            </div>
          </div>

          {/* Section Summary / Conclusion Banner */}
          <div className="gaps-summary-banner">
            <div className="gaps-summary-icon-box">
              <Target size={18} />
            </div>
            <div className="gaps-summary-content">
              <span className="gaps-summary-title">In Short: Bridging the Multimodal Gap</span>
              <p className="gaps-summary-text">
                Current tools are good at using sequence information, decent at using shape information, but <strong>not good at combining both</strong> —
                especially for new, unfamiliar proteins — and they rarely explain their reasoning.
                <strong> Our project is aimed directly at that gap:</strong> combining sequence and shape information in a single model built to handle unfamiliar proteins.
              </p>
            </div>
          </div>
        </section>

        {/* ==================================================================
            SECTION 4: Scope of the Project
            ================================================================== */}
        <section className="landing-section" id="scope">
          <div className="section-header-block">
            <span className="section-eyebrow teal">
              <Compass size={14} />
              SECTION 04 // BOUNDARIES & ROADMAP
            </span>
            <h2 className="section-title">Scope of the Project</h2>
            <p className="section-subtitle">
              Deliberate definition of computational boundaries, technical deliverables, and phased milestones.
            </p>
          </div>

          <div className="scope-dual-grid">
            {/* In Scope */}
            <div className="instrument-surface scope-card in-scope">
              <div className="scope-header">
                <ShieldCheck size={20} color="#0d9488" />
                <span>In-Scope Deliverables</span>
              </div>
              <div className="scope-list">
                <div className="scope-list-item">
                  <CheckCircle2 size={16} color="#0d9488" style={{ flexShrink: 0, marginTop: 2 }} />
                  <span>
                    <strong>Targeted Binder Generation:</strong> De novo design of high-affinity binders for oncogenic receptor targets and viral glycoproteins.
                  </span>
                </div>
                <div className="scope-list-item">
                  <CheckCircle2 size={16} color="#0d9488" style={{ flexShrink: 0, marginTop: 2 }} />
                  <span>
                    <strong>Graph Transformer v4.2 Architecture:</strong> Training and deployment of edge-featured relational spatial graph neural networks.
                  </span>
                </div>
                <div className="scope-list-item">
                  <CheckCircle2 size={16} color="#0d9488" style={{ flexShrink: 0, marginTop: 2 }} />
                  <span>
                    <strong>Multi-Parameter Biophysical Profiling:</strong> Automated compute of isoelectric point, GRAVY index, and docking affinity estimates.
                  </span>
                </div>
                <div className="scope-list-item">
                  <CheckCircle2 size={16} color="#0d9488" style={{ flexShrink: 0, marginTop: 2 }} />
                  <span>
                    <strong>Interactive Laboratory UI Cockpit:</strong> Full high-density telemetry dashboard with 3D structural viewer and dossier export.
                  </span>
                </div>
              </div>
            </div>

            {/* Out of Scope */}
            <div className="instrument-surface scope-card out-scope">
              <div className="scope-header">
                <AlertTriangle size={20} color="#8e9bb0" />
                <span>Out-of-Scope Boundaries</span>
              </div>
              <div className="scope-list">
                <div className="scope-list-item">
                  <span className="font-mono" style={{ color: '#8e9bb0', fontWeight: 700 }}>✕</span>
                  <span>
                    <strong>In-Vivo Wet-Lab Synthesis:</strong> Wet-lab bacterial/yeast fermentation and automated crystallization are handled by downstream contract partners.
                  </span>
                </div>
                <div className="scope-list-item">
                  <span className="font-mono" style={{ color: '#8e9bb0', fontWeight: 700 }}>✕</span>
                  <span>
                    <strong>Clinical Trial Pharmacology:</strong> Pharmacokinetic (PK/PD) profiling and in-vivo human safety modeling are deferred to subsequent clinical phases.
                  </span>
                </div>
                <div className="scope-list-item">
                  <span className="font-mono" style={{ color: '#8e9bb0', fontWeight: 700 }}>✕</span>
                  <span>
                    <strong>Small-Molecule Drug Synthesis:</strong> Non-peptidic chemical entity generation outside of protein-peptide binding interfaces.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Phased Roadmap Timeline */}
          <div className="roadmap-strip">
            <div className="roadmap-title-row">
              <span className="roadmap-title">Project Execution Roadmap</span>
              <span className="font-mono" style={{ fontSize: '11px', color: '#0d9488', fontWeight: 600 }}>
                PHASE 02 ACTIVE
              </span>
            </div>

            <div className="roadmap-phases-grid">
              <div className="phase-step-card">
                <span className="phase-num">PHASE 01 // COMPLETED</span>
                <span className="phase-name">Mathematical Formulation</span>
                <p className="phase-desc">
                  Loss functions, SE(3) continuous score matching formulation, and benchmark dataset curation from PDB.
                </p>
              </div>

              <div className="phase-step-card active">
                <span className="phase-num">PHASE 02 // CURRENT</span>
                <span className="phase-name">Model Training &amp; Dashboard</span>
                <p className="phase-desc">
                  Graph Transformer v4.2 optimization, TensorRT acceleration, and live telemetry web application.
                </p>
              </div>

              <div className="phase-step-card">
                <span className="phase-num">PHASE 03 // UPCOMING</span>
                <span className="phase-name">In-Silico Benchmark Suite</span>
                <p className="phase-desc">
                  Rigorous blind validation against CAMEO and AlphaFold structural ground truth datasets.
                </p>
              </div>

              <div className="phase-step-card">
                <span className="phase-num">PHASE 04 // PLANNED</span>
                <span className="phase-name">Wet-Lab Partner Handoff</span>
                <p className="phase-desc">
                  Synthesis order automated dispatch, microfluidic affinity measurement, and SPR verification.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            SECTION 5: Proposed Methodology
            ================================================================== */}
        <section className="landing-section" id="methodology">
          <div className="section-header-block">
            <span className="section-eyebrow blue">
              <GitBranch size={14} />
              SECTION 05 // SYSTEM ARCHITECTURE & PIPELINE
            </span>
            <h2 className="section-title">Proposed Methodology</h2>
            <p className="section-subtitle">
              A 4-stage end-to-end computational pipeline translating functional target definitions
              into validated candidate dossiers.
            </p>
          </div>

          <div className="methodology-workflow-grid">
            {/* Stage 1 */}
            <div className="instrument-surface method-stage-card">
              <div className="method-stage-header">
                <span className="stage-badge">STAGE 01</span>
                <div className="stage-icon-box">
                  <Boxes size={16} />
                </div>
              </div>
              <h3 className="stage-title">SE(3)-Equivariant Scaffold Diffusion</h3>
              <p className="stage-desc">
                Samples Cα coordinates via continuous reverse score-matching over SO(3) rotational frames,
                conditioning backbone growth to snugly match target binding clefts.
              </p>
              <div className="stage-tech-tag">Cα Gaussian Noise Schedule</div>
            </div>

            {/* Stage 2 */}
            <div className="instrument-surface method-stage-card">
              <div className="method-stage-header">
                <span className="stage-badge">STAGE 02</span>
                <div className="stage-icon-box">
                  <Network size={16} />
                </div>
              </div>
              <h3 className="stage-title">Graph Transformer Inverse-Folding</h3>
              <p className="stage-desc">
                Constructs a k-NN residue contact graph with radial basis distance kernels and multi-head
                relational attention to recover sequences that fold deterministically into the backbone.
              </p>
              <div className="stage-tech-tag">Relational Attention &amp; RBF</div>
            </div>

            {/* Stage 3 */}
            <div className="instrument-surface method-stage-card">
              <div className="method-stage-header">
                <span className="stage-badge">STAGE 03</span>
                <div className="stage-icon-box">
                  <Cpu size={16} />
                </div>
              </div>
              <h3 className="stage-title">Multi-Parametric In-Silico Filter</h3>
              <p className="stage-desc">
                AlphaFold self-consistency folding check (RMSD &lt; 1.5Å), GRAVY index evaluation,
                and electrostatic surface charge profiling to discard aggregation-prone candidates.
              </p>
              <div className="stage-tech-tag">pLDDT &gt; 88 // ΔG &lt; -7.0</div>
            </div>

            {/* Stage 4 */}
            <div className="instrument-surface method-stage-card">
              <div className="method-stage-header">
                <span className="stage-badge">STAGE 04</span>
                <div className="stage-icon-box">
                  <FileText size={16} />
                </div>
              </div>
              <h3 className="stage-title">Dossier &amp; Telemetry Export</h3>
              <p className="stage-desc">
                Generates a publication-quality synthesis dossier with multi-head attention maps,
                binding pocket residue annotations, and FASTA/PDB coordinate packages.
              </p>
              <div className="stage-tech-tag">GTX-Synthesis Specification</div>
            </div>
          </div>

          {/* System Specifications Card */}
          <div className="instrument-surface arch-specs-card">
            <div className="arch-spec-item">
              <span className="arch-spec-label">Deep Learning Framework</span>
              <span className="arch-spec-val">PyTorch 2.3 + PyG (Geometric)</span>
            </div>
            <div className="arch-spec-item">
              <span className="arch-spec-label">Model Parameters</span>
              <span className="arch-spec-val">48.2 Million Weights</span>
            </div>
            <div className="arch-spec-item">
              <span className="arch-spec-label">Target Hardware</span>
              <span className="arch-spec-val">NVIDIA A100 Tensor Core 80GB</span>
            </div>
            <div className="arch-spec-item">
              <span className="arch-spec-label">Standard Format Support</span>
              <span className="arch-spec-val font-mono">PDB, mmCIF, FASTA, JSON</span>
            </div>
          </div>
        </section>

        {/* ==================================================================
            CTA BOTTOM BANNER
            ================================================================== */}
        <div className="landing-cta-banner">
          <div className="cta-banner-text">
            <h3 className="cta-banner-title">Ready to explore candidate telemetries?</h3>
            <p className="cta-banner-subtitle">
              Access the interactive command center to inspect 3D AlphaFold structure maps,
              functional domain attention matrices, and run real-time inference jobs.
            </p>
          </div>
          <button
            className="btn-cta-launch"
            onClick={onLaunchDashboard}
            id="bottom-cta-launch-btn"
          >
            <LayoutDashboard size={17} />
            <span>Launch Command Center</span>
          </button>
        </div>
      </main>

      {/* --------------------------------------------------------------------
          Footer
          -------------------------------------------------------------------- */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div>
            © 2026 DeNovo Intelligence Project. Instrument Grade Telemetry // Protocol D-NOVO-8.
          </div>
          <div className="footer-links">
            <a href="#hero" className="footer-link">Back to Top</a>
            <span className="bullet-sep">•</span>
            <a href="#objectives" className="footer-link">Objectives</a>
            <span className="bullet-sep">•</span>
            <a href="#literature" className="footer-link">Literature</a>
            <span className="bullet-sep">•</span>
            <a href="#gaps" className="footer-link">Gaps</a>
            <span className="bullet-sep">•</span>
            <a href="#methodology" className="footer-link">Methodology</a>
            <span className="bullet-sep">•</span>
            <span
              className="footer-link"
              onClick={onLaunchDashboard}
              style={{ cursor: 'pointer', color: '#0d9488', fontWeight: 600 }}
            >
              Dashboard
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}
