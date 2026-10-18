<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { cn } from '@/utils/cn'

defineOptions({ inheritAttrs: false })

type Align = 'inline-start' | 'inline-end' | 'block-start' | 'block-end'

const props = withDefaults(defineProps<{ align?: Align }>(), { align: 'inline-start' })

const attrs = useAttrs()

const base =
  "flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium text-gray-500 select-none group-data-[disabled=true]/input-group:opacity-50 dark:text-gray-400 [&>kbd]:rounded-md [&>kbd]:border [&>kbd]:border-gray-200 [&>kbd]:bg-gray-50 dark:[&>kbd]:border-gray-700 dark:[&>kbd]:bg-gray-800 [&>svg:not([class*='size-'])]:size-4"

const aligns: Record<Align, string> = {
  'inline-start': 'order-first ps-3.5 has-[>button]:-ms-1 has-[>kbd]:-ms-0.5',
  'inline-end': 'order-last pe-3.5 has-[>button]:-me-1 has-[>kbd]:-me-0.5',
  'block-start':
    'order-first w-full justify-start ps-4 pe-4 pt-2.5 group-has-[>input]/input-group:pt-2.5 [.border-b]:pb-2',
  'block-end':
    'order-last w-full justify-start ps-4 pe-4 pb-2.5 group-has-[>input]/input-group:pb-2.5 [.border-t]:pt-2',
}

const classes = computed(() => cn(base, aligns[props.align], attrs.class as string))

const focusInput = (event: MouseEvent) => {
  if ((event.target as HTMLElement).closest('button')) return
  ;(event.currentTarget as HTMLElement).parentElement
    ?.querySelector<HTMLInputElement | HTMLTextAreaElement>('input, textarea')
    ?.focus()
}
</script>

<template>
  <div
    role="group"
    data-slot="input-group-addon"
    :data-align="align"
    v-bind="{ ...attrs, class: undefined }"
    :class="classes"
    @click="focusInput"
  >
    <slot />
  </div>
</template>
