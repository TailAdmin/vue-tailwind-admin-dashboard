<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'
import { SelectValue, useForwardProps } from 'reka-ui'
import type { SelectValueProps } from 'reka-ui'
import { cn } from '@/utils/cn'

const props = defineProps<SelectValueProps & { class?: HTMLAttributes['class'] }>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardProps(delegated)
</script>

<template>
  <SelectValue
    data-slot="select-value"
    v-bind="forwarded"
    :class="
      cn(
        `flex flex-1 items-center gap-2 truncate text-start text-gray-800 group-data-placeholder/select-trigger:text-gray-400 dark:text-white/90 dark:group-data-placeholder/select-trigger:text-gray-500`,
        props.class,
      )
    "
  >
    <slot />
  </SelectValue>
</template>
