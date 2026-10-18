import type { AddressData } from './types'

export type AddressFormData = AddressData

export const validateAddress = (data: AddressFormData) => {
  const errors: Partial<Record<keyof AddressFormData, string>> = {}

  if (!data.country.trim()) errors.country = 'Country is required'
  if (!data.cityState.trim()) errors.cityState = 'City/State is required'
  if (!data.postalCode.trim()) errors.postalCode = 'Postal Code is required'
  if (!data.taxId.trim()) errors.taxId = 'TAX ID is required'

  return errors
}
