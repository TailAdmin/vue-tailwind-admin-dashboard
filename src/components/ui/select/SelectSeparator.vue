<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'
import { SelectSeparator, useForwardProps } from 'reka-ui'
import type { SelectSeparatorProps } from 'reka-ui'
import { cn } from '@/utils/cn'

const props = defineProps<SelectSeparatorProps & { class?: HTMLAttributes['class'] }>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardProps(delegated)
</script>

<template>
  <SelectSeparator
    data-slot="select-separator"
    v-bind="forwarded"
    :class="cn(`-mx-3 my-1.5 h-px bg-gray-100 dark:bg-gray-700`, props.class)"
  >
  </SelectSeparator>
</template>
