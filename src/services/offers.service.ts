// services/offers.service.ts
import { apiClient  } from './api-client';
import type { MultipartFormData } from 'ashir-http-client';
import { API_CONFIG } from '@/config/api.config';
import type {
  OfferStatistics,
  OffersResponse,
  SearchOffersParams,
  CreateOfferCommand,
  UserSearchResult 
} from '@/types/offers.types';

class OffersService {
  /**
   * الحصول على جميع العروض مع البحث والتصفية
   */
  async getAll(params?: SearchOffersParams): Promise<OffersResponse> {
    const queryParams = new URLSearchParams();
    
    if (params?.pageNumber) queryParams.append('pageNumber', params.pageNumber.toString());
    if (params?.pageSize) queryParams.append('pageSize', params.pageSize.toString());
    if (params?.searchTerm) queryParams.append('searchTerm', params.searchTerm);
    if (params?.isActive !== undefined) queryParams.append('isActive', params.isActive.toString());
    if (params?.ownerId) queryParams.append('ownerId', params.ownerId);
    if (params?.offerTypeId) queryParams.append('offerTypeId', params.offerTypeId);
    if (params?.minPrice) queryParams.append('minPrice', params.minPrice.toString());
    if (params?.maxPrice) queryParams.append('maxPrice', params.maxPrice.toString());

    const endpoint = `${API_CONFIG.offers.endpoints.base}${queryParams.toString() ? `?${queryParams}` : ''}`;
    
    return await apiClient.get<OffersResponse>(
      'offersManager',
      endpoint
    );
  }

  /**
   * البحث عن المستخدمين
   */
  async searchUsers(searchTerm: string): Promise<UserSearchResult[]> {
    const params = new URLSearchParams();
    if (searchTerm) {
      params.append('searchTerm', searchTerm);
    }
    
    return await apiClient.get<UserSearchResult[]>(
      'auth',
      `/api/admin/users/search?${params.toString()}`
    );
  }

  /**
   * الحصول على مستخدم بواسطة ID
   */
  async getUserById(id: string): Promise<UserSearchResult> {
    return await apiClient.get<UserSearchResult>(
      'auth',
      `/api/admin/users/${id}`
    );
  }

  /**
   * تفعيل عرض
   */
  async activate(id: string): Promise<{ success: boolean; message: string }> {
    return await apiClient.post<void, { success: boolean; message: string }>(
      'offersManager',
      API_CONFIG.offers.endpoints.activate(id),
      undefined
    );
  }

  /**
   * تعطيل عرض
   */
  async deactivate(id: string): Promise<{ success: boolean; message: string }> {
    return await apiClient.post<void, { success: boolean; message: string }>(
      'offersManager',
      API_CONFIG.offers.endpoints.deactivate(id),
      undefined
    );
  }

  /**
   * تفعيل/تعطيل عرض
   */
  async toggleStatus(id: string): Promise<any> {
    return await apiClient.post<void, any>(
      'offersManager',
      API_CONFIG.offers.endpoints.toggleStatus(id),
      undefined
    );
  }

  /**
   * حذف عرض
   */
  async delete(id: string): Promise<{ success: boolean; message: string }> {
    return await apiClient.delete<{ success: boolean; message: string }>(
      'offersManager',
      `${API_CONFIG.offers.endpoints.base}/${id}`
    );
  }

  /**
   * تفعيل عروض متعددة
   */
  async bulkActivate(offerIds: string[]): Promise<{ success: boolean; message: string }> {
    return await apiClient.post<string[], { success: boolean; message: string }>(
      'offersManager',
      API_CONFIG.offers.endpoints.bulkActivate,
      offerIds
    );
  }

  /**
   * تعطيل عروض متعددة
   */
  async bulkDeactivate(offerIds: string[]): Promise<{ success: boolean; message: string }> {
    return await apiClient.post<string[], { success: boolean; message: string }>(
      'offersManager',
      API_CONFIG.offers.endpoints.bulkDeactivate,
      offerIds
    );
  }

  /**
   * حذف عروض متعددة
   */
  async bulkDelete(offerIds: string[]): Promise<{ success: boolean; message: string }> {
    return await apiClient.post<string[], { success: boolean; message: string }>(
      'offersManager',
      API_CONFIG.offers.endpoints.bulkDelete,
      offerIds
    );
  }

  /**
   * الحصول على إحصائيات العروض
   */
  async getStatistics(): Promise<OfferStatistics> {
    return await apiClient.get<OfferStatistics>(
      'offersManager',
      API_CONFIG.offers.endpoints.statistics
    );
  }

