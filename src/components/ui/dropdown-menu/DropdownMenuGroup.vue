<script setup lang="ts">
import { DropdownMenuGroup, useForwardProps } from 'reka-ui'
import type { DropdownMenuGroupProps } from 'reka-ui'

const props = defineProps<DropdownMenuGroupProps>()

const forwarded = useForwardProps(props)
</script>

<template>
  <DropdownMenuGroup data-slot="dropdown-menu-group" v-bind="forwarded">
    <slot />
  </DropdownMenuGroup>
</template>
