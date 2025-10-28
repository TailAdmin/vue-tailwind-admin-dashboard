// services/api-client.ts
import { ApiService } from 'ashir-http-client';
import type { MultipartFormData } from 'ashir-http-client';
import { SERVICES, getServiceUrl } from '@/config/api.config';
import { localStorageService } from './storage.service';
import { vueRouterNavigationService } from './navigation.service';

/**
 * مدير الخدمات المصغرة
 */
class ApiClientManager {
  private static instances: Map<string, ApiService> = new Map();

  /**
   * الحصول على مثيل للخدمة المحددة
   */
  static getInstance(service: keyof typeof SERVICES): ApiService {
    if (!ApiClientManager.instances.has(service)) {
      const instance = new ApiService({
        baseUrl: getServiceUrl(service),
        secureStorage: localStorageService,
        navigationService: vueRouterNavigationService
      });

      ApiClientManager.instances.set(service, instance);
      console.log(`✅ [ApiClient] Created instance for: ${SERVICES[service].name}`);
    }

    return ApiClientManager.instances.get(service)!;
  }

  /**
   * إعادة تعيين جميع المثيلات
   */
  static resetAll(): void {
    ApiClientManager.instances.clear();
  }
}

/**
 * واجهة موحدة للتعامل مع جميع الخدمات
 */
