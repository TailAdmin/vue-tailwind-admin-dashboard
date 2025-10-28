// types/user-profile.types.ts

/**
 * ملف تعريف المستخدم
 */
export interface UserProfile {
  firstName: string;
  lastName: string;
  city?: string;
  country?: string;
  profilePicturePath?: string;
  dateOfBirth?: string;
  phoneNumber?: string;
}

/**
 * مستخدم التطبيق (العميل)
 */
export interface AppUser {
  id: string;
  userName?: string;
  email?: string;
  phoneNumber?: string;
  nationalId?: string;
  emailConfirmed: boolean;
  phoneNumberConfirmed: boolean;
  lockoutEnabled: boolean;
  lockoutEnd?: string;
  createdAt: string;
  isActive: boolean;
  profile?: UserProfile;
}

/**
 * إحصائيات المستخدمين
 */
export interface UserStatistics {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  emailConfirmed: number;
  phoneConfirmed: number;
  newUsersThisMonth: number;
}

/**
 * نتيجة مقسمة للصفحات
 */
export interface PagedResult<T> {
  data: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

/**
 * معاملات البحث
 */
export interface SearchUsersParams {
  pageNumber?: number;
  pageSize?: number;
  searchTerm?: string;
  isActive?: boolean;
}