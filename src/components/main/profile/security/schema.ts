import type { ChangePasswordFormData } from './types'

export const validateChangePassword = (data: ChangePasswordFormData) => {
  const errors: Partial<Record<keyof ChangePasswordFormData, string>> = {}
  const currentPassword = data.currentPassword.trim()
  const newPassword = data.newPassword.trim()
  const confirmPassword = data.confirmPassword.trim()

  if (!currentPassword) errors.currentPassword = 'Current password is required'

  if (newPassword.length < 8) errors.newPassword = 'Password must be at least 8 characters'
  else if (currentPassword && currentPassword === newPassword)
    errors.newPassword = 'New password must be different from current password'

  if (!confirmPassword) errors.confirmPassword = 'Please confirm your new password'
  else if (newPassword !== confirmPassword) errors.confirmPassword = 'Passwords do not match'

  return errors
}
