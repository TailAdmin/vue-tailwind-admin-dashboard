<script setup lang="ts">
import ComponentCard from '@/components/common/ComponentCard.vue'
import DefaultRadioButtons from './DefaultRadioButtons.vue'
import LabeledRadioButtons from './LabeledRadioButtons.vue'
</script>

<template>
  <ComponentCard title="Radio Buttons">
    <div class="space-y-6">
      <DefaultRadioButtons />
      <LabeledRadioButtons />
    </div>
  </ComponentCard>
</template>
