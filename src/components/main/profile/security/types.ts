export interface ChangePasswordFormData {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export interface SecuritySettings {
  twoFactorEnabled: boolean
}

export interface SecurityItemProps {
  title: string
  description: string
  hasDivider?: boolean
  className?: string
}

export interface ChangePasswordModalProps {
  isOpen: boolean
}

export interface SecurityProps {
  initialSettings?: SecuritySettings
  className?: string
}
