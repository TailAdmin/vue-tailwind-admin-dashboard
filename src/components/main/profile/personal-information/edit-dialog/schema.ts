import { isEmail } from '@/composables/useFormValidation'
import type { PersonalInfoFormData } from './types'

export const validatePersonalInfo = (data: PersonalInfoFormData) => {
  const errors: Partial<Record<keyof PersonalInfoFormData, string>> = {}

  if (!data.firstName.trim()) errors.firstName = 'First name is required'
  if (!data.lastName.trim()) errors.lastName = 'Last name is required'

  if (!data.email.trim()) errors.email = 'Email is required'
  else if (!isEmail(data.email.trim())) errors.email = 'Please enter a valid email address'

  if (!data.phone.trim()) errors.phone = 'Phone number is required'

  return errors
}
