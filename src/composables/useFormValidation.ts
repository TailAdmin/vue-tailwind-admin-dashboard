import { computed, reactive, ref } from 'vue'

type Validate<T> = (values: T) => Partial<Record<keyof T, string>>

/**
 * Minimal form helper mirroring react-hook-form's `mode: "onTouched"`:
 * a field's error is shown after it was blurred (or after a submit attempt)
 * and then re-validated on every change.
 */
export function useFormValidation<T extends object>(defaultValues: T, validate: Validate<T>) {
  const values = reactive({ ...defaultValues }) as T
  const touched = reactive<Record<string, boolean>>({})
  const submitted = ref(false)
  const isSubmitting = ref(false)

  const allErrors = computed(() => validate(values))

  const errorOf = (field: keyof T) =>
    touched[field as string] || submitted.value ? allErrors.value[field] : undefined

  const touch = (field: keyof T) => {
    touched[field as string] = true
  }

  const reset = () => {
    Object.assign(values, defaultValues)
    Object.keys(touched).forEach((key) => delete touched[key])
    submitted.value = false
  }

  const handleSubmit = (onValid: (data: T) => void | Promise<void>) => async (event?: Event) => {
    event?.preventDefault()
    submitted.value = true
    if (Object.keys(allErrors.value).length > 0) return
    isSubmitting.value = true
    try {
      await onValid({ ...values })
    } finally {
      isSubmitting.value = false
    }
  }

  return { values, errorOf, touch, reset, handleSubmit, isSubmitting }
}

export const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
