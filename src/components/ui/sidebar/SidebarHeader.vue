<script setup lang="ts">
import { useAttrs } from 'vue'
import { cn } from '@/utils/cn'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()
</script>

<template>
  <div
    data-slot="sidebar-header"
    data-sidebar="header"
    v-bind="{ ...attrs, class: undefined }"
    :class="cn('flex flex-col gap-2 p-2', attrs.class as string)"
  >
    <slot />
  </div>
</template>
