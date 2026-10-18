<script setup lang="ts">
import { DialogTrigger, useForwardProps } from 'reka-ui'
import type { DialogTriggerProps } from 'reka-ui'

const props = defineProps<DialogTriggerProps>()

const forwarded = useForwardProps(props)
</script>

<template>
  <DialogTrigger data-slot="dialog-trigger" v-bind="forwarded">
    <slot />
  </DialogTrigger>
</template>
