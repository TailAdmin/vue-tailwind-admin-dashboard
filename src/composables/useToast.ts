// ========================================
// Toast Notifications Composable - composables/useToast.ts
// ========================================

import { ref } from 'vue';

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  duration?: number;
  closable?: boolean;
}

const toasts = ref<Toast[]>([]);
let toastId = 0;

export function useToast() {
  /**
   * إضافة Toast
   */
  function addToast(toast: Omit<Toast, 'id'>): void {
    const id = `toast-${++toastId}`;
    const duration = toast.duration ?? 5000;

    const newToast: Toast = {
      id,
      closable: true,
      ...toast
    };

    toasts.value.push(newToast);

    // إزالة تلقائية بعد المدة المحددة
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }

  /**
   * إزالة Toast
   */
  function removeToast(id: string): void {
    const index = toasts.value.findIndex((t) => t.id === id);
    if (index > -1) {
      toasts.value.splice(index, 1);
    }
  }

  /**
   * مسح جميع Toasts
   */
  function clearToasts(): void {
    toasts.value = [];
  }

  /**
   * Success Toast
   */
  function success(message: string, title?: string, duration?: number): void {
    addToast({
      type: 'success',
      title: title || 'نجح',
      message,
      duration
    });
  }

  /**
   * Error Toast
   */
  function error(message: string, title?: string, duration?: number): void {
    addToast({
      type: 'error',
      title: title || 'خطأ',
      message,
      duration: duration || 7000 // أطول للأخطاء
    });
  }

  /**
   * Warning Toast
   */
  function warning(message: string, title?: string, duration?: number): void {
    addToast({
      type: 'warning',
      title: title || 'تحذير',
      message,
      duration
    });
  }

  /**
   * Info Toast
   */
  function info(message: string, title?: string, duration?: number): void {
    addToast({
      type: 'info',
      title: title || 'معلومة',
      message,
      duration
    });
  }

  return {
    toasts,
    addToast,
    removeToast,
    clearToasts,
    success,
    error,
    warning,
    info
  };
}

// ========================================
// Predefined Toast Messages
// ========================================

export function useAppToast() {
  const toast = useToast();

  // Auth Messages
  function loginSuccess(): void {
    toast.success('تم تسجيل الدخول بنجاح');
  }

  function loginError(message?: string): void {
    toast.error(message || 'فشل تسجيل الدخول. تحقق من بيانات الدخول');
  }

  function logoutSuccess(): void {
    toast.success('تم تسجيل الخروج بنجاح');
  }

  // User Messages
  function userCreated(): void {
    toast.success('تم إنشاء المستخدم بنجاح');
  }

  function userUpdated(): void {
    toast.success('تم تحديث المستخدم بنجاح');
  }

  function userDeleted(): void {
    toast.success('تم حذف المستخدم بنجاح');
  }

  function userError(message?: string): void {
    toast.error(message || 'حدث خطأ أثناء معالجة العملية');
  }

  // Role Messages
  function roleCreated(): void {
    toast.success('تم إنشاء الدور بنجاح');
  }

  function roleUpdated(): void {
    toast.success('تم تحديث الدور بنجاح');
  }

  function roleDeleted(): void {
    toast.success('تم حذف الدور بنجاح');
  }

  function roleError(message?: string): void {
    toast.error(message || 'حدث خطأ أثناء معالجة الدور');
  }

  // Bulk Operations
  function bulkActivated(count: number): void {
    toast.success(`تم تفعيل ${count} عنصر بنجاح`);
  }

  function bulkDeactivated(count: number): void {
    toast.success(`تم إلغاء تفعيل ${count} عنصر بنجاح`);
  }

  function bulkDeleted(count: number): void {
    toast.success(`تم حذف ${count} عنصر بنجاح`);
  }

  // Password Messages
  function passwordChanged(): void {
    toast.success('تم تغيير كلمة المرور بنجاح');
  }

  function passwordError(message?: string): void {
    toast.error(message || 'فشل تغيير كلمة المرور');
  }

  // Generic Messages
  function operationSuccess(message?: string): void {
    toast.success(message || 'تمت العملية بنجاح');
  }

  function operationError(message?: string): void {
    toast.error(message || 'فشلت العملية');
  }

  function validationError(message?: string): void {
    toast.error(message || 'يرجى التحقق من البيانات المدخلة', 'خطأ في التحقق');
  }

  function networkError(): void {
    toast.error('فشل الاتصال بالخادم. تحقق من اتصال الإنترنت', 'خطأ في الاتصال');
  }

  function unauthorizedError(): void {
    toast.error('ليس لديك صلاحية لتنفيذ هذا الإجراء', 'غير مصرح');
  }

  return {
    ...toast,
    // Auth
    loginSuccess,
    loginError,
    logoutSuccess,
    // Users
    userCreated,
    userUpdated,
    userDeleted,
    userError,
    // Roles
    roleCreated,
    roleUpdated,
    roleDeleted,
    roleError,
    // Bulk
    bulkActivated,
    bulkDeactivated,
    bulkDeleted,
    // Password
    passwordChanged,
    passwordError,
    // Generic
    operationSuccess,
    operationError,
    validationError,
    networkError,
    unauthorizedError
  };
}
