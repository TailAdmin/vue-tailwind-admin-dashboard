<script setup lang="ts">
import { computed } from 'vue'
import type { ApexOptions } from 'apexcharts'
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from '@/composables/useTheme'
import CardHeader from './CardHeader.vue'
import MonthlyStats from './MonthlyStats.vue'

const { isDarkMode } = useTheme()

const series = [75.55]
const options = computed<ApexOptions>(() => ({
  colors: ['#9CB9FF'],
  chart: {
    fontFamily: 'Outfit, sans-serif',
    type: 'radialBar',
    height: 330,
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
        background: isDarkMode.value ? '#1E2640' : '#E4E7EC',
        strokeWidth: '100%',
        margin: 5, // margin is in pixels
      },
      dataLabels: {
        name: {
          show: false,
        },
        value: {
          fontSize: '36px',
          fontWeight: '600',
          offsetY: -35,
          color: isDarkMode.value ? '#FFFFFF' : '#1D2939',
          formatter: function (val: number) {
            return val + '%'
          },
        },
      },
    },
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'light',
      type: 'horizontal',
      shadeIntensity: 0.5,
      gradientToColors: ['#465FFF'],
      inverseColors: false,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100],
      colorStops: [
        {
          offset: 0,
          color: '#9CB9FF',
          opacity: 1,
        },
        {
          offset: 100,
          color: '#465FFF',
          opacity: 1,
        },
      ],
    },
  },
  stroke: {
    lineCap: 'round',
  },
  labels: ['Progress'],
}))
</script>

<template>
  <div
    class="flex h-full flex-col justify-between rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/3"
  >
    <div
      class="shadow-default flex flex-1 flex-col justify-between rounded-2xl bg-white px-5 pt-5 pb-5 sm:px-6 sm:pt-6 sm:pb-11 dark:bg-gray-900"
    >
      <CardHeader />

      <div>
        <div class="relative">
          <div id="chartDarkStyle" class="max-h-45 overflow-hidden">
            <VueApexCharts type="radialBar" :height="330" :options="options" :series="series" />
          </div>

          <span
            class="absolute bottom-2.5 left-1/2 -translate-x-1/2 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-600 dark:bg-green-500/15 dark:text-green-500"
          >
            +10%
          </span>
        </div>
        <p
          class="mx-auto mt-4.5 w-full max-w-95 text-center text-sm text-gray-500 sm:text-base dark:text-gray-400"
        >
          You earn $3287 today, it's higher than last month. Keep up your good work!
        </p>
      </div>
    </div>

    <MonthlyStats />
  </div>
</template>
