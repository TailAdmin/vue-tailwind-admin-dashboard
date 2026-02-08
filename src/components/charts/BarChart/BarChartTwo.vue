<template>
  <div class="max-w-full overflow-x-auto custom-scrollbar">
    <div id="barChartTwo" class="-ml-5 min-w-[650px] xl:min-w-full pl-2">
      <VueApexCharts type="bar" height="280" :options="chartOptions" :series="series" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const series = ref([
  {
    name: 'Q1',
    data: [44, 55, 41, 67, 22, 43],
  },
  {
    name: 'Q2',
    data: [13, 23, 20, 8, 13, 27],
  },
  {
    name: 'Q3',
    data: [11, 17, 15, 15, 21, 14],
  },
  {
    name: 'Q4',
    data: [21, 7, 25, 13, 22, 8],
  },
])

const chartOptions = ref({
  colors: ['#465fff', '#9CB9FF', '#FFA26B', '#FF5D5D'],
  chart: {
    fontFamily: 'Outfit, sans-serif',
    type: 'bar' as const,
    height: 280,
    stacked: true,
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
      borderRadius: 5,
      borderRadiusApplication: 'end' as const,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent'],
  },
  xaxis: {
    categories: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E', 'Product F'],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  legend: {
    show: true,
    position: 'top' as const,
    horizontalAlign: 'left' as const,
    fontFamily: 'Outfit',
  },
  yaxis: {
    title: {
      text: 'Sales (thousands)',
      style: {
        fontSize: '14px',
        fontFamily: 'Outfit, sans-serif',
      },
    },
  },
  grid: {
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    y: {
      formatter: function (val: number) {
        return val + 'k'
      },
    },
  },
})
</script>

<style scoped>
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #465fff #f1f1f1;
}

.custom-scrollbar::-webkit-scrollbar {
  height: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #465fff;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #3548d4;
}
</style>
