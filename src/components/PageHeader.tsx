import React from 'react'
import { Network } from 'lucide-react'

interface PageHeaderProps {
  isSkeleton?: boolean
}

export const PageHeader: React.FC<PageHeaderProps> = ({ isSkeleton = false }) => {
  if (isSkeleton) {
    return (
      <div className="page-header-row skeleton-active">
        <div className="page-header-left">
          <div className="skeleton-line skeleton-w-180" style={{ height: '11px', marginBottom: '8px' }} />
          <div className="skeleton-line skeleton-w-320" style={{ height: '30px' }} />
        </div>
        <div className="page-header-right">
          <div className="skeleton-pill skeleton-w-260" style={{ height: '36px' }} />
        </div>
      </div>
    )
  }

  return (
    <section className="page-header-row">
      <div className="page-header-left">
        <div className="project-badge-line font-mono">
          <span className="project-run-tag">PROJECT OVERVIEW // RUN #0942-B</span>
          <span className="bullet-sep">•</span>
          <span className="sync-tag">INFERENCE CYCLE SYNC</span>
        </div>
        <h1 className="page-title">Good morning, research team.</h1>
      </div>

      <div className="page-header-right">
        <div className="model-status-pill font-mono">
          <Network size={14} className="model-icon" />
          <span className="model-name">Graph Transformer v4.2</span>
          <span className="pill-dot">•</span>
          <span className="model-date">28-OCT-2025</span>
          <span className="pill-dot">•</span>
          <span className="cluster-status">
            <span className="cluster-green-dot" />
            Cluster-A8
          </span>
        </div>
      </div>
    </section>
  )
}
