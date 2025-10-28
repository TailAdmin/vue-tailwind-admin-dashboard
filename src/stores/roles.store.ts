// ========================================
// Roles Store - stores/roles.store.ts
// ========================================

import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { rolesService } from '@/services/roles.service';
import type {
  Role,
  CreateRoleRequest,
  UpdateRoleRequest,
  Permission
} from '@/types/identity.types';

export const useRolesStore = defineStore('roles', () => {
  // ========================================
  // State
  // ========================================
  const roles = ref<Role[]>([]);
  const selectedRole = ref<Role | null>(null);
  const permissions = ref<Permission[]>([]);
  const groupedPermissions = ref<Record<string, Permission[]>>({});
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Selection
  const selectedPermissionIds = ref<string[]>([]);

  // ========================================
  // Getters (Computed)
  // ========================================
  const systemRoles = computed(() => 
    roles.value.filter((r: Role) => r.isSystemRole)
  );

  const customRoles = computed(() => 
    roles.value.filter((r: Role) => !r.isSystemRole)
  );

  const rolesCount = computed(() => roles.value.length);
  
  const permissionsCount = computed(() => permissions.value.length);

  const permissionResourceTypes = computed(() => 
    Object.keys(groupedPermissions.value)
  );

  const hasSelectedPermissions = computed(() => 
    selectedPermissionIds.value.length > 0
  );

  // ========================================
  // Actions
  // ========================================

  /**
   * تحميل جميع الأدوار
   */
  async function loadRoles(): Promise<void> {
    isLoading.value = true;
    error.value = null;

    try {
      roles.value = await rolesService.getAll();
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { message?: string } } };
      error.value = apiError.response?.data?.message || 'فشل تحميل الأدوار';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * تحميل دور بالمعرف
   */
  async function loadRole(id: string): Promise<Role> {
    isLoading.value = true;
    error.value = null;

    try {
      selectedRole.value = await rolesService.getById(id);
      
      // تحديث الصلاحيات المحددة
      selectedPermissionIds.value = selectedRole.value.permissions.map(
        (p: Permission) => p.id
      );

      return selectedRole.value;
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { message?: string } } };
      error.value = apiError.response?.data?.message || 'فشل تحميل الدور';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * إنشاء دور جديد
   */
  async function createRole(request: CreateRoleRequest): Promise<Role> {
    isLoading.value = true;
    error.value = null;

    try {
      const newRole = await rolesService.create(request);
      roles.value.push(newRole);
      return newRole;
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { message?: string } } };
      error.value = apiError.response?.data?.message || 'فشل إنشاء الدور';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * تحديث دور
   */
  async function updateRole(
    id: string,
    request: UpdateRoleRequest
  ): Promise<void> {
    isLoading.value = true;
    error.value = null;

    try {
      await rolesService.update(id, request);

      // تحديث في القائمة
      const index = roles.value.findIndex((r: Role) => r.id === id);
      if (index !== -1) {
        const updated = await rolesService.getById(id);
        roles.value[index] = updated;

        if (selectedRole.value?.id === id) {
          selectedRole.value = updated;
        }
      }
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { message?: string } } };
      error.value = apiError.response?.data?.message || 'فشل تحديث الدور';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * حذف دور
   */
  async function deleteRole(id: string): Promise<void> {
    isLoading.value = true;
    error.value = null;

    try {
      await rolesService.delete(id);
      roles.value = roles.value.filter((r: Role) => r.id !== id);

      if (selectedRole.value?.id === id) {
        selectedRole.value = null;
      }
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { message?: string } } };
      error.value = apiError.response?.data?.message || 'فشل حذف الدور';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * تحميل جميع الصلاحيات
   */
  async function loadPermissions(): Promise<void> {
    isLoading.value = true;
    error.value = null;

    try {
      permissions.value = await rolesService.getAllPermissions();
      groupedPermissions.value = await rolesService.getPermissionsGrouped();
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { message?: string } } };
      error.value = apiError.response?.data?.message || 'فشل تحميل الصلاحيات';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * تعيين صلاحيات لدور
   */
  async function assignPermissions(
    roleId: string,
    permissionIds: string[]
  ): Promise<void> {
    isLoading.value = true;
    error.value = null;

    try {
      await rolesService.assignPermissions(roleId, permissionIds);
      
      // إعادة تحميل الدور
      await loadRole(roleId);
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { message?: string } } };
      error.value = apiError.response?.data?.message || 'فشل تعيين الصلاحيات';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * البحث في الأدوار
   */
  function searchRoles(searchTerm: string): Role[] {
    if (!searchTerm) return roles.value;

    const term = searchTerm.toLowerCase();
    return roles.value.filter((role: Role) =>
      role.name.toLowerCase().includes(term) ||
      role.description.toLowerCase().includes(term)
    );
  }

  /**
   * الحصول على صلاحيات حسب النوع
   */
  function getPermissionsByType(resourceType: string): Permission[] {
    return groupedPermissions.value[resourceType] || [];
  }

  /**
   * التحقق من إمكانية حذف دور
   */
  function canDeleteRole(role: Role): { canDelete: boolean; reason?: string } {
    return rolesService.canDelete(role);
  }

  /**
   * التحقق من إمكانية تعديل دور
   */
  function canEditRole(role: Role): { canEdit: boolean; reason?: string } {
    return rolesService.canEdit(role);
  }

  /**
   * إدارة تحديد الصلاحيات
   */
  function togglePermissionSelection(permissionId: string): void {
    const index = selectedPermissionIds.value.indexOf(permissionId);
    if (index > -1) {
      selectedPermissionIds.value.splice(index, 1);
    } else {
      selectedPermissionIds.value.push(permissionId);
    }
  }

  function selectAllPermissions(): void {
    selectedPermissionIds.value = permissions.value.map((p: Permission) => p.id);
  }

  function clearPermissionSelection(): void {
    selectedPermissionIds.value = [];
  }

  function selectPermissionsByType(resourceType: string): void {
    const typePermissions = groupedPermissions.value[resourceType] || [];
    const typeIds = typePermissions.map((p: Permission) => p.id);
    
    // إضافة الصلاحيات غير الموجودة
    typeIds.forEach((id: string) => {
      if (!selectedPermissionIds.value.includes(id)) {
        selectedPermissionIds.value.push(id);
      }
    });
  }

  function deselectPermissionsByType(resourceType: string): void {
    const typePermissions = groupedPermissions.value[resourceType] || [];
    const typeIds = typePermissions.map((p: Permission) => p.id);
    
    selectedPermissionIds.value = selectedPermissionIds.value.filter(
      (id: string) => !typeIds.includes(id)
    );
  }

  function isPermissionSelected(permissionId: string): boolean {
    return selectedPermissionIds.value.includes(permissionId);
  }

  function areAllPermissionsInTypeSelected(resourceType: string): boolean {
    const typePermissions = groupedPermissions.value[resourceType] || [];
    return typePermissions.every((p: Permission) =>
      selectedPermissionIds.value.includes(p.id)
    );
  }

  /**
   * تعيين الصلاحيات المحددة من دور
   */
  function setSelectedPermissionsFromRole(role: Role): void {
    selectedPermissionIds.value = role.permissions.map((p: Permission) => p.id);
  }

  /**
   * Utilities
   */
  function clearError(): void {
    error.value = null;
  }

  function setSelectedRole(role: Role | null): void {
    selectedRole.value = role;
    if (role) {
      selectedPermissionIds.value = role.permissions.map((p: Permission) => p.id);
    } else {
      selectedPermissionIds.value = [];
    }
  }

  /**
   * الحصول على دور بالمعرف من الذاكرة
   */
  function getRoleById(id: string): Role | undefined {
    return roles.value.find((r: Role) => r.id === id);
  }

  /**
   * الحصول على دور بالاسم
   */
  function getRoleByName(name: string): Role | undefined {
    return roles.value.find((r: Role) => r.name === name);
  }

  // ========================================
  // Return (Public API)
  // ========================================
  return {
    // State
    roles,
    selectedRole,
    permissions,
    groupedPermissions,
    isLoading,
    error,
    selectedPermissionIds,

    // Getters
    systemRoles,
    customRoles,
    rolesCount,
    permissionsCount,
    permissionResourceTypes,
    hasSelectedPermissions,

    // Actions
    loadRoles,
    loadRole,
    createRole,
    updateRole,
    deleteRole,
    loadPermissions,
    assignPermissions,
    searchRoles,
    getPermissionsByType,
    canDeleteRole,
    canEditRole,

    // Permission Selection
    togglePermissionSelection,
    selectAllPermissions,
    clearPermissionSelection,
    selectPermissionsByType,
    deselectPermissionsByType,
    isPermissionSelected,
    areAllPermissionsInTypeSelected,
    setSelectedPermissionsFromRole,

    // Utilities
    clearError,
    setSelectedRole,
    getRoleById,
    getRoleByName
  };
});
