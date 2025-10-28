// services/property-types.service.ts
import { apiClient } from './api-client';
import { API_CONFIG } from '@/config/api.config';
import type { PropertyType } from '@/types/offers.types';

class PropertyTypesService {
  /**
   * الحصول على جميع أنواع العقارات
   */
  async getAll(): Promise<PropertyType[]> {
    return await apiClient.get<PropertyType[]>(
      'offersManager',
      API_CONFIG.propertyTypes.endpoints.base
    );
  }

  /**
   * الحصول على نوع عقار بواسطة ID
   */
  async getById(id: string): Promise<PropertyType> {
    return await apiClient.get<PropertyType>(
      'offersManager',
      `${API_CONFIG.propertyTypes.endpoints.base}/${id}`
    );
  }

  /**
   * إنشاء نوع عقار جديد
   */
  async create(request: { name: string }): Promise<PropertyType> {
    return await apiClient.post<{ name: string }, PropertyType>(
      'offersManager',
      API_CONFIG.propertyTypes.endpoints.base,
      request
    );
  }

  /**
   * تحديث نوع عقار
   */
  async update(id: string, request: { name: string }): Promise<{ success: boolean; message: string }> {
    return await apiClient.put<{ name: string }, { success: boolean; message: string }>(
      'offersManager',
      `${API_CONFIG.propertyTypes.endpoints.base}/${id}`,
      request
    );
  }

  /**
   * حذف نوع عقار
   */
  async delete(id: string): Promise<{ success: boolean; message: string }> {
    return await apiClient.delete<{ success: boolean; message: string }>(
      'offersManager',
      `${API_CONFIG.propertyTypes.endpoints.base}/${id}`
    );
  }
}

export const propertyTypesService = new PropertyTypesService();
export default propertyTypesService;