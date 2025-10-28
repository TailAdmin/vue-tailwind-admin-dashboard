// ========================================
// Router Configuration - router/index.ts
// مع Guards للمصادقة والصلاحيات
// ========================================

import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';

// ========================================
// Public Routes (بدون مصادقة)
// ========================================
const publicRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Auth/AuthSignin.vue'),
    meta: {
      title: 'تسجيل الدخول',
      public: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Auth/AuthSignup.vue'),
    meta: {
      title: 'إنشاء حساب',
      public: true
    }
  },
  // {
  //   path: '/forgot-password',
  //   name: 'ForgotPassword',
  //   component: () => import('../views/Auth/ForgotPasswordView.vue'),
  //   meta: {
  //     title: 'نسيت كلمة المرور',
  //     public: true
  //   }
  // },
  {
    path: '/error-404',
    name: '404Error',
    component: () => import('../views/Errors/FourZeroFour.vue'),
    meta: {
      title: 'صفحة غير موجودة',
      public: true
    }
  },
  {
    path: '/unauthorized',
    name: 'Unauthorized',
    component: () => import('../views/Errors/AuthUnauthorized.vue'),
    meta: {
      title: 'غير مصرح',
      public: true
    }
  }
];

// ========================================
// Protected Routes (تحتاج مصادقة)
// ========================================
const protectedRoutes: RouteRecordRaw[] = [
  // Dashboard
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('../views/Ecommerce.vue'),
    meta: {
      title: 'لوحة التحكم',
      requiresAuth: true
    }
  },

  // ========================================
  // Identity Management Routes
  // ========================================
  {
    path: '/users',
    name: 'Users',
    component: () => import('../views/users/UsersView.vue'),
    meta: {
      title: 'إدارة المستخدمين',
      requiresAuth: true,
      requiresPermission: 'users.read'
    }
  },
  {
    path: '/AppUsers',
    name: 'AppUsers',
    component: () => import('../views/users/UserProfilesView.vue'),
    meta: {
      title: 'مستخدمي التطبيق',
      requiresAuth: true,
      requiresPermission: 'users.read'
    }
  },
  {
    path: '/offers/create',
    name: 'offers-create',
    component: () => import('@/views/Offers/CreateOfferView.vue'),
    meta: { requiresAuth: true, title: 'إنشاء عرض جديد' }
  },
  {
    path: '/Offers',
    name: 'Offers',
    component: () => import('../views/Offers/OffersView.vue'),
    meta: {
      title: 'مستخدمي التطبيق',
      requiresAuth: true,
      requiresPermission: 'users.read'
    }
  },
  {
    path: '/lookup-data',
    name: 'lookup-data',
    component: () => import('../views/Offers/LookupDataView.vue'),
    meta: {
      title: 'مستخدمي التطبيق',
      requiresAuth: true,
      requiresPermission: 'users.read'
    }
  },

  // ========================================
  // Profile Routes
  // ========================================
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Others/UserProfile.vue'),
    meta: {
      title: 'الملف الشخصي',
      requiresAuth: true
    }
  },
  // {
  //   path: '/profile/edit',
  //   name: 'ProfileEdit',
  //   component: () => import('../views/profile/ProfileEditView.vue'),
  //   meta: {
  //     title: 'تعديل الملف الشخصي',
  //     requiresAuth: true
  //   }
  // },
  // {
  //   path: '/profile/change-password',
  //   name: 'ChangePassword',
  //   component: () => import('../views/profile/ChangePasswordView.vue'),
  //   meta: {
  //     title: 'تغيير كلمة المرور',
  //     requiresAuth: true
  //   }
  // },

  // ========================================
  // Original Routes
  // ========================================
  {
    path: '/calendar',
    name: 'Calendar',
    component: () => import('../views/Others/Calendar.vue'),
    meta: {
      title: 'التقويم',
      requiresAuth: true
    }
  },
  {
    path: '/form-elements',
    name: 'FormElements',
    component: () => import('../views/Forms/FormElements.vue'),
    meta: {
      title: 'عناصر النماذج',
      requiresAuth: true
    }
  },
  {
    path: '/basic-tables',
    name: 'BasicTables',
    component: () => import('../views/Tables/BasicTables.vue'),
    meta: {
      title: 'الجداول الأساسية',
      requiresAuth: true
    }
  },
  {
    path: '/line-chart',
    name: 'LineChart',
    component: () => import('../views/Chart/LineChart/LineChart.vue'),
    meta: {
      title: 'مخطط خطي',
      requiresAuth: true
    }
  },
  {
    path: '/bar-chart',
    name: 'BarChart',
    component: () => import('../views/Chart/BarChart/BarChart.vue'),
    meta: {
      title: 'مخطط أعمدة',
      requiresAuth: true
    }
  },
  {
    path: '/alerts',
    name: 'Alerts',
    component: () => import('../views/UiElements/Alerts.vue'),
    meta: {
      title: 'التنبيهات',
      requiresAuth: true
    }
  },
  {
    path: '/avatars',
    name: 'Avatars',
    component: () => import('../views/UiElements/Avatars.vue'),
    meta: {
      title: 'الصور الرمزية',
      requiresAuth: true
    }
  },
  {
    path: '/badge',
    name: 'Badge',
    component: () => import('../views/UiElements/Badges.vue'),
    meta: {
      title: 'الشارات',
      requiresAuth: true
    }
  },
  {
    path: '/buttons',
    name: 'Buttons',
    component: () => import('../views/UiElements/Buttons.vue'),
    meta: {
      title: 'الأزرار',
      requiresAuth: true
    }
  },
  {
    path: '/images',
    name: 'Images',
    component: () => import('../views/UiElements/Images.vue'),
    meta: {
      title: 'الصور',
      requiresAuth: true
    }
  },
  {
    path: '/videos',
    name: 'Videos',
    component: () => import('../views/UiElements/Videos.vue'),
    meta: {
      title: 'الفيديوهات',
      requiresAuth: true
    }
  },
  {
    path: '/blank',
    name: 'Blank',
    component: () => import('../views/Pages/BlankPage.vue'),
    meta: {
      title: 'صفحة فارغة',
      requiresAuth: true
    }
  }
];

