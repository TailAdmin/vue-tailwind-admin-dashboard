// services/roles.service.ts
import { apiClient } from './api-client';
import { API_CONFIG } from '@/config/api.config';
import type {
  Role,
  CreateRoleRequest,
  UpdateRoleRequest,
  Permission,
  PagedResult,
  SmartSearchRequest
} from '@/types/identity.types';

class RolesService {
  // ✅ استخدام المثيل المشترك
  private api = apiClient;

  async getAll(): Promise<Role[]> {
    return await this.api.get<Role[]>('auth', API_CONFIG.roles.endpoints.base);
  }

  async getById(id: string): Promise<Role> {
    return await this.api.get<Role>('auth', 
      `${API_CONFIG.roles.endpoints.base}/${id}`
    );
  }

  async create(request: CreateRoleRequest): Promise<Role> {
    return await this.api.post<CreateRoleRequest, Role>('auth', 
      API_CONFIG.roles.endpoints.base,
      request
    );
  }

  async update(id: string, request: UpdateRoleRequest): Promise<void> {
    await this.api.put('auth', 
      `${API_CONFIG.roles.endpoints.base}/${id}`,
      request
    );
  }

  async delete(id: string): Promise<void> {
    await this.api.delete('auth', `${API_CONFIG.roles.endpoints.base}/${id}`);
  }

  async search(request: SmartSearchRequest): Promise<PagedResult<Role>> {
    return await this.api.post<SmartSearchRequest, PagedResult<Role>>('auth', 
      API_CONFIG.roles.endpoints.search,
      request
    );
  }

  async getAllPermissions(): Promise<Permission[]> {
    return await this.api.get<Permission[]>('auth', 
      API_CONFIG.roles.endpoints.permissions
    );
  }

  async getPermissionsGrouped(): Promise<Record<string, Permission[]>> {
    const permissions = await this.getAllPermissions();
    
    return permissions.reduce((groups, permission) => {
      const type = permission.resourceType;
      if (!groups[type]) {
        groups[type] = [];
      }
      groups[type].push(permission);
      return groups;
    }, {} as Record<string, Permission[]>);
  }

  async assignPermissions(roleId: string, permissionIds: string[]): Promise<void> {
    await this.update(roleId, {
      permissionIds
    });
  }
}

export const rolesService = new RolesService();
export default rolesService;