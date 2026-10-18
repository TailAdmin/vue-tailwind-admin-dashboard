<script setup lang="ts">
import { DialogClose, useForwardProps } from 'reka-ui'
import type { DialogCloseProps } from 'reka-ui'

const props = defineProps<DialogCloseProps>()

const forwarded = useForwardProps(props)
</script>

<template>
  <DialogClose data-slot="dialog-close" v-bind="forwarded">
    <slot />
  </DialogClose>
</template>
