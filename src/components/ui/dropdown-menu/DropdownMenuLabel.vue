<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'
import { DropdownMenuLabel, useForwardProps } from 'reka-ui'
import type { DropdownMenuLabelProps } from 'reka-ui'
import { cn } from '@/utils/cn'

const props = defineProps<
  DropdownMenuLabelProps & { class?: HTMLAttributes['class']; inset?: boolean }
>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardProps(delegated)
</script>

<template>
  <DropdownMenuLabel
    data-slot="dropdown-menu-label"
    v-bind="forwarded"
    :class="cn(`px-3 py-1.5 text-xs text-gray-400 data-inset:ps-8 dark:text-gray-400`, props.class)"
    :data-inset="props.inset ? '' : undefined"
  >
    <slot />
  </DropdownMenuLabel>
</template>
