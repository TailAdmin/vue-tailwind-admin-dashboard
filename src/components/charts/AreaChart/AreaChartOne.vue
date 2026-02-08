<template>
  <div class="max-w-full overflow-x-auto custom-scrollbar">
    <div id="areaChart" class="-ml-4 min-w-[1000px] xl:min-w-full pl-2">
      <VueApexCharts type="area" height="350" :options="chartOptions" :series="series" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const series = ref([
  {
    name: 'Revenue',
    data: [31, 40, 28, 51, 42, 109, 100, 120, 140, 160, 180, 170],
  },
  {
    name: 'Expenses',
    data: [11, 32, 45, 32, 34, 52, 41, 60, 70, 80, 90, 85],
  },
])

const chartOptions = ref({
  legend: {
    show: true,
    position: 'top' as const,
    horizontalAlign: 'left' as const,
    fontFamily: 'Outfit, sans-serif',
  },
  colors: ['#465FFF', '#FF5D5D'],
  chart: {
    fontFamily: 'Outfit, sans-serif',
    height: 350,
    type: 'area' as const,
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
    type: 'gradient' as const,
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.1,
      stops: [0, 90, 100],
    },
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
      text: 'Amount ($)',
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
        return '$' + val.toLocaleString()
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
