export interface NavItem {
  id: string
  label: string
  icon: string
  active?: boolean
}

export interface DomainSegment {
  id: string
  name: string
  range: string
  motif: string
  probability: number
  isCritical?: boolean
}

export interface BiophysicalMetrics {
  piIso: number
  gravy: number
  kdAff: string
  deltaGFold: number
}

export interface TelemetryMetric {
  id: string
  label: string
  value?: string
  badgeText?: string
  badgeVariant?: 'orange' | 'mint' | 'green' | 'red' | 'default'
  iconType: 'mutation' | 'fold' | 'binding' | 'conflict' | 'solubility' | 'immunity'
}
