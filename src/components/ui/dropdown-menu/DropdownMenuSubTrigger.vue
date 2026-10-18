<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'
import { DropdownMenuSubTrigger, useForwardProps } from 'reka-ui'
import type { DropdownMenuSubTriggerProps } from 'reka-ui'
import { ChevronRightIcon } from '@/icons/layout'
import { cn } from '@/utils/cn'

const props = withDefaults(
  defineProps<
    DropdownMenuSubTriggerProps & {
      class?: HTMLAttributes['class']
      inset?: boolean
      showIcon?: boolean
    }
  >(),
  {
    showIcon: false,
  },
)

const delegated = computed(() => {
  const { class: _class, inset: _inset, showIcon: _showIcon, ...rest } = props
  return rest
})
const forwarded = useForwardProps(delegated)
</script>

<template>
  <DropdownMenuSubTrigger
    data-slot="dropdown-menu-sub-trigger"
    :data-inset="inset ? '' : undefined"
    v-bind="forwarded"
    :class="
      cn(
        `group/dropdown-menu-sub-trigger relative flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 outline-hidden transition-colors duration-200 select-none hover:bg-gray-100 hover:text-gray-700 focus:bg-gray-100 focus:text-gray-700 data-highlighted:bg-gray-100 data-highlighted:text-gray-700 data-inset:ps-8 data-open:bg-gray-100 data-open:text-gray-700 data-popup-open:bg-gray-100 data-popup-open:text-gray-700 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-gray-300 dark:focus:bg-white/5 dark:focus:text-gray-300 dark:data-highlighted:bg-white/5 dark:data-highlighted:text-gray-300 dark:data-open:bg-white/5 dark:data-open:text-gray-300 dark:data-popup-open:bg-white/5 dark:data-popup-open:text-gray-300 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:text-gray-500 group-hover/dropdown-menu-sub-trigger:[&_svg]:text-gray-700 data-highlighted:[&_svg]:text-gray-700 dark:[&_svg]:text-gray-400 dark:group-hover/dropdown-menu-sub-trigger:[&_svg]:text-gray-300 dark:data-highlighted:[&_svg]:text-gray-300 [&_svg:not([class*='size-'])]:size-5`,
        props.class,
      )
    "
  >
    <slot />
    <ChevronRightIcon
      v-if="showIcon"
      class="ms-auto size-4 text-gray-500 rtl:rotate-180 dark:text-gray-400"
    />
  </DropdownMenuSubTrigger>
</template>
