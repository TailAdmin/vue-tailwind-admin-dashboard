<script setup lang="ts">
import { useAttrs } from 'vue'
import { cn } from '@/utils/cn'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()
</script>

<template>
  <div
    data-slot="alert-title"
    v-bind="{ ...attrs, class: undefined }"
    :class="
      cn(
        '[&_a]:hover:text-foreground text-base font-medium text-gray-800 group-has-[>svg]/alert:col-start-2 dark:text-white/90 [&_a]:underline [&_a]:underline-offset-3',
        attrs.class as string,
      )
    "
  >
    <slot />
  </div>
</template>
