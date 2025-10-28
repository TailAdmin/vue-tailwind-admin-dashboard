// ========================================
// Modal Composable - composables/useModal.ts
// ========================================

import { ref, computed } from 'vue';

export interface ModalOptions {
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closable?: boolean;
  persistent?: boolean;
  data?: unknown;
}

export function useModal() {
  const isOpen = ref(false);
  const options = ref<ModalOptions>({
    title: '',
    size: 'md',
    closable: true,
    persistent: false,
    data: null
  });

  const modalData = computed(() => options.value.data);
  const modalTitle = computed(() => options.value.title);
  const modalSize = computed(() => options.value.size);

  /**
   * فتح Modal
   */
  function open(modalOptions?: ModalOptions): void {
    options.value = {
      ...options.value,
      ...modalOptions
    };
    isOpen.value = true;
  }

  /**
   * إغلاق Modal
   */
  function close(): void {
    if (!options.value.persistent) {
      isOpen.value = false;
      
      // إعادة تعيين البيانات بعد الإغلاق
      setTimeout(() => {
        options.value.data = null;
      }, 300);
    }
  }

  /**
   * Toggle Modal
   */
  function toggle(): void {
    if (isOpen.value) {
      close();
    } else {
      open();
    }
  }

  /**
   * تعيين البيانات
   */
  function setData(data: unknown): void {
    options.value.data = data;
  }

  /**
   * تعيين العنوان
   */
  function setTitle(title: string): void {
    options.value.title = title;
  }

  /**
   * تعيين الحجم
   */
  function setSize(size: ModalOptions['size']): void {
    options.value.size = size;
  }

  return {
    isOpen,
    modalData,
    modalTitle,
    modalSize,
    options,
    open,
    close,
    toggle,
    setData,
    setTitle,
    setSize
  };
}

// ========================================
// Typed Modal Composables
// ========================================

/**
 * Modal للمستخدم
 */
export function useUserModal() {
  const modal = useModal();
  
  function openCreate(): void {
    modal.open({
      title: 'إضافة مستخدم جديد',
      size: 'lg',
      data: { mode: 'create', user: null }
    });
  }

  function openEdit(user: unknown): void {
    modal.open({
      title: 'تعديل المستخدم',
      size: 'lg',
      data: { mode: 'edit', user }
    });
  }

  function openView(user: unknown): void {
    modal.open({
      title: 'تفاصيل المستخدم',
      size: 'lg',
      data: { mode: 'view', user }
    });
  }

  return {
    ...modal,
    openCreate,
    openEdit,
    openView
  };
}

/**
 * Modal للدور
 */
export function useRoleModal() {
  const modal = useModal();
  
  function openCreate(): void {
    modal.open({
      title: 'إضافة دور جديد',
      size: 'xl',
      data: { mode: 'create', role: null }
    });
  }

  function openEdit(role: unknown): void {
    modal.open({
      title: 'تعديل الدور',
      size: 'xl',
      data: { mode: 'edit', role }
    });
  }

  function openPermissions(role: unknown): void {
    modal.open({
      title: 'إدارة الصلاحيات',
      size: 'xl',
      data: { mode: 'permissions', role }
    });
  }

  return {
    ...modal,
    openCreate,
    openEdit,
    openPermissions
  };
}
