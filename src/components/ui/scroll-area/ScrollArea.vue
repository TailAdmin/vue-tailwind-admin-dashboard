<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'
import { ScrollAreaCorner, ScrollAreaRoot, ScrollAreaViewport, useForwardProps } from 'reka-ui'
import type { ScrollAreaRootProps } from 'reka-ui'
import { cn } from '@/utils/cn'
import ScrollBar from './ScrollBar.vue'

const props = withDefaults(
  defineProps<
    ScrollAreaRootProps & {
      class?: HTMLAttributes['class']
      viewportClass?: HTMLAttributes['class']
      scrollbars?: 'vertical' | 'horizontal' | 'both'
    }
  >(),
  {
    type: 'auto',
    scrollbars: 'vertical',
  },
)

const delegated = computed(() => {
  const { class: _class, viewportClass: _viewportClass, scrollbars: _scrollbars, ...rest } = props
  return rest
})
const forwarded = useForwardProps(delegated)

const showVertical = computed(() => props.scrollbars === 'vertical' || props.scrollbars === 'both')
const showHorizontal = computed(
  () => props.scrollbars === 'horizontal' || props.scrollbars === 'both',
)
</script>

<template>
  <ScrollAreaRoot data-slot="scroll-area" v-bind="forwarded" :class="cn('relative', props.class)">
    <ScrollAreaViewport
      data-slot="scroll-area-viewport"
      :class="
        cn(
          'size-full rounded-[inherit] outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:ring-brand-500/20 focus-visible:outline-1',
          scrollbars === 'vertical' && 'overflow-x-hidden',
          props.viewportClass,
        )
      "
    >
      <div class="min-w-0">
        <slot />
      </div>
    </ScrollAreaViewport>
    <ScrollBar v-if="showVertical" orientation="vertical" />
    <ScrollBar v-if="showHorizontal" orientation="horizontal" />
    <ScrollAreaCorner />
  </ScrollAreaRoot>
</template>
