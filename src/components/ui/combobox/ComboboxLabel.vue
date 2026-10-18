<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'
import { ComboboxLabel, useForwardProps } from 'reka-ui'
import type { ComboboxLabelProps } from 'reka-ui'
import { cn } from '@/utils/cn'

const props = defineProps<
  ComboboxLabelProps & { class?: HTMLAttributes['class']; inset?: boolean }
>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardProps(delegated)
</script>

<template>
  <ComboboxLabel
    data-slot="combobox-label"
    v-bind="forwarded"
    :class="
      cn(
        `px-3 py-1.5 text-xs font-medium text-gray-400 data-inset:ps-8 dark:text-gray-400`,
        props.class,
      )
    "
    :data-inset="props.inset ? '' : undefined"
  >
    <slot />
  </ComboboxLabel>
</template>
