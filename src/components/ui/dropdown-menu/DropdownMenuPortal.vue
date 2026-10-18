<script setup lang="ts">
import { DropdownMenuPortal, useForwardProps } from 'reka-ui'
import type { DropdownMenuPortalProps } from 'reka-ui'

const props = defineProps<DropdownMenuPortalProps>()
const forwarded = useForwardProps(props)
</script>

<template>
  <DropdownMenuPortal data-slot="dropdown-menu-portal" v-bind="forwarded">
    <slot />
  </DropdownMenuPortal>
</template>
