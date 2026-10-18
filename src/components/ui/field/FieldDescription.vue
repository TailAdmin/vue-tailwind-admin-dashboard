<script setup lang="ts">
import { useAttrs } from 'vue'
import { cn } from '@/utils/cn'

defineOptions({ inheritAttrs: false })
const attrs = useAttrs()
</script>

<template>
  <p
    data-slot="field-description"
    v-bind="{ ...attrs, class: undefined }"
    :class="
      cn(
        'text-start text-sm leading-normal font-normal text-gray-500 group-has-data-horizontal/field:text-balance dark:text-gray-400 [[data-variant=legend]+&]:-mt-1.5 last:mt-0 nth-last-2:-mt-1 [&>a]:text-gray-700 [&>a]:underline [&>a]:underline-offset-4 dark:[&>a]:text-gray-300 [&>a:hover]:text-brand-500 dark:[&>a:hover]:text-brand-400',
        attrs.class as string,
      )
    "
  >
    <slot />
  </p>
</template>
