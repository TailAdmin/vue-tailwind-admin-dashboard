<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'
import { ComboboxContent, ComboboxPortal, ComboboxViewport, useForwardPropsEmits } from 'reka-ui'
import type { ComboboxContentEmits, ComboboxContentProps } from 'reka-ui'
import { cn } from '@/utils/cn'

const props = withDefaults(
  defineProps<ComboboxContentProps & { class?: HTMLAttributes['class']; chips?: boolean }>(),
  {
    position: 'popper',
    side: 'bottom',
    sideOffset: 8,
    align: 'start',
    alignOffset: 0,
    chips: false,
  },
)
const emits = defineEmits<ComboboxContentEmits>()

const delegated = computed(() => {
  const { class: _class, chips: _chips, ...rest } = props
  return rest
})
const forwarded = useForwardPropsEmits(delegated, emits)
</script>

<template>
  <ComboboxPortal>
    <ComboboxContent
      data-slot="combobox-content"
      :data-chips="chips"
      v-bind="forwarded"
      :class="
        cn(
          `group/combobox-content relative z-99999 flex max-h-(--reka-combobox-content-available-height) w-(--reka-combobox-trigger-width) max-w-(--reka-combobox-content-available-width) min-w-[calc(var(--reka-combobox-trigger-width)+(--spacing(7)))] origin-(--reka-combobox-content-transform-origin) flex-col gap-1 overflow-x-hidden overflow-y-auto rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg duration-100 outline-none data-closed:animate-out data-closed:overflow-hidden data-closed:fade-out-0 data-closed:zoom-out-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-[chips=true]:min-w-(--reka-combobox-trigger-width) data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 *:data-[slot=input-group]:mb-2 *:data-[slot=input-group]:h-9 *:data-[slot=input-group]:rounded-lg *:data-[slot=input-group]:border-gray-200 *:data-[slot=input-group]:bg-gray-50/50 *:data-[slot=input-group]:shadow-none dark:border-gray-800 dark:bg-[#1E2635] dark:*:data-[slot=input-group]:border-gray-700/60 dark:*:data-[slot=input-group]:bg-gray-800/50`,
          props.class,
        )
      "
    >
      <ComboboxViewport
        data-slot="combobox-list"
        class="no-scrollbar flex scroll-py-1 flex-col gap-1 overflow-y-auto overscroll-contain outline-none"
      >
        <slot />
      </ComboboxViewport>
    </ComboboxContent>
  </ComboboxPortal>
</template>
