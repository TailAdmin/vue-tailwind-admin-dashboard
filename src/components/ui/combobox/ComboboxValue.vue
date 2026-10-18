<script setup lang="ts">
defineProps<{ placeholder?: string }>()
</script>

<template>
  <span data-slot="combobox-value">
    <slot>{{ placeholder }}</slot>
  </span>
</template>
