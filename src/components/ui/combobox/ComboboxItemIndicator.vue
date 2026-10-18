<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'
import { ComboboxItemIndicator, useForwardProps } from 'reka-ui'
import type { ComboboxItemIndicatorProps } from 'reka-ui'
import { CheckIcon } from '@/icons/layout'
import { cn } from '@/utils/cn'

const props = defineProps<ComboboxItemIndicatorProps & { class?: HTMLAttributes['class'] }>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardProps(delegated)
</script>

<template>
  <ComboboxItemIndicator
    data-slot="combobox-item-indicator"
    v-bind="forwarded"
    :class="cn('size-4 text-brand-500 dark:text-brand-400', props.class)"
  >
    <slot>
      <CheckIcon class="size-4" />
    </slot>
  </ComboboxItemIndicator>
</template>
