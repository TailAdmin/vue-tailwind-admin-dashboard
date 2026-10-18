<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'
import { SelectScrollDownButton, useForwardProps } from 'reka-ui'
import type { SelectScrollDownButtonProps } from 'reka-ui'
import { ChevronDownIcon } from '@/icons/layout'
import { cn } from '@/utils/cn'

const props = defineProps<SelectScrollDownButtonProps & { class?: HTMLAttributes['class'] }>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardProps(delegated)
</script>

<template>
  <SelectScrollDownButton
    data-slot="select-scroll-down-button"
    v-bind="forwarded"
    :class="
      cn(
        `flex w-full cursor-default items-center justify-center py-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 [&_svg:not([class*='size-'])]:size-4`,
        props.class,
      )
    "
  >
    <slot>
      <ChevronDownIcon />
    </slot>
  </SelectScrollDownButton>
</template>
