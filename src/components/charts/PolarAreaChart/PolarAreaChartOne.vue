<template>
  <div class="max-w-full overflow-x-auto custom-scrollbar">
    <div id="polarAreaChart" class="mx-auto max-w-[400px]">
      <VueApexCharts type="polarArea" height="350" :options="chartOptions" :series="series" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const series = ref([14, 23, 21, 17, 15, 10, 12, 17, 21])

const chartOptions = ref({
  chart: {
    fontFamily: 'Outfit, sans-serif',
    type: 'polarArea' as const,
    toolbar: {
      show: false,
    },
  },
  stroke: {
    colors: ['#fff'],
  },
  fill: {
    opacity: 0.8,
  },
  colors: ['#465FFF', '#9CB9FF', '#FFA26B', '#FF5D5D', '#FFCC5D', '#7C3AED', '#10B981', '#F59E0B', '#EF4444'],
  labels: ['Rose A', 'Rose B', 'Rose C', 'Rose D', 'Rose E', 'Rose F', 'Rose G', 'Rose H', 'Rose I'],
  legend: {
    show: true,
    position: 'bottom' as const,
    fontFamily: 'Outfit, sans-serif',
    fontSize: '14px',
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 300,
        },
        legend: {
          position: 'bottom' as const,
        },
      },
    },
  ],
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