class ApiClient {
  /**
   * GET Request
   */
  static async get<T>(
    service: keyof typeof SERVICES,
    endpoint: string,
    parameters?: Record<string, string>,
    options?: { skipAuth?: boolean }
  ): Promise<T> {
    const instance = ApiClientManager.getInstance(service);
    const token = await localStorageService.getAsync('auth_token');

    console.log(`🔑 [API GET] ${SERVICES[service].name}`, {
      endpoint,
      hasToken: !!token
    });

    if (!options?.skipAuth) {
      if (!token) {
        console.log('❌ [No Token] Redirecting to login...');
        await vueRouterNavigationService.navigateToLogin();
        throw new Error('Not authenticated');
      }

      return instance.get<T>(endpoint, parameters, {
        skipAuth: false,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    }

    return instance.get<T>(endpoint, parameters, { skipAuth: true });
  }

  /**
   * POST Request
   */
  static async post<TRequest, TResponse>(
    service: keyof typeof SERVICES,
    endpoint: string,
    data: TRequest,
    options?: { skipAuth?: boolean }
  ): Promise<TResponse> {
    const instance = ApiClientManager.getInstance(service);
    const token = await localStorageService.getAsync('auth_token');

    console.log(`🔑 [API POST] ${SERVICES[service].name}`, {
      endpoint,
      hasToken: !!token
    });

    if (!options?.skipAuth) {
      if (!token) {
        console.log('❌ [No Token] Redirecting to login...');
        await vueRouterNavigationService.navigateToLogin();
        throw new Error('Not authenticated');
      }

      return instance.post<TRequest, TResponse>(endpoint, data, {
        skipAuth: false,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    }

    return instance.post<TRequest, TResponse>(endpoint, data, { skipAuth: true });
  }

  /**
   * POST Multipart Request - لرفع الملفات
   */
  static async postMultipart<TResponse>(
    service: keyof typeof SERVICES,
    endpoint: string,
    data: MultipartFormData,
    options?: { skipAuth?: boolean }
  ): Promise<TResponse> {
    const instance = ApiClientManager.getInstance(service);
    const token = await localStorageService.getAsync('auth_token');

    console.log(`📤 [API POST MULTIPART] ${SERVICES[service].name}`, {
      endpoint,
      hasToken: !!token,
      filesCount: data.files?.length || 0,
      fieldsCount: Object.keys(data.fields || {}).length
    });

    if (!options?.skipAuth) {
      if (!token) {
        console.log('❌ [No Token] Redirecting to login...');
        await vueRouterNavigationService.navigateToLogin();
        throw new Error('Not authenticated');
      }

      return instance.postMultipart<TResponse>(endpoint, data, {
        skipAuth: false,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    }

    return instance.postMultipart<TResponse>(endpoint, data, { skipAuth: true });
  }

  /**
   * Upload File - لرفع ملف واحد مع بيانات إضافية
   */
  static async uploadFile<TResponse>(
    service: keyof typeof SERVICES,
    endpoint: string,
    file: File | Blob,
    fileName: string,
    formDataName: string = 'file',
    additionalData?: Record<string, string>,
    options?: { skipAuth?: boolean }
  ): Promise<TResponse> {
    const instance = ApiClientManager.getInstance(service);
    const token = await localStorageService.getAsync('auth_token');

    console.log(`📁 [API UPLOAD FILE] ${SERVICES[service].name}`, {
      endpoint,
      hasToken: !!token,
      fileName,
      formDataName
    });

    if (!options?.skipAuth) {
      if (!token) {
        console.log('❌ [No Token] Redirecting to login...');
        await vueRouterNavigationService.navigateToLogin();
        throw new Error('Not authenticated');
      }

      return instance.uploadFile<TResponse>(
        endpoint,
        file,
        fileName,
        formDataName,
        additionalData,
        {
          skipAuth: false,
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
    }

    return instance.uploadFile<TResponse>(
      endpoint,
      file,
      fileName,
      formDataName,
      additionalData,
      { skipAuth: true }
    );
  }

  /**
   * PUT Request
   */
  static async put<TRequest, TResponse>(
    service: keyof typeof SERVICES,
    endpoint: string,
    data: TRequest,
    options?: { skipAuth?: boolean }
  ): Promise<TResponse> {
    const instance = ApiClientManager.getInstance(service);
    const token = await localStorageService.getAsync('auth_token');

    console.log(`🔑 [API PUT] ${SERVICES[service].name}`, {
      endpoint,
      hasToken: !!token
    });

    if (!options?.skipAuth) {
      if (!token) {
        console.log('❌ [No Token] Redirecting to login...');
        await vueRouterNavigationService.navigateToLogin();
        throw new Error('Not authenticated');
      }

      return instance.put<TRequest, TResponse>(endpoint, data, {
        skipAuth: false,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    }

    return instance.put<TRequest, TResponse>(endpoint, data, { skipAuth: true });
  }

  /**
   * PATCH Request
   */
  static async patch<TRequest, TResponse>(
    service: keyof typeof SERVICES,
    endpoint: string,
    data: TRequest,
    options?: { skipAuth?: boolean }
  ): Promise<TResponse> {
    const instance = ApiClientManager.getInstance(service);
    const token = await localStorageService.getAsync('auth_token');

    console.log(`🔑 [API PATCH] ${SERVICES[service].name}`, {
      endpoint,
      hasToken: !!token
    });

    if (!options?.skipAuth) {
      if (!token) {
        console.log('❌ [No Token] Redirecting to login...');
        await vueRouterNavigationService.navigateToLogin();
        throw new Error('Not authenticated');
      }

      return instance.patch<TRequest, TResponse>(endpoint, data, {
        skipAuth: false,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    }

    return instance.patch<TRequest, TResponse>(endpoint, data, { skipAuth: true });
  }

  /**
   * DELETE Request
   */
  static async delete<T>(
    service: keyof typeof SERVICES,
    endpoint: string,
    options?: { skipAuth?: boolean }
  ): Promise<T> {
    const instance = ApiClientManager.getInstance(service);
    const token = await localStorageService.getAsync('auth_token');

    console.log(`🔑 [API DELETE] ${SERVICES[service].name}`, {
      endpoint,
      hasToken: !!token
    });

    if (!options?.skipAuth) {
      if (!token) {
        console.log('❌ [No Token] Redirecting to login...');
        await vueRouterNavigationService.navigateToLogin();
        throw new Error('Not authenticated');
      }

      return instance.delete<T>(endpoint, {
        skipAuth: false,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    }

    return instance.delete<T>(endpoint, { skipAuth: true });
  }

  /**
   * الحصول على instance مباشرة (للاستخدام المتقدم)
   */
  static getInstance(service: keyof typeof SERVICES): ApiService {
    return ApiClientManager.getInstance(service);
  }

  /**
   * إعادة تعيين جميع الاتصالات
   */
  static reset(): void {
    ApiClientManager.resetAll();
  }
}

export const apiClient = {
  get: ApiClient.get.bind(ApiClient),
  post: ApiClient.post.bind(ApiClient),
  postMultipart: ApiClient.postMultipart.bind(ApiClient),
  uploadFile: ApiClient.uploadFile.bind(ApiClient),
  put: ApiClient.put.bind(ApiClient),
  patch: ApiClient.patch.bind(ApiClient),
  delete: ApiClient.delete.bind(ApiClient),
  getInstance: ApiClient.getInstance.bind(ApiClient),
  reset: ApiClient.reset.bind(ApiClient)
};

export default apiClient;