// ========================================
// Users Store - stores/users.store.ts
// ========================================

import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { adminUsersService } from '@/services/admin-users.service';
import type {
  AdminUser,
  CreateAdminUserRequest,
  UpdateAdminUserRequest,
  PagedResult,
  SmartSearchRequest,
  UserStatistics
} from '@/types/identity.types';
import { FilterOperator }  from '@/types/identity.types';


export const useUsersStore = defineStore('users', () => {
  // ========================================
  // State
  // ========================================
  const users = ref<AdminUser[]>([]);
  const selectedUser = ref<AdminUser | null>(null);
  const pagedResult = ref<PagedResult<AdminUser> | null>(null);
  const statistics = ref<UserStatistics | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Filters & Search
  const searchTerm = ref('');
  const currentPage = ref(1);
  const pageSize = ref(10);
  const selectedRoleFilter = ref<string>('');
  const statusFilter = ref<boolean | null>(null);

  // Selection
  const selectedUserIds = ref<string[]>([]);

  // ========================================
  // Getters (Computed)
  // ========================================
  const totalUsers = computed(() => pagedResult.value?.totalCount || 0);
  const totalPages = computed(() => pagedResult.value?.totalPages || 0);
  const hasNextPage = computed(() => pagedResult.value?.hasNextPage || false);
  const hasPreviousPage = computed(() => pagedResult.value?.hasPreviousPage || false);

  const activeUsers = computed(() => 
    users.value.filter((u: AdminUser) => u.isActive)
  );

  const inactiveUsers = computed(() => 
    users.value.filter((u: AdminUser) => !u.isActive)
  );

  const hasSelection = computed(() => selectedUserIds.value.length > 0);
  const selectedCount = computed(() => selectedUserIds.value.length);

  // ========================================
  // Actions
  // ========================================

  /**
   * تحميل المستخدمين
   */
  async function loadUsers(
    page: number = currentPage.value,
    size: number = pageSize.value
  ): Promise<void> {
    isLoading.value = true;
    error.value = null;

    try {
      currentPage.value = page;
      pageSize.value = size;

      pagedResult.value = await adminUsersService.getAll(page, size, false);
      users.value = pagedResult.value.items;
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { message?: string } } };
      error.value = apiError.response?.data?.message || 'فشل تحميل المستخدمين';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * تحميل مستخدم بالمعرف
   */
  async function loadUser(id: string): Promise<AdminUser> {
    isLoading.value = true;
    error.value = null;

    try {
      selectedUser.value = await adminUsersService.getById(id);
      return selectedUser.value;
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { message?: string } } };
      error.value = apiError.response?.data?.message || 'فشل تحميل المستخدم';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * إنشاء مستخدم
   */
  async function createUser(request: CreateAdminUserRequest): Promise<AdminUser> {
    isLoading.value = true;
    error.value = null;

    try {
      const newUser = await adminUsersService.create(request);
      users.value.unshift(newUser);
      
      // تحديث العدد الكلي
      if (pagedResult.value) {
        pagedResult.value.totalCount++;
      }

      return newUser;
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { message?: string } } };
      error.value = apiError.response?.data?.message || 'فشل إنشاء المستخدم';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * تحديث مستخدم
   */
  async function updateUser(
    id: string,
    request: UpdateAdminUserRequest
  ): Promise<void> {
    isLoading.value = true;
    error.value = null;

    try {
      await adminUsersService.update(id, request);

      // تحديث في القائمة
      const index = users.value.findIndex((u: AdminUser) => u.id === id);
      if (index !== -1) {
        const updated = await adminUsersService.getById(id);
        users.value[index] = updated;
        
        if (selectedUser.value?.id === id) {
          selectedUser.value = updated;
        }
      }
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { message?: string } } };
      error.value = apiError.response?.data?.message || 'فشل تحديث المستخدم';
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
      await adminUsersService.delete(id);
      users.value = users.value.filter((u: AdminUser) => u.id !== id);

      if (pagedResult.value) {
        pagedResult.value.totalCount--;
      }

      if (selectedUser.value?.id === id) {
        selectedUser.value = null;
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
   * البحث في المستخدمين
   */
  async function searchUsers(request?: SmartSearchRequest): Promise<void> {
    isLoading.value = true;
    error.value = null;

    try {
      const searchRequest: SmartSearchRequest = request || {
        searchTerm: searchTerm.value,
        pageNumber: currentPage.value,
        pageSize: pageSize.value,
        filters: []
      };

      // إضافة فلاتر
      if (selectedRoleFilter.value && searchRequest.filters) {
        searchRequest.filters.push({
          propertyName: 'RoleId',
          value: selectedRoleFilter.value,
          operator: FilterOperator.Equals
        });
      }

      if (statusFilter.value !== null && searchRequest.filters) {
        searchRequest.filters.push({
          propertyName: 'IsActive',
          value: statusFilter.value,
          operator: FilterOperator.Equals
        });
      }

      pagedResult.value = await adminUsersService.search(searchRequest);
      users.value = pagedResult.value.items;
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { message?: string } } };
      error.value = apiError.response?.data?.message || 'فشل البحث';
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
      statistics.value = await adminUsersService.getStatistics();
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { message?: string } } };
      error.value = apiError.response?.data?.message || 'فشل تحميل الإحصائيات';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * عمليات جماعية
   */
  async function bulkActivate(userIds?: string[]): Promise<void> {
    isLoading.value = true;
    error.value = null;

    try {
      const ids = userIds || selectedUserIds.value;
      await adminUsersService.bulkActivate(ids);
      
      // تحديث الحالة محلياً
      ids.forEach((id: string) => {
        const user = users.value.find((u: AdminUser) => u.id === id);
        if (user) user.isActive = true;
      });

      clearSelection();
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { message?: string } } };
      error.value = apiError.response?.data?.message || 'فشل التفعيل';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  async function bulkDeactivate(userIds?: string[]): Promise<void> {
    isLoading.value = true;
    error.value = null;

    try {
      const ids = userIds || selectedUserIds.value;
      await adminUsersService.bulkDeactivate(ids);
      
      // تحديث الحالة محلياً
      ids.forEach((id: string) => {
        const user = users.value.find((u: AdminUser) => u.id === id);
        if (user) user.isActive = false;
      });

      clearSelection();
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { message?: string } } };
      error.value = apiError.response?.data?.message || 'فشل إلغاء التفعيل';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  async function bulkDelete(userIds?: string[]): Promise<void> {
    isLoading.value = true;
    error.value = null;

    try {
      const ids = userIds || selectedUserIds.value;
      await adminUsersService.bulkDelete(ids);
      
      users.value = users.value.filter((u: AdminUser) => !ids.includes(u.id));

      if (pagedResult.value) {
        pagedResult.value.totalCount -= ids.length;
      }

      clearSelection();
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { message?: string } } };
      error.value = apiError.response?.data?.message || 'فشل الحذف الجماعي';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * إدارة التحديد
   */
  function toggleUserSelection(userId: string): void {
    const index = selectedUserIds.value.indexOf(userId);
    if (index > -1) {
      selectedUserIds.value.splice(index, 1);
    } else {
      selectedUserIds.value.push(userId);
    }
  }

  function selectAll(): void {
    selectedUserIds.value = users.value.map((u: AdminUser) => u.id);
  }

  function clearSelection(): void {
    selectedUserIds.value = [];
  }

  function isSelected(userId: string): boolean {
    return selectedUserIds.value.includes(userId);
  }

  /**
   * Pagination
   */
  function nextPage(): Promise<void> {
    if (hasNextPage.value) {
      return loadUsers(currentPage.value + 1, pageSize.value);
    }
    return Promise.resolve();
  }

  function previousPage(): Promise<void> {
    if (hasPreviousPage.value) {
      return loadUsers(currentPage.value - 1, pageSize.value);
    }
    return Promise.resolve();
  }

  function goToPage(page: number): Promise<void> {
    return loadUsers(page, pageSize.value);
  }

  /**
   * Filters
   */
  function setSearchTerm(term: string): void {
    searchTerm.value = term;
  }

  function setRoleFilter(roleId: string | null): void {
    selectedRoleFilter.value = roleId as string;
  }

  function setStatusFilter(status: boolean | null): void {
    statusFilter.value = status;
  }

  function clearFilters(): void {
    searchTerm.value = '';
    selectedRoleFilter.value = '';
    statusFilter.value = null;
  }

  /**
   * Utilities
   */
  function clearError(): void {
    error.value = null;
  }

  function setSelectedUser(user: AdminUser | null): void {
    selectedUser.value = user;
  }

  // ========================================
  // Return (Public API)
  // ========================================
  return {
    // State
    users,
    selectedUser,
    pagedResult,
    statistics,
    isLoading,
    error,
    searchTerm,
    currentPage,
    pageSize,
    selectedRoleFilter,
    statusFilter,
    selectedUserIds,

    // Getters
    totalUsers,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    activeUsers,
    inactiveUsers,
    hasSelection,
    selectedCount,

    // Actions
    loadUsers,
    loadUser,
    createUser,
    updateUser,
    deleteUser,
    searchUsers,
    loadStatistics,
    bulkActivate,
    bulkDeactivate,
    bulkDelete,
    
    // Selection
    toggleUserSelection,
    selectAll,
    clearSelection,
    isSelected,
    
    // Pagination
    nextPage,
    previousPage,
    goToPage,
    
    // Filters
    setSearchTerm,
    setRoleFilter,
    setStatusFilter,
    clearFilters,
    
    // Utilities
    clearError,
    setSelectedUser
  };
});
