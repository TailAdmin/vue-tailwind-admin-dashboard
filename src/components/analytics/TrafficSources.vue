<template>
  <div class="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
    <h3 class="mb-6 text-lg font-semibold text-gray-900 dark:text-white">Traffic Sources</h3>
    <div class="flex flex-col gap-6 lg:flex-row">
      <div class="flex-1">
        <VueApexCharts type="donut" height="280" :options="chartOptions" :series="series" />
      </div>
      <div class="flex flex-1 flex-col justify-center gap-4">
        <div
          v-for="source in sources"
          :key="source.name"
          class="flex items-center justify-between"
        >
          <div class="flex items-center gap-3">
            <div :class="['h-3 w-3 rounded-full', source.color]"></div>
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{
              source.name
            }}</span>
          </div>
          <div class="text-right">
            <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ source.value }}%</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">{{ source.visitors }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const series = ref([40, 25, 20, 10, 5])

const sources = ref([
  { name: 'Organic Search', value: 40, visitors: '128.5K', color: 'bg-blue-500' },
  { name: 'Direct', value: 25, visitors: '80.3K', color: 'bg-green-500' },
  { name: 'Social Media', value: 20, visitors: '64.2K', color: 'bg-orange-500' },
  { name: 'Referral', value: 10, visitors: '32.1K', color: 'bg-purple-500' },
  { name: 'Email', value: 5, visitors: '16.0K', color: 'bg-pink-500' },
])

const chartOptions = ref<ApexCharts.ApexOptions>({
  chart: {
    fontFamily: 'Outfit, sans-serif',
    type: 'donut' as const,
  },
  colors: ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'],
  labels: ['Organic Search', 'Direct', 'Social Media', 'Referral', 'Email'],
  legend: {
    show: false,
  },
  plotOptions: {
    pie: {
      donut: {
        size: '70%',
        labels: {
          show: true,
          total: {
            show: true,
            label: 'Total',
            fontSize: '14px',
            fontFamily: 'Outfit, sans-serif',
            formatter: function () {
              return '321K'
            },
          },
          value: {
            fontSize: '24px',
            fontFamily: 'Outfit, sans-serif',
            fontWeight: 'bold',
          },
        },
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
})
</script>
