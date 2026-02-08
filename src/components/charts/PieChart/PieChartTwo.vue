<template>
  <div class="max-w-full overflow-x-auto custom-scrollbar">
    <div id="pieChartTwo" class="mx-auto max-w-[400px]">
      <VueApexCharts type="pie" height="350" :options="chartOptions" :series="series" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const series = ref([25, 15, 44, 55, 41, 17])

const chartOptions = ref({
  chart: {
    fontFamily: 'Outfit, sans-serif',
    type: 'pie' as const,
    toolbar: {
      show: false,
    },
  },
  labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  colors: ['#465FFF', '#9CB9FF', '#FFA26B', '#FF5D5D', '#FFCC5D', '#7C3AED'],
  legend: {
    show: true,
    position: 'bottom' as const,
    fontFamily: 'Outfit, sans-serif',
    fontSize: '14px',
  },
  dataLabels: {
    enabled: true,
    formatter: function (_val: number, opts: any) {
      return opts.w.config.labels[opts.seriesIndex]
    },
    style: {
      fontSize: '12px',
      fontFamily: 'Outfit, sans-serif',
      fontWeight: 'bold',
    },
    dropShadow: {
      enabled: false,
    },
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
  tooltip: {
    y: {
      formatter: function (val: number) {
        return val + '%'
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
