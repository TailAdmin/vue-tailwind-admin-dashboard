<template>
  <div
    class="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6"
  >
    <div class="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">أحدث العروض</h3>
      </div>

      <div class="flex items-center gap-3">
        <router-link
          to="/offers"
          class="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
        >
          عرض الكل
        </router-link>
      </div>
    </div>

    <div class="max-w-full overflow-x-auto custom-scrollbar">
      <table class="min-w-full">
        <thead>
          <tr class="border-t border-gray-100 dark:border-gray-800">
            <th class="py-3 text-right">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">العنوان</p>
            </th>
            <th class="py-3 text-right">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">النوع</p>
            </th>
            <th class="py-3 text-right">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">المدينة</p>
            </th>
            <th class="py-3 text-right">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">السعر</p>
            </th>
            <th class="py-3 text-right">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">الحالة</p>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="offer in recentOffers"
            :key="offer.id"
            class="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-white/[0.02]"
          >
            <td class="py-3 whitespace-nowrap">
              <div class="flex items-center gap-3">
                <div class="h-[50px] w-[50px] overflow-hidden rounded-md">
                  <img 
                    v-if="offer.imageUrl" 
                    :src="getImageUrl(offer.imageUrl)" 
                    :alt="offer.title"
                    class="h-full w-full object-cover"
                  />
                  <div 
                    v-else
                    class="flex h-full w-full items-center justify-center bg-gray-100 dark:bg-gray-800"
                  >
                    <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p class="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {{ truncateText(offer.title, 30) }}
                  </p>
                  <span class="text-gray-500 text-theme-xs dark:text-gray-400">
                    {{ formatDate(offer.createdAt) }}
                  </span>
                </div>
              </div>
            </td>
            <td class="py-3 whitespace-nowrap">
              <p class="text-gray-500 text-theme-sm dark:text-gray-400">
                {{ offer.offerTypeName }}
              </p>
            </td>
            <td class="py-3 whitespace-nowrap">
              <p class="text-gray-500 text-theme-sm dark:text-gray-400">
                {{ offer.cityName }}
              </p>
            </td>
            <td class="py-3 whitespace-nowrap">
              <p class="text-gray-500 text-theme-sm dark:text-gray-400">
                {{ formatCurrency(offer.price) }}
              </p>
            </td>
            <td class="py-3 whitespace-nowrap">
              <span
                :class="[
                  'rounded-full px-2 py-0.5 text-theme-xs font-medium',
                  offer.isActive
                    ? 'bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500'
                    : 'bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500'
                ]"
              >
                {{ offer.isActive ? 'نشط' : 'غير نشط' }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Empty State -->
      <div v-if="recentOffers.length === 0" class="py-12 text-center">
        <svg class="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
        <h3 class="mt-4 text-lg font-medium text-gray-800 dark:text-white/90">
          لا توجد عروض
        </h3>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          لم يتم إضافة أي عروض بعد
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDashboardStore } from '@/stores/dashboard.store';
import { SERVICES } from '@/config/api.config';

const dashboardStore = useDashboardStore();

const recentOffers = computed(() => {
  return dashboardStore.statistics?.recentOffers || [];
});

const getImageUrl = (imageName: string): string => {
  if (imageName.startsWith('http')) {
    return imageName;
  }
  const baseUrl = import.meta.env.VITE_OFFERS_MANAGER_API_URL || SERVICES.offersManager.baseUrl;
  return `${baseUrl}Images/${imageName}`;
};

const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ar-SA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
};

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('ar-SA', {
    style: 'currency',
    currency: 'SAR',
    minimumFractionDigits: 0
  }).format(amount);
};
</script>