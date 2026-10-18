<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'
import { ComboboxGroup, useForwardProps } from 'reka-ui'
import type { ComboboxGroupProps } from 'reka-ui'
import { cn } from '@/utils/cn'

const props = defineProps<ComboboxGroupProps & { class?: HTMLAttributes['class'] }>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardProps(delegated)
</script>

<template>
  <ComboboxGroup
    data-slot="combobox-group"
    v-bind="forwarded"
    :class="cn(`flex flex-col gap-1`, props.class)"
  >
    <slot />
  </ComboboxGroup>
</template>
