<script setup lang="ts">
import ComponentCard from '@/components/common/ComponentCard.vue'
import BasicInput from './BasicInput.vue'
import DatePickerInput from './DatePickerInput.vue'
import InputWithPlaceholder from './InputWithPlaceholder.vue'
import PasswordInput from './PasswordInput.vue'
import PaymentInput from './PaymentInput.vue'
import SelectInput from './SelectInput.vue'
import TimeSelectInput from './TimeSelectInput.vue'
</script>

<template>
  <ComponentCard title="Default Inputs">
    <div class="space-y-6">
      <BasicInput />
      <InputWithPlaceholder />
      <SelectInput />
      <PasswordInput />
      <DatePickerInput />
      <TimeSelectInput />
      <PaymentInput />
    </div>
  </ComponentCard>
</template>
