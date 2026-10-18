<script setup lang="ts">
import { computed } from 'vue'
import type { ApexOptions } from 'apexcharts'
import VueApexCharts from 'vue3-apexcharts'
import { ScrollArea } from '@/components/ui/scroll-area'

const darkCount = 18
const lightCount = 18
const grayCount = 18
const totalBars = darkCount + lightCount + grayCount // 54 bars

const options = computed<ApexOptions>(() => ({
  series: [{ name: 'Progress', data: Array(totalBars).fill(100) }],
  colors: [
    ...Array(darkCount).fill('#465FFF'),
    ...Array(lightCount).fill('#9CB9FF'),
    ...Array(grayCount).fill('#E5E7EB'),
  ],
  chart: {
    fontFamily: 'Outfit, sans-serif',
    type: 'bar',
    height: 32,
    sparkline: { enabled: true },
    toolbar: { show: false },
    animations: { enabled: false },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      distributed: true,
      columnWidth: '70%',
      borderRadius: 1,
      borderRadiusApplication: 'around',
    },
  },
  dataLabels: { enabled: false },
  stroke: { show: false },
  xaxis: {
    labels: { show: false },
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  yaxis: { show: false },
  grid: {
    show: false,
    padding: { top: 0, right: 0, bottom: 0, left: 0 },
  },
  tooltip: { enabled: false },
  legend: { show: false },
}))

const series = [
  {
    name: 'Progress',
    data: Array(totalBars).fill(100),
  },
]
</script>

<template>
  <div class="flex flex-col gap-5">
    <ScrollArea class="max-w-full">
      <div class="min-w-162.5 xl:min-w-full">
        <VueApexCharts :options="options" :series="series" type="bar" :height="32" />
      </div>
    </ScrollArea>

    <!-- Legend Indicators -->
    <div class="flex items-center gap-6.5 py-3 ps-4">
      <div class="flex items-center gap-1.5">
        <span class="size-2 rounded-full bg-brand-500" />
        <span class="text-sm font-normal text-gray-700 dark:text-gray-300"> Website </span>
      </div>
      <div class="flex items-center gap-1.5">
        <span class="size-2 rounded-full bg-brand-300" />
        <span class="text-sm font-normal text-gray-700 dark:text-gray-300"> Email </span>
      </div>
      <div class="flex items-center gap-1.5">
        <span class="size-2 rounded-full bg-gray-300 dark:bg-gray-700" />
        <span class="text-sm font-normal text-gray-700 dark:text-gray-300"> Social Media </span>
      </div>
    </div>
  </div>
</template>
