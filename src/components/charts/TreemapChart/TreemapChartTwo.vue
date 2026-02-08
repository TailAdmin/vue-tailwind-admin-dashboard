<template>
  <div class="max-w-full overflow-x-auto custom-scrollbar">
    <div id="treemapChartTwo" class="-ml-4 min-w-[800px] xl:min-w-full pl-2">
      <VueApexCharts :type="'treemap' as any" height="350" :options="chartOptions" :series="series" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const series = ref([
  {
    name: 'Desktops',
    data: [
      {
        x: 'ABC',
        y: 10,
      },
      {
        x: 'DEF',
        y: 60,
      },
      {
        x: 'XYZ',
        y: 41,
      },
    ],
  },
  {
    name: 'Mobile',
    data: [
      {
        x: 'ABCD',
        y: 10,
      },
      {
        x: 'DEFG',
        y: 20,
      },
      {
        x: 'WXYZ',
        y: 51,
      },
      {
        x: 'PQR',
        y: 30,
      },
      {
        x: 'MNO',
        y: 20,
      },
      {
        x: 'CDE',
        y: 30,
      },
    ],
  },
])

const chartOptions = ref({
  legend: {
    show: false,
  },
  chart: {
    fontFamily: 'Outfit, sans-serif',
    height: 350,
    type: 'treemap' as any,
    toolbar: {
      show: false,
    },
  },
  title: {
    text: 'Multi-Dimensional Treemap',
    align: 'left' as const,
    style: {
      fontSize: '16px',
      fontFamily: 'Outfit, sans-serif',
      fontWeight: 600,
    },
  },
  colors: ['#465FFF', '#FFA26B'],
  plotOptions: {
    treemap: {
      distributed: true,
      enableShades: false,
    },
  },
  dataLabels: {
    enabled: true,
    style: {
      fontSize: '12px',
      fontFamily: 'Outfit, sans-serif',
    },
    formatter: function (text: string, op: any) {
      return [text, op.value]
    },
    offsetY: -4,
  },
  tooltip: {
    y: {
      formatter: function (val: number) {
        return val.toString()
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
