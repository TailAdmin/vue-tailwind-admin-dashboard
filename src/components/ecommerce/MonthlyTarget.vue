<template>
  <div
    class="rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03]"
  >
    <div
      class="px-5 pt-5 bg-white shadow-default rounded-2xl pb-11 dark:bg-gray-900 sm:px-6 sm:pt-6"
    >
      <div class="flex justify-between">
        <div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">الهدف الشهري</h3>
          <p class="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            الهدف المحدد لهذا الشهر
          </p>
        </div>
      </div>
      
      <div class="relative max-h-[195px]">
        <div id="chartTwo" class="h-full">
          <div class="radial-bar-chart">
            <VueApexCharts 
              type="radialBar" 
              height="330" 
              :options="chartOptions" 
              :series="[dashboardStore.statistics?.targetProgress || 0]" 
            />
          </div>
        </div>
        <span
          :class="[
            'absolute left-1/2 top-[85%] -translate-x-1/2 -translate-y-[85%] rounded-full px-3 py-1 text-xs font-medium',
            (dashboardStore.statistics?.targetProgress || 0) >= 100
              ? 'bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500'
              : 'bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-warning-500'
          ]"
        >
          {{ (dashboardStore.statistics?.targetProgress || 0) >= 100 ? 'تم تحقيق الهدف' : 'قيد التقدم' }}
        </span>
      </div>
      
      <p class="mx-auto mt-1.5 w-full max-w-[380px] text-center text-sm text-gray-500 sm:text-base">
        تم تحقيق {{ formatCurrency(dashboardStore.statistics?.currentRevenue || 0) }} من إجمالي الهدف!
      </p>
    </div>

    <div class="flex items-center justify-center gap-5 px-6 py-3.5 sm:gap-8 sm:py-5">
      <div>
        <p class="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
          الهدف
        </p>
        <p
          class="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg"
        >
          {{ formatCurrency(dashboardStore.statistics?.revenueTarget || 0) }}
        </p>
      </div>

      <div class="w-px bg-gray-200 h-7 dark:bg-gray-800"></div>

      <div>
        <p class="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
          المحقق
        </p>
        <p
          class="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg"
        >
          {{ formatCurrency(dashboardStore.statistics?.currentRevenue || 0) }}
        </p>
      </div>

      <div class="w-px bg-gray-200 h-7 dark:bg-gray-800"></div>

      <div>
        <p class="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
          النسبة
        </p>
        <p
          class="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg"
        >
          {{ (dashboardStore.statistics?.targetProgress || 0).toFixed(1) }}%
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
//import { computed } from 'vue';
import VueApexCharts from 'vue3-apexcharts';
import { useDashboardStore } from '@/stores/dashboard.store';

const dashboardStore = useDashboardStore();

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('ar-SA', {
    style: 'currency',
    currency: 'SAR',
    minimumFractionDigits: 0
  }).format(amount);
};

const chartOptions = {
  colors: ['#465FFF'],
  chart: {
    fontFamily: 'Cairo, sans-serif',
    sparkline: {
      enabled: true,
    },
  },
  plotOptions: {
    radialBar: {
      startAngle: -90,
      endAngle: 90,
      hollow: {
        size: '80%',
      },
      track: {
        background: '#E4E7EC',
        strokeWidth: '100%',
        margin: 5,
      },
      dataLabels: {
        name: {
          show: false,
        },
        value: {
          fontSize: '36px',
          fontWeight: '600',
          offsetY: 60,
          color: '#1D2939',
          formatter: function (val: number) {
            return val.toFixed(1) + '%'
          },
        },
      },
    },
  },
  fill: {
    type: 'solid',
    colors: ['#465FFF'],
  },
  stroke: {
    lineCap: 'round' as const,
  },
  labels: ['التقدم'],
};
</script>

<style scoped>
.radial-bar-chart {
  width: 100%;
  max-width: 330px;
  margin: 0 auto;
}
</style>