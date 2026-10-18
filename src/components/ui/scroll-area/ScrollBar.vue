<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'
import { ScrollAreaScrollbar, ScrollAreaThumb, useForwardProps } from 'reka-ui'
import type { ScrollAreaScrollbarProps } from 'reka-ui'
import { cn } from '@/utils/cn'

const props = withDefaults(
  defineProps<ScrollAreaScrollbarProps & { class?: HTMLAttributes['class'] }>(),
  {
    orientation: 'vertical',
  },
)

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardProps(delegated)
</script>

<template>
  <ScrollAreaScrollbar
    data-slot="scroll-area-scrollbar"
    :data-orientation="orientation"
    v-bind="forwarded"
    :class="
      cn(
        `flex touch-none rounded-full bg-gray-100 transition-colors select-none data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=horizontal]:flex-col data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5 dark:bg-gray-800`,
        props.class,
      )
    "
  >
    <ScrollAreaThumb
      data-slot="scroll-area-thumb"
      :class="
        cn(
          'relative rounded-full bg-gray-300 transition-colors hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500',
          orientation === 'horizontal' ? 'h-full!' : 'w-full!',
        )
      "
    />
  </ScrollAreaScrollbar>
</template>
