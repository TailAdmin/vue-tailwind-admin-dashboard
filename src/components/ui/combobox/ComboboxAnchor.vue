<script setup lang="ts">
import { ComboboxAnchor, useForwardProps } from 'reka-ui'
import type { ComboboxAnchorProps } from 'reka-ui'

const props = defineProps<ComboboxAnchorProps>()

const forwarded = useForwardProps(props)
</script>

<template>
  <ComboboxAnchor data-slot="combobox-anchor" v-bind="forwarded">
    <slot />
  </ComboboxAnchor>
</template>
