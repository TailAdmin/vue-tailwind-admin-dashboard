<script setup lang="ts">
import { ref } from 'vue'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

const value = ref<string>('option1')
</script>

<template>
  <RadioGroup v-model="value" class="flex flex-row items-center gap-6">
    <RadioGroupItem value="option1" aria-label="Option 1" />
    <RadioGroupItem value="option2" aria-label="Option 2" />
    <RadioGroupItem value="option3" disabled aria-label="Option 3 (disabled)" />
  </RadioGroup>
</template>
