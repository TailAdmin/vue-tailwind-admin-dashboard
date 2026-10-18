<script setup lang="ts">
import { useAttrs } from 'vue'
import { cn } from '@/utils/cn'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<{ orientation?: 'horizontal' | 'vertical' }>(), {
  orientation: 'horizontal',
})

const attrs = useAttrs()

const base =
  "flex w-fit items-stretch *:focus-visible:relative *:focus-visible:z-10 has-[>[data-slot=button-group]]:gap-2 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-e-lg [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1"
const orientations = {
  horizontal:
    '[&>[data-slot]:has(~[data-slot])]:rounded-e-none [&>[data-slot]~[data-slot]]:rounded-s-none [&>[data-slot]~[data-slot]]:border-s-0',
  vertical:
    'flex-col [&>[data-slot]:has(~[data-slot])]:rounded-b-none [&>[data-slot]~[data-slot]]:rounded-t-none [&>[data-slot]~[data-slot]]:border-t-0',
}
</script>

<template>
  <div
    role="group"
    data-slot="button-group"
    :data-orientation="props.orientation"
    v-bind="{ ...attrs, class: undefined }"
    :class="cn(base, orientations[props.orientation], attrs.class as string)"
  >
    <slot />
  </div>
</template>
