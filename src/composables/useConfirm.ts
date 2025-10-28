// ========================================
// Confirm Dialog Composable - composables/useConfirm.ts
// ========================================

import { ref } from 'vue';

export interface ConfirmOptions {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'info' | 'warning' | 'danger' | 'success';
  persistent?: boolean;
  data?: unknown;
}

export function useConfirm() {
  const isOpen = ref(false);
  const options = ref<ConfirmOptions>({
    title: 'تأكيد',
    message: '',
    confirmText: 'تأكيد',
    cancelText: 'إلغاء',
    type: 'warning',
    persistent: false,
    data: null
  });

  let resolvePromise: ((value: boolean) => void) | null = null;

  /**
   * إظهار نافذة التأكيد
   */
  function confirm(confirmOptions: Partial<ConfirmOptions>): Promise<boolean> {
    options.value = {
      title: 'تأكيد',
      message: '',
      confirmText: 'تأكيد',
      cancelText: 'إلغاء',
      type: 'warning',
      persistent: false,
      data: null,
      ...confirmOptions
    };

    isOpen.value = true;

    return new Promise((resolve) => {
      resolvePromise = resolve;
    });
  }

  /**
   * الموافقة
   */
  function handleConfirm(): void {
    isOpen.value = false;
    if (resolvePromise) {
      resolvePromise(true);
      resolvePromise = null;
    }
  }

  /**
   * الإلغاء
   */
  function handleCancel(): void {
    isOpen.value = false;
    if (resolvePromise) {
      resolvePromise(false);
      resolvePromise = null;
    }
  }

  return {
    isOpen,
    options,
    confirm,
    handleConfirm,
    handleCancel
  };
}

// ========================================
// Predefined Confirm Dialogs
// ========================================

/**
 * Confirm Delete
 */
export function useDeleteConfirm() {
  const confirmDialog = useConfirm();

  async function confirmDelete(
    itemName: string = 'هذا العنصر',
    customMessage?: string
  ): Promise<boolean> {
    return await confirmDialog.confirm({
      title: 'تأكيد الحذف',
      message: customMessage || `هل أنت متأكد من حذف ${itemName}؟ لا يمكن التراجع عن هذا الإجراء.`,
      confirmText: 'حذف',
      cancelText: 'إلغاء',
      type: 'danger'
    });
  }

  async function confirmBulkDelete(count: number): Promise<boolean> {
    return await confirmDialog.confirm({
      title: 'تأكيد الحذف الجماعي',
      message: `هل أنت متأكد من حذف ${count} عنصر؟ لا يمكن التراجع عن هذا الإجراء.`,
      confirmText: 'حذف الكل',
      cancelText: 'إلغاء',
      type: 'danger'
    });
  }

  return {
    ...confirmDialog,
    confirmDelete,
    confirmBulkDelete
  };
}

/**
 * Confirm Action
 */
export function useActionConfirm() {
  const confirmDialog = useConfirm();

  async function confirmAction(
    action: string,
    message?: string
  ): Promise<boolean> {
    return await confirmDialog.confirm({
      title: `تأكيد ${action}`,
      message: message || `هل أنت متأكد من ${action}؟`,
      confirmText: 'متابعة',
      cancelText: 'إلغاء',
      type: 'warning'
    });
  }

  async function confirmActivate(): Promise<boolean> {
    return await confirmAction('التفعيل', 'هل تريد تفعيل هذا العنصر؟');
  }

  async function confirmDeactivate(): Promise<boolean> {
    return await confirmAction('إلغاء التفعيل', 'هل تريد إلغاء تفعيل هذا العنصر؟');
  }

  async function confirmLogout(): Promise<boolean> {
    return await confirmDialog.confirm({
      title: 'تسجيل الخروج',
      message: 'هل أنت متأكد من تسجيل الخروج؟',
      confirmText: 'تسجيل الخروج',
      cancelText: 'إلغاء',
      type: 'warning'
    });
  }

  return {
    ...confirmDialog,
    confirmAction,
    confirmActivate,
    confirmDeactivate,
    confirmLogout
  };
}
