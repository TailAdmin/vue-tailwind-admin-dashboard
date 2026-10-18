<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'
import { CollapsibleContent, useForwardProps } from 'reka-ui'
import type { CollapsibleContentProps } from 'reka-ui'
import { cn } from '@/utils/cn'

const props = defineProps<CollapsibleContentProps & { class?: HTMLAttributes['class'] }>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardProps(delegated)
</script>

<template>
  <CollapsibleContent
    data-slot="collapsible-content"
    v-bind="forwarded"
    :class="
      cn(
        `overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down`,
        props.class,
      )
    "
  >
    <slot />
  </CollapsibleContent>
</template>
