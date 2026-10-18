<script setup lang="ts">
import { useAttrs } from 'vue'
import { cn } from '@/utils/cn'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()

const SIDEBAR_WIDTH = '18.125rem' // 290px — matches w-72.5
const SIDEBAR_WIDTH_ICON = '5.625rem' // 90px — matches w-22.5
</script>

<template>
  <div
    data-slot="sidebar-wrapper"
    :style="{
      '--sidebar-width': SIDEBAR_WIDTH,
      '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
    }"
    v-bind="{ ...attrs, class: undefined }"
    :class="
      cn(
        'group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full',
        attrs.class as string,
      )
    "
  >
    <slot />
  </div>
</template>
