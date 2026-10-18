<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { buttonVariants } from '@/components/ui/button'
import type { ButtonSize, ButtonVariant } from '@/components/ui/button'
import { cn } from '@/utils/cn'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    isActive?: boolean
    disabled?: boolean
    size?: ButtonSize
    variant?: ButtonVariant
  }>(),
  {
    size: 'icon',
  },
)

const attrs = useAttrs()

const classes = computed(() =>
  buttonVariants({
    variant: props.isActive ? 'default' : (props.variant ?? 'ghost'),
    size: props.size,
    class: cn(
      props.disabled && 'pointer-events-none cursor-not-allowed opacity-50',
      attrs.class as string,
    ),
  }),
)

const onClick = (event: MouseEvent) => {
  if (props.disabled) {
    event.preventDefault()
    return
  }
  ;(attrs.onClick as ((e: MouseEvent) => void) | undefined)?.(event)
}
</script>

<template>
  <a
    :aria-current="isActive ? 'page' : undefined"
    :aria-disabled="disabled"
    :tabindex="disabled ? -1 : undefined"
    data-slot="pagination-link"
    :data-active="isActive"
    v-bind="{ ...attrs, class: undefined, onClick: undefined }"
    :class="classes"
    @click="onClick"
  >
    <slot />
  </a>
</template>
