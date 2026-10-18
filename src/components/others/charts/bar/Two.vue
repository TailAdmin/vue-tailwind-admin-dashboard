<script setup lang="ts">
import { computed } from 'vue'
import type { ApexOptions } from 'apexcharts'
import VueApexCharts from 'vue3-apexcharts'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useTheme } from '@/composables/useTheme'

const { isDarkMode } = useTheme()

const options = computed<ApexOptions>(() => ({
  colors: ['#7592FF', '#7CD4FD'],
  chart: {
    fontFamily: 'Outfit, sans-serif',
    type: 'bar',
    stacked: true,
    height: 200,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '39%',
      borderRadius: 8,
      borderRadiusApplication: 'end',
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: false,
  },
  xaxis: {
    categories: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
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
        fontSize: '12px',
      },
    },
  },
  legend: {
    show: false,
  },
  yaxis: {
    min: 0,
    max: 25000,
    tickAmount: 5,
    labels: {
      style: {
        colors: isDarkMode.value ? '#94A3B8' : '#364153',
        fontFamily: 'Outfit, sans-serif',
        fontSize: '12px',
      },
      formatter: (val: number) => {
        if (val === 0) return '0'
        if (val >= 1000) return `${Math.round(val / 1000)}K`
        return val.toString()
      },
    },
  },
  grid: {
    borderColor: isDarkMode.value ? '#1E2640' : '#F3F4F6',
    strokeDashArray: 0,
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
    opacity: 1,
  },
  tooltip: {
    x: {
      show: false,
    },
    y: {
      formatter: (val: number) => `$${val?.toLocaleString?.() ?? val}`,
    },
  },
}))

const series = [
  {
    name: 'Income',
    data: [9700, 6000, 16300, 4400, 7000, 9700, 4400, 9700, 9700, 7000, 9700, 16300, 9700],
  },
  {
    name: 'Expense',
    data: [10300, 6400, 3000, 14900, 4300, 6900, 14900, 4300, 6900, 4300, 6900, 3000, 6900],
  },
]
</script>

<template>
  <div class="flex flex-col gap-6">
    <!-- Legend Indicators -->
    <div class="flex items-center justify-end gap-5">
      <div class="flex items-center gap-1.5">
        <span class="size-2.5 rounded-full bg-brand-600" />
        <span class="text-sm font-normal text-gray-700 dark:text-gray-300"> Income </span>
      </div>
      <div class="flex items-center gap-1.5">
        <span class="size-2.5 rounded-full bg-[#7CD4FD]" />
        <span class="text-sm font-normal text-gray-700 dark:text-gray-300"> Expense </span>
      </div>
    </div>

    <ScrollArea class="max-w-full">
      <div class="min-w-162.5 xl:min-w-full">
        <VueApexCharts :options="options" :series="series" type="bar" :height="200" />
      </div>
    </ScrollArea>
  </div>
</template>
