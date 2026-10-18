<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'
import { ComboboxEmpty, useForwardProps } from 'reka-ui'
import type { ComboboxEmptyProps } from 'reka-ui'
import { cn } from '@/utils/cn'

const props = defineProps<ComboboxEmptyProps & { class?: HTMLAttributes['class'] }>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardProps(delegated)
</script>

<template>
  <ComboboxEmpty
    data-slot="combobox-empty"
    v-bind="forwarded"
    :class="
      cn(
        `flex w-full justify-center py-3 text-center text-sm text-gray-500 dark:text-gray-400`,
        props.class,
      )
    "
  >
    <slot />
  </ComboboxEmpty>
</template>
