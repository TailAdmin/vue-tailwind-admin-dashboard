<script setup lang="ts">
import { cn } from '@/utils'

withDefaults(defineProps<{ label?: string; class?: string }>(), { label: 'Or' })
</script>

<template>
  <div :class="cn('relative py-3 sm:py-5', $props.class)">
    <div class="absolute inset-0 flex items-center">
      <div class="w-full border-t border-gray-200 dark:border-gray-800" />
    </div>
    <div class="relative flex justify-center text-sm">
      <span class="bg-white p-2 text-gray-400 sm:px-5 sm:py-2 dark:bg-gray-900">
        {{ label }}
      </span>
    </div>
  </div>
</template>
