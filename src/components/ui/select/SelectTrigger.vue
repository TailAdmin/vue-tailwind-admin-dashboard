<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'
import { SelectIcon, SelectTrigger, useForwardProps } from 'reka-ui'
import type { SelectTriggerProps } from 'reka-ui'
import { ChevronDownIcon } from '@/icons/layout'
import { cn } from '@/utils/cn'

const props = withDefaults(
  defineProps<
    SelectTriggerProps & { class?: HTMLAttributes['class']; size?: 'sm' | 'default' | 'lg' }
  >(),
  {
    size: 'default',
  },
)

const delegated = computed(() => {
  const { class: _class, size: _size, ...rest } = props
  return rest
})
const forwarded = useForwardProps(delegated)
</script>

<template>
  <SelectTrigger
    data-slot="select-trigger"
    :data-size="size"
    v-bind="forwarded"
    :class="
      cn(
        'group/select-trigger',
        `group/select-trigger flex w-full min-w-0 items-center justify-between gap-2 rounded-[10px] border border-gray-300 bg-white py-2.5 ps-4 pe-3.5 text-sm font-normal text-gray-800 shadow-theme-xs outline-hidden transition-all duration-200 select-none hover:border-gray-400 hover:bg-gray-50/50 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/20 focus-visible:border-brand-300 focus-visible:ring-3 focus-visible:ring-brand-500/20 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-100/50 disabled:text-gray-400 disabled:shadow-none aria-invalid:border-red-500 aria-invalid:ring-3 aria-invalid:ring-red-500/20 focus:aria-invalid:border-red-500 focus:aria-invalid:ring-red-500/20 focus-visible:aria-invalid:border-red-500 focus-visible:aria-invalid:ring-red-500/20 data-invalid:border-red-500 data-invalid:ring-3 data-invalid:ring-red-500/20 focus:data-invalid:border-red-500 focus:data-invalid:ring-red-500/20 focus-visible:data-invalid:border-red-500 focus-visible:data-invalid:ring-red-500/20 data-popup-open:border-brand-300 data-popup-open:ring-3 data-popup-open:ring-brand-500/20 data-popup-open:aria-invalid:border-red-500 data-popup-open:aria-invalid:ring-red-500/20 data-popup-open:data-invalid:border-red-500 data-popup-open:data-invalid:ring-red-500/20 data-[size=default]:h-11 data-[size=default]:rounded-[10px] data-[size=lg]:h-12 data-[size=lg]:rounded-[10px] data-[size=lg]:py-3 data-[size=lg]:ps-4.5 data-[size=lg]:pe-3.5 data-[size=sm]:h-9 data-[size=sm]:rounded-lg data-[size=sm]:py-2 data-[size=sm]:ps-3.5 data-[size=sm]:pe-2.5 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:hover:border-gray-600 dark:hover:bg-gray-800/50 dark:focus:border-brand-500/40 dark:focus-visible:border-brand-500/40 dark:disabled:border-gray-800 dark:disabled:bg-gray-800/50 dark:disabled:text-gray-500 dark:aria-invalid:border-red-500/50 dark:aria-invalid:ring-red-500/40 dark:focus:aria-invalid:border-red-500/50 dark:focus:aria-invalid:ring-red-500/40 dark:focus-visible:aria-invalid:border-red-500/50 dark:focus-visible:aria-invalid:ring-red-500/40 dark:data-invalid:border-red-500/50 dark:data-invalid:ring-red-500/40 dark:focus:data-invalid:border-red-500/50 dark:focus:data-invalid:ring-red-500/40 dark:focus-visible:data-invalid:border-red-500/50 dark:focus-visible:data-invalid:ring-red-500/40 dark:data-popup-open:border-brand-500/40 dark:data-popup-open:aria-invalid:border-red-500/50 dark:data-popup-open:aria-invalid:ring-red-500/40 dark:data-popup-open:data-invalid:border-red-500/50 dark:data-popup-open:data-invalid:ring-red-500/40 [&_svg]:pointer-events-none [&_svg]:shrink-0`,
        props.class,
      )
    "
  >
    <slot />
    <SelectIcon as-child>
      <ChevronDownIcon
        class="size-4 text-gray-500 transition-transform duration-200 group-hover/select-trigger:text-gray-700 group-data-popup-open/select-trigger:rotate-180 dark:text-gray-400 dark:group-hover/select-trigger:text-gray-300"
      />
    </SelectIcon>
  </SelectTrigger>
</template>
