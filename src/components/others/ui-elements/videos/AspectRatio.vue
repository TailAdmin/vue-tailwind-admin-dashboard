<script setup lang="ts">
import ComponentCard from '@/components/common/ComponentCard.vue'
import { Video } from '@/components/ui/video'
</script>

<template>
  <div class="grid grid-cols-1 gap-5 sm:gap-6 xl:grid-cols-2">
    <div class="space-y-5 sm:space-y-6">
      <ComponentCard title="Video Ratio 16:9">
        <Video videoId="dQw4w9WgXcQ" />
      </ComponentCard>
      <ComponentCard title="Video Ratio 4:3">
        <Video videoId="dQw4w9WgXcQ" aspectRatio="4:3" />
      </ComponentCard>
    </div>
    <div class="space-y-5 sm:space-y-6">
      <ComponentCard title="Video Ratio 21:9">
        <Video videoId="dQw4w9WgXcQ" aspectRatio="21:9" />
      </ComponentCard>
      <ComponentCard title="Video Ratio 1:1">
        <Video videoId="dQw4w9WgXcQ" aspectRatio="1:1" />
      </ComponentCard>
    </div>
  </div>
</template>
