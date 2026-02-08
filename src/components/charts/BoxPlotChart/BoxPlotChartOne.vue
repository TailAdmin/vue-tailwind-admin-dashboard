<template>
  <div class="max-w-full overflow-x-auto custom-scrollbar">
    <div id="boxPlotChart" class="-ml-4 min-w-[800px] xl:min-w-full pl-2">
      <VueApexCharts :type="'boxPlot' as any" height="350" :options="chartOptions" :series="series" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const series = ref([
  {
    type: 'boxPlot',
    data: [
      {
        x: 'Jan 2024',
        y: [54, 66, 69, 75, 88],
      },
      {
        x: 'Feb 2024',
        y: [43, 65, 69, 76, 81],
      },
      {
        x: 'Mar 2024',
        y: [31, 39, 45, 51, 59],
      },
      {
        x: 'Apr 2024',
        y: [39, 46, 55, 65, 71],
      },
      {
        x: 'May 2024',
        y: [29, 31, 35, 39, 44],
      },
      {
        x: 'Jun 2024',
        y: [41, 49, 58, 61, 67],
      },
      {
        x: 'Jul 2024',
        y: [54, 59, 66, 71, 88],
      },
    ],
  },
])

const chartOptions = ref({
  chart: {
    fontFamily: 'Outfit, sans-serif',
    type: 'boxPlot' as const,
    height: 350,
    toolbar: {
      show: false,
    },
  },
  title: {
    text: 'Basic BoxPlot Chart',
    align: 'left' as const,
    style: {
      fontSize: '16px',
      fontFamily: 'Outfit, sans-serif',
      fontWeight: 600,
    },
  },
  colors: ['#465FFF'],
  plotOptions: {
    boxPlot: {
      colors: {
        upper: '#465FFF',
        lower: '#9CB9FF',
      },
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
      text: 'Value',
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
  tooltip: {
    shared: false,
    intersect: true,
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
