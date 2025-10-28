// ========================================
// Form Validation Composable - composables/useForm.ts
// ========================================

import { ref, reactive, computed } from 'vue';

export interface ValidationRule<T = unknown> {
  validator: (value: T) => boolean | Promise<boolean>;
  message: string;
}

export interface FieldRules {
  [key: string]: ValidationRule[];
}

export interface FormErrors {
  [key: string]: string[];
}

export function useForm<T extends Record<string, unknown>>(
  initialData: T,
  rules: FieldRules = {}
) {
  const formData = reactive<T>({ ...initialData });
  const errors = ref<FormErrors>({});
  const touched = ref<Record<string, boolean>>({});
  const isSubmitting = ref(false);
  const isValidating = ref(false);

  // ========================================
  // Computed
  // ========================================
  const hasErrors = computed(() => 
    Object.keys(errors.value).length > 0
  );

  const isDirty = computed(() => 
    Object.keys(touched.value).some((key) => touched.value[key])
  );

  const isValid = computed(() => 
    !hasErrors.value && isDirty.value
  );

  // ========================================
  // Methods
  // ========================================

  /**
   * التحقق من حقل واحد
   */
  async function validateField(fieldName: string): Promise<boolean> {
    const fieldRules = rules[fieldName];
    if (!fieldRules) return true;

    const fieldErrors: string[] = [];
    const value = formData[fieldName];

    for (const rule of fieldRules) {
      const isValid = await rule.validator(value);
      if (!isValid) {
        fieldErrors.push(rule.message);
      }
    }

    if (fieldErrors.length > 0) {
      errors.value[fieldName] = fieldErrors;
      return false;
    } else {
      delete errors.value[fieldName];
      return true;
    }
  }

  /**
   * التحقق من جميع الحقول
   */
  async function validate(): Promise<boolean> {
    isValidating.value = true;
    errors.value = {};

    const fieldNames = Object.keys(rules);
    const validations = fieldNames.map((name) => validateField(name));
    const results = await Promise.all(validations);

    isValidating.value = false;
    return results.every((result) => result === true);
  }

  /**
   * معالجة التغيير
   */
  function handleChange(fieldName: string, value: unknown): void {
    // Use setData to avoid indexing Reactive<T> directly
    setData({ [fieldName]: value } as Partial<T>);
    touched.value[fieldName] = true;
    
    // التحقق التلقائي بعد التعديل
    if (touched.value[fieldName]) {
      validateField(fieldName);
    }
  }

  /**
   * معالجة Blur
   */
  function handleBlur(fieldName: string): void {
    touched.value[fieldName] = true;
    validateField(fieldName);
  }

  /**
   * تعيين خطأ يدوياً
   */
  function setError(fieldName: string, message: string | string[]): void {
    errors.value[fieldName] = Array.isArray(message) ? message : [message];
  }

  /**
   * مسح خطأ
   */
  function clearError(fieldName: string): void {
    delete errors.value[fieldName];
  }

  /**
   * مسح جميع الأخطاء
   */
  function clearErrors(): void {
    errors.value = {};
  }

  /**
   * إعادة تعيين النموذج
   */
  function reset(): void {
    Object.assign(formData, initialData);
    errors.value = {};
    touched.value = {};
    isSubmitting.value = false;
  }

  /**
   * تعيين البيانات
   */
  function setData(data: Partial<T>): void {
    Object.assign(formData, data);
  }

  /**
   * الحصول على أخطاء حقل
   */
  function getFieldError(fieldName: string): string | null {
    return errors.value[fieldName]?.[0] || null;
  }

  /**
   * التحقق من وجود خطأ في حقل
   */
  function hasFieldError(fieldName: string): boolean {
    return !!errors.value[fieldName];
  }

  /**
   * معالجة الإرسال
   */
  async function handleSubmit(
    onSubmit: (data: T) => Promise<void> | void
  ): Promise<void> {
    isSubmitting.value = true;

    try {
      const isValid = await validate();
      
      if (!isValid) {
        throw new Error('Form validation failed');
      }

      await onSubmit(Object.assign({}, formData) as T);
    } finally {
      isSubmitting.value = false;
    }
  }

  return {
    // State
    formData,
    errors,
    touched,
    isSubmitting,
    isValidating,

    // Computed
    hasErrors,
    isDirty,
    isValid,

    // Methods
    validateField,
    validate,
    handleChange,
    handleBlur,
    setError,
    clearError,
    clearErrors,
    reset,
    setData,
    getFieldError,
    hasFieldError,
    handleSubmit
  };
}

// ========================================
// Common Validators
// ========================================

export const validators = {
  required: (message = 'هذا الحقل مطلوب'): ValidationRule => ({
    validator: (value: unknown) => {
      if (typeof value === 'string') return value.trim().length > 0;
      if (Array.isArray(value)) return value.length > 0;
      return value !== null && value !== undefined;
    },
    message
  }),

  email: (message = 'البريد الإلكتروني غير صالح'): ValidationRule<string> => ({
    validator: (value: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return !value || emailRegex.test(value);
    },
    message
  }),

  minLength: (
    min: number,
    message?: string
  ): ValidationRule<string> => ({
    validator: (value: string) => !value || value.length >= min,
    message: message || `يجب أن يكون الحقل ${min} أحرف على الأقل`
  }),

  maxLength: (
    max: number,
    message?: string
  ): ValidationRule<string> => ({
    validator: (value: string) => !value || value.length <= max,
    message: message || `يجب أن لا يتجاوز الحقل ${max} حرف`
  }),

  min: (
    min: number,
    message?: string
  ): ValidationRule<number> => ({
    validator: (value: number) => value >= min,
    message: message || `يجب أن تكون القيمة ${min} على الأقل`
  }),

  max: (
    max: number,
    message?: string
  ): ValidationRule<number> => ({
    validator: (value: number) => value <= max,
    message: message || `يجب أن لا تتجاوز القيمة ${max}`
  }),

  pattern: (
    pattern: RegExp,
    message = 'القيمة غير صالحة'
  ): ValidationRule<string> => ({
    validator: (value: string) => !value || pattern.test(value),
    message
  }),

  password: (
    message = 'كلمة المرور يجب أن تحتوي على 8 أحرف على الأقل، حرف كبير، حرف صغير، ورقم'
  ): ValidationRule<string> => ({
    validator: (value: string) => {
      if (!value) return false;
      const hasMinLength = value.length >= 8;
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumber = /[0-9]/.test(value);
      return hasMinLength && hasUpperCase && hasLowerCase && hasNumber;
    },
    message
  }),

  confirmPassword: (
    passwordField: string,
    message = 'كلمة المرور غير متطابقة'
  ): ValidationRule => ({
    validator: function(/*value: unknown*/) {
      // Note: This needs access to formData
      return true; // Will be implemented in component
    },
    message
  }),

  url: (message = 'الرابط غير صالح'): ValidationRule<string> => ({
    validator: (value: string) => {
      if (!value) return true;
      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    },
    message
  })
};
