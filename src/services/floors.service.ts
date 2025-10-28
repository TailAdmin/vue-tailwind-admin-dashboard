// services/floors.service.ts
import { apiClient } from './api-client';
import { API_CONFIG } from '@/config/api.config';
import type { Floor } from '@/types/offers.types';

class FloorsService {
  /**
   * الحصول على جميع الأدوار
   */
  async getAll(): Promise<Floor[]> {
    return await apiClient.get<Floor[]>(
      'offersManager',
      API_CONFIG.floors.endpoints.base
    );
  }

  /**
   * الحصول على دور بواسطة ID
   */
  async getById(id: string): Promise<Floor> {
    return await apiClient.get<Floor>(
      'offersManager',
      `${API_CONFIG.floors.endpoints.base}/${id}`
    );
  }

  /**
   * إنشاء دور جديد
   */
  async create(request: { name: string }): Promise<Floor> {
    return await apiClient.post<{ name: string }, Floor>(
      'offersManager',
      API_CONFIG.floors.endpoints.base,
      request
    );
  }

  /**
   * تحديث دور
   */
  async update(id: string, request: { name: string }): Promise<{ success: boolean; message: string }> {
    return await apiClient.put<{ name: string }, { success: boolean; message: string }>(
      'offersManager',
      `${API_CONFIG.floors.endpoints.base}/${id}`,
      request
    );
  }

  /**
   * حذف دور
   */
  async delete(id: string): Promise<{ success: boolean; message: string }> {
    return await apiClient.delete<{ success: boolean; message: string }>(
      'offersManager',
      `${API_CONFIG.floors.endpoints.base}/${id}`
    );
  }
}

export const floorsService = new FloorsService();
export default floorsService;