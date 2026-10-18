import { isEmail } from '@/composables/useFormValidation'

export interface SignInFormData {
  email: string
  password: string
  keepLoggedIn?: boolean
}

export const validateSignIn = (data: SignInFormData) => {
  const errors: Partial<Record<keyof SignInFormData, string>> = {}

  if (!data.email.trim()) errors.email = 'Email is required'
  else if (!isEmail(data.email.trim())) errors.email = 'Please enter a valid email address'

  if (!data.password) errors.password = 'Password is required'

  return errors
}
