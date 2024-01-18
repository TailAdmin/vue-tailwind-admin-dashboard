<script setup lang="ts">
// @ts-ignore
import jsVectorMap from 'jsvectormap'
import '@/assets/js/us-aea-en'
import { onMounted } from 'vue'

onMounted(() => {
  new jsVectorMap({
    map: 'us_aea_en',
    selector: '#mapOne',
    zoomButtons: true,

    regionStyle: {
      initial: {
        fill: '#C8D0D8'
      },
      hover: {
        fillOpacity: 1,
        fill: '#3056D3'
      }
    },
    regionLabelStyle: {
      initial: {
        fontFamily: 'Satoshi',
        fontWeight: 'semibold',
        fill: '#fff'
      },
      hover: {
        cursor: 'pointer'
      }
    },

    labels: {
      regions: {
        render(code: any) {
          return code.split('-')[1]
        }
      }
    }
  })
})
</script>

<template>
  <div
    class="col-span-12 rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-7"
  >
    <h4 class="mb-2 text-xl font-bold text-black dark:text-white">Region labels</h4>
    <div id="mapOne" class="mapOne map-btn !h-90"></div>
  </div>
</template>
