// services/storage.service.ts
import type { ISecureStorage } from 'ashir-http-client';
import { API_CONFIG } from '@/config/api.config';

export class LocalStorageService implements ISecureStorage {
  // ✅ استخدام localStorage مباشرة (بدون مفتاح wrapper)
  
  async getAsync(key: string): Promise<string | null> {
    try {
      return localStorage.getItem(key);  // ✅ مباشرة
    } catch (error) {
      console.error('LocalStorage get error:', error);
      return null;
    }
  }

  async setAsync(key: string, value: string): Promise<void> {
    try {
      localStorage.setItem(key, value);  // ✅ مباشرة
    } catch (error) {
      console.error('LocalStorage set error:', error);
      throw error;
    }
  }

  async remove(key: string): Promise<void> {
    try {
      localStorage.removeItem(key);  // ✅ مباشرة
    } catch (error) {
      console.error('LocalStorage remove error:', error);
      throw error;
    }
  }

  removeAll(): void {
    try {
      // مسح مفاتيح المصادقة فقط
      const keys = [
        API_CONFIG.storageKeys.accessToken,
        API_CONFIG.storageKeys.refreshToken,
        API_CONFIG.storageKeys.user,
        'auth_token',
        'refresh_token',
        'user_info'
      ];
      keys.forEach(key => localStorage.removeItem(key));
    } catch (error) {
      console.error('LocalStorage clear error:', error);
      throw error;
    }
  }

  // ✅ الدوال البديلة
  async get(key: string): Promise<string | null> {
    return this.getAsync(key);
  }

  async set(key: string, value: string): Promise<void> {
    return this.setAsync(key, value);
  }

  async clear(): Promise<void> {
    this.removeAll();
  }

  async has(key: string): Promise<boolean> {
    return localStorage.getItem(key) !== null;
  }

  async getAllKeys(): Promise<string[]> {
    return Object.keys(localStorage);
  }
}

export const localStorageService = new LocalStorageService();