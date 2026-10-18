import { isEmail } from '@/composables/useFormValidation'

export interface SignUpFormData {
  fname: string
  lname: string
  email: string
  password: string
  confirmPassword: string
  terms: boolean
}

export const validateSignUp = (data: SignUpFormData) => {
  const errors: Partial<Record<keyof SignUpFormData, string>> = {}

  if (!data.fname.trim()) errors.fname = 'First name is required'
  if (!data.lname.trim()) errors.lname = 'Last name is required'

  if (!data.email.trim()) errors.email = 'Email is required'
  else if (!isEmail(data.email.trim())) errors.email = 'Please enter a valid email address'

  if (data.password.length < 8) errors.password = 'Password must be at least 8 characters'

  if (!data.confirmPassword) errors.confirmPassword = 'Please confirm your password'
  else if (data.password !== data.confirmPassword) errors.confirmPassword = 'Passwords do not match'

  if (!data.terms) errors.terms = 'You must agree to the Terms and Conditions'

  return errors
}
