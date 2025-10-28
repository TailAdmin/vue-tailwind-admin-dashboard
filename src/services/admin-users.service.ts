// services/admin-users.service.ts
import { apiClient } from './api-client';
import { API_CONFIG } from '@/config/api.config';
import type {
  AdminUser,
  CreateAdminUserRequest,
  UpdateAdminUserRequest,
  ResetPasswordRequest,
  BulkAssignRoleRequest,
  UserStatistics,
  PagedResult,
  SmartSearchRequest,
  FilterOperator
} from '@/types/identity.types';

class AdminUsersService {
  /**
   * Get all admin users
   */
  async getAll(
    pageNumber = 1,
    pageSize = 10,
    includeDeleted = false
  ): Promise<PagedResult<AdminUser>> {
    const endpoint = `${API_CONFIG.adminUsers.endpoints.base}?pageNumber=${pageNumber}&pageSize=${pageSize}&includeDeleted=${includeDeleted}`;
    
    return await apiClient.get<PagedResult<AdminUser>>('auth', endpoint);
  }

  /**
   * Get admin user by ID
   */
  async getById(id: string): Promise<AdminUser> {
    return await apiClient.get<AdminUser>(
      'auth',
      `${API_CONFIG.adminUsers.endpoints.base}/${id}`
    );
  }

  /**
   * Create new admin user
   */
  async create(request: CreateAdminUserRequest): Promise<AdminUser> {
    return await apiClient.post<CreateAdminUserRequest, AdminUser>(
      'auth',
      API_CONFIG.adminUsers.endpoints.base,
      request
    );
  }

  /**
   * Update admin user
   */
  async update(id: string, request: UpdateAdminUserRequest): Promise<void> {
    await apiClient.put(
      'auth',
      `${API_CONFIG.adminUsers.endpoints.base}/${id}`,
      request
    );
  }

  /**
   * Delete admin user
   */
  async delete(id: string): Promise<void> {
    await apiClient.delete('auth', `${API_CONFIG.adminUsers.endpoints.base}/${id}`);
  }

  /**
   * Restore deleted admin user
   */
  async restore(id: string): Promise<void> {
    await apiClient.post(
      'auth',
      `${API_CONFIG.adminUsers.endpoints.base}/${id}/restore`,
      {}
    );
  }

  /**
   * Search admin users with filters
   */
  async search(request: SmartSearchRequest): Promise<PagedResult<AdminUser>> {
    return await apiClient.post<SmartSearchRequest, PagedResult<AdminUser>>(
      'auth',
      API_CONFIG.adminUsers.endpoints.search,
      request
    );
  }

  /**
   * Bulk activate users
   */
  async bulkActivate(userIds: string[]): Promise<void> {
    await apiClient.post(
      'auth',
      API_CONFIG.adminUsers.endpoints.bulkActivate,
      userIds
    );
  }

  /**
   * Bulk deactivate users
   */
  async bulkDeactivate(userIds: string[]): Promise<void> {
    await apiClient.post(
      'auth',
      API_CONFIG.adminUsers.endpoints.bulkDeactivate,
      userIds
    );
  }

  /**
   * Bulk delete users
   */
  async bulkDelete(userIds: string[]): Promise<void> {
    await apiClient.post(
      'auth',
      API_CONFIG.adminUsers.endpoints.bulkDelete,
      userIds
    );
  }

  /**
   * Bulk restore users
   */
  async bulkRestore(userIds: string[]): Promise<void> {
    await apiClient.post(
      'auth',
      API_CONFIG.adminUsers.endpoints.bulkRestore,
      userIds
    );
  }

  /**
   * Bulk assign role
   */
  async bulkAssignRole(request: BulkAssignRoleRequest): Promise<void> {
    await apiClient.post(
      'auth',
      API_CONFIG.adminUsers.endpoints.bulkAssignRole,
      request
    );
  }

  /**
   * Reset user password
   */
  async resetPassword(userId: string, newPassword: string): Promise<void> {
    await apiClient.post(
      'auth',
      `${API_CONFIG.adminUsers.endpoints.base}/${userId}/reset-password`,
      { newPassword } as ResetPasswordRequest
    );
  }

  /**
   * Get user statistics
   */
  async getStatistics(): Promise<UserStatistics> {
    return await apiClient.get<UserStatistics>(
      'auth',
      API_CONFIG.adminUsers.endpoints.statistics
    );
  }

  /**
   * Filter by role
   */
  async filterByRole(
    roleId: string,
    pageNumber = 1,
    pageSize = 10
  ): Promise<PagedResult<AdminUser>> {
    return await this.search({
      filters: [
        {
          propertyName: 'RoleId',
          value: roleId,
          operator: 'Equals' as FilterOperator
        }
      ],
      pageNumber,
      pageSize
    });
  }

  /**
   * Filter by status
   */
  async filterByStatus(
    isActive: boolean,
    pageNumber = 1,
    pageSize = 10
  ): Promise<PagedResult<AdminUser>> {
    return await this.search({
      filters: [
        {
          propertyName: 'IsActive',
          value: isActive,
          operator: 'Equals' as FilterOperator
        }
      ],
      pageNumber,
      pageSize
    });
  }
}

export const adminUsersService = new AdminUsersService();
export default adminUsersService;