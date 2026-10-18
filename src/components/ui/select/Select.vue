<script setup lang="ts">
import { SelectRoot, useForwardPropsEmits } from 'reka-ui'
import type { SelectRootProps, SelectRootEmits } from 'reka-ui'

const props = defineProps<SelectRootProps>()
const emits = defineEmits<SelectRootEmits>()
const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <SelectRoot data-slot="select" v-bind="forwarded">
    <slot />
  </SelectRoot>
</template>
