<script setup lang="ts">
import { computed } from 'vue'

type AspectRatio = '16:9' | '4:3' | '21:9' | '1:1'

const props = withDefaults(
  defineProps<{
    videoId: string
    aspectRatio?: AspectRatio
    title?: string
    class?: string
  }>(),
  { aspectRatio: '16:9', title: 'YouTube video', class: '' },
)

const aspectRatioClass = computed(
  () =>
    ({
      '16:9': 'aspect-video',
      '4:3': 'aspect-4/3',
      '21:9': 'aspect-21/9',
      '1:1': 'aspect-square',
    })[props.aspectRatio],
)
</script>

<template>
  <div :class="`overflow-hidden rounded-lg ${aspectRatioClass} ${props.class}`">
    <iframe
      :src="`https://www.youtube.com/embed/${videoId}`"
      :title="title"
      frameborder="0"
      allow="
        accelerometer;
        autoplay;
        clipboard-write;
        encrypted-media;
        gyroscope;
        picture-in-picture;
      "
      allowfullscreen
      class="h-full w-full"
    ></iframe>
  </div>
</template>
