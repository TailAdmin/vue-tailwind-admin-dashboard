<template>
  <div
    class="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6"
  >
    <div class="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
      <div class="w-full">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">الإحصائيات</h3>
        <p class="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
          مقارنة العروض والمستخدمين شهرياً
        </p>
      </div>

      <div class="relative">
        <div class="inline-flex items-center gap-0.5 rounded-lg bg-gray-100 p-0.5 dark:bg-gray-900">
          <button
            v-for="option in options"
            :key="option.value"
            @click="selected = option.value"
            :class="[
              selected === option.value
                ? 'shadow-theme-xs text-gray-900 dark:text-white bg-white dark:bg-gray-800'
                : 'text-gray-500 dark:text-gray-400',
              'px-3 py-2 font-medium rounded-md text-theme-sm hover:text-gray-900 hover:shadow-theme-xs dark:hover:bg-gray-800 dark:hover:text-white',
            ]"
          >
            {{ option.label }}
          </button>
        </div>
      </div>
    </div>
    
    <div class="max-w-full overflow-x-auto custom-scrollbar">
      <div id="chartThree" class="-ml-4 min-w-[1000px] xl:min-w-full pl-2">
        <VueApexCharts 
          type="area" 
          height="310" 
          :options="chartOptions" 
          :series="series" 
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import VueApexCharts from 'vue3-apexcharts';
import { useDashboardStore } from '@/stores/dashboard.store';

const dashboardStore = useDashboardStore();

const options = [
  { value: 'optionOne', label: 'شهري' },
  { value: 'optionTwo', label: 'ربع سنوي' },
  { value: 'optionThree', label: 'سنوي' },
];

const selected = ref('optionOne');

const series = computed(() => [
  {
    name: 'العروض',
    data: dashboardStore.statistics?.monthlyData.map(m => m.offers) || []
  },
  {
    name: 'المستخدمين',
    data: dashboardStore.statistics?.monthlyData.map(m => m.users) || []
  },
]);

const chartOptions = computed(() => ({
  legend: {
    show: true,
    position: 'top' as const,
    horizontalAlign: 'right' as const,
    fontFamily: 'Cairo',
    labels: {
      colors: '#6B7280'
    }
  },
  colors: ['#465FFF', '#9CB9FF'],
  chart: {
    fontFamily: 'Cairo, sans-serif',
    type: 'area' as const,
    toolbar: {
      show: false,
    },
    locales: [{
      name: 'ar',
      options: {
        months: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
        shortMonths: ['ين', 'فبر', 'مار', 'أبر', 'ماي', 'يون', 'يول', 'أغس', 'سبت', 'أكت', 'نوف', 'ديس'],
      }
    }],
    defaultLocale: 'ar'
  },
  fill: {
    gradient: {
      enabled: true,
      opacityFrom: 0.55,
      opacityTo: 0,
    },
  },
  stroke: {
    curve: 'smooth' as const,
    width: [2, 2],
    lineCap: 'round' as const,
  },
  markers: {
    size: 0,
  },
  grid: {
    xaxis: {
      lines: {
        show: false,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    x: {
      format: 'MMM yyyy',
    },
    y: {
      formatter: function (val: number, opts: any) {
        const seriesName = opts.w.config.series[opts.seriesIndex].name;
        return val.toString() + (seriesName === 'العروض' ? ' عرض' : ' مستخدم');
      }
    }
  },
  xaxis: {
    type: 'category' as const,
    categories: dashboardStore.statistics?.monthlyData.map(m => m.month) || [],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    labels: {
      style: {
        colors: '#6B7280',
        fontFamily: 'Cairo'
      }
    }
  },
  yaxis: {
    title: {
      style: {
        fontSize: '0px',
      },
    },
    labels: {
      style: {
        colors: '#6B7280',
        fontFamily: 'Cairo'
      }
    }
  },
}));
</script>

<style scoped>
.area-chart {
  width: 100%;
}
</style>