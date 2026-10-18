<script setup lang="ts">
import { cn } from '@/utils/cn'
import type { InfoFieldProps } from './types'

defineProps<InfoFieldProps>()
</script>

<template>
  <div :class="cn('flex flex-col gap-1 sm:gap-2', className)">
    <p class="text-xs font-normal text-gray-500 sm:text-sm dark:text-gray-400">
      {{ label }}
    </p>
    <p class="text-sm font-medium text-gray-800 sm:text-base dark:text-white/90">
      {{ value || '—' }}
    </p>
  </div>
</template>
