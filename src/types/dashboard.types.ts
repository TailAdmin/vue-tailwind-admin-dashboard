// types/dashboard.types.ts (لا تغيير - نفس الأنواع السابقة)

export interface OfferStatistics {
  totalOffers: number;
  activeOffers: number;
  inactiveOffers: number;
  todayOffers: number;
  thisMonthOffers: number;
  growthPercentage: number;
}

export interface UserStatistics {
  totalUsers: number;
  activeUsers: number;
  newUsersToday: number;
  newUsersThisMonth: number;
  growthPercentage: number;
}

export interface MonthlyData {
  month: string;
  offers: number;
  users: number;
  revenue: number;
}

export interface OfferTypeStatistic {
  offerTypeName: string;
  count: number;
  percentage: number;
}

export interface CityStatistic {
  cityName: string;
  count: number;
  percentage: number;
}

export interface RecentOffer {
  id: string;
  title: string;
  price: number;
  offerTypeName: string;
  cityName: string;
  imageUrl?: string;
  isActive: boolean;
  createdAt: string;
}

export interface DashboardStatistics {
  offers: OfferStatistics;
  users: UserStatistics;
  monthlyData: MonthlyData[];
  offersByType: OfferTypeStatistic[];
  offersByCity: CityStatistic[];
  recentOffers: RecentOffer[];
  targetProgress: number;
  revenueTarget: number;
  currentRevenue: number;
}