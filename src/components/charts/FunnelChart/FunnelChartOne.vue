<template>
  <div class="max-w-full overflow-x-auto custom-scrollbar">
    <div id="funnelChart" class="mx-auto max-w-[500px]">
      <VueApexCharts type="bar" height="350" :options="chartOptions" :series="series" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const series = ref([
  {
    name: 'Funnel Series',
    data: [1380, 1100, 990, 880, 740, 548, 330, 200],
  },
])

const chartOptions = ref({
  chart: {
    fontFamily: 'Outfit, sans-serif',
    type: 'bar' as const,
    height: 350,
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      borderRadius: 0,
      horizontal: true,
      barHeight: '80%',
      isFunnel: true,
    },
  },
  colors: ['#465FFF'],
  dataLabels: {
    enabled: true,
    formatter: function (val: number, opt: any) {
      return opt.w.globals.labels[opt.dataPointIndex] + ':  ' + val
    },
    dropShadow: {
      enabled: true,
    },
    style: {
      fontSize: '12px',
      fontFamily: 'Outfit, sans-serif',
    },
  },
  title: {
    text: 'Recruitment Funnel',
    align: 'center' as const,
    style: {
      fontSize: '16px',
      fontFamily: 'Outfit, sans-serif',
      fontWeight: 600,
    },
  },
  xaxis: {
    categories: ['Sourced', 'Screened', 'Assessed', 'HR Interview', 'Technical', 'Verify', 'Offered', 'Hired'],
    labels: {
      style: {
        fontSize: '12px',
        fontFamily: 'Outfit, sans-serif',
      },
    },
  },
  legend: {
    show: false,
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
