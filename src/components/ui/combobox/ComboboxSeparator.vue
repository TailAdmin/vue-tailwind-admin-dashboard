<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'
import { ComboboxSeparator, useForwardProps } from 'reka-ui'
import type { ComboboxSeparatorProps } from 'reka-ui'
import { cn } from '@/utils/cn'

const props = defineProps<ComboboxSeparatorProps & { class?: HTMLAttributes['class'] }>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardProps(delegated)
</script>

<template>
  <ComboboxSeparator
    data-slot="combobox-separator"
    v-bind="forwarded"
    :class="cn(`-mx-3 my-1.5 h-px bg-gray-100 dark:bg-gray-700`, props.class)"
  >
  </ComboboxSeparator>
</template>
