<template>
  <div class="max-w-full overflow-x-auto custom-scrollbar">
    <div id="radialBarChartOne" class="mx-auto max-w-[400px]">
      <VueApexCharts type="radialBar" height="350" :options="chartOptions" :series="series" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const series = ref([70])

const chartOptions = ref({
  chart: {
    fontFamily: 'Outfit, sans-serif',
    height: 350,
    type: 'radialBar' as const,
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    radialBar: {
      startAngle: -135,
      endAngle: 225,
      hollow: {
        margin: 0,
        size: '70%',
        background: '#fff',
        position: 'front' as const,
        dropShadow: {
          enabled: true,
          top: 3,
          left: 0,
          blur: 4,
          opacity: 0.24,
        },
      },
      track: {
        background: '#E5E7EB',
        strokeWidth: '67%',
        margin: 0,
      },
      dataLabels: {
        show: true,
        name: {
          offsetY: -10,
          show: true,
          color: '#888',
          fontSize: '17px',
          fontFamily: 'Outfit, sans-serif',
        },
        value: {
          formatter: function (val: number) {
            return parseInt(val.toString(), 10).toString() + '%'
          },
          color: '#111',
          fontSize: '36px',
          fontWeight: 'bold',
          fontFamily: 'Outfit, sans-serif',
          show: true,
          offsetY: 10,
        },
      },
    },
  },
  fill: {
    type: 'gradient' as const,
    gradient: {
      shade: 'dark' as const,
      type: 'horizontal' as const,
      shadeIntensity: 0.5,
      gradientToColors: ['#9CB9FF'],
      inverseColors: true,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100],
    },
  },
  colors: ['#465FFF'],
  stroke: {
    lineCap: 'round' as const,
  },
  labels: ['Progress'],
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
