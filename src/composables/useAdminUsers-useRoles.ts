// ========================================
// Admin Users & Roles Composables
// composables/useAdminUsers.ts & useRoles.ts
// ========================================

import { ref } from 'vue';
import { adminUsersService } from '@/services/admin-users.service';
import { rolesService } from '@/services/roles.service';
import type {
  AdminUser,
  CreateAdminUserRequest,
  UpdateAdminUserRequest,
  PagedResult,
  SmartSearchRequest,
  UserStatistics,
  Role,
  CreateRoleRequest,
  UpdateRoleRequest,
  Permission,
  ApiError
} from '@/types/identity.types';

// ========================================
// useAdminUsers Composable
// ========================================

export function useAdminUsers() {
  const users = ref<AdminUser[]>([]);
  const selectedUser = ref<AdminUser | null>(null);
  const pagedResult = ref<PagedResult<AdminUser> | null>(null);
  const statistics = ref<UserStatistics | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  /**
   * تحميل قائمة المستخدمين
   */
  const loadUsers = async (
    pageNumber = 1,
    pageSize = 10,
    includeDeleted = false
  ) => {
    isLoading.value = true;
    error.value = null;

    try {
      pagedResult.value = await adminUsersService.getAll(
        pageNumber,
        pageSize,
        includeDeleted
      );
      users.value = pagedResult.value.items;
    } catch (err) {
      const apiError = err as ApiError;
      error.value = apiError.response?.data?.message || 'فشل تحميل المستخدمين';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * تحميل مستخدم بالمعرف
   */
  const loadUser = async (id: string) => {
    isLoading.value = true;
    error.value = null;

    try {
      selectedUser.value = await adminUsersService.getById(id);
      return selectedUser.value;
    } catch (err) {
      const apiError = err as ApiError;
      error.value = apiError.response?.data?.message || 'فشل تحميل المستخدم';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * إنشاء مستخدم
   */
  const createUser = async (request: CreateAdminUserRequest) => {
    isLoading.value = true;
    error.value = null;

    try {
      const newUser = await adminUsersService.create(request);
      users.value.unshift(newUser);
      return newUser;
    } catch (err) {
      const apiError = err as ApiError;
      error.value = apiError.response?.data?.message || 'فشل إنشاء المستخدم';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * تحديث مستخدم
   */
  const updateUser = async (id: string, request: UpdateAdminUserRequest) => {
    isLoading.value = true;
    error.value = null;

    try {
      await adminUsersService.update(id, request);
      // تحديث في القائمة
      const index = users.value.findIndex((u: AdminUser) => u.id === id);
      if (index !== -1) {
        await loadUser(id);
        if (selectedUser.value) {
          users.value[index] = selectedUser.value;
        }
      }
    } catch (err) {
      const apiError = err as ApiError;
      error.value = apiError.response?.data?.message || 'فشل تحديث المستخدم';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * حذف مستخدم
   */
  const deleteUser = async (id: string) => {
    isLoading.value = true;
    error.value = null;

    try {
      await adminUsersService.delete(id);
      users.value = users.value.filter((u: AdminUser) => u.id !== id);
    } catch (err) {
      const apiError = err as ApiError;
      error.value = apiError.response?.data?.message || 'فشل حذف المستخدم';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * البحث
   */
  const search = async (request: SmartSearchRequest) => {
    isLoading.value = true;
    error.value = null;

    try {
      pagedResult.value = await adminUsersService.search(request);
      users.value = pagedResult.value.items;
    } catch (err) {
      const apiError = err as ApiError;
      error.value = apiError.response?.data?.message || 'فشل البحث';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * عمليات جماعية
   */
  const bulkActivate = async (userIds: string[]) => {
    isLoading.value = true;
    try {
      await adminUsersService.bulkActivate(userIds);
    } finally {
      isLoading.value = false;
    }
  };

  const bulkDeactivate = async (userIds: string[]) => {
    isLoading.value = true;
    try {
      await adminUsersService.bulkDeactivate(userIds);
    } finally {
      isLoading.value = false;
    }
  };

  const bulkDelete = async (userIds: string[]) => {
    isLoading.value = true;
    try {
      await adminUsersService.bulkDelete(userIds);
      users.value = users.value.filter((u: AdminUser) => !userIds.includes(u.id));
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * تحميل الإحصائيات
   */
  const loadStatistics = async () => {
    isLoading.value = true;
    try {
      statistics.value = await adminUsersService.getStatistics();
    } finally {
      isLoading.value = false;
    }
  };

  return {
    users,
    selectedUser,
    pagedResult,
    statistics,
    isLoading,
    error,
    loadUsers,
    loadUser,
    createUser,
    updateUser,
    deleteUser,
    search,
    bulkActivate,
    bulkDeactivate,
    bulkDelete,
    loadStatistics
  };
}

// ========================================
// useRoles Composable
// ========================================

export function useRoles() {
  const roles = ref<Role[]>([]);
  const selectedRole = ref<Role | null>(null);
  const permissions = ref<Permission[]>([]);
  const groupedPermissions = ref<Record<string, Permission[]>>({});
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  /**
   * تحميل جميع الأدوار
   */
  const loadRoles = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      roles.value = await rolesService.getAll();
    } catch (err) {
      const apiError = err as ApiError;
      error.value = apiError.response?.data?.message || 'فشل تحميل الأدوار';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * تحميل دور بالمعرف
   */
  const loadRole = async (id: string) => {
    isLoading.value = true;
    error.value = null;

    try {
      selectedRole.value = await rolesService.getById(id);
      return selectedRole.value;
    } catch (err) {
      const apiError = err as ApiError;
      error.value = apiError.response?.data?.message || 'فشل تحميل الدور';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * إنشاء دور
   */
  const createRole = async (request: CreateRoleRequest) => {
    isLoading.value = true;
    error.value = null;

    try {
      const newRole = await rolesService.create(request);
      roles.value.push(newRole);
      return newRole;
    } catch (err) {
      const apiError = err as ApiError;
      error.value = apiError.response?.data?.message || 'فشل إنشاء الدور';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * تحديث دور
   */
  const updateRole = async (id: string, request: UpdateRoleRequest) => {
    isLoading.value = true;
    error.value = null;

    try {
      await rolesService.update(id, request);
      const index = roles.value.findIndex((r: Role) => r.id === id);
      if (index !== -1) {
        await loadRole(id);
        if (selectedRole.value) {
          roles.value[index] = selectedRole.value;
        }
      }
    } catch (err) {
      const apiError = err as ApiError;
      error.value = apiError.response?.data?.message || 'فشل تحديث الدور';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * حذف دور
   */
  const deleteRole = async (id: string) => {
    isLoading.value = true;
    error.value = null;

    try {
      await rolesService.delete(id);
      roles.value = roles.value.filter((r: Role) => r.id !== id);
    } catch (err) {
      const apiError = err as ApiError;
      error.value = apiError.response?.data?.message || 'فشل حذف الدور';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * تحميل الصلاحيات
   */
  const loadPermissions = async () => {
    isLoading.value = true;
    try {
      permissions.value = await rolesService.getAllPermissions();
      groupedPermissions.value = await rolesService.getPermissionsGrouped();
    } finally {
      isLoading.value = false;
    }
  };

  return {
    roles,
    selectedRole,
    permissions,
    groupedPermissions,
    isLoading,
    error,
    loadRoles,
    loadRole,
    createRole,
    updateRole,
    deleteRole,
    loadPermissions
  };
}
