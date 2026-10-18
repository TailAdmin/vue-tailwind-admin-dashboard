<script setup lang="ts">
import { CollapsibleTrigger, useForwardProps } from 'reka-ui'
import type { CollapsibleTriggerProps } from 'reka-ui'

const props = defineProps<CollapsibleTriggerProps>()

const forwarded = useForwardProps(props)
</script>

<template>
  <CollapsibleTrigger data-slot="collapsible-trigger" v-bind="forwarded">
    <slot />
  </CollapsibleTrigger>
</template>
