<script setup lang="ts">
import { DialogPortal, useForwardProps } from 'reka-ui'
import type { DialogPortalProps } from 'reka-ui'

const props = defineProps<DialogPortalProps>()

const forwarded = useForwardProps(props)
</script>

<template>
  <DialogPortal data-slot="dialog-portal" v-bind="forwarded">
    <slot />
  </DialogPortal>
</template>
