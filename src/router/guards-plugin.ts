// ========================================
// Router Guards - router/guards.ts
// ========================================

import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { authService } from '../services/auth.service';

/**
 * Auth Guard - التحقق من تسجيل الدخول
 */
export function authGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  if (to.meta.requiresAuth && !authService.isAuthenticated()) {
    // حفظ الصفحة المراد الوصول إليها
    next({
      name: 'login',
      query: { redirect: to.fullPath }
    });
  } else {
    next();
  }
}

/**
 * Guest Guard - للصفحات التي تتطلب عدم تسجيل الدخول
 */
export async function guestGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  if (to.meta.requiresGuest && await authService.isAuthenticated()) {
    next({ name: 'dashboard' });
  } else {
    next();
  }
}

/**
 * Permission Guard - التحقق من الصلاحيات
 */
export function permissionGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const requiredPermission = to.meta.permission as string | undefined;
  const requiredPermissions = to.meta.permissions as string[] | undefined;

  if (requiredPermission && !authService.hasPermission(requiredPermission)) {
    next({ name: 'unauthorized' });
  } else if (requiredPermissions && !authService.hasAllPermissions(requiredPermissions)) {
    next({ name: 'unauthorized' });
  } else {
    next();
  }
}

/**
 * Role Guard - التحقق من الدور
 */
export function roleGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const requiredRole = to.meta.role as string | undefined;
  const requiredRoles = to.meta.roles as string[] | undefined;

  if (requiredRole && !authService.hasRole(requiredRole)) {
    next({ name: 'unauthorized' });
  } else if (requiredRoles && !requiredRoles.some(role => authService.hasRole(role))) {
    next({ name: 'unauthorized' });
  } else {
    next();
  }
}

/**
 * Combined Guard - دمج جميع Guards
 */
export async function combinedGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  // تحقق من Auth أولاً
  if (to.meta.requiresAuth && !(await authService.isAuthenticated())) {
    return next({
      name: 'login',
      query: { redirect: to.fullPath }
    });
  }

  // تحقق من Guest
  if (to.meta.requiresGuest && await authService.isAuthenticated()) {
    return next({ name: 'dashboard' });
  }

  // تحقق من الصلاحيات
  const requiredPermission = to.meta.permission as string | undefined;
  const requiredPermissions = to.meta.permissions as string[] | undefined;

  if (requiredPermission && !authService.hasPermission(requiredPermission)) {
    return next({ name: 'unauthorized' });
  }

  if (requiredPermissions && !authService.hasAllPermissions(requiredPermissions)) {
    return next({ name: 'unauthorized' });
  }

  // تحقق من الدور
  const requiredRole = to.meta.role as string | undefined;
  const requiredRoles = to.meta.roles as string[] | undefined;

  if (requiredRole && !authService.hasRole(requiredRole)) {
    return next({ name: 'unauthorized' });
  }

  if (requiredRoles && !requiredRoles.some(role => authService.hasRole(role))) {
    return next({ name: 'unauthorized' });
  }

  next();
}

// ========================================
// Vue Plugin - plugins/identity.plugin.ts
// ========================================

import type { App } from 'vue';
import { adminUsersService } from '../services/admin-users.service';
import { rolesService } from '../services/roles.service';
import type { NavigationGuard } from 'vue-router';

export interface IdentityPluginOptions {
router?: { beforeEach: (guard: NavigationGuard) => void };
}

export const IdentityPlugin = {
  install(app: App, options: IdentityPluginOptions = {}) {
    // توفير الخدمات globally
    app.provide('authService', authService);
    app.provide('adminUsersService', adminUsersService);
    app.provide('rolesService', rolesService);

    // إضافة خصائص global للـ component
    app.config.globalProperties.$auth = authService;
    app.config.globalProperties.$adminUsers = adminUsersService;
    app.config.globalProperties.$roles = rolesService;

    // إضافة directives للصلاحيات
    app.directive('permission', {
      mounted(el, binding) {
        const permission = binding.value;
        if (!authService.hasPermission(permission)) {
          el.style.display = 'none';
        }
      }
    });

    app.directive('any-permission', {
      mounted(el, binding) {
        const permissions = binding.value;
        if (!authService.hasAnyPermission(permissions)) {
          el.style.display = 'none';
        }
      }
    });

    app.directive('role', {
      mounted(el, binding) {
        const role = binding.value;
        if (!authService.hasRole(role)) {
          el.style.display = 'none';
        }
      }
    });

    // إضافة router guards إذا تم توفير router
    if (options.router) {
      options.router.beforeEach(combinedGuard);
    }
  }
};

// ========================================
// Example Routes Configuration
// ========================================

export const identityRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../layouts/AdminLayout.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: 'users',
        name: 'admin-users',
        component: () => import('../views/admin/UsersView.vue'),
        meta: {
          requiresAuth: true,
          permission: 'users.read'
        }
      },
      {
        path: 'users/create',
        name: 'admin-users-create',
        component: () => import('../views/admin/UserCreateView.vue'),
        meta: {
          requiresAuth: true,
          permission: 'users.create'
        }
      },
      {
        path: 'users/:id',
        name: 'admin-users-edit',
        component: () => import('../views/admin/UserEditView.vue'),
        meta: {
          requiresAuth: true,
          permission: 'users.update'
        }
      },
      {
        path: 'roles',
        name: 'admin-roles',
        component: () => import('../views/admin/RolesView.vue'),
        meta: {
          requiresAuth: true,
          permission: 'roles.read'
        }
      },
      {
        path: 'roles/create',
        name: 'admin-roles-create',
        component: () => import('../views/admin/RoleCreateView.vue'),
        meta: {
          requiresAuth: true,
          permission: 'roles.create'
        }
      },
      {
        path: 'roles/:id',
        name: 'admin-roles-edit',
        component: () => import('../views/admin/RoleEditView.vue'),
        meta: {
          requiresAuth: true,
          permission: 'roles.update'
        }
      }
    ]
  },
  {
    path: '/unauthorized',
    name: 'unauthorized',
    component: () => import('../views/UnauthorizedView.vue')
  }
];
