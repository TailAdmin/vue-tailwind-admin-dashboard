// stores/user-profiles.store.ts
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { userProfilesService } from '@/services/user-profiles.service';
import type {
  AppUser,
  UserStatistics,
  SearchUsersParams
} from '@/types/user-profile.types';

export const useUserProfilesStore = defineStore('userProfiles', () => {
  // ========================================
  // State
  // ========================================
  const users = ref<AppUser[]>([]);
  const currentUser = ref<AppUser | null>(null);
  const statistics = ref<UserStatistics | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Pagination
  const currentPage = ref(1);
  const pageSize = ref(10);
  const totalCount = ref(0);
  const totalPages = ref(0);

  // Filters
  const searchTerm = ref('');
  const statusFilter = ref<boolean | undefined>(undefined);

  // ========================================
  // Getters
  // ========================================
  const activeUsers = computed(() => users.value.filter(u => u.isActive));
  const inactiveUsers = computed(() => users.value.filter(u => !u.isActive));
  const hasUsers = computed(() => users.value.length > 0);

  // ========================================
  // Actions
  // ========================================

  /**
   * تحميل جميع المستخدمين
   */
  async function loadUsers(params?: SearchUsersParams): Promise<void> {
    isLoading.value = true;
    error.value = null;

    try {
      const result = await userProfilesService.getAll({
        pageNumber: params?.pageNumber || currentPage.value,
        pageSize: params?.pageSize || pageSize.value,
        searchTerm: params?.searchTerm || searchTerm.value,
        isActive: params?.isActive !== undefined ? params.isActive : statusFilter.value
      });

      users.value = result.data;
      totalCount.value = result.totalCount;
      currentPage.value = result.pageNumber;
      pageSize.value = result.pageSize;
      totalPages.value = result.totalPages;
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { message?: string } } };
      error.value = apiError.response?.data?.message || 'فشل تحميل المستخدمين';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * تحميل مستخدم بواسطة ID
   */
  async function loadUserById(id: string): Promise<void> {
    isLoading.value = true;
    error.value = null;

    try {
      currentUser.value = await userProfilesService.getById(id);
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { message?: string } } };
      error.value = apiError.response?.data?.message || 'فشل تحميل المستخدم';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * تحميل الإحصائيات
   */
  async function loadStatistics(): Promise<void> {
    isLoading.value = true;
    error.value = null;

    try {
      statistics.value = await userProfilesService.getStatistics();
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { message?: string } } };
      error.value = apiError.response?.data?.message || 'فشل تحميل الإحصائيات';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * تفعيل/إلغاء تفعيل مستخدم
   */
  async function toggleUserStatus(id: string): Promise<void> {
    isLoading.value = true;
    error.value = null;

    try {
      const result = await userProfilesService.toggleStatus(id);
      
      // تحديث الحالة محلياً
      const userIndex = users.value.findIndex(u => u.id === id);
      if (userIndex !== -1) {
        users.value[userIndex].isActive = result.isActive;
        users.value[userIndex].lockoutEnabled = !result.isActive;
      }

      if (currentUser.value?.id === id) {
        currentUser.value.isActive = result.isActive;
        currentUser.value.lockoutEnabled = !result.isActive;
      }
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { message?: string } } };
      error.value = apiError.response?.data?.message || 'فشل تغيير حالة المستخدم';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * تأكيد البريد الإلكتروني
   */
  async function confirmEmail(id: string): Promise<void> {
    isLoading.value = true;
    error.value = null;

    try {
      await userProfilesService.confirmEmail(id);
      
      // تحديث محلياً
      const userIndex = users.value.findIndex(u => u.id === id);
      if (userIndex !== -1) {
        users.value[userIndex].emailConfirmed = true;
      }

      if (currentUser.value?.id === id) {
        currentUser.value.emailConfirmed = true;
      }
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { message?: string } } };
      error.value = apiError.response?.data?.message || 'فشل تأكيد البريد';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * تأكيد رقم الهاتف
   */
  async function confirmPhone(id: string): Promise<void> {
    isLoading.value = true;
    error.value = null;

    try {
      await userProfilesService.confirmPhone(id);
      
      // تحديث محلياً
      const userIndex = users.value.findIndex(u => u.id === id);
      if (userIndex !== -1) {
        users.value[userIndex].phoneNumberConfirmed = true;
      }

      if (currentUser.value?.id === id) {
        currentUser.value.phoneNumberConfirmed = true;
      }
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { message?: string } } };
      error.value = apiError.response?.data?.message || 'فشل تأكيد الهاتف';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * حذف مستخدم
   */
  async function deleteUser(id: string): Promise<void> {
    isLoading.value = true;
    error.value = null;

    try {
      await userProfilesService.delete(id);
      
      // إزالة من القائمة المحلية
      users.value = users.value.filter(u => u.id !== id);
      totalCount.value--;

      if (currentUser.value?.id === id) {
        currentUser.value = null;
      }
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { message?: string } } };
      error.value = apiError.response?.data?.message || 'فشل حذف المستخدم';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * البحث عن مستخدمين
   */
  async function search(term: string): Promise<void> {
    searchTerm.value = term;
    currentPage.value = 1;
    await loadUsers();
  }

  /**
   * تصفية حسب الحالة
   */
  async function filterByStatus(isActive: boolean | undefined): Promise<void> {
    statusFilter.value = isActive;
    currentPage.value = 1;
    await loadUsers();
  }

  /**
   * تغيير الصفحة
   */
  async function changePage(page: number): Promise<void> {
    currentPage.value = page;
    await loadUsers();
  }

  /**
   * تغيير حجم الصفحة
   */
  async function changePageSize(size: number): Promise<void> {
    pageSize.value = size;
    currentPage.value = 1;
    await loadUsers();
  }

  /**
   * إعادة تعيين الفلاتر
   */
  async function resetFilters(): Promise<void> {
    searchTerm.value = '';
    statusFilter.value = undefined;
    currentPage.value = 1;
    await loadUsers();
  }

  /**
   * مسح الخطأ
   */
  function clearError(): void {
    error.value = null;
  }

  /**
   * إعادة تعيين الحالة
   */
  function reset(): void {
    users.value = [];
    currentUser.value = null;
    statistics.value = null;
    isLoading.value = false;
    error.value = null;
    currentPage.value = 1;
    pageSize.value = 10;
    totalCount.value = 0;
    totalPages.value = 0;
    searchTerm.value = '';
    statusFilter.value = undefined;
  }

  return {
    // State
    users,
    currentUser,
    statistics,
    isLoading,
    error,
    currentPage,
    pageSize,
    totalCount,
    totalPages,
    searchTerm,
    statusFilter,

    // Getters
    activeUsers,
    inactiveUsers,
    hasUsers,

    // Actions
    loadUsers,
    loadUserById,
    loadStatistics,
    toggleUserStatus,
    confirmEmail,
    confirmPhone,
    deleteUser,
    search,
    filterByStatus,
    changePage,
    changePageSize,
    resetFilters,
    clearError,
    reset
  };
});