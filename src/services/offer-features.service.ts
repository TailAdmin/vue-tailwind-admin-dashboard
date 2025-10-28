// services/offer-features.service.ts
import { apiClient } from './api-client';
import { API_CONFIG } from '@/config/api.config';
import type { OfferFeature } from '@/types/offers.types';

class OfferFeaturesService {
  /**
   * الحصول على جميع مميزات العروض
   */
  async getAll(): Promise<OfferFeature[]> {
    return await apiClient.get<OfferFeature[]>(
      'offersManager',
      API_CONFIG.offerFeatures.endpoints.base
    );
  }

  /**
   * الحصول على ميزة عرض بواسطة ID
   */
  async getById(id: string): Promise<OfferFeature> {
    return await apiClient.get<OfferFeature>(
      'offersManager',
      `${API_CONFIG.offerFeatures.endpoints.base}/${id}`
    );
  }

  /**
   * إنشاء ميزة عرض جديدة
   */
  async create(request: { name: string }): Promise<OfferFeature> {
    return await apiClient.post<{ name: string }, OfferFeature>(
      'offersManager',
      API_CONFIG.offerFeatures.endpoints.base,
      request
    );
  }

  /**
   * تحديث ميزة عرض
   */
  async update(id: string, request: { name: string }): Promise<{ success: boolean; message: string }> {
    return await apiClient.put<{ name: string }, { success: boolean; message: string }>(
      'offersManager',
      `${API_CONFIG.offerFeatures.endpoints.base}/${id}`,
      request
    );
  }

  /**
   * حذف ميزة عرض
   */
  async delete(id: string): Promise<{ success: boolean; message: string }> {
    return await apiClient.delete<{ success: boolean; message: string }>(
      'offersManager',
      `${API_CONFIG.offerFeatures.endpoints.base}/${id}`
    );
  }
}

export const offerFeaturesService = new OfferFeaturesService();
export default offerFeaturesService;