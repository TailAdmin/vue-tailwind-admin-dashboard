<script setup lang="ts">
import { useAttrs } from 'vue'
import { cn } from '@/utils/cn'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()
</script>

<template>
  <div
    data-slot="sidebar-group-label"
    data-sidebar="group-label"
    v-bind="{ ...attrs, class: undefined }"
    :class="
      cn(
        'ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear group-data-[collapsible=icon]/sidebar:-mt-8 group-data-[collapsible=icon]/sidebar:opacity-0 focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
        attrs.class as string,
      )
    "
  >
    <slot />
  </div>
</template>
