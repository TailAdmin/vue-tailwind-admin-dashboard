<template>
  <div class="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Visitor Analytics</h3>
        <p class="text-sm text-gray-500 dark:text-gray-400">Monthly visitor trends</p>
      </div>
      <div class="flex gap-2">
        <button
          v-for="period in ['7D', '1M', '3M', '1Y']"
          :key="period"
          :class="[
            'px-3 py-1 text-sm font-medium rounded-md transition-colors',
            selectedPeriod === period
              ? 'bg-brand-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600',
          ]"
          @click="selectedPeriod = period"
        >
          {{ period }}
        </button>
      </div>
    </div>
    <div class="h-80">
      <VueApexCharts type="area" height="320" :options="chartOptions" :series="series" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const selectedPeriod = ref('1M')

const series = ref([
  {
    name: 'Visitors',
    data: [31000, 40000, 28000, 51000, 42000, 82000, 65000, 95000, 75000, 88000, 102000, 95000],
  },
])

const chartOptions = ref<ApexCharts.ApexOptions>({
  chart: {
    fontFamily: 'Outfit, sans-serif',
    type: 'area' as const,
    toolbar: {
      show: false,
    },
  },
  colors: ['#465FFF'],
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
    width: 2,
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.5,
      opacityTo: 0.1,
      stops: [0, 90, 100],
    },
  },
  xaxis: {
    categories: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    labels: {
      style: {
        fontSize: '12px',
        fontFamily: 'Outfit, sans-serif',
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    labels: {
      style: {
        fontSize: '12px',
        fontFamily: 'Outfit, sans-serif',
      },
      formatter: function (val: number) {
        return (val / 1000).toFixed(0) + 'K'
      },
    },
  },
  grid: {
    borderColor: '#e7e7e7',
  },
  tooltip: {
    y: {
      formatter: function (val: number) {
        return val.toLocaleString() + ' visitors'
      },
    },
  },
})
</script>
