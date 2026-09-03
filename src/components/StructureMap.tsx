import React, { useState } from 'react'
import {
  Share2,
  Plus,
  Minus,
  RotateCcw,
} from 'lucide-react'

interface StructureMapProps {
  isSkeleton?: boolean
}

export const StructureMap: React.FC<StructureMapProps> = ({ isSkeleton = false }) => {
  const [viewMode, setViewMode] = useState<'3d' | 'contact'>('3d')
  const [zoomLevel, setZoomLevel] = useState(1)
  const [activeResidue, setActiveResidue] = useState<string | null>('HIS-154')

  const handleZoom = (delta: number) => {
    setZoomLevel((prev) => Math.min(Math.max(0.7, prev + delta), 1.5))
  }

  const handleReset = () => {
    setZoomLevel(1)
    setActiveResidue('HIS-154')
  }

  if (isSkeleton) {
    return (
      <section className="structure-card skeleton-active">
        {/* Card Header Skeleton */}
        <div className="structure-card-header">
          <div className="structure-header-left">
            <div className="skeleton-box skeleton-title-icon" />
            <div className="skeleton-line skeleton-w-120" style={{ height: '16px' }} />
            <div className="skeleton-pill skeleton-w-80" style={{ height: '22px' }} />
          </div>
          <div className="structure-header-right">
            <div className="skeleton-pill skeleton-w-160" style={{ height: '30px' }} />
            <div className="skeleton-box skeleton-tool-btn" />
            <div className="skeleton-box skeleton-tool-btn" />
            <div className="skeleton-box skeleton-tool-btn" />
          </div>
        </div>

        {/* Viewport Canvas Skeleton */}
        <div className="structure-viewport skeleton-box-card" style={{ height: '360px' }}>
          <div className="structure-meta-strip">
            <div className="skeleton-line skeleton-w-180" style={{ height: '20px' }} />
            <div className="skeleton-line skeleton-w-320" style={{ height: '14px' }} />
          </div>
          <div className="skeleton-canvas-placeholder">
            <div className="skeleton-wave" />
          </div>
        </div>

        {/* Viewport Footer Skeleton */}
        <div className="structure-viewport-footer">
          <div className="skeleton-line skeleton-w-160" style={{ height: '12px' }} />
          <div className="skeleton-line skeleton-w-280" style={{ height: '12px' }} />
        </div>
      </section>
    )
  }

  return (
    <section className="structure-card">
      {/* Top Card Controls */}
      <div className="structure-card-header">
        <div className="structure-header-left">
          <div className="structure-icon-badge">
            <Share2 size={16} className="structure-icon" />
          </div>
          <h2 className="structure-title">Structure Map</h2>
          <span className="live-status-pill font-mono">
            <span className="live-dot" />
            LIVE GTX-3D
          </span>
        </div>

        <div className="structure-header-right">
          {/* Segmented Mode Switch */}
          <div className="segmented-toggle">
            <button
              className={`toggle-btn ${viewMode === '3d' ? 'active' : ''}`}
              onClick={() => setViewMode('3d')}
            >
              Interactive 3D
            </button>
            <button
              className={`toggle-btn ${viewMode === 'contact' ? 'active' : ''}`}
              onClick={() => setViewMode('contact')}
            >
              Contact Plane
            </button>
          </div>

          {/* Zoom and Transform controls */}
          <div className="zoom-controls">
            <button
              className="zoom-btn"
              onClick={() => handleZoom(0.1)}
              title="Zoom In"
              aria-label="Zoom in"
            >
              <Plus size={14} />
            </button>
            <button
              className="zoom-btn"
              onClick={() => handleZoom(-0.1)}
              title="Zoom Out"
              aria-label="Zoom out"
            >
              <Minus size={14} />
            </button>
            <button
              className="zoom-btn"
              onClick={handleReset}
              title="Reset View"
              aria-label="Reset viewport"
            >
              <RotateCcw size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Viewport Stage */}
      <div className="structure-viewport">
        {/* Dotted Background Grid */}
        <div className="viewport-grid-bg" />

        {/* Top Floating Telemetry Strip */}
        <div className="structure-meta-strip font-mono">
          <div className="meta-identity-box">
            <div className="identity-primary">
              <span className="scaffold-id">7KRR_DENOVO_MUT</span>
              <div className="plddt-badge-group">
                <span className="plddt-score-tag">pLDDT 94.6</span>
                <span className="plddt-label">High Confidence</span>
              </div>
            </div>
            <div className="identity-origin">DE NOVO SYNTHESIS • HOMO SAPIENS</div>
          </div>

          <div className="meta-coords-strip">
            <span className="coord-values">COORD: X:+14.28 Y:-32.11 Z:+8.95</span>
            <span className="coord-dot">•</span>
            <span className="coord-chain">CHAIN: 384 AA (CHAIN-A)</span>
            <span className="coord-dot">•</span>
            <span className="coord-res">RES: 1.82 Å</span>
          </div>
        </div>

        {/* SVG Protein Graphic Container */}
        <div
          className="structure-svg-container"
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'center center',
            transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <svg
            viewBox="0 0 960 310"
            className="protein-canvas-svg"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Emerald Backbone Gradient */}
              <linearGradient id="backboneGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0d9488" />
                <stop offset="35%" stopColor="#14b8a6" />
                <stop offset="70%" stopColor="#0f766e" />
                <stop offset="100%" stopColor="#0d9488" />
              </linearGradient>

              {/* Faint Secondary Conformer Line Gradient */}
              <linearGradient id="conformerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#cbd5e1" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.25" />
              </linearGradient>

              {/* Glow Filter for Catalytic Region */}
              <filter id="pocketGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Dotted / Dashed Secondary Structure Cross-Couplings */}
            <g className="secondary-connectors" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 4">
              <line x1="140" y1="185" x2="210" y2="135" />
              <line x1="210" y1="135" x2="295" y2="195" />
              <line x1="295" y1="195" x2="380" y2="140" />
              <line x1="380" y1="140" x2="445" y2="175" />
              <line x1="445" y1="175" x2="520" y2="125" />
              <line x1="520" y1="125" x2="580" y2="170" />
              <line x1="580" y1="170" x2="685" y2="50" />
              <line x1="685" y1="50" x2="745" y2="275" />
              <line x1="745" y1="275" x2="815" y2="135" />

              {/* Soft cross-arc couplings */}
              <path d="M 210 135 C 320 85, 420 85, 520 125" stroke="#cbd5e1" strokeOpacity="0.7" strokeDasharray="4 4" />
              <path d="M 380 140 C 490 220, 600 220, 685 50" stroke="#cbd5e1" strokeOpacity="0.6" strokeDasharray="4 4" />
              <path d="M 520 125 C 640 180, 710 210, 815 135" stroke="#cbd5e1" strokeOpacity="0.5" strokeDasharray="4 4" />
            </g>

            {/* Faint Conformer Ghost Trajectories */}
            <path
              d="M 120 190 C 190 120, 260 210, 360 160 C 440 110, 500 200, 600 150 C 660 110, 720 170, 840 140"
              fill="none"
              stroke="url(#conformerGrad)"
              strokeWidth="1.6"
              strokeDasharray="4 3"
            />
            <path
              d="M 150 170 C 230 195, 320 130, 420 175 C 500 145, 570 190, 670 110 C 720 70, 780 200, 855 155"
              fill="none"
              stroke="url(#conformerGrad)"
              strokeWidth="1.2"
              strokeDasharray="3 3"
            />

            {/* Catalytic Pocket Highlight Box (Tilted Quadrilateral in Red/Peach) */}
            <g className="catalytic-pocket-highlight">
              <polygon
                points="540,115 605,125 585,190 525,170"
                fill="#ffedd5"
                fillOpacity="0.55"
                stroke="#f97316"
                strokeWidth="1.5"
                strokeDasharray="3 3"
                filter="url(#pocketGlow)"
              />
              <circle cx="560" cy="155" r="3.5" fill="#ea580c" />
              <circle cx="590" cy="140" r="3" fill="#ea580c" />

              {/* Callout Tag: HIS-154 :: ACTIVE */}
              <g
                className="residue-tag-callout"
                transform="translate(585, 100)"
                style={{ cursor: 'pointer' }}
                onClick={() => setActiveResidue('HIS-154')}
              >
                <rect x="-12" y="-18" width="88" height="20" rx="4" fill="#0f172a" />
                <text x="32" y="-4" fill="#ffffff" fontSize="9.5" fontWeight="600" fontFamily="var(--font-mono)" textAnchor="middle">
                  HIS-154 :: ACTIVE
                </text>
                <polygon points="-10,-8 -16,-3 -10,1" fill="#0f172a" />
              </g>
            </g>

            {/* Main Primary Ribbon Curve with Signature Right Valley Loop */}
            <path
              d="M 135 190 C 175 160, 195 125, 235 130 C 280 140, 310 205, 375 190 C 435 175, 470 120, 525 125 C 570 130, 595 200, 640 180 C 665 165, 680 50, 700 45 C 720 40, 735 120, 745 230 C 752 278, 770 285, 785 240 C 798 185, 805 135, 830 135 C 848 135, 860 145, 875 145"
              fill="none"
              stroke="url(#backboneGrad)"
              strokeWidth="4.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Nodes along the Ribbon Backbone */}
            {[
              { cx: 145, cy: 185, label: 'ALA-12', type: 'loop' },
              { cx: 205, cy: 135, label: 'LEU-35', type: 'helix' },
              { cx: 260, cy: 155, label: 'VAL-58', type: 'helix' },
              { cx: 320, cy: 195, label: 'PHE-89', type: 'helix' },
              { cx: 380, cy: 185, label: 'GLU-112', type: 'loop' },
              { cx: 440, cy: 145, label: 'TRP-130', type: 'helix' },
              { cx: 505, cy: 125, label: 'ARG-148', type: 'helix' },
              { cx: 565, cy: 135, label: 'HIS-154', type: 'active' },
              { cx: 595, cy: 185, label: 'ASP-168', type: 'active' },
              { cx: 640, cy: 180, label: 'SER-195', type: 'active' },
              { cx: 700, cy: 45, label: 'GLN-254', type: 'helix' },
              { cx: 745, cy: 230, label: 'CYS-290', type: 'loop' },
              { cx: 805, cy: 155, label: 'LYS-340', type: 'helix' },
              { cx: 840, cy: 138, label: 'MET-384', type: 'loop' },
            ].map((node, i) => {
              const isSelected = activeResidue === node.label || (node.type === 'active' && activeResidue === 'HIS-154')
              let fillColor = '#0f766e'
              let strokeColor = '#ffffff'
              let radius = 5

              if (node.type === 'active') {
                fillColor = '#ea580c'
                strokeColor = '#ffedd5'
                radius = isSelected ? 7 : 6
              } else if (node.type === 'loop') {
                fillColor = '#64748b'
                radius = 4
              }

              return (
                <g
                  key={i}
                  className="residue-node-group"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setActiveResidue(node.label)}
                >
                  {isSelected && (
                    <circle cx={node.cx} cy={node.cy} r={radius + 5} fill={fillColor} opacity={0.25} />
                  )}
                  <circle
                    cx={node.cx}
                    cy={node.cy}
                    r={radius}
                    fill={fillColor}
                    stroke={strokeColor}
                    strokeWidth="2"
                  />
                </g>
              )
            })}
          </svg>
        </div>

        {/* Viewport Bottom Footer Telemetry */}
        <div className="structure-viewport-footer font-mono">
          <div className="footer-left-metrics">
            <span className="fov-metric">VIEWPORT FOV: 45.0°</span>
            <span className="dot-sep">•</span>
            <span className="rmsd-metric">
              RMSD: <strong className="highlight-emerald">0.42 Å</strong>
            </span>
          </div>

          <div className="footer-legend">
            <div className="legend-item">
              <span className="legend-dot dot-emerald" />
              <span>Alpha Helices (84%)</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot dot-orange" />
              <span>Catalytic Pocket (His-Asp-Ser)</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot dot-grey" />
              <span>Flexible Loop Backbone</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
