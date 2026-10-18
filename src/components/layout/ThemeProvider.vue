<template>
  <slot></slot>
</template>

<script setup lang="ts">
import { useThemeProvider } from '@/composables/useTheme'

useThemeProvider()
</script>
