<template>
  <div class="max-w-full overflow-x-auto custom-scrollbar">
    <div id="radarChart" class="mx-auto max-w-[500px]">
      <VueApexCharts type="radar" height="350" :options="chartOptions" :series="series" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const series = ref([
  {
    name: 'Series 1',
    data: [80, 50, 30, 40, 100, 20],
  },
  {
    name: 'Series 2',
    data: [20, 30, 40, 80, 20, 80],
  },
  {
    name: 'Series 3',
    data: [44, 76, 78, 13, 43, 10],
  },
])

const chartOptions = ref({
  chart: {
    fontFamily: 'Outfit, sans-serif',
    height: 350,
    type: 'radar' as const,
    toolbar: {
      show: false,
    },
  },
  colors: ['#465FFF', '#FF5D5D', '#FFA26B'],
  title: {
    text: 'Skills Comparison',
    align: 'center' as const,
    style: {
      fontSize: '18px',
      fontFamily: 'Outfit, sans-serif',
      fontWeight: 600,
    },
  },
  xaxis: {
    categories: ['Communication', 'Problem Solving', 'Leadership', 'Creativity', 'Teamwork', 'Technical'],
    labels: {
      style: {
        colors: ['#373d3f', '#373d3f', '#373d3f', '#373d3f', '#373d3f', '#373d3f'],
        fontSize: '12px',
        fontFamily: 'Outfit, sans-serif',
      },
    },
  },
  yaxis: {
    show: false,
  },
  legend: {
    show: true,
    position: 'bottom' as const,
    fontFamily: 'Outfit, sans-serif',
    fontSize: '14px',
  },
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    radar: {
      size: 140,
      polygons: {
        strokeColors: '#e9e9e9',
        fill: {
          colors: ['#f8f8f8', '#fff'],
        },
      },
    },
  },
  markers: {
    size: 4,
    colors: ['#fff'],
    strokeColor: '#465FFF',
    strokeWidth: 2,
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
