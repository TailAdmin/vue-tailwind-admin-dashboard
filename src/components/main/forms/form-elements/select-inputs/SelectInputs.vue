<script setup lang="ts">
import ComponentCard from '@/components/common/ComponentCard.vue'
import ComboboxSelectInput from './ComboboxSelectInput.vue'
import MultipleSelectInput from './MultipleSelectInput.vue'
import SelectInput from './SelectInput.vue'
</script>

<template>
  <ComponentCard title="Select Inputs">
    <div class="space-y-6">
      <SelectInput />
      <MultipleSelectInput />
      <ComboboxSelectInput />
    </div>
  </ComponentCard>
</template>
