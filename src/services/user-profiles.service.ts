// services/user-profiles.service.ts
import { apiClient } from './api-client';
import { API_CONFIG } from '@/config/api.config';
import type {
  AppUser,
  UserStatistics,
  PagedResult,
  SearchUsersParams
} from '@/types/user-profile.types';

class UserProfilesService {
  async getAll(params?: SearchUsersParams): Promise<PagedResult<AppUser>> {
    const queryParams = new URLSearchParams();
    
    if (params?.pageNumber) queryParams.append('pageNumber', params.pageNumber.toString());
    if (params?.pageSize) queryParams.append('pageSize', params.pageSize.toString());
    if (params?.searchTerm) queryParams.append('searchTerm', params.searchTerm);
    if (params?.isActive !== undefined) queryParams.append('isActive', params.isActive.toString());

    const endpoint = `${API_CONFIG.userProfiles.endpoints.base}${queryParams.toString() ? `?${queryParams}` : ''}`;
    
    // ✅ استخدام خدمة userProfiles
    return await apiClient.get<PagedResult<AppUser>>(
      'userProfiles', // اسم الخدمة المختلف
      endpoint
    );
  }

  async getById(id: string): Promise<AppUser> {
    return await apiClient.get<AppUser>(
      'userProfiles',
      `${API_CONFIG.userProfiles.endpoints.base}/${id}`
    );
  }

  async toggleStatus(id: string): Promise<{ success: boolean; isActive: boolean; message: string }> {
    return await apiClient.post<void, { success: boolean; isActive: boolean; message: string }>(
      'userProfiles',
      API_CONFIG.userProfiles.endpoints.toggleStatus(id),
      undefined
    );
  }

  async confirmEmail(id: string): Promise<{ success: boolean; message: string }> {
    return await apiClient.post<void, { success: boolean; message: string }>(
      'userProfiles',
      API_CONFIG.userProfiles.endpoints.confirmEmail(id),
      undefined
    );
  }

  async confirmPhone(id: string): Promise<{ success: boolean; message: string }> {
    return await apiClient.post<void, { success: boolean; message: string }>(
      'userProfiles',
      API_CONFIG.userProfiles.endpoints.confirmPhone(id),
      undefined
    );
  }

  async delete(id: string): Promise<{ success: boolean; message: string }> {
    return await apiClient.delete<{ success: boolean; message: string }>(
      'userProfiles',
      `${API_CONFIG.userProfiles.endpoints.base}/${id}`
    );
  }

  async getStatistics(): Promise<UserStatistics> {
    return await apiClient.get<UserStatistics>(
      'userProfiles',
      API_CONFIG.userProfiles.endpoints.statistics
    );
  }
}

export const userProfilesService = new UserProfilesService();
export default userProfilesService;