  /**
   * البحث عن عروض
   */
  async search(params: SearchOffersParams): Promise<OffersResponse> {
    return await apiClient.post<SearchOffersParams, OffersResponse>(
      'offersManager',
      API_CONFIG.offers.endpoints.search,
      params
    );
  }

  // services/offers.service.ts - إضافة في النهاية



  /**
   * الحصول على عرض بواسطة ID
   */
  async getById(id: string): Promise<OffersResponse> {
    return await apiClient.get<OffersResponse>(
      'offersManager',
      `${API_CONFIG.offers.endpoints.base}/${id}`
    );
  }

  /**
   * إنشاء عرض جديد
   */
  async create(command: CreateOfferCommand): Promise<{ id: string }> {
    // Validation
    this.validateCreateOfferCommand(command);

    const multipartData: MultipartFormData = {
      fields: this.buildOfferFields(command),
      files: this.buildOfferFiles(command)
    };

    return await apiClient.postMultipart<{ id: string }>(
      'offersManager',
      '/api/Offers/CreateOffer',
      multipartData
    );
  }

  /**
   * بناء الحقول النصية
   */
  private buildOfferFields(command: CreateOfferCommand): Record<string, string> {
    const fields: Record<string, string> = {
      // الحقول الإلزامية
      title: command.title,
      description: command.description,
      price: command.price.toString(),
      duration: command.duration.toString(),
      floorId: command.floorId,
      propertyTypeId: command.propertyTypeId,
      timeUnitId: command.timeUnitId,
      offerTypeId: command.offerTypeId,
      unitTypeId: command.unitTypeId,
      billType: command.billType.toString(),
      rentalType: command.rentalType.toString(),
      ownerId: command.ownerId,
      
      // طرق التواصل
      isPhoneAllowed: command.isPhoneAllowed.toString(),
      isWhatsappAllowed: command.isWhatsappAllowed.toString(),
      isMessagingAllowed: command.isMessagingAllowed.toString()
    };

    // الحقول الاختيارية
    if (command.isActive !== undefined) {
      fields.isActive = command.isActive.toString();
    }
    if (command.neighborhoodId) fields.neighborhoodId = command.neighborhoodId;
    if (command.cityId) fields.cityId = command.cityId;
    if (command.countryId) fields.countryId = command.countryId;
    if (command.area) fields.area = command.area.toString();
    if (command.roomCount) fields.roomCount = command.roomCount.toString();
    if (command.bathroomCount) fields.bathroomCount = command.bathroomCount.toString();
    if (command.locationDescription) fields.locationDescription = command.locationDescription;
    if (command.latitude) fields.latitude = command.latitude.toString();
    if (command.longitude) fields.longitude = command.longitude.toString();

    // الميزات
    if (command.featureIds && command.featureIds.length > 0) {
      fields.featureIds = JSON.stringify(command.featureIds);
    }

    return fields;
  }

  /**
   * بناء قائمة الملفات
   */
  private buildOfferFiles(command: CreateOfferCommand): Array<{
    file: File | Blob;
    fileName: string;
    fieldName: string;
  }> {
    const files: Array<{
      file: File | Blob;
      fileName: string;
      fieldName: string;
    }> = [];

    // الصور
    if (command.images && command.images.length > 0) {
      command.images.forEach((image, index) => {
        files.push({
          file: image,
          fileName: image.name || `image_${index}.jpg`,
          fieldName: 'images'
        });
      });
    }

    // الفيديوهات
    if (command.videos && command.videos.length > 0) {
      command.videos.forEach((video, index) => {
        files.push({
          file: video,
          fileName: video.name || `video_${index}.mp4`,
          fieldName: 'videos'
        });
      });
    }

    return files;
  }

  /**
   * التحقق من صحة البيانات
   */
  private validateCreateOfferCommand(command: CreateOfferCommand): void {
    if (!command.title?.trim()) {
      throw new Error('العنوان مطلوب');
    }
    if (!command.description?.trim()) {
      throw new Error('الوصف مطلوب');
    }
    if (command.price <= 0) {
      throw new Error('السعر يجب أن يكون أكبر من صفر');
    }
    if (command.images && command.images.length > 10) {
      throw new Error('الحد الأقصى للصور هو 10');
    }
    if (command.videos && command.videos.length > 5) {
      throw new Error('الحد الأقصى للفيديوهات هو 5');
    }
  }
}

export const offersService = new OffersService();
export default offersService;