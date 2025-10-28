// config/api.config.ts

/**
 * تكوين الخدمات المصغرة
 */
export const SERVICES = {
  // خدمة المصادقة والمستخدمين الإداريين
  auth: {
    baseUrl: import.meta.env.VITE_AUTH_API_URL || 'http://ashare-001-site9.mtempurl.com',
    name: 'Auth Service'
  },
  
  // خدمة ملفات المستخدمين (العملاء)
  userProfiles: {
    baseUrl: import.meta.env.VITE_USER_PROFILES_API_URL || 'http://ashare-001-site8.mtempurl.com',
    name: 'User Profiles Service'
  },
  
  // ✅ خدمة العروض - الإدارة
  offersManager: {
    baseUrl: import.meta.env.VITE_OFFERS_MANAGER_API_URL || 'http://ashare-001-site6.mtempurl.com/',
    name: 'Offers Manager Service'
  },
  
  // ✅ خدمة العروض - الاستعلامات
  offersSearcher: {
    baseUrl: import.meta.env.VITE_OFFERS_SEARCHER_API_URL || 'http://ashare-001-site4.mtempurl.com/',
    name: 'Offers Searcher Service'
  }
} as const;

/**
 * الحصول على Base URL حسب الخدمة
 */
export const getServiceUrl = (service: keyof typeof SERVICES): string => {
  return SERVICES[service].baseUrl;
};

/**
 * تكوين API العام
 */
export const API_CONFIG = {
  // Storage Keys
  storageKeys: {
    accessToken: 'auth_token',
    refreshToken: 'refresh_token',
    user: 'user_info'
  },

  // Default Settings
  timeout: 30000,
  retryAttempts: 3,

  // ========================================
  // Admin Offers (في Offers Manager Service)
  // ========================================
  offers: {
    service: 'offersManager' as const,
    endpoints: {
      base: '/api/admin/offers',
      create: '/api/Offers/CreateOffer', // ✅ إضافة
      statistics: '/api/admin/offers/statistics',
      search: '/api/admin/offers/search',
      toggleStatus: (id: string) => `/api/admin/offers/${id}/toggle-status`,
      activate: (id: string) => `/api/admin/offers/${id}/activate`,
      deactivate: (id: string) => `/api/admin/offers/${id}/deactivate`,
      bulkActivate: '/api/admin/offers/bulk-activate',
      bulkDeactivate: '/api/admin/offers/bulk-deactivate',
      bulkDelete: '/api/admin/offers/bulk-delete'
    }
  },

  // ========================================
  // Lookup Data - Offer Types
  // ========================================
  offerTypes: {
    service: 'offersManager' as const,
    endpoints: {
      base: '/api/admin/offer-types'
    }
  },

  // ========================================
  // Lookup Data - Unit Types
  // ========================================
  unitTypes: {
    service: 'offersManager' as const,
    endpoints: {
      base: '/api/admin/unit-types'
    }
  },

  // ========================================
  // Lookup Data - Time Units
  // ========================================
  timeUnits: {
    service: 'offersManager' as const,
    endpoints: {
      base: '/api/admin/time-units'
    }
  },

  // ========================================
  // Lookup Data - Offer Features
  // ========================================
  offerFeatures: {
    service: 'offersManager' as const,
    endpoints: {
      base: '/api/admin/offer-features'
    }
  },

  // ========================================
  // Lookup Data - Floors
  // ========================================
  floors: {
    service: 'offersManager' as const,
    endpoints: {
      base: '/api/admin/floors'
    }
  },

  // ========================================
  // Lookup Data - Property Types
  // ========================================
  propertyTypes: {
    service: 'offersManager' as const,
    endpoints: {
      base: '/api/admin/property-types'
    }
  },

  // ========================================
  // Auth Service Endpoints
  // ========================================
  auth: {
    service: 'auth' as const,
    endpoints: {
      login: '/api/Auth/login',
      logout: '/api/auth/logout',
      refresh: '/api/auth/refresh',
      me: '/api/auth/me',
      changePassword: '/api/auth/change-password',
      validate: '/api/auth/validate'
    }
  },

  // ========================================
  // Admin Users (في نفس خدمة Auth)
  // ========================================
  adminUsers: {
    service: 'auth' as const,
    endpoints: {
      base: '/api/admin-users',
      search: '/api/admin-users/search',
      getById: (id: string) => `/api/admin/users/${id}`,
      statistics: '/api/admin-users/statistics',
      bulkActivate: '/api/admin-users/bulk-activate',
      bulkDeactivate: '/api/admin-users/bulk-deactivate',
      bulkDelete: '/api/admin-users/bulk-delete',
      bulkRestore: '/api/admin-users/bulk-restore',
      bulkAssignRole: '/api/admin-users/bulk-assign-role'
    }
  },

  // ========================================
  // Roles (في نفس خدمة Auth)
  // ========================================
  roles: {
    service: 'auth' as const,
    endpoints: {
      base: '/api/roles',
      search: '/api/roles/search',
      permissions: '/api/roles/permissions'
    }
  },

  dashboard: {
    offers: {
      service: 'offersManager' as const,
      endpoints: {
        statistics: '/api/Dashboard/offers-statistics'
      }
    },
    users: {
      service: 'auth' as const,
      endpoints: {
        statistics: '/api/Dashboard/users-statistics'
      }
    }
  },

  // ========================================
  // User Profiles (خدمة منفصلة)
  // ========================================
  userProfiles: {
    service: 'userProfiles' as const,
    endpoints: {
      base: '/api/admin/users',
      statistics: '/api/admin/users/statistics',
      toggleStatus: (id: string) => `/api/admin/users/${id}/toggle-status`,
      confirmEmail: (id: string) => `/api/admin/users/${id}/confirm-email`,
      confirmPhone: (id: string) => `/api/admin/users/${id}/confirm-phone`
    }
  }
} as const;

/**
 * الحصول على URL كامل للـ endpoint
 */
export const getFullUrl = (
  service: keyof typeof SERVICES,
  endpoint: string
): string => {
  const baseUrl = getServiceUrl(service);
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${baseUrl}${cleanEndpoint}`;
};

export default API_CONFIG;