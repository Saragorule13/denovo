import React from 'react'
import { Activity, CheckCircle2, ArrowRight } from 'lucide-react'

interface FunctionalDomainAnalyticsProps {
  isSkeleton?: boolean
}

export const FunctionalDomainAnalytics: React.FC<FunctionalDomainAnalyticsProps> = ({
  isSkeleton = false,
}) => {
  const segments = [
    {
      name: 'Allosteric Zinc Finger',
      range: 'Pos 14-48 • C2H2 motif',
      probability: '99.1%',
      strokeColor: '#0d9488',
      path: 'M 0 12 C 15 2, 30 22, 45 12 C 60 2, 70 20, 80 12',
    },
    {
      name: 'Transmembrane Helix Beta',
      range: 'Pos 72-116 • Hydrophobic',
      probability: '96.4%',
      strokeColor: '#0d9488',
      path: 'M 0 15 C 20 8, 35 24, 50 14 C 65 6, 75 18, 80 14',
    },
    {
      name: 'Catalytic Triad (His-Asp-Ser)',
      range: 'Pos 142-180 • Critical Pocket',
      probability: '98.7%',
      strokeColor: '#ea580c',
      isCritical: true,
      path: 'M 0 16 C 18 16, 32 4, 48 18 C 62 14, 72 6, 80 10',
    },
    {
      name: 'N-Glycosylation Motif',
      range: 'Pos 220-234 • Asn-X-Ser/Thr',
      probability: '92.0%',
      strokeColor: '#0d9488',
      path: 'M 0 14 C 15 18, 30 6, 45 16 C 60 10, 70 20, 80 14',
    },
  ]

  if (isSkeleton) {
    return (
      <div className="analytics-card skeleton-active">
        {/* Header Skeleton */}
        <div className="card-header-flex">
          <div className="header-left-title">
            <div className="skeleton-box skeleton-title-icon" />
            <div className="skeleton-line skeleton-w-160" style={{ height: '16px' }} />
          </div>
          <div className="skeleton-line skeleton-w-80" style={{ height: '12px' }} />
        </div>

        {/* Consensus Box Skeleton */}
        <div className="consensus-box skeleton-box-card" style={{ height: '110px' }}>
          <div className="skeleton-line skeleton-w-120" style={{ height: '36px', marginBottom: '8px' }} />
          <div className="skeleton-line skeleton-w-220" style={{ height: '16px', marginBottom: '6px' }} />
          <div className="skeleton-line skeleton-w-180" style={{ height: '12px' }} />
        </div>

        {/* Rows Skeleton */}
        <div className="segments-table">
          <div className="table-header-row">
            <div className="skeleton-line skeleton-w-120" style={{ height: '10px' }} />
            <div className="skeleton-line skeleton-w-100" style={{ height: '10px' }} />
          </div>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="segment-row">
              <div>
                <div className="skeleton-line skeleton-w-140" style={{ height: '14px', marginBottom: '6px' }} />
                <div className="skeleton-line skeleton-w-100" style={{ height: '10px' }} />
              </div>
              <div className="skeleton-pill skeleton-w-80" style={{ height: '24px' }} />
            </div>
          ))}
        </div>

        {/* Footer Skeleton */}
        <div className="analytics-card-footer">
          <div className="skeleton-line skeleton-w-120" style={{ height: '12px' }} />
          <div className="skeleton-line skeleton-w-140" style={{ height: '12px' }} />
        </div>
      </div>
    )
  }

  return (
    <div className="analytics-card">
      {/* Header */}
      <div className="card-header-flex">
        <div className="header-left-title">
          <div className="analytics-icon-badge">
            <Activity size={16} />
          </div>
          <h3 className="card-heading">Functional Domain Analytics</h3>
        </div>
        <span className="version-tag font-mono">GTX-PROB V3.1</span>
      </div>

      {/* Consensus Prediction Banner Card */}
      <div className="consensus-banner-box">
        <div className="consensus-score-row">
          <div className="score-number-group">
            <span className="big-percent-number">98.4</span>
            <span className="percent-sign">%</span>
          </div>
          <span className="consensus-badge font-mono">CONSENSUS HIGH</span>
        </div>

        <div className="prediction-statement">
          <CheckCircle2 size={16} className="statement-check-icon" />
          <strong className="statement-text">Predicted: Peptidase Inhibitor Activity</strong>
        </div>

        <div className="go-term-meta font-mono">
          <span>GO:0030414</span>
          <span className="dot-sep">•</span>
          <span>Serine-type endopeptidase complex</span>
        </div>
      </div>

      {/* Indexed Domain Segment Table */}
      <div className="domain-segments-section">
        <div className="segments-table-header font-mono">
          <span>INDEXED DOMAIN SEGMENT</span>
          <span>PROBABILITY PROFILE</span>
        </div>

        <div className="segments-list">
          {segments.map((seg, idx) => (
            <div key={idx} className="segment-row-item">
              <div className="segment-info-col">
                <div className="segment-name-line">
                  {seg.isCritical && <span className="critical-orange-dot" />}
                  <span className={`segment-title ${seg.isCritical ? 'critical-bold' : ''}`}>
                    {seg.name}
                  </span>
                </div>
                <div className="segment-range-line font-mono">
                  {seg.range.includes('Critical Pocket') ? (
                    <>
                      <span>Pos 142-180</span>
                      <span className="dot-sep">•</span>
                      <span className="critical-pocket-label">Critical Pocket</span>
                    </>
                  ) : (
                    <span>{seg.range}</span>
                  )}
                </div>
              </div>

              <div className="segment-profile-col">
                <div className="sparkline-wrap">
                  <svg viewBox="0 0 80 24" className="sparkline-svg" fill="none">
                    <path
                      d={seg.path}
                      stroke={seg.strokeColor}
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <span className="probability-value font-mono">{seg.probability}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="analytics-card-footer">
        <span className="evaluated-count font-mono">384 RESIDUES EVALUATED</span>
        <button className="matrix-link-btn font-mono">
          <span>View Residue Contact Matrix</span>
          <ArrowRight size={13} />
        </button>
      </div>
    </div>
  )
}
