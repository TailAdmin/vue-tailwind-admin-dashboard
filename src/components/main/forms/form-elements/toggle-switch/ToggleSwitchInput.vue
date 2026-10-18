<script setup lang="ts">
import { ref } from 'vue'
import { Switch } from '@/components/ui/switch'

const activeSwitch = ref(true)
const inactiveSwitch = ref(false)
</script>

<template>
  <div class="flex items-center gap-7">
    <Switch v-model="activeSwitch" size="sm" aria-label="Active switch" />
    <Switch v-model="inactiveSwitch" size="sm" aria-label="Inactive switch" />
  </div>
</template>
