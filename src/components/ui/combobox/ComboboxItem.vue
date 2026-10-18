<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'
import { ComboboxItem, ComboboxItemIndicator, useForwardPropsEmits } from 'reka-ui'
import type { ComboboxItemEmits, ComboboxItemProps } from 'reka-ui'
import { CheckIcon } from '@/icons/layout'
import { cn } from '@/utils/cn'

const props = defineProps<
  ComboboxItemProps & { class?: HTMLAttributes['class']; inset?: boolean }
>()
const emits = defineEmits<ComboboxItemEmits>()

const delegated = computed(() => {
  const { class: _class, inset: _inset, ...rest } = props
  return rest
})
const forwarded = useForwardPropsEmits(delegated, emits)
</script>

<template>
  <ComboboxItem
    data-slot="combobox-item"
    :data-inset="inset ? '' : undefined"
    v-bind="forwarded"
    :class="
      cn(
        `group/combobox-item relative flex w-full cursor-pointer items-center gap-3 rounded-lg py-2.5 ps-3 pe-8 text-sm font-medium text-gray-700 outline-hidden transition-colors duration-200 select-none hover:bg-gray-100 hover:text-gray-700 focus:bg-gray-100 focus:text-gray-700 data-disabled:pointer-events-none data-disabled:opacity-50 data-highlighted:bg-gray-100 data-highlighted:text-gray-700 data-inset:ps-8 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-gray-300 dark:focus:bg-white/5 dark:focus:text-gray-300 dark:data-highlighted:bg-white/5 dark:data-highlighted:text-gray-300 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:text-gray-500 group-hover/combobox-item:[&_svg]:text-gray-700 data-highlighted:[&_svg]:text-gray-700 dark:[&_svg]:text-gray-400 dark:group-hover/combobox-item:[&_svg]:text-gray-300 dark:data-highlighted:[&_svg]:text-gray-300 [&_svg:not([class*='size-'])]:size-5`,
        props.class,
      )
    "
  >
    <span class="flex flex-1 shrink-0 items-center gap-2 whitespace-nowrap">
      <slot />
    </span>
    <span
      class="pointer-events-none absolute end-3 flex items-center justify-center text-brand-500 dark:text-brand-400"
      data-slot="combobox-item-indicator"
    >
      <ComboboxItemIndicator>
        <CheckIcon class="size-4" />
      </ComboboxItemIndicator>
    </span>
  </ComboboxItem>
</template>
