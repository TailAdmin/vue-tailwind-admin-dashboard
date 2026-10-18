<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'
import { DropdownMenuSubContent, useForwardPropsEmits } from 'reka-ui'
import type { DropdownMenuSubContentEmits, DropdownMenuSubContentProps } from 'reka-ui'
import { cn } from '@/utils/cn'

const props = withDefaults(
  defineProps<DropdownMenuSubContentProps & { class?: HTMLAttributes['class'] }>(),
  {
    alignOffset: -3,
    sideOffset: 4,
  },
)
const emits = defineEmits<DropdownMenuSubContentEmits>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardPropsEmits(delegated, emits)
</script>

<template>
  <DropdownMenuSubContent
    data-slot="dropdown-menu-sub-content"
    v-bind="forwarded"
    :class="
      cn(
        `z-99999 flex max-h-(--reka-dropdown-menu-content-available-height) min-w-65 origin-(--reka-dropdown-menu-content-transform-origin) flex-col gap-1 overflow-x-hidden overflow-y-auto rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg duration-100 outline-none data-closed:animate-out data-closed:overflow-hidden data-closed:fade-out-0 data-closed:zoom-out-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:border-gray-800 dark:bg-[#1E2635] w-auto min-w-48`,
        props.class,
      )
    "
  >
    <slot />
  </DropdownMenuSubContent>
</template>
