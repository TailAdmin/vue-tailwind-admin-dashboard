<script setup lang="ts">
import { useAttrs } from 'vue'
import { cn } from '@/utils/cn'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()
</script>

<template>
  <div
    data-slot="sidebar-group"
    data-sidebar="group"
    v-bind="{ ...attrs, class: undefined }"
    :class="cn('relative flex w-full min-w-0 flex-col p-2', attrs.class as string)"
  >
    <slot />
  </div>
</template>
