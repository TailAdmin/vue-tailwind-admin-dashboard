<script setup lang="ts">
import { cn } from '@/utils/cn'
import type { AddressItemProps } from './types'

defineProps<AddressItemProps>()
</script>

<template>
  <div :class="cn(className)">
    <p class="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
      {{ label }}
    </p>
    <p class="text-sm font-medium text-gray-800 dark:text-white/90">
      {{ value }}
    </p>
  </div>
</template>
