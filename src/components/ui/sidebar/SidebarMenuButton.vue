<script setup lang="ts">
import { useAttrs } from 'vue'
import { RouterLink } from 'vue-router'
import { cn } from '@/utils/cn'

defineOptions({ inheritAttrs: false })

withDefaults(
  defineProps<{
    isActive?: boolean
    variant?: 'default' | 'outline'
    size?: 'default' | 'sm' | 'lg'
    to?: string
  }>(),
  {
    isActive: false,
    variant: 'default',
    size: 'default',
  },
)

const attrs = useAttrs()

const base =
  'peer/menu-button group/menu-button ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground data-open:hover:bg-sidebar-accent data-open:hover:text-sidebar-accent-foreground data-active:bg-sidebar-accent data-active:text-sidebar-accent-foreground flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden transition-[width,height,padding] group-has-data-[sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]/sidebar:size-8! group-data-[collapsible=icon]/sidebar:p-2! focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-active:font-medium [&_svg]:size-4 [&_svg]:shrink-0 [&>span:last-child]:truncate'

const variants = {
  default: 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
  outline:
    'bg-background hover:bg-sidebar-accent hover:text-sidebar-accent-foreground shadow-[0_0_0_1px_var(--sidebar-border)] hover:shadow-[0_0_0_1px_var(--sidebar-accent)]',
}

const sizes = {
  default: 'h-8 text-sm',
  sm: 'h-7 text-xs',
  lg: 'h-12 text-sm group-data-[collapsible=icon]/sidebar:p-0!',
}
</script>

<template>
  <component
    :is="to ? RouterLink : 'button'"
    data-slot="sidebar-menu-button"
    data-sidebar="menu-button"
    :data-size="size"
    :data-active="isActive ? '' : undefined"
    :to="to"
    :type="to ? undefined : 'button'"
    v-bind="{ ...attrs, class: undefined }"
    :class="cn(base, variants[variant], sizes[size], attrs.class as string)"
  >
    <slot />
  </component>
</template>
