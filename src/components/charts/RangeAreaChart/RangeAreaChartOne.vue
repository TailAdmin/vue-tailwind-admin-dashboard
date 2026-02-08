<template>
  <div class="max-w-full overflow-x-auto custom-scrollbar">
    <div id="rangeAreaChart" class="-ml-4 min-w-[800px] xl:min-w-full pl-2">
      <VueApexCharts :type="'rangeArea' as any" height="350" :options="chartOptions" :series="series" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const series = ref([
  {
    type: 'rangeArea',
    name: 'Temperature Range',
    data: [
      {
        x: 'Jan',
        y: [15, 28],
      },
      {
        x: 'Feb',
        y: [17, 30],
      },
      {
        x: 'Mar',
        y: [20, 33],
      },
      {
        x: 'Apr',
        y: [23, 36],
      },
      {
        x: 'May',
        y: [26, 39],
      },
      {
        x: 'Jun',
        y: [28, 41],
      },
      {
        x: 'Jul',
        y: [29, 42],
      },
      {
        x: 'Aug',
        y: [28, 41],
      },
      {
        x: 'Sep',
        y: [25, 38],
      },
      {
        x: 'Oct',
        y: [22, 34],
      },
      {
        x: 'Nov',
        y: [19, 30],
      },
      {
        x: 'Dec',
        y: [16, 28],
      },
    ],
  },
  {
    type: 'line',
    name: 'Average Temperature',
    data: [
      {
        x: 'Jan',
        y: 21,
      },
      {
        x: 'Feb',
        y: 23,
      },
      {
        x: 'Mar',
        y: 26,
      },
      {
        x: 'Apr',
        y: 29,
      },
      {
        x: 'May',
        y: 32,
      },
      {
        x: 'Jun',
        y: 34,
      },
      {
        x: 'Jul',
        y: 35,
      },
      {
        x: 'Aug',
        y: 34,
      },
      {
        x: 'Sep',
        y: 31,
      },
      {
        x: 'Oct',
        y: 28,
      },
      {
        x: 'Nov',
        y: 24,
      },
      {
        x: 'Dec',
        y: 22,
      },
    ],
  },
])

const chartOptions = ref({
  chart: {
    fontFamily: 'Outfit, sans-serif',
    height: 350,
    type: 'rangeArea' as const,
    toolbar: {
      show: false,
    },
    animations: {
      speed: 500,
    },
  },
  colors: ['#465FFF', '#FF5D5D'],
  dataLabels: {
    enabled: false,
  },
  fill: {
    opacity: [0.24, 1],
  },
  forecastDataPoints: {
    count: 0,
  },
  stroke: {
    curve: 'smooth' as const,
    width: [0, 2],
  },
  legend: {
    show: true,
    position: 'top' as const,
    horizontalAlign: 'left' as const,
    fontFamily: 'Outfit, sans-serif',
  },
  markers: {
    hover: {
      sizeOffset: 5,
    },
  },
  title: {
    text: 'Temperature Range (Min - Max)',
    align: 'left' as const,
    style: {
      fontSize: '16px',
      fontFamily: 'Outfit, sans-serif',
      fontWeight: 600,
    },
  },
  xaxis: {
    labels: {
      style: {
        fontSize: '12px',
        fontFamily: 'Outfit, sans-serif',
      },
    },
  },
  yaxis: {
    title: {
      text: 'Temperature (°C)',
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
  grid: {
    borderColor: '#e7e7e7',
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
