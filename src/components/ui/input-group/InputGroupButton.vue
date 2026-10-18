<script setup lang="ts">
import { useAttrs } from 'vue'
import { Button } from '@/components/ui/button'
import type { ButtonVariant } from '@/components/ui/button'
import { cn } from '@/utils/cn'

defineOptions({ inheritAttrs: false })

type InputGroupButtonSize = 'xs' | 'sm' | 'icon-xs' | 'icon-sm'

withDefaults(
  defineProps<{
    type?: 'button' | 'submit' | 'reset'
    variant?: ButtonVariant
    size?: InputGroupButtonSize
  }>(),
  { type: 'button', variant: 'ghost', size: 'xs' },
)

const attrs = useAttrs()

const sizes: Record<InputGroupButtonSize, string> = {
  xs: "h-7 gap-1 rounded-md px-2 text-xs [&>svg:not([class*='size-'])]:size-3.5",
  sm: "h-8 gap-1.5 rounded-lg px-2.5 text-xs [&>svg:not([class*='size-'])]:size-4",
  'icon-xs': 'size-7 rounded-md p-0 has-[>svg]:p-0',
  'icon-sm': 'size-8 rounded-lg p-0 has-[>svg]:p-0',
}
</script>

<template>
  <Button
    :type="type"
    :data-size="size"
    :variant="variant"
    v-bind="{ ...attrs, class: undefined }"
    :class="cn('flex items-center gap-2 text-sm shadow-none', sizes[size], attrs.class as string)"
  >
    <slot />
  </Button>
</template>
