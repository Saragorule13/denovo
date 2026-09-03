import React from 'react'
import { Search, Cpu, Bell, Settings, Eye, LayoutGrid, BookOpen } from 'lucide-react'

interface TopNavProps {
  isSkeleton?: boolean
  searchQuery?: string
  onSearchChange?: (q: string) => void
  toggleSkeleton?: () => void
  onOpenLanding?: () => void
}

export const TopNav: React.FC<TopNavProps> = ({
  isSkeleton = false,
  searchQuery = '',
  onSearchChange,
  toggleSkeleton,
  onOpenLanding,
}) => {
  if (isSkeleton) {
    return (
      <header className="topnav-header skeleton-active">
        <div className="topnav-search-skeleton">
          <div className="skeleton-box skeleton-search-icon" />
          <div className="skeleton-line skeleton-w-60" style={{ height: '14px' }} />
        </div>

        <div className="topnav-actions">
          {toggleSkeleton && (
            <button className="skeleton-toggle-btn" onClick={toggleSkeleton} title="Toggle Skeleton view">
              <LayoutGrid size={14} />
              <span>Skeleton Mode: ON</span>
            </button>
          )}
          <div className="skeleton-pill skeleton-w-160" style={{ height: '34px' }} />
          <div className="skeleton-box skeleton-icon-btn" />
          <div className="skeleton-box skeleton-icon-btn" />
          <div className="skeleton-box skeleton-avatar" />
        </div>
      </header>
    )
  }

  return (
    <header className="topnav-header">
      {/* Search Input Bar */}
      <div className="topnav-search-wrapper">
        <Search className="search-icon" size={16} />
        <input
          type="text"
          className="search-input"
          placeholder="Search proteins, structures, functions..."
          value={searchQuery}
          onChange={(e) => onSearchChange?.(e.target.value)}
        />
      </div>

      {/* Right Telemetry & Profile Tools */}
      <div className="topnav-actions">
        {onOpenLanding && (
          <button
            className="skeleton-toggle-btn"
            onClick={onOpenLanding}
            title="View Research & Methodology Landing Page"
            style={{ backgroundColor: '#ecfdf5', borderColor: '#a7f3d0', color: '#065f46' }}
          >
            <BookOpen size={14} />
            <span>Project Overview</span>
          </button>
        )}

        {toggleSkeleton && (
          <button
            className="skeleton-toggle-btn active-state"
            onClick={toggleSkeleton}
            title="Toggle between structural skeleton and populated dashboard"
          >
            <Eye size={14} />
            <span>View Skeleton</span>
          </button>
        )}

        {/* Inference Engine Pill */}
        <div className="engine-telemetry-pill">
          <div className="engine-icon-wrap">
            <Cpu size={14} className="engine-icon" />
          </div>
          <span className="engine-label font-mono">Inference Engine 48.2 TFLOPS</span>
        </div>

        {/* Notifications */}
        <button className="icon-action-btn" aria-label="Notifications">
          <Bell size={17} />
          <span className="notification-badge-dot" />
        </button>

        {/* Settings */}
        <button className="icon-action-btn" aria-label="Settings">
          <Settings size={17} />
        </button>

        {/* User Avatar */}
        <div className="user-avatar-badge" title="Research Team Lead (RT)">
          <span>RT</span>
        </div>
      </div>
    </header>
  )
}
