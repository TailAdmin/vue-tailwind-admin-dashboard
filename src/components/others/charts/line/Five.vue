<script setup lang="ts">
import { computed } from 'vue'
import type { ApexOptions, ApexTooltipCustomOpts } from 'apexcharts'
import VueApexCharts from 'vue3-apexcharts'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useTheme } from '@/composables/useTheme'

interface TooltipSeriesItem {
  name?: string
}

const data: [number, number][] = [
  [1716681600000, 1197],
  [1716844757396, 1239],
  [1716904582506, 1205],
  [1716975284194, 1218],
  [1717087682051, 1208],
  [1717162010313, 1257],
  [1717236337789, 1268],
  [1717305226189, 1268],
  [1717336044994, 1262],
  [1717493764809, 1282],
  [1717593472015, 1285],
  [1717649671337, 1271],
  [1717718562096, 1277],
  [1717763878550, 1266],
  [1717832769309, 1266],
  [1717901660069, 1285],
  [1717966925826, 1288],
  [1718164523806, 1329],
  [1718215289556, 1329],
  [1718269672446, 1355],
  [1718392946094, 1341],
  [1718507161170, 1360],
  [1718572419065, 1351],
  [1718804466355, 1368],
  [1718866107111, 1368],
  [1718956747881, 1390],
  [1719025638641, 1371],
  [1719085462964, 1381],
  [1719141662286, 1360],
  [1719210553046, 1368],
  [1719264935935, 1398],
  [1719321135257, 1385],
  [1719433533900, 1393],
  [1719529616104, 1393],
  [1719611198301, 1414],
  [1719701839071, 1410],
  [1719767104829, 1421],
  [1719810612713, 1401],
  [1719894003480, 1398],
  [1719964702808, 1405],
  [1720035402137, 1390],
  [1720071660017, 1366],
  [1720138742208, 1410],
  [1720205816535, 1393],
  [1720278332296, 1405],
  [1720320023747, 1429],
  [1720368973066, 1421],
  [1720441488827, 1429],
  [1720515813157, 1425],
  [1720572012479, 1469],
  [1720620961798, 1463],
  [1720697102560, 1502],
  [1720755110451, 1488],
  [1720833067647, 1488],
  [1720898333405, 1469],
  [1720941841289, 1469],
  [1721099556386, 1511],
  [1721221021465, 1523],
  [1721259087915, 1518],
  [1721315287237, 1502],
  [1721382369427, 1549],
  [1721440377318, 1565],
  [1721494760207, 1549],
  [1721578158837, 1543],
  [1721645233164, 1552],
  [1721730440363, 1549],
  [1721821081133, 1552],
  [1721870030451, 1562],
  [1721935288345, 1535],
  [1722016870543, 1585],
  [1722131077755, 1613],
  [1722172777070, 1640],
  [1722314183591, 1655],
  [1722346808606, 1649],
  [1722484590125, 1709],
  [1722555289454, 1692],
  [1722616930210, 1736],
  [1722682195968, 1726],
  [1722783711743, 1763],
  [1722839911065, 1792],
  [1722899735388, 1786],
  [1722983126155, 1788],
  [1723048391912, 1843],
  [1723180731997, 1763],
  [1723300380644, 1759],
  [1723381962841, 1625],
  [1723410962855, 1485],
  [1723483478616, 1570],
  [1723537869369, 1548],
  [1723594068691, 1394],
  [1723739092350, 1514],
  [1723788041668, 1522],
  [1723916756751, 1625],
  [1723976581075, 1628],
  [1724108921159, 1575],
  [1724179620488, 1586],
  [1724253952682, 1679],
  [1724306519139, 1707],
  [1724471492102, 1538],
  [1724544000000, 1561],
]

const series = [
  {
    name: 'Sales',
    data,
  },
]

const { isDarkMode } = useTheme()

const options = computed<ApexOptions>(() => ({
  legend: {
    show: false,
  },
  colors: ['#465FFF'],
  chart: {
    fontFamily: 'Outfit, sans-serif',
    height: 310,
    type: 'area',
    toolbar: {
      show: false,
    },
  },
  stroke: {
    curve: 'smooth',
    width: 2,
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
    colors: ['#ffffff'],
    strokeColors: ['#465FFF'],
    strokeWidth: 2,
    hover: {
      size: 5,
    },
  },
  grid: {
    position: 'back',
    borderColor: isDarkMode.value ? '#1E2640' : '#F3F4F6',
    strokeDashArray: 0,
    xaxis: {
      lines: {
        show: true,
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
    custom: function ({ series: chartSeries, dataPointIndex, w }: ApexTooltipCustomOpts) {
      const rawPoint = data[dataPointIndex]
      const timestamp = rawPoint ? rawPoint[0] : undefined
      const category = timestamp
        ? new Date(timestamp).toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
          })
        : (w.globals?.categoryLabels?.[dataPointIndex] ??
          w.config.xaxis?.categories?.[dataPointIndex] ??
          '')
      const colors = w.config.colors ?? ['#465FFF']
      const seriesList = (w.config.series as unknown as TooltipSeriesItem[]) ?? []

      const rows = seriesList
        .map((s, idx) => {
          const val = chartSeries[idx]?.[dataPointIndex]
          const color = colors[idx] ?? '#465FFF'
          const formattedVal = typeof val === 'number' ? `$${val.toLocaleString()}` : (val ?? '')
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
    type: 'datetime',
    tickAmount: 11,
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
    labels: {
      format: 'MMM dd',
      formatter: (val: string, timestamp?: number): string => {
        if (!timestamp) return val
        return new Date(timestamp).toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
        })
      },
      style: {
        fontSize: '12px',
        fontFamily: 'Outfit, sans-serif',
        colors: isDarkMode.value ? '#94A3B8' : '#6B7280',
      },
    },
    tooltip: {
      enabled: false,
    },
  },
  yaxis: {
    min: 1200,
    max: 2000,
    tickAmount: 4,
    labels: {
      formatter: (val: number): string => {
        return `$${val.toLocaleString()}`
      },
      style: {
        fontSize: '12px',
        fontFamily: 'Outfit, sans-serif',
        colors: isDarkMode.value ? '#94A3B8' : '#6B7280',
      },
    },
    title: {
      text: undefined,
    },
  },
}))
</script>

<template>
  <ScrollArea class="max-w-full">
    <div id="chartFive" class="min-w-250 xl:min-w-full">
      <VueApexCharts :options="options" :series="series" type="area" :height="310" />
    </div>
  </ScrollArea>
</template>
