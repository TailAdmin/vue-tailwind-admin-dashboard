<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'
import { DropdownMenuItem, useForwardPropsEmits } from 'reka-ui'
import type { DropdownMenuItemEmits, DropdownMenuItemProps } from 'reka-ui'
import { RouterLink } from 'vue-router'
import { cn } from '@/utils/cn'

const props = withDefaults(
  defineProps<
    DropdownMenuItemProps & {
      class?: HTMLAttributes['class']
      inset?: boolean
      variant?: 'default' | 'destructive'
      to?: string
    }
  >(),
  {
    variant: 'default',
  },
)
const emits = defineEmits<DropdownMenuItemEmits>()

const delegated = computed(() => {
  const { class: _class, inset: _inset, variant: _variant, to: _to, ...rest } = props
  return rest
})
const forwarded = useForwardPropsEmits(delegated, emits)
</script>

<template>
  <DropdownMenuItem
    data-slot="dropdown-menu-item"
    :data-inset="inset ? '' : undefined"
    :data-variant="variant"
    v-bind="forwarded"
    :as-child="!!to || props.asChild"
    :class="
      cn(
        `group/dropdown-menu-item relative flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 outline-hidden transition-colors duration-200 select-none hover:bg-gray-100 hover:text-gray-700 focus:bg-gray-100 focus:text-gray-700 data-disabled:pointer-events-none data-disabled:opacity-50 data-highlighted:bg-gray-100 data-highlighted:text-gray-700 data-inset:ps-8 data-[variant=destructive]:text-red-500 data-[variant=destructive]:hover:bg-red-50 data-[variant=destructive]:hover:text-red-600 data-[variant=destructive]:focus:bg-red-50 data-[variant=destructive]:focus:text-red-600 data-[variant=destructive]:data-highlighted:bg-red-50 data-[variant=destructive]:data-highlighted:text-red-600 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-gray-300 dark:focus:bg-white/5 dark:focus:text-gray-300 dark:data-highlighted:bg-white/5 dark:data-highlighted:text-gray-300 dark:data-[variant=destructive]:text-red-400 dark:data-[variant=destructive]:hover:bg-red-500/10 dark:data-[variant=destructive]:hover:text-red-400 dark:data-[variant=destructive]:focus:bg-red-500/10 dark:data-[variant=destructive]:focus:text-red-400 dark:data-[variant=destructive]:data-highlighted:bg-red-500/10 dark:data-[variant=destructive]:data-highlighted:text-red-400 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:text-gray-500 group-hover/dropdown-menu-item:[&_svg]:text-gray-700 data-highlighted:[&_svg]:text-gray-700 dark:[&_svg]:text-gray-400 dark:group-hover/dropdown-menu-item:[&_svg]:text-gray-300 dark:data-highlighted:[&_svg]:text-gray-300 [&_svg:not([class*='size-'])]:size-5 data-[variant=destructive]:*:[svg]:text-red-500 dark:data-[variant=destructive]:*:[svg]:text-red-400`,
        props.class,
      )
    "
  >
    <RouterLink v-if="to" :to="to">
      <slot />
    </RouterLink>
    <slot v-else />
  </DropdownMenuItem>
</template>
