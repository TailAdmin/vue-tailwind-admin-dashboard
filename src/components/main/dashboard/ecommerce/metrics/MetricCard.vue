<script setup lang="ts">
import { useAttrs } from 'vue'
import { Badge } from '@/components/ui/badge'
import { ArrowDownIcon, ArrowUpIcon } from '@/icons/layout'
import { cn } from '@/utils/cn'

defineOptions({ inheritAttrs: false })

export interface MetricCardProps {
  title: string
  value: string | number
  change?: string
  direction?: 'up' | 'down'
}

withDefaults(defineProps<MetricCardProps>(), {
  direction: 'up',
})

const attrs = useAttrs()
</script>

<template>
  <div
    v-bind="{ ...attrs, class: undefined }"
    :class="
      cn(
        'rounded-2xl border border-gray-200 bg-white p-5 md:p-6 dark:border-gray-800 dark:bg-white/3',
        attrs.class as string,
      )
    "
  >
    <div
      class="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-white/90 [&>svg]:size-6"
    >
      <slot name="icon" />
    </div>

    <div class="mt-5 flex items-end justify-between">
      <div>
        <span class="text-sm text-gray-500 dark:text-gray-400">
          {{ title }}
        </span>
        <h4 class="mt-2 text-lg font-bold text-gray-800 dark:text-white/90">
          {{ value }}
        </h4>
      </div>

      <slot name="badge">
        <Badge v-if="change" :color="direction === 'down' ? 'error' : 'success'">
          <ArrowDownIcon v-if="direction === 'down'" class="text-error-500" />
          <ArrowUpIcon v-else />
          {{ change }}
        </Badge>
      </slot>
    </div>

    <slot />
  </div>
</template>
