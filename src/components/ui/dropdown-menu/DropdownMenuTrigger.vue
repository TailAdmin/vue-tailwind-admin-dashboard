<script setup lang="ts">
import { DropdownMenuTrigger, useForwardProps } from 'reka-ui'
import type { DropdownMenuTriggerProps } from 'reka-ui'

const props = defineProps<DropdownMenuTriggerProps>()
const forwarded = useForwardProps(props)
</script>

<template>
  <DropdownMenuTrigger data-slot="dropdown-menu-trigger" v-bind="forwarded">
    <slot />
  </DropdownMenuTrigger>
</template>
