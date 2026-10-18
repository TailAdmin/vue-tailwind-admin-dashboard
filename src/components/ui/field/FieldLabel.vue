<script setup lang="ts">
import { useAttrs } from 'vue'
import { cn } from '@/utils/cn'

defineProps<{
  for?: string
}>()

defineOptions({ inheritAttrs: false })
const attrs = useAttrs()
</script>

<template>
  <label
    data-slot="field-label"
    :for="$props.for"
    v-bind="{ ...attrs, class: undefined }"
    :class="
      cn(
        'group/field-label peer/field-label flex w-fit gap-2 text-sm leading-snug font-medium text-gray-700 select-none group-data-[disabled=true]/field:opacity-50 dark:text-gray-300 has-data-checked:border-brand-500/30 has-data-checked:bg-brand-500/5 dark:has-data-checked:border-brand-500/20 dark:has-data-checked:bg-brand-500/10',
        attrs.class as string,
      )
    "
  >
    <slot />
  </label>
</template>
