<template>
  <div class="max-w-full overflow-x-auto custom-scrollbar">
    <div id="scatterChart" class="-ml-4 min-w-[800px] xl:min-w-full pl-2">
      <VueApexCharts type="scatter" height="350" :options="chartOptions" :series="series" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const series = ref([
  {
    name: 'Sample A',
    data: [
      [16.4, 5.4],
      [21.7, 2],
      [25.4, 3],
      [19, 2],
      [10.9, 1],
      [13.6, 3.2],
      [10.9, 7.4],
      [10.9, 0],
      [10.9, 8.2],
      [16.4, 0],
      [16.4, 1.8],
      [13.6, 0.3],
      [13.6, 0],
      [29.9, 0],
      [27.1, 2.3],
      [16.4, 0],
      [13.6, 3.7],
      [10.9, 5.2],
      [16.4, 6.5],
      [10.9, 0],
      [24.5, 7.1],
      [10.9, 0],
      [8.1, 4.7],
    ],
  },
  {
    name: 'Sample B',
    data: [
      [36.4, 13.4],
      [1.7, 11],
      [5.4, 8],
      [9, 17],
      [1.9, 4],
      [3.6, 12.2],
      [1.9, 14.4],
      [1.9, 9],
      [1.9, 13.2],
      [1.4, 7],
      [6.4, 8.8],
      [3.6, 4.3],
      [1.6, 10],
      [9.9, 2],
      [7.1, 15],
      [1.4, 0],
      [3.6, 13.7],
      [1.9, 15.2],
      [6.4, 16.5],
      [0.9, 10],
      [4.5, 17.1],
      [10.9, 10],
      [0.1, 14.7],
    ],
  },
  {
    name: 'Sample C',
    data: [
      [21.7, 3],
      [23.6, 3.5],
      [24.6, 3],
      [29.9, 3],
      [21.7, 20],
      [23, 2],
      [10.9, 3],
      [28, 4],
      [27.1, 0.3],
      [16.4, 4],
      [13.6, 0],
      [19, 5],
      [22.4, 3],
      [24.5, 3],
      [32.6, 3],
      [27.1, 4],
      [29.6, 6],
      [31.6, 8],
      [21.6, 5],
      [20.9, 4],
      [22.4, 0],
      [32.6, 10.3],
      [29.7, 20.8],
    ],
  },
])

const chartOptions = ref({
  chart: {
    fontFamily: 'Outfit, sans-serif',
    height: 350,
    type: 'scatter' as const,
    zoom: {
      enabled: true,
      type: 'xy' as const,
    },
    toolbar: {
      show: false,
    },
  },
  colors: ['#465FFF', '#FFA26B', '#FF5D5D'],
  xaxis: {
    tickAmount: 10,
    labels: {
      formatter: function (val: string) {
        return parseFloat(val).toFixed(1)
      },
      style: {
        fontSize: '12px',
        fontFamily: 'Outfit, sans-serif',
      },
    },
  },
  yaxis: {
    tickAmount: 7,
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
