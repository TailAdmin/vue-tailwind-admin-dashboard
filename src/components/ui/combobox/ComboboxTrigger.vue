<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'
import { ComboboxTrigger, useForwardProps } from 'reka-ui'
import type { ComboboxTriggerProps } from 'reka-ui'
import { ChevronDownIcon } from '@/icons/layout'
import { cn } from '@/utils/cn'

const props = defineProps<ComboboxTriggerProps & { class?: HTMLAttributes['class'] }>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardProps(delegated)
</script>

<template>
  <ComboboxTrigger
    data-slot="combobox-trigger"
    v-bind="forwarded"
    :class="
      cn(
        `group/combobox-trigger flex items-center justify-center text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 [&_svg:not([class*='size-'])]:size-4`,
        props.class,
      )
    "
  >
    <slot />
    <ChevronDownIcon
      class="pointer-events-none size-4 text-gray-500 transition-transform duration-200 group-hover/combobox-trigger:text-gray-700 group-data-popup-open/combobox-trigger:rotate-180 dark:text-gray-400 dark:group-hover/combobox-trigger:text-gray-300"
    />
  </ComboboxTrigger>
</template>
