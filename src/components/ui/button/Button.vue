<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Primitive } from 'reka-ui'
import type { PrimitiveProps } from 'reka-ui'
import { buttonVariants } from './variants'
import type { ButtonSize, ButtonVariant } from './variants'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<
    PrimitiveProps & {
      variant?: ButtonVariant
      size?: ButtonSize
      type?: 'button' | 'submit' | 'reset'
    }
  >(),
  {
    as: 'button',
    variant: 'default',
    size: 'default',
    type: 'button',
  },
)

const attrs = useAttrs()

const classes = computed(() =>
  buttonVariants({
    variant: props.variant,
    size: props.size,
    class: attrs.class as string,
  }),
)
</script>

<template>
  <Primitive
    data-slot="button"
    v-bind="{ ...attrs, class: undefined }"
    :as="as"
    :as-child="asChild"
    :type="as === 'button' ? type : undefined"
    :class="classes"
  >
    <slot />
  </Primitive>
</template>
