<template>
  <div class="max-w-full overflow-x-auto custom-scrollbar">
    <div id="heatmapChart" class="-ml-4 min-w-[800px] xl:min-w-full pl-2">
      <VueApexCharts type="heatmap" height="350" :options="chartOptions" :series="series" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

function generateData(count: number, yrange: { min: number; max: number }) {
  let i = 0
  const series: { x: string; y: number }[] = []
  while (i < count) {
    const x = 'w' + (i + 1).toString()
    const y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min

    series.push({
      x: x,
      y: y,
    })
    i++
  }
  return series
}

const series = ref([
  {
    name: 'Jan',
    data: generateData(20, {
      min: 0,
      max: 90,
    }),
  },
  {
    name: 'Feb',
    data: generateData(20, {
      min: 0,
      max: 90,
    }),
  },
  {
    name: 'Mar',
    data: generateData(20, {
      min: 0,
      max: 90,
    }),
  },
  {
    name: 'Apr',
    data: generateData(20, {
      min: 0,
      max: 90,
    }),
  },
  {
    name: 'May',
    data: generateData(20, {
      min: 0,
      max: 90,
    }),
  },
  {
    name: 'Jun',
    data: generateData(20, {
      min: 0,
      max: 90,
    }),
  },
  {
    name: 'Jul',
    data: generateData(20, {
      min: 0,
      max: 90,
    }),
  },
  {
    name: 'Aug',
    data: generateData(20, {
      min: 0,
      max: 90,
    }),
  },
  {
    name: 'Sep',
    data: generateData(20, {
      min: 0,
      max: 90,
    }),
  },
])

const chartOptions = ref({
  chart: {
    fontFamily: 'Outfit, sans-serif',
    height: 350,
    type: 'heatmap' as const,
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  colors: ['#465FFF'],
  title: {
    text: 'HeatMap Chart (Multiple color shades)',
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
