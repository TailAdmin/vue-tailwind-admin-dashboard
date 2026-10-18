<script setup lang="ts">
import { computed } from 'vue'
import type { ApexOptions } from 'apexcharts'
import VueApexCharts from 'vue3-apexcharts'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useTheme } from '@/composables/useTheme'

const { isDarkMode } = useTheme()

const options = computed<ApexOptions>(() => ({
  colors: ['#7592FF', '#BDB4FE', '#7CD4FD'],
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
      columnWidth: '39%',
      borderRadius: 2,
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
    max: 200,
    tickAmount: 4,
    labels: {
      style: {
        colors: isDarkMode.value ? '#94A3B8' : '#364153',
        fontFamily: 'Outfit, sans-serif',
        fontSize: '12px',
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
  },
}))

const series = [
  {
    name: 'Shipment',
    data: [50, 75, 78, 78, 50, 92, 92, 118, 50, 116, 102, 50],
  },
  {
    name: 'In Transit',
    data: [120, 140, 192, 185, 120, 142, 142, 204, 120, 202, 172, 120],
  },
  {
    name: 'Delivery',
    data: [42, 54, 44, 32, 42, 60, 60, 76, 42, 74, 64, 42],
  },
]
</script>

<template>
  <div class="flex flex-col gap-6">
    <!-- Legend Indicators -->
    <div class="flex items-center gap-5">
      <div class="flex items-center gap-1.5">
        <span class="size-2.5 rounded-full bg-[#7592FF]" />
        <span class="text-sm font-normal text-gray-700 dark:text-gray-300"> Shipment </span>
      </div>
      <div class="flex items-center gap-1.5">
        <span class="size-2.5 rounded-full bg-[#BDB4FE]" />
        <span class="text-sm font-normal text-gray-700 dark:text-gray-300"> In Transit </span>
      </div>
      <div class="flex items-center gap-1.5">
        <span class="size-2.5 rounded-full bg-[#7CD4FD]" />
        <span class="text-sm font-normal text-gray-700 dark:text-gray-300"> Delivery </span>
      </div>
    </div>

    <ScrollArea class="max-w-full">
      <div class="min-w-162.5 xl:min-w-full">
        <VueApexCharts :options="options" :series="series" type="bar" :height="200" />
      </div>
    </ScrollArea>
  </div>
</template>
