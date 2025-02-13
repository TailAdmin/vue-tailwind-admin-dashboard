<template>
  <slot></slot>
</template>

<script setup lang="ts">
import { useSidebarProvider } from '@/composables/useSidebar'

useSidebarProvider()
</script>
