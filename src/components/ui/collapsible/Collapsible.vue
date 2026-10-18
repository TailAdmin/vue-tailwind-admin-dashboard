<script setup lang="ts">
import { CollapsibleRoot, useForwardPropsEmits } from 'reka-ui'
import type { CollapsibleRootProps, CollapsibleRootEmits } from 'reka-ui'

const props = defineProps<CollapsibleRootProps>()
const emits = defineEmits<CollapsibleRootEmits>()
const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <CollapsibleRoot data-slot="collapsible" v-bind="forwarded">
    <slot />
  </CollapsibleRoot>
</template>
