// ========================================
// Navigation Service - services/navigation.service.ts
// تطبيق INavigationService من المكتبة
// ========================================

import type { INavigationService } from 'ashir-http-client';
import type { Router } from 'vue-router';

/**
 * تطبيق INavigationService باستخدام Vue Router
 */
export class VueRouterNavigationService implements INavigationService {
  private router: Router | null = null;

  /**
   * تعيين Vue Router
   */
  setRouter(router: Router): void {
    this.router = router;
  }

  /**
   * التحقق من كون الصفحة الحالية هي صفحة تسجيل الدخول
   */
  isOnLoginPage(): boolean {
    if (!this.router) {
      // fallback إلى window.location
      return window.location.pathname === '/login' || 
             window.location.pathname === '/signin';
    }
    
    const currentRoute = this.router.currentRoute.value;
    return currentRoute.name === 'Login' || 
           currentRoute.name === 'Signin' ||
           currentRoute.path === '/login' ||
           currentRoute.path === '/signin';
  }

  /**
   * الانتقال إلى صفحة تسجيل الدخول
   */
  async navigateToLogin(): Promise<void> {
    console.log('🔒 Navigating to login page...');

    if (!this.router) {
      // fallback إلى window.location
      const currentPath = window.location.pathname;
      if (currentPath !== '/login' && currentPath !== '/signin') {
        window.location.href = `/login?redirect=${encodeURIComponent(currentPath)}`;
      }
      return;
    }

    // استخدام Vue Router
    const currentRoute = this.router.currentRoute.value;
    
    // تجنب إعادة التوجيه إذا كنا في صفحة تسجيل الدخول
    if (this.isOnLoginPage()) {
      console.log('Already on login page, skipping navigation');
      return;
    }

    try {
      await this.router.push({
        name: 'Login',
        query: {
          redirect: currentRoute.fullPath
        }
      });
    } catch (error) {
      console.error('Navigation to login failed:', error);
      // fallback
      window.location.href = '/login';
    }
  }

  /**
   * الانتقال إلى صفحة معينة
   */
  async navigateTo(path: string): Promise<void> {
    if (!this.router) {
      window.location.href = path;
      return;
    }

    try {
      await this.router.push(path);
    } catch (error) {
      console.error('Navigation failed:', error);
      window.location.href = path;
    }
  }

  /**
   * العودة للصفحة السابقة
   */
  async goBack(): Promise<void> {
    if (!this.router) {
      window.history.back();
      return;
    }

    this.router.back();
  }

  /**
   * استبدال الصفحة الحالية
   */
  async replace(path: string): Promise<void> {
    if (!this.router) {
      window.location.replace(path);
      return;
    }

    try {
      await this.router.replace(path);
    } catch (error) {
      console.error('Replace navigation failed:', error);
      window.location.replace(path);
    }
  }
}

// Singleton Instance
export const vueRouterNavigationService = new VueRouterNavigationService();
export default vueRouterNavigationService;