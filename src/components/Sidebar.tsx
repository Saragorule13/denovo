import React from 'react'
import {
  LayoutDashboard,
  Boxes,
  Compass,
  Activity,
  FileText,
  UploadCloud,
  BookOpen,
} from 'lucide-react'

interface SidebarProps {
  isSkeleton?: boolean
  activeNav?: string
  onSelectNav?: (id: string) => void
}

export const Sidebar: React.FC<SidebarProps> = ({
  isSkeleton = false,
  activeNav = 'command-center',
  onSelectNav,
}) => {
  const navItems = [
    { id: 'landing-page', label: 'Project Overview', icon: BookOpen },
    { id: 'command-center', label: 'Command Center', icon: LayoutDashboard },
    { id: 'protein-structures', label: 'Protein Structures', icon: Boxes },
    { id: 'embedding-explorer', label: 'Embedding Explorer', icon: Compass },
    { id: 'prediction-mode', label: 'Prediction Mode', icon: Activity },
    { id: 'documents', label: 'Documents', icon: FileText },
  ]

  if (isSkeleton) {
    return (
      <aside className="sidebar-container skeleton-active">
        {/* Brand Skeleton */}
        <div className="sidebar-brand">
          <div className="skeleton-box skeleton-logo" />
          <div className="brand-text-wrapper">
            <div className="skeleton-line skeleton-w-70" />
            <div className="skeleton-line skeleton-w-90" style={{ height: '8px', marginTop: '6px' }} />
          </div>
        </div>

        {/* Navigation Skeleton */}
        <div className="sidebar-nav">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="nav-item-skeleton">
              <div className="skeleton-box skeleton-nav-icon" />
              <div className="skeleton-line skeleton-w-80" />
            </div>
          ))}
        </div>

        {/* Active Target Card Skeleton */}
        <div className="sidebar-target-card skeleton-box-card">
          <div className="target-top-row">
            <div className="skeleton-line skeleton-w-50" style={{ height: '10px' }} />
            <div className="skeleton-box skeleton-badge-sm" />
          </div>
          <div className="skeleton-line skeleton-w-70" style={{ height: '18px', margin: '10px 0 6px 0' }} />
          <div className="skeleton-line skeleton-w-60" style={{ height: '10px' }} />
        </div>

        {/* Upload Sequence Button Skeleton */}
        <div className="skeleton-btn-pill" style={{ marginBottom: '20px' }} />

        {/* Pipeline Status Skeleton */}
        <div className="sidebar-status-card skeleton-box-card">
          <div className="skeleton-line skeleton-w-70" style={{ height: '10px' }} />
          <div className="skeleton-line skeleton-w-50" style={{ height: '9px', marginTop: '6px' }} />
        </div>
      </aside>
    )
  }

  return (
    <aside className="sidebar-container">
      {/* Brand Header */}
      <div className="sidebar-brand">
        <div className="logo-badge">
          <svg viewBox="0 0 24 24" fill="none" className="logo-icon" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="5" fill="#0f172a" />
            <path d="M7 6V18M7 6L17 18M17 6V18" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="brand-text-wrapper">
          <h2 className="brand-name">DeNovo</h2>
          <span className="brand-tagline">PROTEIN INTELLIGENCE</span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="sidebar-nav" aria-label="Main Navigation">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeNav === item.id
          return (
            <button
              key={item.id}
              className={`nav-item-btn ${isActive ? 'active' : ''}`}
              onClick={() => onSelectNav?.(item.id)}
            >
              <Icon className="nav-icon" size={17} />
              <span className="nav-label">{item.label}</span>
              {isActive && <span className="active-glow-indicator" />}
            </button>
          )
        })}
      </nav>

      {/* Active Target Card */}
      <div className="sidebar-target-card">
        <div className="target-card-header">
          <span className="target-section-title">ACTIVE TARGET</span>
          <span className="target-score-badge">98.4%</span>
        </div>
        <div className="target-title">d-GLP1-8849</div>
        <div className="target-specs font-mono">Length: 32aa • 1.82 Å</div>
      </div>

      {/* Upload Sequence CTA */}
      <button className="upload-sequence-btn">
        <UploadCloud size={15} />
        <span>Upload Sequence</span>
      </button>

      {/* Bottom Pipeline Status */}
      <div className="sidebar-status-card">
        <div className="status-indicator-row">
          <span className="pulsing-green-dot" />
          <span className="status-label">Local Pipeline Online</span>
        </div>
        <div className="status-sublabel font-mono">AlphaFold-GTX v4.2</div>
      </div>
    </aside>
  )
}
