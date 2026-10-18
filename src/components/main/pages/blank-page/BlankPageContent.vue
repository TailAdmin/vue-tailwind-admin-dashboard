<script setup lang="ts">
import BlankCard from './BlankCard.vue'
import type { BlankCardProps } from './types'

defineProps<BlankCardProps>()
</script>

<template>
  <BlankCard v-bind="$props" />
</template>
