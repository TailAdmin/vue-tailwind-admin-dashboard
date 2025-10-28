// services/auth.service.ts
import { apiClient } from './api-client';
import { localStorageService } from './storage.service';
import { API_CONFIG } from '@/config/api.config';
import type {
  LoginRequest,
  LoginResponse,
  ChangePasswordRequest,
  UserInfo
} from '@/types/identity.types';

class AuthService {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    console.log('🔐 [Auth] Login attempt...');

    // ✅ استخدام خدمة auth
    const response = await apiClient.post<LoginRequest, LoginResponse>(
      'auth', // اسم الخدمة
      API_CONFIG.auth.endpoints.login,
      credentials,
      { skipAuth: true }
    );

    await this.saveAuthData(response);
    console.log('✅ [Auth] Login successful');
    
    return response;
  }

  async logout(): Promise<void> {
    console.log('🚪 [Auth] Logout...');
    
    try {
      const refreshToken = await this.getRefreshToken();
      
      if (refreshToken) {
        await apiClient.post(
          'auth',
          API_CONFIG.auth.endpoints.logout,
          { refreshToken }
        );
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      await this.clearAuthData();
    }
  }

  async refreshAccessToken(): Promise<string> {
    const refreshToken = await this.getRefreshToken();

    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await apiClient.post<{ refreshToken: string }, LoginResponse>(
      'auth',
      API_CONFIG.auth.endpoints.refresh,
      { refreshToken },
      { skipAuth: true }
    );

    await this.saveAuthData(response);
    return response.accessToken;
  }

  async getCurrentUser(): Promise<UserInfo> {
    return await apiClient.get<UserInfo>(
      'auth',
      API_CONFIG.auth.endpoints.me
    );
  }

  async changePassword(request: ChangePasswordRequest): Promise<void> {
    await apiClient.post(
      'auth',
      API_CONFIG.auth.endpoints.changePassword,
      request
    );
  }

  private async saveAuthData(data: LoginResponse): Promise<void> {
    await localStorageService.setAsync('auth_token', data.accessToken);
    await localStorageService.setAsync('refresh_token', data.refreshToken);
    await localStorageService.setAsync('user_info', JSON.stringify(data.user));
  }

  private async clearAuthData(): Promise<void> {
    await localStorageService.remove('auth_token');
    await localStorageService.remove('refresh_token');
    await localStorageService.remove('user_info');
  }

  async getAccessToken(): Promise<string | null> {
    return await localStorageService.getAsync('auth_token');
  }

  async getRefreshToken(): Promise<string | null> {
    return await localStorageService.getAsync('refresh_token');
  }

  async getStoredUser(): Promise<UserInfo | null> {
    const userStr = await localStorageService.getAsync('user_info');
    if (!userStr) return null;

    try {
      return JSON.parse(userStr) as UserInfo;
    } catch {
      return null;
    }
  }

  async isAuthenticated(): Promise<boolean> {
    const token = await this.getAccessToken();
    return !!token;
  }
}

export const authService = new AuthService();
export default authService;