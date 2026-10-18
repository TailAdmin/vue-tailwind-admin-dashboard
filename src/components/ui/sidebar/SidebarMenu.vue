<script setup lang="ts">
import { useAttrs } from 'vue'
import { cn } from '@/utils/cn'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()
</script>

<template>
  <ul
    data-slot="sidebar-menu"
    data-sidebar="menu"
    v-bind="{ ...attrs, class: undefined }"
    :class="cn('flex w-full min-w-0 flex-col gap-0', attrs.class as string)"
  >
    <slot />
  </ul>
</template>