// ========================================
// Router Configuration
// ========================================
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 };
  },
  routes: [
    ...publicRoutes,
    ...protectedRoutes,
    // Catch all 404
    {
      path: '/:pathMatch(.*)*',
      redirect: '/error-404'
    }
  ]
});

// ========================================
// Navigation Guards
// ========================================

/**
 * Before Each Guard
 * - التحقق من المصادقة
 * - التحقق من الصلاحيات
 * - إعادة التوجيه إذا لزم الأمر
 */
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  // تحديث عنوان الصفحة
  const title = to.meta.title as string || 'لوحة التحكم';
  document.title = `${title} | Ashir Dashboard`;

  // ========================================
  // 1. التحقق من المصادقة
  // ========================================
  const requiresAuth = to.meta.requiresAuth as boolean;
  const isPublic = to.meta.public as boolean;

  // إذا كان المستخدم مسجل الدخول ويحاول الوصول لصفحة عامة
  if (isPublic && authStore.isAuthenticated) {
    // إذا كان في صفحة login أو register، أعده للـ dashboard
    if (to.name === 'Login' || to.name === 'Register') {
      next({ name: 'Dashboard' });
      return;
    }
  }

  // إذا كانت الصفحة تحتاج مصادقة
  if (requiresAuth && !authStore.isAuthenticated) {
    next({
      name: 'Login',
      query: { redirect: to.fullPath } // حفظ الصفحة المطلوبة
    });
    return;
  }

  // ========================================
  // 2. التحقق من الصلاحيات
  // ========================================
  const requiresPermission = to.meta.requiresPermission as string;

  if (requiresPermission && authStore.isAuthenticated) {
    if (!authStore.hasPermission(requiresPermission)) {
      console.error(`Missing permission: ${requiresPermission}`);
      console.log('User permissions:', authStore.user?.permissions);
    
      next({ name: 'Unauthorized' });
        return;
    }
  }

  // ========================================
  // 3. التحقق من الأدوار
  // ========================================
  const requiresRole = to.meta.requiresRole as string;

  if (requiresRole && authStore.isAuthenticated) {
    if (!authStore.hasRole(requiresRole)) {
      console.error(`Missing permission: ${requiresPermission}`);
      console.log('User permissions:', authStore.user?.permissions);
      
      next({ name: 'Unauthorized' });
        return;
    }
  }

  // ========================================
  // 4. السماح بالمتابعة
  // ========================================
  next();
});

/**
 * After Each Guard
 * - يمكن استخدامه للتحليلات أو Logging
 */
router.afterEach((to, from) => {
  // يمكنك إضافة Google Analytics أو غيره هنا
  console.log(`Navigated from ${from.path} to ${to.path}`);
});

/**
 * Error Handler
 */
router.onError((error) => {
  console.error('Router Error:', error);
});

export default router;

// ========================================
// Route Meta Types (للـ TypeScript)
// ========================================
declare module 'vue-router' {
  interface RouteMeta {
    title?: string;
    requiresAuth?: boolean;
    requiresPermission?: string;
    requiresRole?: string;
    public?: boolean;
  }
}