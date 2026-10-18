import type { Component } from 'vue'

export type DangerActionVariant = 'outline' | 'danger-outline'

export interface DangerActionItem {
  id: string
  title: string
  description: string
  buttonText: string
  icon?: Component
  iconClass?: string
  variant?: DangerActionVariant
  onClick?: () => void
}

export interface DangerItemProps {
  title: string
  description: string
  buttonText: string
  icon?: Component
  iconClass?: string
  variant?: DangerActionVariant
  hasDivider?: boolean
  className?: string
}

export interface DangerZoneProps {
  title?: string
  items?: DangerActionItem[]
  className?: string
}
