<script setup lang="ts">
import jsVectorMap from 'jsvectormap'
import 'jsvectormap/dist/maps/world'
import { onBeforeUnmount, onMounted, ref } from 'vue'

export type Marker = {
  latLng: [number, number]
  name: string
  style?: {
    fill: string
    borderWidth: number
    borderColor: string
    stroke?: string
    strokeOpacity?: number
  }
}

interface CountryMapProps {
  mapColor?: string
  markers?: Marker[]
}

const props = defineProps<CountryMapProps>()

const defaultMarkers: Marker[] = [
  {
    latLng: [37.2580397, -104.657039],
    name: 'United States',
    style: {
      fill: '#465FFF',
      borderWidth: 1,
      borderColor: 'white',
      stroke: '#383f47',
    },
  },
  {
    latLng: [20.7504374, 73.7276105],
    name: 'India',
    style: { fill: '#465FFF', borderWidth: 1, borderColor: 'white' },
  },
  {
    latLng: [53.613, -11.6368],
    name: 'United Kingdom',
    style: { fill: '#465FFF', borderWidth: 1, borderColor: 'white' },
  },
  {
    latLng: [-25.0304388, 115.2092761],
    name: 'Sweden',
    style: {
      fill: '#465FFF',
      borderWidth: 1,
      borderColor: 'white',
      strokeOpacity: 0,
    },
  },
]

const mapRef = ref<HTMLElement | null>(null)
let map: any = null

onMounted(() => {
  if (!mapRef.value) return

  map = new jsVectorMap({
    selector: mapRef.value,
    map: 'world',
    backgroundColor: 'transparent',
    markerStyle: {
      initial: {
        fill: '#465FFF',
        r: 4, // Custom radius for markers
      },
    },
    markersSelectable: true,
    markers: (props.markers ?? defaultMarkers).map((marker) => ({
      name: marker.name,
      coords: marker.latLng,
      style: {
        initial: {
          fill: marker.style?.fill,
          stroke: marker.style?.stroke ?? marker.style?.borderColor,
          strokeWidth: marker.style?.borderWidth,
          strokeOpacity: marker.style?.strokeOpacity,
        },
      },
    })),
    zoomButtons: false,
    zoomOnScroll: false,
    zoomMax: 12,
    zoomMin: 1,
    zoomAnimate: true,
    zoomStep: 1.5,
    regionStyle: {
      initial: {
        fill: props.mapColor || '#D0D5DD',
        fillOpacity: 1,
        fontFamily: 'Outfit',
        stroke: 'none',
        strokeWidth: 0,
        strokeOpacity: 0,
      },
      hover: {
        fillOpacity: 0.7,
        cursor: 'pointer',
        fill: '#465fff',
        stroke: 'none',
      },
      selected: {
        fill: '#465FFF',
      },
      selectedHover: {},
    },
  })
})

onBeforeUnmount(() => {
  map?.destroy?.()
  map = null
})
</script>

<template>
  <div ref="mapRef" class="size-full" />
</template>
