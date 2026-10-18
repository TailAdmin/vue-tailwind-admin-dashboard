<script setup lang="ts">
import ComponentCard from '@/components/common/ComponentCard.vue'
import DefaultCheckbox from './DefaultCheckbox.vue'
import LabeledCheckbox from './LabeledCheckbox.vue'
</script>

<template>
  <ComponentCard title="Checkboxes">
    <div class="space-y-6">
      <DefaultCheckbox />
      <LabeledCheckbox />
    </div>
  </ComponentCard>
</template>
