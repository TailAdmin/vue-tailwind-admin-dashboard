<script setup lang="ts">
import { ArrowDownIcon, ArrowUpIcon } from '@/icons/layout'

const stats = [
  { key: 'target', label: 'Target', value: '$20K', trend: 'down' },
  { key: 'revenue', label: 'Revenue', value: '$70K', trend: 'up' },
  { key: 'today', label: 'Today', value: '$30K', trend: 'up' },
] as const
</script>

<template>
  <div class="flex items-center justify-center gap-5 px-6 py-3 sm:gap-8 sm:py-5">
    <template v-for="(stat, index) in stats" :key="stat.key">
      <div v-if="index > 0" class="h-7 w-px bg-gray-200 dark:bg-gray-800" />
      <div>
        <p class="mb-1 text-center text-xs text-gray-500 sm:text-sm dark:text-gray-400">
          {{ stat.label }}
        </p>
        <p
          class="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 sm:text-lg dark:text-white/90"
        >
          {{ stat.value }}
          <ArrowUpIcon v-if="stat.trend === 'up'" class="text-green-500" />
          <ArrowDownIcon v-else class="text-red-500" />
        </p>
      </div>
    </template>
  </div>
</template>
