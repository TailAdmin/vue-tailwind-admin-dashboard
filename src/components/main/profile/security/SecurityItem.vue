<script setup lang="ts">
import { cn } from '@/utils/cn'
import type { SecurityItemProps } from './types'

withDefaults(defineProps<SecurityItemProps>(), {
  hasDivider: false,
})
</script>

<template>
  <div
    :class="
      cn(
        'flex flex-col justify-between gap-4 py-4 first:pt-0 sm:flex-row sm:items-center',
        hasDivider && 'border-b border-gray-200 pb-4 dark:border-gray-700',
        className,
      )
    "
  >
    <div>
      <h4 class="mb-1 text-base font-medium text-gray-800 dark:text-white/90">
        {{ title }}
      </h4>
      <p class="text-sm text-gray-500 dark:text-gray-400">
        {{ description }}
      </p>
    </div>
    <div class="flex shrink-0 items-center">
      <slot name="action" />
    </div>
  </div>
</template>
