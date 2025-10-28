// ========================================
// Auth Composable - composables/useAuth.ts
// ========================================

import { ref, computed, readonly } from 'vue';
import { authService } from '../services/auth.service';
import type { ApiError } from '@/types/identity.types';
import type {
  LoginRequest,
  ChangePasswordRequest,
  UserInfo
} from '../types/identity.types';

// Shared state
const user = ref<UserInfo | null>(await authService.getStoredUser());
const isAuthenticated = ref(authService.isAuthenticated());
const isLoading = ref(false);
const error = ref<string | null>(null);

export function useAuth() {
  /**
   * تسجيل الدخول
   */
  const login = async (credentials: LoginRequest) => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await authService.login(credentials);
      user.value = response.user;
      //isAuthenticated.value = true;
      return response;
    } catch (err: unknown) {
      const apiErr = err as ApiError;
      error.value = apiErr?.response?.data?.message || 'فشل تسجيل الدخول';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * تسجيل الخروج
   */
  const logout = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      await authService.logout();
      user.value = null;
      //isAuthenticated.value = false;
    } catch (err: unknown) {
      const apiErr = err as ApiError;
      error.value = apiErr.response?.data?.message || 'فشل تسجيل الخروج';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * تحديث معلومات المستخدم
   */
  const refreshUser = async () => {
    try {
      const userData = await authService.getCurrentUser();
      user.value = userData;
      return userData;
    } catch (err) {
      console.error('Failed to refresh user:', err);
      throw err;
    }
  };

  /**
   * تغيير كلمة المرور
   */
  const changePassword = async (request: ChangePasswordRequest) => {
    isLoading.value = true;
    error.value = null;

    try {
      await authService.changePassword(request);
    } catch (err: unknown) {
      const apiErr = err as ApiError;
      error.value = apiErr.response?.data?.message || 'فشل تغيير كلمة المرور';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * التحقق من صلاحية معينة
   */
  const hasPermission = (permission: string): boolean => {
    return authService.hasPermission(permission);
  };

  /**
   * التحقق من أي صلاحية من قائمة
   */
  const hasAnyPermission = (permissions: string[]): boolean => {
    return authService.hasAnyPermission(permissions);
  };

  /**
   * التحقق من جميع الصلاحيات
   */
  const hasAllPermissions = (permissions: string[]): boolean => {
    return authService.hasAllPermissions(permissions);
  };

  /**
   * التحقق من الدور
   */
  const hasRole = (role: string): boolean => {
    return authService.hasRole(role);
  };

  // Computed properties
  const userRole = computed(() => user.value?.role);
  const userPermissions = computed(() => user.value?.permissions || []);
  const isAdmin = computed(() => hasRole('Admin') || hasRole('SuperAdmin'));
  const isSuperAdmin = computed(() => hasRole('SuperAdmin'));

  return {
    // State
    user: readonly(user),
    isAuthenticated: readonly(isAuthenticated),
    isLoading: readonly(isLoading),
    error: readonly(error),

    // Computed
    userRole,
    userPermissions,
    isAdmin,
    isSuperAdmin,

    // Methods
    login,
    logout,
    refreshUser,
    changePassword,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    hasRole
  };
}
