// src/types/ashir-http-client.d.ts
declare module 'ashir-http-client' {
  import { AxiosInstance } from 'axios';

  // ===== Storage Interfaces =====
  export interface ISecureStorage {
    getAsync(key: string): Promise<string | null>;
    setAsync(key: string, value: string): Promise<void>;
    remove(key: string): Promise<void>;
    removeAll(): void;
    get?(key: string): Promise<string | null>;
    set?(key: string, value: string): Promise<void>;
    clear?(): Promise<void>;
    has?(key: string): Promise<boolean>;
    getAllKeys?(): Promise<string[]>;
  }

  // ===== Navigation Interface =====
  export interface INavigationService {
    navigateToLogin(): Promise<void>;
    isOnLoginPage(): boolean;
    navigateTo?(path: string): Promise<void>;
    goBack?(): Promise<void>;
    replace?(path: string): Promise<void>;
  }

  // ===== Main Thread Interface =====
  export interface IMainThreadService {
    invokeOnMainThread(action: () => void): Promise<void>;
    invokeOnMainThreadAsync(func: () => Promise<void>): Promise<void>;
  }

  // ===== Retry Configuration =====
  export interface RetryConfig {
    maxRetries: number;
    delayMs: number;
    backoffMultiplier: number;
  }

  // ===== Request Options =====
  export interface RequestOptions {
    skipAuth?: boolean;
    headers?: Record<string, string>;
    timeout?: number;
    retry?: Partial<RetryConfig>;
  }

  // ===== Multipart Form Data =====
  export interface MultipartFileData {
    file: File | Blob;
    fileName: string;
    fieldName?: string;
  }

  export interface MultipartFormData {
    fields: Record<string, string>;
    files: MultipartFileData[];
  }

  // ===== API Service Configuration =====
  export interface ApiServiceConfig {
    baseUrl: string;
    secureStorage?: ISecureStorage;
    navigationService?: INavigationService;
    mainThreadService?: IMainThreadService;
    defaultLanguage?: string;
    defaultTimeout?: number;
    defaultRetry?: Partial<RetryConfig>;
  }

  // ===== API Service =====
  export class ApiService {
    // Properties
    public isLoggedIn: boolean;
    public isNavigatingToLogin: boolean;
    
    // Constructor
    constructor(config: ApiServiceConfig);
    
    // Axios Instance Access
    readonly defaults: AxiosInstance;

    // Authentication Methods
    ensureAuthenticated(): Promise<void>;
    getCurrentAuthToken(): Promise<string | null>;
    logout(): Promise<void>;

    // Utility Methods
    getBaseUrl(): string;

    // HTTP Methods
    get<T = any>(
      endpoint: string,
      parameters?: Record<string, string>,
      options?: RequestOptions
    ): Promise<T>;

    post<TRequest = any, TResponse = any>(
      endpoint: string,
      data: TRequest,
      options?: RequestOptions
    ): Promise<TResponse>;

    put<TRequest = any, TResponse = any>(
      endpoint: string,
      data: TRequest,
      options?: RequestOptions
    ): Promise<TResponse>;

    patch<TRequest = any, TResponse = any>(
      endpoint: string,
      data: TRequest,
      options?: RequestOptions
    ): Promise<TResponse>;

    delete<T = any>(
      endpoint: string,
      options?: RequestOptions
    ): Promise<T>;

    // File Upload Methods
    uploadFile<T = any>(
      endpoint: string,
      file: File | Blob,
      fileName: string,
      formDataName?: string,
      additionalData?: Record<string, string>,
      options?: RequestOptions
    ): Promise<T>;

    postMultipart<T = any>(
      endpoint: string,
      data: MultipartFormData,
      options?: RequestOptions
    ): Promise<T>;

    // Raw Request Method
    postRaw(
      endpoint: string,
      body: BodyInit,
      options?: RequestOptions
    ): Promise<Response>;
  }

  // ===== Default Implementations =====
  export class BrowserSecureStorage implements ISecureStorage {
    getAsync(key: string): Promise<string | null>;
    setAsync(key: string, value: string): Promise<void>;
    remove(key: string): Promise<void>;
    removeAll(): void;
  }

  export class InMemorySecureStorage implements ISecureStorage {
    getAsync(key: string): Promise<string | null>;
    setAsync(key: string, value: string): Promise<void>;
    remove(key: string): Promise<void>;
    removeAll(): void;
  }

  export class DefaultNavigationService implements INavigationService {
    navigateToLogin(): Promise<void>;
    isOnLoginPage(): boolean;
  }

  export class DefaultMainThreadService implements IMainThreadService {
    invokeOnMainThread(action: () => void): Promise<void>;
    invokeOnMainThreadAsync(func: () => Promise<void>): Promise<void>;
  }

  // ===== HTTP Request Handler (if needed externally) =====
  export class HttpRequestHandler {
    constructor(secureStorage: ISecureStorage, defaultLanguage: string);
    
    prepareHeaders(options?: RequestOptions): Promise<Headers>;
    buildQueryString(parameters?: Record<string, string>): string;
    createAbortController(timeout: number): AbortController;
    logRequest(method: string, url: string, body?: any): void;
    logResponse(method: string, url: string, status: number, data?: any): void;
    handleError(response: Response): Promise<never>;
    withRetry<T>(
      operation: () => Promise<T>,
      maxRetries: number,
      delayMs: number,
      backoffMultiplier: number
    ): Promise<T>;
  }

  // ===== Type Exports =====
  export type {
    ISecureStorage,
    INavigationService,
    IMainThreadService,
    RetryConfig,
    RequestOptions,
    MultipartFileData,
    MultipartFormData,
    ApiServiceConfig
  };
}