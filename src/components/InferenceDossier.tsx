import React from 'react'
import {
  FileText,
  ChevronLeft,
  ChevronRight,
  Download,
  Flame,
} from 'lucide-react'

interface InferenceDossierProps {
  isSkeleton?: boolean
}

export const InferenceDossier: React.FC<InferenceDossierProps> = ({ isSkeleton = false }) => {
  // Attention map heat blocks (2 rows x 10 cells)
  const attentionGridRow1 = [
    '#cbd5e1', '#a7f3d0', '#5eead4', '#0d9488', '#fed7aa', '#fb923c', '#94a3b8', '#0f766e', '#5eead4', '#cbd5e1'
  ]
  const attentionGridRow2 = [
    '#94a3b8', '#fed7aa', '#ea580c', '#334155', '#a7f3d0', '#14b8a6', '#0f766e', '#fed7aa', '#0f766e', '#115e59'
  ]

  if (isSkeleton) {
    return (
      <div className="dossier-card skeleton-active">
        {/* Header Skeleton */}
        <div className="card-header-flex">
          <div className="header-left-title">
            <div className="skeleton-box skeleton-title-icon" />
            <div className="skeleton-line skeleton-w-140" style={{ height: '16px' }} />
          </div>
          <div className="skeleton-pill skeleton-w-120" style={{ height: '26px' }} />
        </div>

        {/* Dossier Inner Sheet Skeleton */}
        <div className="dossier-sheet skeleton-box-card" style={{ height: '310px' }}>
          <div className="sheet-top-row">
            <div className="skeleton-line skeleton-w-120" style={{ height: '10px' }} />
            <div className="skeleton-pill skeleton-w-70" style={{ height: '18px' }} />
          </div>
          <div className="skeleton-line skeleton-w-220" style={{ height: '18px', margin: '10px 0 16px 0' }} />

          {/* 4 Metric cards skeleton */}
          <div className="biophysical-grid">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="skeleton-box" style={{ height: '56px', borderRadius: '8px' }} />
            ))}
          </div>

          <div className="skeleton-line skeleton-w-full" style={{ height: '24px', margin: '18px 0 12px 0' }} />
          <div className="skeleton-line skeleton-w-full" style={{ height: '36px' }} />
        </div>

        {/* Action Buttons Skeleton */}
        <div className="dossier-actions-row">
          <div className="skeleton-btn-pill" style={{ flex: 1, height: '38px' }} />
          <div className="skeleton-btn-pill" style={{ flex: 1, height: '38px' }} />
        </div>

        {/* Footer Skeleton */}
        <div className="dossier-card-footer">
          <div className="skeleton-line skeleton-w-120" style={{ height: '11px' }} />
          <div className="skeleton-line skeleton-w-160" style={{ height: '11px' }} />
        </div>
      </div>
    )
  }

  return (
    <div className="dossier-card">
      {/* Header */}
      <div className="card-header-flex">
        <div className="header-left-title">
          <div className="dossier-icon-badge">
            <FileText size={16} />
          </div>
          <h3 className="card-heading">Inference Dossier</h3>
        </div>

        <div className="dossier-pagination font-mono">
          <button className="page-nav-btn" aria-label="Previous Page">
            <ChevronLeft size={13} />
          </button>
          <span className="page-indicator">Page 03 / 14</span>
          <button className="page-nav-btn" aria-label="Next Page">
            <ChevronRight size={13} />
          </button>
        </div>
      </div>

      {/* Inner Dossier Specification Sheet */}
      <div className="dossier-sheet">
        <div className="sheet-top-row">
          <span className="synthesis-report-tag font-mono">GTX-SYNTHESIS REPORT</span>
          <span className="restricted-badge font-mono">RESTRICTED</span>
        </div>

        <h4 className="sheet-title">Biophysical Specification #0942-B</h4>

        {/* 4 Metric Cards */}
        <div className="biophysical-grid font-mono">
          <div className="metric-cell">
            <span className="metric-lbl">PI (ISO)</span>
            <strong className="metric-val">6.82</strong>
          </div>
          <div className="metric-cell">
            <span className="metric-lbl">GRAVY</span>
            <strong className="metric-val">-0.34</strong>
          </div>
          <div className="metric-cell highlight-kd">
            <span className="metric-lbl">KD (AFF)</span>
            <strong className="metric-val highlight-val">4.2 nM</strong>
          </div>
          <div className="metric-cell">
            <span className="metric-lbl">ΔG (FOLD)</span>
            <strong className="metric-val">-8.6</strong>
          </div>
        </div>

        {/* Multi-Head Attention Map */}
        <div className="attention-section">
          <div className="attention-header font-mono">
            <span>Multi-Head Attention Map</span>
            <span>128-Head Cross-Layer</span>
          </div>

          <div className="attention-heatmap-grid">
            <div className="attention-row">
              {attentionGridRow1.map((bg, idx) => (
                <div
                  key={`r1-${idx}`}
                  className="heatmap-cell"
                  style={{ backgroundColor: bg }}
                  title={`Attention Head #${idx + 1}`}
                />
              ))}
            </div>
            <div className="attention-row">
              {attentionGridRow2.map((bg, idx) => (
                <div
                  key={`r2-${idx}`}
                  className="heatmap-cell"
                  style={{ backgroundColor: bg }}
                  title={`Attention Head #${idx + 11}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Narrative Insight Quote */}
        <p className="dossier-quote-text">
          &ldquo;Candidate sequence d-GLP1-8849 demonstrates elevated structural rigidity at
          residues 140-168, yielding potent electrostatic complementarity for target proteases.&rdquo;
        </p>
      </div>

      {/* Action Buttons Row */}
      <div className="dossier-actions-row">
        <button className="export-pdf-btn">
          <Download size={14} />
          <span>Export PDF</span>
        </button>

        <button className="run-assay-btn">
          <Flame size={14} className="assay-icon" />
          <span>Run Assay</span>
        </button>
      </div>

      {/* Dossier Footer */}
      <div className="dossier-card-footer font-mono">
        <div className="fidelity-metric">
          <span className="dim-label">Index Fidelity: </span>
          <strong className="fidelity-val">99.2%</strong>
        </div>
        <div className="generation-timestamp">
          <span>Generated: 12 min ago • DeNovo AlphaPipe</span>
        </div>
      </div>
    </div>
  )
}
