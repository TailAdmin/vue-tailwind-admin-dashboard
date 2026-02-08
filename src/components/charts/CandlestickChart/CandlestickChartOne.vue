<template>
  <div class="max-w-full overflow-x-auto custom-scrollbar">
    <div id="candlestickChart" class="-ml-4 min-w-[800px] xl:min-w-full pl-2">
      <VueApexCharts type="candlestick" height="350" :options="chartOptions" :series="series" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const series = ref([
  {
    name: 'Stock Price',
    data: [
      {
        x: new Date(1538778600000),
        y: [6629.81, 6650.5, 6623.04, 6633.33],
      },
      {
        x: new Date(1538780400000),
        y: [6632.01, 6643.59, 6620, 6630.11],
      },
      {
        x: new Date(1538782200000),
        y: [6630.71, 6648.95, 6623.34, 6635.65],
      },
      {
        x: new Date(1538784000000),
        y: [6635.65, 6651, 6629.67, 6638.24],
      },
      {
        x: new Date(1538785800000),
        y: [6638.24, 6640, 6620, 6624.47],
      },
      {
        x: new Date(1538787600000),
        y: [6624.53, 6636.03, 6621.68, 6624.31],
      },
      {
        x: new Date(1538789400000),
        y: [6624.61, 6632.2, 6617, 6626.02],
      },
      {
        x: new Date(1538791200000),
        y: [6627, 6627.62, 6584.22, 6603.02],
      },
      {
        x: new Date(1538793000000),
        y: [6605, 6608.03, 6598.95, 6604.01],
      },
      {
        x: new Date(1538794800000),
        y: [6604.5, 6614.4, 6602.26, 6608.02],
      },
      {
        x: new Date(1538796600000),
        y: [6608.02, 6610.68, 6601.99, 6608.91],
      },
      {
        x: new Date(1538798400000),
        y: [6608.91, 6618.99, 6608.01, 6612],
      },
      {
        x: new Date(1538800200000),
        y: [6612, 6615.13, 6605.09, 6612],
      },
      {
        x: new Date(1538802000000),
        y: [6612, 6624.12, 6608.43, 6622.95],
      },
      {
        x: new Date(1538803800000),
        y: [6623.91, 6623.91, 6615, 6615.67],
      },
    ],
  },
])

const chartOptions = ref({
  chart: {
    fontFamily: 'Outfit, sans-serif',
    type: 'candlestick' as const,
    height: 350,
    toolbar: {
      show: false,
    },
  },
  title: {
    text: 'Stock Price Movement',
    align: 'left' as const,
    style: {
      fontSize: '18px',
      fontFamily: 'Outfit, sans-serif',
      fontWeight: 600,
    },
  },
  plotOptions: {
    candlestick: {
      colors: {
        upward: '#465FFF',
        downward: '#FF5D5D',
      },
      wick: {
        useFillColor: true,
      },
    },
  },
  xaxis: {
    type: 'datetime' as const,
    labels: {
      style: {
        fontSize: '12px',
        fontFamily: 'Outfit, sans-serif',
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    tooltip: {
      enabled: true,
    },
    labels: {
      style: {
        fontSize: '12px',
        fontFamily: 'Outfit, sans-serif',
      },
      formatter: function (val: number) {
        return '$' + val.toFixed(2)
      },
    },
  },
  grid: {
    borderColor: '#e7e7e7',
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  tooltip: {
    enabled: true,
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
