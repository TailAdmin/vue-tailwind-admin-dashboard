<template>
  <admin-layout>
    <!-- Loading State -->
    <div v-if="dashboardStore.isLoading" class="flex items-center justify-center py-20">
      <div class="text-center">
        <div class="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-brand-600"></div>
        <p class="mt-4 text-gray-600 dark:text-gray-400">جاري تحميل البيانات...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="dashboardStore.error" class="rounded-2xl border border-red-200 bg-red-50 p-6 dark:border-red-900 dark:bg-red-900/20">
      <div class="flex items-center gap-3">
        <svg class="h-6 w-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <h3 class="font-semibold text-red-800 dark:text-red-200">حدث خطأ أثناء تحميل البيانات</h3>
          <p class="mt-1 text-sm text-red-600 dark:text-red-400">{{ dashboardStore.error }}</p>
        </div>
      </div>
      <button
        @click="loadData"
        class="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
      >
        إعادة المحاولة
      </button>
    </div>

    <!-- Dashboard Content -->
    <div v-else class="grid grid-cols-12 gap-4 md:gap-6">
      <!-- Metrics and Target -->
      <div class="col-span-12 space-y-6 xl:col-span-7">
        <ecommerce-metrics />
        <monthly-target />
      </div>

      <!-- Monthly Sale Chart -->
      <div class="col-span-12 xl:col-span-5">
        <monthly-sale />
      </div>

      <!-- Statistics Chart -->
      <div class="col-span-12">
        <statistics-chart />
      </div>

      <!-- Customer Demographic -->
      <div class="col-span-12 xl:col-span-5">
        <customer-demographic />
      </div>

      <!-- Recent Orders -->
      <div class="col-span-12 xl:col-span-7">
        <recent-orders />
      </div>
    </div>
  </admin-layout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import AdminLayout from '../components/layout/AdminLayout.vue';
import EcommerceMetrics from '../components/ecommerce/EcommerceMetrics.vue';
import MonthlyTarget from '../components/ecommerce/MonthlyTarget.vue';
import MonthlySale from '../components/ecommerce/MonthlySale.vue';
import CustomerDemographic from '../components/ecommerce/CustomerDemographic.vue';
import StatisticsChart from '../components/ecommerce/StatisticsChart.vue';
import RecentOrders from '../components/ecommerce/RecentOrders.vue';
import { useDashboardStore } from '@/stores/dashboard.store';

const dashboardStore = useDashboardStore();

const loadData = async () => {
  try {
    await dashboardStore.loadStatistics();
  } catch (error) {
    console.error('Failed to load dashboard statistics:', error);
  }
};

onMounted(() => {
  loadData();
});
</script>