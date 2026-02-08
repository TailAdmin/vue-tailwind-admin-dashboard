<template>
  <div class="max-w-full overflow-x-auto custom-scrollbar">
    <div id="lineChartTwo" class="-ml-4 min-w-[1000px] xl:min-w-full pl-2">
      <VueApexCharts type="line" height="310" :options="chartOptions" :series="series" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const series = ref([
  {
    name: 'High',
    data: [28, 29, 33, 36, 32, 32, 33, 35, 38, 42, 45, 48],
  },
  {
    name: 'Medium',
    data: [12, 11, 14, 18, 17, 13, 13, 15, 18, 20, 22, 25],
  },
  {
    name: 'Low',
    data: [5, 8, 6, 9, 8, 10, 9, 12, 11, 13, 15, 18],
  },
])

const chartOptions = ref({
  legend: {
    show: true,
    position: 'top' as const,
    horizontalAlign: 'left' as const,
    fontFamily: 'Outfit, sans-serif',
  },
  colors: ['#465FFF', '#FFA26B', '#FF5D5D'],
  chart: {
    fontFamily: 'Outfit, sans-serif',
    type: 'line' as const,
    toolbar: {
      show: false,
    },
  },
  stroke: {
    curve: 'smooth' as const,
    width: [3, 3, 3],
  },
  markers: {
    size: 5,
    hover: {
      size: 7,
    },
  },
  grid: {
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
    x: {
      format: 'dd MMM yyyy',
    },
  },
  xaxis: {
    type: 'category' as const,
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
      text: 'Values',
      style: {
        fontSize: '14px',
        fontFamily: 'Outfit, sans-serif',
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
