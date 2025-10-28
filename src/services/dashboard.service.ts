// services/dashboard.service.ts
import { apiClient } from './api-client';
import type { DashboardStatistics } from '@/types/dashboard.types';

class DashboardService {
  /**
   * الحصول على إحصائيات العروض
   */
  async getOffersStatistics(): Promise<any> {
    return await apiClient.get<any>(
      'offersManager',
      '/api/Dashboard/offers-statistics'
    );
  }

  /**
   * الحصول على إحصائيات المستخدمين
   */
  async getUsersStatistics(): Promise<any> {
    return await apiClient.get<any>(
      'userProfiles',
      '/api/Dashboard/users-statistics'
    );
  }

  /**
   * الحصول على جميع الإحصائيات (دمج البيانات من الخدمتين)
   */
  async getStatistics(): Promise<DashboardStatistics> {
    try {
      // استدعاء الخدمتين بشكل متوازي
      const [offersStats, usersStats] = await Promise.all([
        this.getOffersStatistics(),
        this.getUsersStatistics()
      ]);

      // دمج البيانات الشهرية
      const monthlyData = offersStats.monthlyData.map((offerData: any) => {
        const userData = usersStats.monthlyData.find(
          (u: any) => u.month === offerData.month && u.year === offerData.year
        );
        
        return {
          month: offerData.month,
          offers: offerData.offersCount,
          users: userData?.usersCount || 0,
          revenue: 0 // يمكن حسابه لاحقاً
        };
      });

      // بناء الكائن النهائي
      const statistics: DashboardStatistics = {
        offers: {
          totalOffers: offersStats.totalOffers,
          activeOffers: offersStats.activeOffers,
          inactiveOffers: offersStats.inactiveOffers,
          todayOffers: offersStats.todayOffers,
          thisMonthOffers: offersStats.thisMonthOffers,
          growthPercentage: offersStats.growthPercentage
        },
        users: {
          totalUsers: usersStats.totalUsers,
          activeUsers: usersStats.activeUsers,
          newUsersToday: usersStats.newUsersToday,
          newUsersThisMonth: usersStats.newUsersThisMonth,
          growthPercentage: usersStats.growthPercentage
        },
        monthlyData,
        offersByType: offersStats.offersByType,
        offersByCity: offersStats.offersByCity,
        recentOffers: offersStats.recentOffers,
        targetProgress: offersStats.targetProgress,
        revenueTarget: offersStats.revenueTarget,
        currentRevenue: offersStats.currentRevenue
      };

      return statistics;
    } catch (error) {
      console.error('Error fetching dashboard statistics:', error);
      throw error;
    }
  }
}

export const dashboardService = new DashboardService();
export default dashboardService;