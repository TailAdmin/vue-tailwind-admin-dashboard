<script setup lang="ts">
import { DropdownMenuRoot, useForwardPropsEmits } from 'reka-ui'
import type { DropdownMenuRootProps, DropdownMenuRootEmits } from 'reka-ui'

const props = withDefaults(defineProps<DropdownMenuRootProps>(), { modal: false })
const emits = defineEmits<DropdownMenuRootEmits>()
const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <DropdownMenuRoot data-slot="dropdown-menu" v-bind="forwarded">
    <slot />
  </DropdownMenuRoot>
</template>
