<script setup lang="ts">
import { DropdownMenuRadioGroup, useForwardPropsEmits } from 'reka-ui'
import type { DropdownMenuRadioGroupProps, DropdownMenuRadioGroupEmits } from 'reka-ui'

const props = defineProps<DropdownMenuRadioGroupProps>()
const emits = defineEmits<DropdownMenuRadioGroupEmits>()
const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <DropdownMenuRadioGroup data-slot="dropdown-menu-radio-group" v-bind="forwarded">
    <slot />
  </DropdownMenuRadioGroup>
</template>
