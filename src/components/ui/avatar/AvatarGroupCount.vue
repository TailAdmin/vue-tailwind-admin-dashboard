<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils/cn'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <div
    data-slot="avatar-group-count"
    :class="
      cn(
        `relative flex size-10 shrink-0 items-center justify-center rounded-full bg-[#F3F4F6] text-sm text-gray-700 ring-2 ring-white group-has-data-[size=lg]/avatar-group:size-12 group-has-data-[size=sm]/avatar-group:size-8 group-has-data-[size=xl]/avatar-group:size-14 group-has-data-[size=xs]/avatar-group:size-6 dark:bg-[#192130] dark:text-gray-400 dark:ring-gray-800 [&>svg]:size-4 group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3`,
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
