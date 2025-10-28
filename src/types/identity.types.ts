// ========================================
// Types/DTOs - types/identity.types.ts
// ========================================

// Auth DTOs
export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
  user: UserInfo;
}

export interface UserInfo {
  id: string;
  email: string;
  fullName: string;
  role: string;
  permissions: string[];
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

// Admin User DTOs
export interface AdminUser {
  id: string;
  email: string;
  fullName: string;
  isActive: boolean;
  lastLoginAt?: string;
  roleId: string;
  roleName: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateAdminUserRequest {
  email: string;
  password: string;
  fullName: string;
  roleId: string;
  isActive?: boolean;
}

export interface UpdateAdminUserRequest {
  fullName?: string;
  roleId?: string;
  isActive?: boolean;
}

export interface ResetPasswordRequest {
  newPassword: string;
}

export interface BulkAssignRoleRequest {
  userIds: string[];
  roleId: string;
}

export interface UserStatistics {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  deletedUsers: number;
  usersLoggedInLastWeek: number;
  usersLoggedInLastMonth: number;
  usersNeverLoggedIn: number;
  usersByRole: Array<{ roleId: string; count: number }>;
}

// Role DTOs
export interface Role {
  id: string;
  name: string;
  description: string;
  isSystemRole: boolean;
  permissions: Permission[];
  usersCount: number;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateRoleRequest {
  name: string;
  description: string;
  permissionIds: string[];
}

export interface UpdateRoleRequest {
  name?: string;
  description?: string;
  permissionIds?: string[];
}

export interface Permission {
  id: string;
  name: string;
  displayName: string;
  description: string;
  resourceType: string;
  action: string;
}

// Paged Result
export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// Smart Search Request
export interface SmartSearchRequest {
  searchTerm?: string;
  filters?: FilterItem[];
  pageNumber?: number;
  pageSize?: number;
  orderBy?: string;
  ascending?: boolean;
  includeProperties?: string[];
  includeDeleted?: boolean;
}

export interface FilterItem {
  propertyName: string;
  value: unknown; // Changed from any
  secondValue?: unknown; // Changed from any
  operator: FilterOperator;
}

export enum FilterOperator {
  Equals = 'Equals',
  Contains = 'Contains',
  StartsWith = 'StartsWith',
  EndsWith = 'EndsWith',
  GreaterThan = 'GreaterThan',
  LessThan = 'LessThan',
  GreaterThanOrEqual = 'GreaterThanOrEqual',
  LessThanOrEqual = 'LessThanOrEqual',
  Between = 'Between',
  In = 'In',
  NotIn = 'NotIn',
  IsNull = 'IsNull',
  IsNotNull = 'IsNotNull'
}

// API Error Response
export interface ApiErrorResponse {
  message: string;
  errors?: Array<{ field: string; message: string }>;
  detail?: string;
}

// API Response Types
export interface ApiError {
  response?: {
    status: number;
    data?: ApiErrorResponse;
  };
  message: string;
}
