<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'
import { SelectContent, SelectPortal, SelectViewport, useForwardPropsEmits } from 'reka-ui'
import type { SelectContentEmits, SelectContentProps } from 'reka-ui'
import { cn } from '@/utils/cn'
import SelectScrollDownButton from './SelectScrollDownButton.vue'
import SelectScrollUpButton from './SelectScrollUpButton.vue'

const props = withDefaults(
  defineProps<SelectContentProps & { class?: HTMLAttributes['class'] }>(),
  {
    position: 'popper',
    side: 'bottom',
    sideOffset: 8,
    align: 'start',
    alignOffset: 0,
    bodyLock: false,
    disableOutsidePointerEvents: false,
  },
)
const emits = defineEmits<SelectContentEmits>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardPropsEmits(delegated, emits)
</script>

<template>
  <SelectPortal>
    <SelectContent
      data-slot="select-content"
      v-bind="forwarded"
      :class="
        cn(
          `z-99999 flex max-h-(--reka-select-content-available-height) min-w-(--reka-select-trigger-width) origin-(--reka-select-content-transform-origin) flex-col gap-1 overflow-x-hidden overflow-y-auto rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg duration-100 outline-none data-closed:animate-out data-closed:overflow-hidden data-closed:fade-out-0 data-closed:zoom-out-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-[align-trigger=true]:animate-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:border-gray-800 dark:bg-[#1E2635]`,
          props.class,
        )
      "
    >
      <SelectScrollUpButton />
      <SelectViewport class="flex flex-col gap-1 outline-none">
        <slot />
      </SelectViewport>
      <SelectScrollDownButton />
    </SelectContent>
  </SelectPortal>
</template>
