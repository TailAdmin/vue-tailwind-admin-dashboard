<script setup lang="ts">
import { computed } from 'vue'
import type { ApexOptions, ApexTooltipCustomOpts } from 'apexcharts'
import VueApexCharts from 'vue3-apexcharts'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useTheme } from '@/composables/useTheme'

interface TooltipSeriesItem {
  name?: string
}

const { isDarkMode } = useTheme()

const options = computed<ApexOptions>(() => ({
  legend: {
    show: false, // Hide legend
    position: 'top',
    horizontalAlign: 'left',
  },
  colors: ['#465FFF', '#9CB9FF'], // Define line colors
  chart: {
    fontFamily: 'Outfit, sans-serif',
    height: 310,
    width: '100%',
    type: 'line', // Set the chart type to 'line'
    toolbar: {
      show: false, // Hide chart toolbar
    },
  },
  stroke: {
    curve: 'straight', // Define the line style (straight, smooth, or step)
    width: [2, 2], // Line width for each dataset
  },

  fill: {
    type: 'gradient',
    gradient: {
      opacityFrom: 0.55,
      opacityTo: 0,
    },
  },
  markers: {
    size: 0, // Size of the marker points
    strokeColors: '#fff', // Marker border color
    strokeWidth: 2,
    hover: {
      size: 6, // Marker size on hover
    },
  },
  grid: {
    xaxis: {
      lines: {
        show: false, // Hide grid lines on x-axis
      },
    },
    yaxis: {
      lines: {
        show: true, // Show grid lines on y-axis
      },
    },
  },
  dataLabels: {
    enabled: false, // Disable data labels
  },
  tooltip: {
    enabled: true,
    shared: true,
    intersect: false,
    custom: function ({ series: chartSeries, dataPointIndex, w }: ApexTooltipCustomOpts) {
      const category =
        w.globals?.categoryLabels?.[dataPointIndex] ??
        w.config.xaxis?.categories?.[dataPointIndex] ??
        ''
      const colors = w.config.colors ?? ['#465FFF', '#9CB9FF']
      const seriesList = (w.config.series as unknown as TooltipSeriesItem[]) ?? []

      const rows = seriesList
        .map((s, idx) => {
          const val = chartSeries[idx]?.[dataPointIndex]
          const color = colors[idx] ?? '#465FFF'
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
    type: 'category', // Category-based x-axis
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
      show: false, // Hide x-axis border
    },
    axisTicks: {
      show: false, // Hide x-axis ticks
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
      enabled: false, // Disable tooltip for x-axis points
    },
  },
  yaxis: {
    labels: {
      style: {
        fontSize: '12px', // Adjust font size for y-axis labels
        colors: ['#6B7280'], // Color of the labels
      },
    },
    title: {
      text: '', // Remove y-axis title
      style: {
        fontSize: '0px',
      },
    },
  },
}))

const series = [
  {
    name: 'Sales',
    data: [180, 190, 170, 160, 175, 165, 170, 205, 230, 210, 240, 235],
  },
]
</script>

<template>
  <ScrollArea class="max-w-full">
    <div id="chartEight" class="min-w-250 xl:min-w-full">
      <VueApexCharts :options="options" :series="series" type="area" :height="310" />
    </div>
  </ScrollArea>
</template>
