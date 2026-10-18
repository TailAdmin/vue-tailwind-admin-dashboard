<script setup lang="ts">
import { SelectPortal, useForwardProps } from 'reka-ui'
import type { SelectPortalProps } from 'reka-ui'

const props = defineProps<SelectPortalProps>()

const forwarded = useForwardProps(props)
</script>

<template>
  <SelectPortal data-slot="select-portal" v-bind="forwarded">
    <slot />
  </SelectPortal>
</template>
