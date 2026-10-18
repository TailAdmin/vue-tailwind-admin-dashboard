<script setup lang="ts">
import { computed } from 'vue'
import type { ApexOptions } from 'apexcharts'
import VueApexCharts from 'vue3-apexcharts'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useTheme } from '@/composables/useTheme'
import CardHeader from './CardHeader.vue'
import { monthKeys, monthlySalesData } from './data'

const { isDarkMode } = useTheme()
const monthLabels = {
  jan: 'Jan',
  feb: 'Feb',
  mar: 'Mar',
  apr: 'Apr',
  may: 'May',
  jun: 'Jun',
  jul: 'Jul',
  aug: 'Aug',
  sep: 'Sep',
  oct: 'Oct',
  nov: 'Nov',
  dec: 'Dec',
} as const

const options = computed<ApexOptions>(() => ({
  colors: ['#465FFF'],
  chart: {
    fontFamily: 'Outfit, sans-serif',
    type: 'bar',
    height: 200,
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '38%',
      borderRadius: 8,
      borderRadiusApplication: 'around',
      dataLabels: {
        position: 'top',
      },
    },
  },
  dataLabels: {
    enabled: true,
    formatter: (val: number) => `${(val / 100).toFixed(1)}%`,
    offsetY: -20,
    style: {
      fontSize: '12px',
      fontFamily: 'Outfit, sans-serif',
      fontWeight: 400,
      colors: [isDarkMode.value ? '#94A3B8' : '#364153'],
    },
    dropShadow: {
      enabled: false,
    },
  },
  stroke: {
    show: false,
  },
  xaxis: {
    categories: monthKeys.map((key) => monthLabels[key]),
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    labels: {
      style: {
        colors: isDarkMode.value ? '#94A3B8' : '#364153',
        fontFamily: 'Outfit, sans-serif',
      },
    },
  },
  legend: {
    show: false,
  },
  yaxis: {
    max: 420,
    min: 0,
    tickAmount: 4,
    labels: {
      show: false,
    },
  },
  grid: {
    borderColor: isDarkMode.value ? '#1E2640' : '#F3F4F6',
    strokeDashArray: 0,
    padding: {
      left: -10,
      right: 0,
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
    xaxis: {
      lines: {
        show: false,
      },
    },
  },
  fill: {
    type: 'gradient',
    gradient: {
      type: 'vertical',
      shadeIntensity: 1,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100],
      colorStops: [
        {
          offset: 0,
          color: '#7592FF',
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
  tooltip: {
    x: {
      show: false,
    },
    y: {
      formatter: (val: number) => `${(val / 100).toFixed(1)}%`,
    },
  },
}))

const series = computed(() => [
  {
    name: 'Sales',
    data: [...monthlySalesData],
  },
])
</script>

<template>
  <div
    class="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 pb-5 sm:px-6 sm:pt-6 sm:pb-5 dark:border-gray-800 dark:bg-white/3"
  >
    <CardHeader />

    <ScrollArea class="max-w-full">
      <div class="min-w-162.5 xl:min-w-full">
        <VueApexCharts type="bar" :height="200" :options="options" :series="series" />
      </div>
    </ScrollArea>
  </div>
</template>
