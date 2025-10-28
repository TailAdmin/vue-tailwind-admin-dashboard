// services/time-units.service.ts
import { apiClient } from './api-client';
import { API_CONFIG } from '@/config/api.config';
import type { TimeUnit } from '@/types/offers.types';

class TimeUnitsService {
  /**
   * الحصول على جميع الوحدات الزمنية
   */
  async getAll(): Promise<TimeUnit[]> {
    return await apiClient.get<TimeUnit[]>(
      'offersManager',
      API_CONFIG.timeUnits.endpoints.base
    );
  }

  /**
   * الحصول على وحدة زمنية بواسطة ID
   */
  async getById(id: string): Promise<TimeUnit> {
    return await apiClient.get<TimeUnit>(
      'offersManager',
      `${API_CONFIG.timeUnits.endpoints.base}/${id}`
    );
  }

  /**
   * إنشاء وحدة زمنية جديدة
   */
  async create(request: { name: string }): Promise<TimeUnit> {
    return await apiClient.post<{ name: string }, TimeUnit>(
      'offersManager',
      API_CONFIG.timeUnits.endpoints.base,
      request
    );
  }

  /**
   * تحديث وحدة زمنية
   */
  async update(id: string, request: { name: string }): Promise<{ success: boolean; message: string }> {
    return await apiClient.put<{ name: string }, { success: boolean; message: string }>(
      'offersManager',
      `${API_CONFIG.timeUnits.endpoints.base}/${id}`,
      request
    );
  }

  /**
   * حذف وحدة زمنية
   */
  async delete(id: string): Promise<{ success: boolean; message: string }> {
    return await apiClient.delete<{ success: boolean; message: string }>(
      'offersManager',
      `${API_CONFIG.timeUnits.endpoints.base}/${id}`
    );
  }
}

export const timeUnitsService = new TimeUnitsService();
export default timeUnitsService;