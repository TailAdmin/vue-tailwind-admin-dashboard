<script setup lang="ts">
import { useAttrs } from 'vue'
import { cn } from '@/utils/cn'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()
</script>

<template>
  <div
    data-slot="sidebar-content"
    data-sidebar="content"
    v-bind="{ ...attrs, class: undefined }"
    :class="
      cn(
        'no-scrollbar flex min-h-0 flex-1 flex-col gap-0 overflow-auto group-data-[collapsible=icon]/sidebar:overflow-hidden',
        attrs.class as string,
      )
    "
  >
    <slot />
  </div>
</template>
