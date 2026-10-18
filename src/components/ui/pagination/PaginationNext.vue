<script setup lang="ts">
import { useAttrs } from 'vue'
import type { ButtonSize, ButtonVariant } from '@/components/ui/button'
import { ChevronRightIcon } from '@/icons/layout'
import PaginationLink from './PaginationLink.vue'

defineOptions({ inheritAttrs: false })

withDefaults(
  defineProps<{
    text?: string
    size?: ButtonSize
    variant?: ButtonVariant
    disabled?: boolean
  }>(),
  {
    text: 'Next',
    size: 'default',
  },
)

const attrs = useAttrs()
</script>

<template>
  <PaginationLink
    aria-label="Go to next page"
    :size="size"
    :variant="variant"
    :disabled="disabled"
    v-bind="attrs"
  >
    <slot>
      <span v-if="size !== 'icon'" class="hidden sm:block">{{ text }}</span>
      <ChevronRightIcon data-icon="inline-end" class="rtl:rotate-180" />
    </slot>
  </PaginationLink>
</template>
