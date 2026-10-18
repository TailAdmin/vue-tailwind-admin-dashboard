<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { cn } from '@/utils/cn'
import type { DangerItemProps } from './types'

withDefaults(defineProps<DangerItemProps>(), {
  variant: 'outline',
  hasDivider: false,
})

const emit = defineEmits<{
  (e: 'action'): void
}>()
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
      <Button
        type="button"
        variant="outline"
        :class="
          cn(
            variant === 'danger-outline' &&
              'border-red-300 text-red-500 shadow-theme-xs hover:bg-red-50 hover:text-red-600 dark:border-red-500/40 dark:text-red-400 dark:hover:bg-red-500/10',
          )
        "
        @click="emit('action')"
      >
        <component :is="icon" v-if="icon" :class="iconClass" />
        <span>{{ buttonText }}</span>
      </Button>
    </div>
  </div>
</template>
