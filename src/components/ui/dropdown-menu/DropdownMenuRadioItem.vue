<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'
import { DropdownMenuItemIndicator, DropdownMenuRadioItem, useForwardPropsEmits } from 'reka-ui'
import type { DropdownMenuRadioItemEmits, DropdownMenuRadioItemProps } from 'reka-ui'
import { CheckIcon } from '@/icons/layout'
import { cn } from '@/utils/cn'

const props = defineProps<
  DropdownMenuRadioItemProps & { class?: HTMLAttributes['class']; inset?: boolean }
>()
const emits = defineEmits<DropdownMenuRadioItemEmits>()

const delegated = computed(() => {
  const { class: _class, inset: _inset, ...rest } = props
  return rest
})
const forwarded = useForwardPropsEmits(delegated, emits)
</script>

<template>
  <DropdownMenuRadioItem
    data-slot="dropdown-menu-radio-item"
    :data-inset="inset ? '' : undefined"
    v-bind="forwarded"
    :class="
      cn(
        `relative flex cursor-pointer items-center gap-3 rounded-lg py-2.5 ps-3 pe-8 text-sm font-medium text-gray-700 outline-hidden transition-colors duration-200 select-none hover:bg-gray-100 hover:text-gray-700 focus:bg-gray-100 focus:text-gray-700 data-disabled:pointer-events-none data-disabled:opacity-50 data-highlighted:bg-gray-100 data-highlighted:text-gray-700 data-inset:ps-8 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-gray-300 dark:focus:bg-white/5 dark:focus:text-gray-300 dark:data-highlighted:bg-white/5 dark:data-highlighted:text-gray-300 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5`,
        props.class,
      )
    "
  >
    <span
      class="pointer-events-none absolute end-3 flex items-center justify-center text-brand-500 dark:text-brand-400"
      data-slot="dropdown-menu-radio-item-indicator"
    >
      <DropdownMenuItemIndicator>
        <CheckIcon class="size-4" />
      </DropdownMenuItemIndicator>
    </span>
    <slot />
  </DropdownMenuRadioItem>
</template>
