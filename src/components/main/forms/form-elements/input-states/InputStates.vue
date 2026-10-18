<script setup lang="ts">
import ComponentCard from '@/components/common/ComponentCard.vue'
import DisabledInput from './DisabledInput.vue'
import ErrorInput from './ErrorInput.vue'
import SuccessInput from './SuccessInput.vue'
</script>

<template>
  <ComponentCard
    title="Input States"
    desc="Validation styles for error, success and disabled states on form controls."
  >
    <div class="space-y-6">
      <ErrorInput />
      <SuccessInput />
      <DisabledInput />
    </div>
  </ComponentCard>
</template>
