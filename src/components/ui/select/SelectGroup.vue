<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'
import { SelectGroup, useForwardProps } from 'reka-ui'
import type { SelectGroupProps } from 'reka-ui'
import { cn } from '@/utils/cn'

const props = defineProps<SelectGroupProps & { class?: HTMLAttributes['class'] }>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardProps(delegated)
</script>

<template>
  <SelectGroup
    data-slot="select-group"
    v-bind="forwarded"
    :class="cn(`flex flex-col gap-1`, props.class)"
  >
    <slot />
  </SelectGroup>
</template>
