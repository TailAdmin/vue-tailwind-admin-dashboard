<script setup lang="ts">
import { DialogRoot, useForwardPropsEmits } from 'reka-ui'
import type { DialogRootProps, DialogRootEmits } from 'reka-ui'

const props = defineProps<DialogRootProps>()
const emits = defineEmits<DialogRootEmits>()
const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <DialogRoot data-slot="dialog" v-bind="forwarded">
    <slot />
  </DialogRoot>
</template>
