<template>
  <div class="max-w-full overflow-x-auto custom-scrollbar">
    <div id="timelineChart" class="-ml-4 min-w-[800px] xl:min-w-full pl-2">
      <VueApexCharts type="rangeBar" height="350" :options="chartOptions" :series="series" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const series = ref([
  {
    name: 'Bob',
    data: [
      {
        x: 'Design',
        y: [new Date('2024-03-01').getTime(), new Date('2024-03-05').getTime()],
      },
      {
        x: 'Code',
        y: [new Date('2024-03-06').getTime(), new Date('2024-03-12').getTime()],
      },
      {
        x: 'Test',
        y: [new Date('2024-03-13').getTime(), new Date('2024-03-18').getTime()],
      },
    ],
  },
  {
    name: 'Joe',
    data: [
      {
        x: 'Design',
        y: [new Date('2024-03-02').getTime(), new Date('2024-03-07').getTime()],
      },
      {
        x: 'Code',
        y: [new Date('2024-03-08').getTime(), new Date('2024-03-15').getTime()],
      },
      {
        x: 'Test',
        y: [new Date('2024-03-16').getTime(), new Date('2024-03-22').getTime()],
      },
    ],
  },
  {
    name: 'Dan',
    data: [
      {
        x: 'Design',
        y: [new Date('2024-03-01').getTime(), new Date('2024-03-04').getTime()],
      },
      {
        x: 'Code',
        y: [new Date('2024-03-05').getTime(), new Date('2024-03-14').getTime()],
      },
      {
        x: 'Test',
        y: [new Date('2024-03-15').getTime(), new Date('2024-03-20').getTime()],
      },
    ],
  },
])

const chartOptions = ref({
  chart: {
    fontFamily: 'Outfit, sans-serif',
    height: 350,
    type: 'rangeBar' as const,
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      horizontal: true,
      barHeight: '50%',
      rangeBarGroupRows: true,
    },
  },
  colors: ['#465FFF', '#FFA26B', '#FF5D5D'],
  fill: {
    type: 'solid' as const,
  },
  xaxis: {
    type: 'datetime' as const,
    labels: {
      style: {
        fontSize: '12px',
        fontFamily: 'Outfit, sans-serif',
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        fontSize: '12px',
        fontFamily: 'Outfit, sans-serif',
      },
    },
  },
  legend: {
    position: 'top' as const,
    horizontalAlign: 'left' as const,
    fontFamily: 'Outfit, sans-serif',
  },
  title: {
    text: 'Project Timeline',
    align: 'left' as const,
    style: {
      fontSize: '16px',
      fontFamily: 'Outfit, sans-serif',
      fontWeight: 600,
    },
  },
  grid: {
    borderColor: '#e7e7e7',
  },
  tooltip: {
    custom: function (opts: any) {
      const values = opts.ctx.rangeBar.getTooltipValues(opts)

      return (
        '<div class="apexcharts-tooltip-rangebar">' +
        '<div> <span class="series-name" style="color: ' +
        values.color +
        '">' +
        (values.seriesName ? values.seriesName : '') +
        '</span></div>' +
        '<div> <span class="category">' +
        values.ylabel +
        ' </span> <span class="value start-value">' +
        values.start +
        '</span> <span class="separator">-</span> <span class="value end-value">' +
        values.end +
        '</span></div>' +
        '</div>'
      )
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
