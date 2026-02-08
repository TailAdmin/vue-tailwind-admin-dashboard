<template>
  <div class="max-w-full overflow-x-auto custom-scrollbar">
    <div id="mixedChart" class="-ml-5 min-w-[800px] xl:min-w-full pl-2">
      <VueApexCharts type="line" height="350" :options="chartOptions" :series="series" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const series = ref([
  {
    name: 'Website Visitors',
    type: 'column',
    data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160],
  },
  {
    name: 'Page Views',
    type: 'line',
    data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16],
  },
  {
    name: 'Bounce Rate',
    type: 'area',
    data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43, 27],
  },
])

const chartOptions = ref({
  chart: {
    fontFamily: 'Outfit, sans-serif',
    height: 350,
    type: 'line' as const,
    stacked: false,
    toolbar: {
      show: false,
    },
  },
  colors: ['#465FFF', '#FF5D5D', '#FFA26B'],
  stroke: {
    width: [0, 2, 2],
    curve: 'smooth' as const,
  },
  plotOptions: {
    bar: {
      columnWidth: '50%',
      borderRadius: 5,
      borderRadiusApplication: 'end' as const,
    },
  },
  fill: {
    opacity: [0.85, 1, 0.25],
    gradient: {
      inverseColors: false,
      shade: 'light' as const,
      type: 'vertical' as const,
      opacityFrom: 0.85,
      opacityTo: 0.55,
      stops: [0, 100, 100, 100],
    },
  },
  labels: [
    '01/01/2024',
    '02/01/2024',
    '03/01/2024',
    '04/01/2024',
    '05/01/2024',
    '06/01/2024',
    '07/01/2024',
    '08/01/2024',
    '09/01/2024',
    '10/01/2024',
    '11/01/2024',
    '12/01/2024',
  ],
  markers: {
    size: 0,
  },
  xaxis: {
    type: 'datetime' as const,
    labels: {
      style: {
        fontSize: '12px',
        fontFamily: 'Outfit, sans-serif',
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    title: {
      text: 'Analytics Data',
      style: {
        fontSize: '14px',
        fontFamily: 'Outfit, sans-serif',
      },
    },
    labels: {
      style: {
        fontSize: '12px',
        fontFamily: 'Outfit, sans-serif',
      },
    },
  },
  legend: {
    show: true,
    position: 'top' as const,
    horizontalAlign: 'left' as const,
    fontFamily: 'Outfit, sans-serif',
    fontSize: '14px',
  },
  grid: {
    borderColor: '#e7e7e7',
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  tooltip: {
    shared: true,
    intersect: false,
    y: {
      formatter: function (y: number | undefined): string {
        if (typeof y !== 'undefined') {
          return y.toFixed(0)
        }
        return ''
      },
    },
  },
})
</script>

<style scoped>
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #465FFF #f1f1f1;
}

.custom-scrollbar::-webkit-scrollbar {
  height: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #465FFF;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #3548d4;
}
</style>
