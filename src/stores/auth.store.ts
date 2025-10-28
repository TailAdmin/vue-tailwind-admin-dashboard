// stores/auth.store.ts
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { authService } from '@/services/auth.service';
import type {
  LoginRequest,
  LoginResponse,
  ChangePasswordRequest,
  UserInfo
} from '@/types/identity.types';

export const useAuthStore = defineStore('auth', () => {
  // ========================================
  // State
  // ========================================
  const user = ref<UserInfo | null>(null);
  const isAuthenticated = ref(false);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // ========================================
  // Getters
  // ========================================
  const userRole = computed(() => user.value?.role);
  const userPermissions = computed(() => user.value?.permissions || []);
  const isAdmin = computed(() => 
    user.value?.role === 'Admin' || user.value?.role === 'SuperAdmin'
  );
  const isSuperAdmin = computed(() => user.value?.role === 'SuperAdmin');
  const userFullName = computed(() => user.value?.fullName || '');
  const userEmail = computed(() => user.value?.email || '');

  // ========================================
  // Actions
  // ========================================

  async function login(credentials: LoginRequest): Promise<LoginResponse> {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await authService.login(credentials);
      user.value = response.user;
      isAuthenticated.value = true;
      return response;
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { message?: string } } };
      error.value = apiError.response?.data?.message || 'فشل تسجيل الدخول';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  async function logout(): Promise<void> {
    isLoading.value = true;
    error.value = null;

    try {
      await authService.logout();
      user.value = null;
      isAuthenticated.value = false;
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { message?: string } } };
      error.value = apiError.response?.data?.message || 'فشل تسجيل الخروج';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  async function refreshUser(): Promise<void> {
    isLoading.value = true;
    error.value = null;

    try {
      const userData = await authService.getCurrentUser();
      user.value = userData;
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { message?: string } } };
      error.value = apiError.response?.data?.message || 'فشل تحديث البيانات';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  async function changePassword(request: ChangePasswordRequest): Promise<void> {
    isLoading.value = true;
    error.value = null;

    try {
      await authService.changePassword(request);
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { message?: string } } };
      error.value = apiError.response?.data?.message || 'فشل تغيير كلمة المرور';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  async function hasPermission(permission: string): Promise<boolean> {
    return await authService.hasPermission(permission);
  }

  async function hasAnyPermission(permissions: string[]): Promise<boolean> {
    return await authService.hasAnyPermission(permissions);
  }

  async function hasAllPermissions(permissions: string[]): Promise<boolean> {
    return await authService.hasAllPermissions(permissions);
  }

  async function hasRole(role: string): Promise<boolean> {
    return await authService.hasRole(role);
  }

  function clearError(): void {
    error.value = null;
  }

  // ✅ تحميل حالة المصادقة عند بدء التطبيق
  async function initializeAuth(): Promise<void> {
    try {
      user.value = await authService.getStoredUser();
      isAuthenticated.value = await authService.isAuthenticated();
    } catch (error) {
      console.error('Failed to initialize auth:', error);
      user.value = null;
      isAuthenticated.value = false;
    }
  }

  return {
    // State
    user,
    isAuthenticated,
    isLoading,
    error,

    // Getters
    userRole,
    userPermissions,
    isAdmin,
    isSuperAdmin,
    userFullName,
    userEmail,

    // Actions
    login,
    logout,
    refreshUser,
    changePassword,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    hasRole,
    clearError,
    initializeAuth
  };
});