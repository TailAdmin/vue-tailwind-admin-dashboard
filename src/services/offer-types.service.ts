// services/offer-types.service.ts
import { apiClient } from './api-client';
import { API_CONFIG } from '@/config/api.config';
import type {
  OfferType,
  CreateOfferTypeRequest,
  UpdateOfferTypeRequest
} from '@/types/offers.types';

class OfferTypesService {
  /**
   * الحصول على جميع أنواع العروض
   */
  async getAll(): Promise<OfferType[]> {
    return await apiClient.get<OfferType[]>(
      'offersManager',
      API_CONFIG.offerTypes.endpoints.base
    );
  }

  /**
   * الحصول على نوع عرض بواسطة ID
   */
  async getById(id: string): Promise<OfferType> {
    return await apiClient.get<OfferType>(
      'offersManager',
      `${API_CONFIG.offerTypes.endpoints.base}/${id}`
    );
  }

  /**
   * إنشاء نوع عرض جديد
   */
  async create(request: CreateOfferTypeRequest): Promise<OfferType> {
    return await apiClient.post<CreateOfferTypeRequest, OfferType>(
      'offersManager',
      API_CONFIG.offerTypes.endpoints.base,
      request
    );
  }

  /**
   * تحديث نوع عرض
   */
  async update(id: string, request: UpdateOfferTypeRequest): Promise<{ success: boolean; message: string }> {
    return await apiClient.put<UpdateOfferTypeRequest, { success: boolean; message: string }>(
      'offersManager',
      `${API_CONFIG.offerTypes.endpoints.base}/${id}`,
      request
    );
  }

  /**
   * حذف نوع عرض
   */
  async delete(id: string): Promise<{ success: boolean; message: string }> {
    return await apiClient.delete<{ success: boolean; message: string }>(
      'offersManager',
      `${API_CONFIG.offerTypes.endpoints.base}/${id}`
    );
  }
}

export const offerTypesService = new OfferTypesService();
export default offerTypesService;