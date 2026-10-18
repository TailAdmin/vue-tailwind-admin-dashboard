<script setup lang="ts">
import { computed, ref } from 'vue'
import type { ApexOptions } from 'apexcharts'
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from '@/composables/useTheme'
import CardHeader from './CardHeader.vue'
import { getStatisticsSeries, monthKeys } from './data'
import type { StatisticTab } from './data'

interface TooltipSeriesItem {
  name?: string
}

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

const selectedTab = ref<StatisticTab>('overview')
const dateRangeFactor = ref<number>(1)

const handleDateRangeChange = ([start, end]: [Date, Date]) => {
  const days = Math.round(Math.abs(end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
  dateRangeFactor.value = Math.max(0.6, Math.min(1.4, Number((days / 30).toFixed(2))))
}

const series = computed(() =>
  getStatisticsSeries(
    selectedTab.value,
    (key) => (key === 'sales' ? 'Sales' : 'Revenue'),
    dateRangeFactor.value,
  ),
)

const colors = computed(() => {
  switch (selectedTab.value) {
    case 'sales':
      return ['#465FFF']
    case 'revenue':
      return ['#9CB9FF']
    case 'overview':
    default:
      return ['#465FFF', '#9CB9FF']
  }
})

const options = computed<ApexOptions>(() => ({
  legend: {
    show: false,
  },
  colors: colors.value,
  chart: {
    fontFamily: 'Outfit, sans-serif',
    height: 310,
    type: 'area',
    toolbar: {
      show: false,
    },
  },
  stroke: {
    curve: 'straight',
    width: selectedTab.value === 'overview' ? [2, 2] : [2],
  },
  fill: {
    type: 'gradient',
    gradient: {
      opacityFrom: 0.55,
      opacityTo: 0,
    },
  },
  markers: {
    size: 0,
    strokeColors: '#fff',
    strokeWidth: 2,
    hover: {
      size: 6,
    },
  },
  grid: {
    borderColor: isDarkMode.value ? '#1E2640' : '#F3F4F6',
    strokeDashArray: 0,
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
    enabled: true,
    shared: true,
    intersect: false,
    custom: function ({
      series: chartSeries,
      dataPointIndex,
      w,
    }: {
      series: number[][]
      dataPointIndex: number
      w: any
    }) {
      const category =
        w.globals?.categoryLabels?.[dataPointIndex] ??
        w.config.xaxis?.categories?.[dataPointIndex] ??
        ''
      const tooltipColors = w.config.colors ?? ['#465FFF']
      const seriesList = (w.config.series as unknown as TooltipSeriesItem[]) ?? []

      const rows = seriesList
        .map((s, idx) => {
          const val = chartSeries[idx]?.[dataPointIndex]
          const color = tooltipColors[idx] ?? '#465FFF'
          const formattedVal = typeof val === 'number' ? val.toLocaleString() : (val ?? '')
          return `
                <div class="flex items-center gap-2">
                  <div class="flex items-center gap-1.5">
                    <span class="size-1.5 rounded-full shrink-0" style="background-color: ${color}"></span>
                    <span class="w-13 text-xs text-gray-800 dark:text-white/90">${s.name ?? ''}</span>
                    <span class="text-xs font-medium text-gray-400 dark:text-gray-500">:</span>
                  </div>
                  <span class="text-xs font-medium text-gray-800 dark:text-white/90">${formattedVal}</span>
                </div>
              `
        })
        .join('')

      return `
            <div class="min-w-32.5">
              <p class="mb-1 text-[10px] leading-4 text-gray-500 dark:text-gray-400">${category}</p>
              <div class="flex flex-col gap-1">
                ${rows}
              </div>
            </div>
          `
    },
  },
  xaxis: {
    type: 'category',
    categories: monthKeys.map((key) => monthLabels[key]),
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    crosshairs: {
      show: true,
      width: 2,
      position: 'back',
      opacity: 1,
      stroke: {
        width: 0,
        color: 'none',
      },
      fill: {
        type: 'gradient',
        gradient: {
          colorFrom: isDarkMode.value ? 'rgba(255, 255, 255, 0.1)' : '#ffffff',
          colorTo: '#9CB9FF',
          stops: [0, 100],
          opacityFrom: 1,
          opacityTo: 1,
        },
      },
    },
    tooltip: {
      enabled: false,
    },
    labels: {
      style: {
        fontSize: '12px',
        fontFamily: 'Outfit, sans-serif',
        colors: isDarkMode.value ? '#94A3B8' : '#6B7280',
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        fontSize: '12px',
        fontFamily: 'Outfit, sans-serif',
        colors: isDarkMode.value ? '#94A3B8' : '#6B7280',
      },
    },
    title: {
      text: '',
      style: {
        fontSize: '0px',
      },
    },
  },
}))
</script>

<template>
  <div
    class="rounded-2xl border border-gray-200 bg-white px-5 pt-5 pb-5 sm:px-6 sm:pt-6 dark:border-gray-800 dark:bg-white/3"
  >
    <CardHeader
      :selected-tab="selectedTab"
      @tab-change="selectedTab = $event"
      @date-range-change="handleDateRangeChange"
    />

    <div class="custom-scrollbar max-w-full overflow-x-auto">
      <div class="min-w-250 xl:min-w-full">
        <VueApexCharts type="area" :height="310" :options="options" :series="series" />
      </div>
    </div>
  </div>
</template>
