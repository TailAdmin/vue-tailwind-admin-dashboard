<template>
  <div
    class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6"
  >
    <div class="flex justify-between mb-6">
      <div>
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">
          توزيع العروض حسب المدن
        </h3>
        <p class="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
          عدد العروض في كل مدينة
        </p>
      </div>
    </div>

    <div class="space-y-5">
      <div 
        v-for="(city, index) in topCities" 
        :key="index"
        class="flex items-center justify-between"
      >
        <div class="flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 dark:bg-brand-900/20">
            <svg class="h-5 w-5 text-brand-600 dark:text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <p class="font-semibold text-gray-800 text-theme-sm dark:text-white/90">
              {{ city.cityName }}
            </p>
            <span class="block text-gray-500 text-theme-xs dark:text-gray-400">
              {{ city.count }} عرض
            </span>
          </div>
        </div>

        <div class="flex w-full max-w-[140px] items-center gap-3">
          <div class="relative block h-2 w-full max-w-[100px] rounded-sm bg-gray-200 dark:bg-gray-800">
            <div
              :style="{ width: city.percentage + '%' }"
              class="absolute left-0 top-0 flex h-full items-center justify-center rounded-sm bg-brand-500 text-xs font-medium text-white"
            ></div>
          </div>
          <p class="font-medium text-gray-800 text-theme-sm dark:text-white/90">
            {{ city.percentage.toFixed(0) }}%
          </p>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="topCities.length === 0" class="py-8 text-center">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
        <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
          لا توجد بيانات متاحة
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDashboardStore } from '@/stores/dashboard.store';

const dashboardStore = useDashboardStore();

const topCities = computed(() => {
  return dashboardStore.statistics?.offersByCity.slice(0, 5) || [];
});
</script>