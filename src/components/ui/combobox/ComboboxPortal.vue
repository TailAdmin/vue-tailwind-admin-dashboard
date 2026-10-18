<script setup lang="ts">
import { ComboboxPortal, useForwardProps } from 'reka-ui'
import type { ComboboxPortalProps } from 'reka-ui'

const props = defineProps<ComboboxPortalProps>()

const forwarded = useForwardProps(props)
</script>

<template>
  <ComboboxPortal data-slot="combobox-portal" v-bind="forwarded">
    <slot />
  </ComboboxPortal>
</template>
