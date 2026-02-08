<template>
  <div class="max-w-full overflow-x-auto custom-scrollbar">
    <div id="treemapChart" class="-ml-4 min-w-[800px] xl:min-w-full pl-2">
      <VueApexCharts :type="'treemap' as any" height="350" :options="chartOptions" :series="series" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const series = ref([
  {
    data: [
      {
        x: 'New Delhi',
        y: 218,
      },
      {
        x: 'Kolkata',
        y: 149,
      },
      {
        x: 'Mumbai',
        y: 184,
      },
      {
        x: 'Ahmedabad',
        y: 55,
      },
      {
        x: 'Bangaluru',
        y: 84,
      },
      {
        x: 'Pune',
        y: 31,
      },
      {
        x: 'Chennai',
        y: 70,
      },
      {
        x: 'Jaipur',
        y: 30,
      },
      {
        x: 'Surat',
        y: 44,
      },
      {
        x: 'Hyderabad',
        y: 68,
      },
      {
        x: 'Lucknow',
        y: 28,
      },
      {
        x: 'Indore',
        y: 19,
      },
      {
        x: 'Kanpur',
        y: 29,
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
    text: 'Basic Treemap',
    align: 'left' as const,
    style: {
      fontSize: '16px',
      fontFamily: 'Outfit, sans-serif',
      fontWeight: 600,
    },
  },
  colors: [
    '#465FFF',
    '#9CB9FF',
    '#FFA26B',
    '#FF5D5D',
    '#FFCC5D',
    '#7C3AED',
    '#10B981',
    '#F59E0B',
    '#EF4444',
    '#3B82F6',
    '#8B5CF6',
    '#EC4899',
    '#14B8A6',
  ],
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
