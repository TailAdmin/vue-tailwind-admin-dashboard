<script setup lang="ts">
import ComponentCard from '@/components/common/ComponentCard.vue'
import DefaultTextarea from './DefaultTextarea.vue'
import DisabledTextarea from './DisabledTextarea.vue'
import ErrorTextarea from './ErrorTextarea.vue'
import InputGroupTextareaExample from './InputGroupTextareaExample.vue'
</script>

<template>
  <ComponentCard title="Textarea input field">
    <div class="space-y-6">
      <DefaultTextarea />
      <DisabledTextarea />
      <ErrorTextarea />
      <InputGroupTextareaExample />
    </div>
  </ComponentCard>
</template>
