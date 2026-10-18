<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils/cn'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <div
    data-slot="avatar-group"
    :class="
      cn(
        `group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-white dark:*:data-[slot=avatar]:ring-gray-800 dark:**:data-[slot=avatar-fallback]:bg-[#192130]!`,
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
