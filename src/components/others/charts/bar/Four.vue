<script setup lang="ts">
import { computed } from 'vue'
import type { ApexOptions } from 'apexcharts'
import VueApexCharts from 'vue3-apexcharts'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useTheme } from '@/composables/useTheme'

const { isDarkMode } = useTheme()

const options = computed<ApexOptions>(() => ({
  colors: ['#465FFF', isDarkMode.value ? '#344054' : '#E4E7EC'],
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
      horizontal: true,
      barHeight: '35%',
      borderRadius: 4,
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
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    min: 0,
    max: 700,
    tickAmount: 7,
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
  yaxis: {
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
  grid: {
    borderColor: isDarkMode.value ? '#1E2640' : '#F3F4F6',
    strokeDashArray: 0,
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
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
      show: true,
    },
  },
}))

const series = [
  {
    name: 'Category A',
    data: [610, 530, 490, 465, 600],
  },
  {
    name: 'Category B',
    data: [540, 560, 480, 510, 540],
  },
]
</script>

<template>
  <div class="flex flex-col gap-6">
    <!-- Legend Indicators -->
    <div class="flex items-center gap-5">
      <div class="flex items-center gap-1.5">
        <span class="size-2.5 rounded-full bg-brand-500" />
        <span class="text-sm font-normal text-gray-700 dark:text-gray-300"> Category A </span>
      </div>
      <div class="flex items-center gap-1.5">
        <span class="size-2.5 rounded-full bg-gray-200 dark:bg-gray-700" />
        <span class="text-sm font-normal text-gray-700 dark:text-gray-300"> Category B </span>
      </div>
    </div>

    <ScrollArea class="max-w-full">
      <div class="min-w-162.5 xl:min-w-full">
        <VueApexCharts :options="options" :series="series" type="bar" :height="200" />
      </div>
    </ScrollArea>
  </div>
</template>
