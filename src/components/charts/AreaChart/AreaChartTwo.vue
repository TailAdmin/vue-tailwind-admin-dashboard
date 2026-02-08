<template>
  <div class="max-w-full overflow-x-auto custom-scrollbar">
    <div id="areaChartTwo" class="-ml-4 min-w-[1000px] xl:min-w-full pl-2">
      <VueApexCharts type="area" height="350" :options="chartOptions" :series="series" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const series = ref([
  {
    name: 'South',
    data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43, 27],
  },
  {
    name: 'North',
    data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 51],
  },
  {
    name: 'Central',
    data: [13, 23, 20, 8, 13, 27, 33, 12, 15, 20, 19, 18],
  },
])

const chartOptions = ref({
  legend: {
    show: true,
    position: 'top' as const,
    horizontalAlign: 'left' as const,
    fontFamily: 'Outfit, sans-serif',
  },
  colors: ['#465FFF', '#FFA26B', '#9CB9FF'],
  chart: {
    fontFamily: 'Outfit, sans-serif',
    height: 350,
    type: 'area' as const,
    stacked: true,
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth' as const,
    width: 2,
  },
  fill: {
    type: 'solid' as const,
    opacity: 0.7,
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
  },
  yaxis: {
    title: {
      text: 'Regional Sales',
      style: {
        fontSize: '14px',
        fontFamily: 'Outfit, sans-serif',
      },
    },
  },
  grid: {
    borderColor: '#e7e7e7',
    row: {
      colors: ['transparent', 'transparent'],
      opacity: 0.5,
    },
  },
  tooltip: {
    shared: true,
    intersect: false,
    y: {
      formatter: function (val: number) {
        return val.toLocaleString() + ' units'
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
