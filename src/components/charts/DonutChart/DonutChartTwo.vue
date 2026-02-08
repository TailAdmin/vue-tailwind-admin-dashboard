<template>
  <div class="max-w-full overflow-x-auto custom-scrollbar">
    <div id="donutChartTwo" class="mx-auto max-w-[400px]">
      <VueApexCharts type="donut" height="350" :options="chartOptions" :series="series" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const series = ref([70, 30])

const chartOptions = ref({
  chart: {
    fontFamily: 'Outfit, sans-serif',
    type: 'donut' as const,
    toolbar: {
      show: false,
    },
  },
  labels: ['Completed', 'Remaining'],
  colors: ['#465FFF', '#E5E7EB'],
  legend: {
    show: true,
    position: 'bottom' as const,
    fontFamily: 'Outfit, sans-serif',
    fontSize: '14px',
  },
  plotOptions: {
    pie: {
      donut: {
        size: '75%',
        labels: {
          show: true,
          name: {
            show: true,
            fontSize: '22px',
            fontFamily: 'Outfit, sans-serif',
            offsetY: -10,
          },
          value: {
            show: true,
            fontSize: '32px',
            fontFamily: 'Outfit, sans-serif',
            fontWeight: 'bold',
            offsetY: 10,
            formatter: function (val: string) {
              return val + '%'
            },
          },
          total: {
            show: true,
            label: 'Progress',
            fontSize: '18px',
            fontFamily: 'Outfit, sans-serif',
            color: '#373d3f',
            formatter: function (w: any) {
              return w.globals.seriesTotals[0] + '%'
            },
          },
        },
      },
    },
  },
  dataLabels: {
    enabled: false,
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
