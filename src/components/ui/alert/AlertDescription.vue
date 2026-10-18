<script setup lang="ts">
import { useAttrs } from 'vue'
import { cn } from '@/utils/cn'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()
</script>

<template>
  <div
    data-slot="alert-description"
    v-bind="{ ...attrs, class: undefined }"
    :class="
      cn(
        '[&_a]:hover:text-foreground text-sm text-balance text-gray-500 md:text-pretty dark:text-gray-400 [&_a]:underline [&_a]:underline-offset-3 [&_p:not(:last-child)]:mb-4',
        attrs.class as string,
      )
    "
  >
    <slot />
  </div>
</template>
