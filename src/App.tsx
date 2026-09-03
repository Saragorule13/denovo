import { useState } from 'react'
import './App.css'
import { Sidebar } from './components/Sidebar'
import { TopNav } from './components/TopNav'
import { PageHeader } from './components/PageHeader'
import { StructureMap } from './components/StructureMap'
import { FunctionalDomainAnalytics } from './components/FunctionalDomainAnalytics'
import { InferenceDossier } from './components/InferenceDossier'
import { MetricPillsFooter } from './components/MetricPillsFooter'
import { LandingPage } from './components/LandingPage'
import { LayoutGrid, Sparkles } from 'lucide-react'

export function App() {
  // Skeleton mode state for dashboard
  const [isSkeleton, setIsSkeleton] = useState<boolean>(false)
  // Default to landing page view as requested
  const [activeNav, setActiveNav] = useState<string>('landing-page')
  const [searchQuery, setSearchQuery] = useState<string>('')

  // If activeNav is 'landing-page', render the dedicated publication-grade Landing Page
  if (activeNav === 'landing-page') {
    return (
      <LandingPage
        onLaunchDashboard={() => setActiveNav('command-center')}
      />
    )
  }

  return (
    <div className="app-layout">
      {/* 1. Left Sidebar Component */}
      <Sidebar
        isSkeleton={isSkeleton}
        activeNav={activeNav}
        onSelectNav={setActiveNav}
      />

      {/* 2. Main Workspace */}
      <div className="main-workspace">
        {/* Top Navigation Bar */}
        <TopNav
          isSkeleton={isSkeleton}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          toggleSkeleton={() => setIsSkeleton(!isSkeleton)}
          onOpenLanding={() => setActiveNav('landing-page')}
        />

        {/* Mode Notification Banner */}
        <div
          style={{
            backgroundColor: isSkeleton ? '#eff6ff' : '#ecfdf5',
            borderBottom: isSkeleton ? '1px solid #bfdbfe' : '1px solid #a7f3d0',
            padding: '8px 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '12px',
            color: isSkeleton ? '#1e40af' : '#065f46',
            fontWeight: 500,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {isSkeleton ? <LayoutGrid size={15} /> : <Sparkles size={15} />}
            <span>
              {isSkeleton
                ? 'Displaying UI Skeleton & Structural Wireframe (Layout Phase 1)'
                : 'Displaying Fully Populated High-Fidelity Dashboard UI'}
            </span>
          </div>
          <button
            onClick={() => setIsSkeleton(!isSkeleton)}
            style={{
              backgroundColor: isSkeleton ? '#2563eb' : '#0d9488',
              color: '#ffffff',
              padding: '4px 12px',
              borderRadius: '9999px',
              fontSize: '11.5px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            {isSkeleton ? 'Switch to Full Dashboard' : 'Switch to Skeleton View'}
          </button>
        </div>

        {/* Main Dashboard Content Grid */}
        <main className="dashboard-content-area">
          {/* Greeting & Run Subheader */}
          <PageHeader isSkeleton={isSkeleton} />

          {/* Top Main Card: Structure Map */}
          <StructureMap isSkeleton={isSkeleton} />

          {/* 2-Column Analytical Grid */}
          <div className="analytics-dossier-grid">
            <FunctionalDomainAnalytics isSkeleton={isSkeleton} />
            <InferenceDossier isSkeleton={isSkeleton} />
          </div>

          {/* Bottom Telemetry Status Bar */}
          <MetricPillsFooter isSkeleton={isSkeleton} />
        </main>
      </div>
    </div>
  )
}

export default App
