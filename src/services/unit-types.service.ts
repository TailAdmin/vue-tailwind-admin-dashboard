// services/unit-types.service.ts
import { apiClient } from './api-client';
import { API_CONFIG } from '@/config/api.config';
import type { UnitType } from '@/types/offers.types';

class UnitTypesService {
  /**
   * الحصول على جميع أنواع الوحدات
   */
  async getAll(): Promise<UnitType[]> {
    return await apiClient.get<UnitType[]>(
      'offersManager',
      API_CONFIG.unitTypes.endpoints.base
    );
  }

  /**
   * الحصول على نوع وحدة بواسطة ID
   */
  async getById(id: string): Promise<UnitType> {
    return await apiClient.get<UnitType>(
      'offersManager',
      `${API_CONFIG.unitTypes.endpoints.base}/${id}`
    );
  }

  /**
   * إنشاء نوع وحدة جديد
   */
  async create(request: { name: string }): Promise<UnitType> {
    return await apiClient.post<{ name: string }, UnitType>(
      'offersManager',
      API_CONFIG.unitTypes.endpoints.base,
      request
    );
  }

  /**
   * تحديث نوع وحدة
   */
  async update(id: string, request: { name: string }): Promise<{ success: boolean; message: string }> {
    return await apiClient.put<{ name: string }, { success: boolean; message: string }>(
      'offersManager',
      `${API_CONFIG.unitTypes.endpoints.base}/${id}`,
      request
    );
  }

  /**
   * حذف نوع وحدة
   */
  async delete(id: string): Promise<{ success: boolean; message: string }> {
    return await apiClient.delete<{ success: boolean; message: string }>(
      'offersManager',
      `${API_CONFIG.unitTypes.endpoints.base}/${id}`
    );
  }
}

export const unitTypesService = new UnitTypesService();
export default unitTypesService;