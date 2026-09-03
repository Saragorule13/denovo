import React from 'react'
import {
  Triangle,
  CheckCircle2,
  Droplets,
  ShieldCheck,
} from 'lucide-react'

interface MetricPillsFooterProps {
  isSkeleton?: boolean
}

export const MetricPillsFooter: React.FC<MetricPillsFooterProps> = ({ isSkeleton = false }) => {
  if (isSkeleton) {
    return (
      <section className="metric-pills-row skeleton-active">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="metric-pill-item skeleton-box" style={{ height: '48px', borderRadius: '24px' }} />
        ))}
      </section>
    )
  }

  return (
    <footer className="metric-pills-row font-mono" aria-label="System Telemetry Quick Stats">
      {/* 1. Mutation Risk */}
      <div className="metric-pill-item">
        <div className="pill-left">
          <span className="dot-indicator dot-orange" />
          <span className="pill-label">Mutation Risk</span>
        </div>
        <span className="pill-badge badge-peach">2 Flags</span>
      </div>

      {/* 2. Fold Instability */}
      <div className="metric-pill-item">
        <div className="pill-left">
          <Triangle size={13} className="pill-icon text-muted" />
          <span className="pill-label">Fold Instability</span>
        </div>
        <span className="pill-value">0.04 ΔΔG</span>
      </div>

      {/* 3. Binding Site */}
      <div className="metric-pill-item">
        <div className="pill-left">
          <span className="dot-indicator dot-green" />
          <span className="pill-label">Binding Site</span>
        </div>
        <span className="pill-badge badge-mint">Affinity High</span>
      </div>

      {/* 4. Domain Conflict */}
      <div className="metric-pill-item">
        <div className="pill-left">
          <CheckCircle2 size={13} className="pill-icon text-emerald" />
          <span className="pill-label">Domain Conflict</span>
        </div>
        <span className="pill-badge badge-resolved">Resolved</span>
      </div>

      {/* 5. Solubility */}
      <div className="metric-pill-item">
        <div className="pill-left">
          <Droplets size={13} className="pill-icon text-muted" />
          <span className="pill-label">Solubility</span>
        </div>
        <span className="pill-value">0.88</span>
      </div>

      {/* 6. Immunogenicity */}
      <div className="metric-pill-item">
        <div className="pill-left">
          <ShieldCheck size={13} className="pill-icon text-muted" />
          <span className="pill-label">Immunogenicity</span>
        </div>
        <span className="pill-badge-text text-green">Low Risk</span>
      </div>
    </footer>
  )
}
