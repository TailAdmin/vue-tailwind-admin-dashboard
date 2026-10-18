<script setup lang="ts">
import { ref } from 'vue'
import { Field } from '@/components/ui/field'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

const value = ref<string>('selected')
</script>

<template>
  <RadioGroup v-model="value" class="flex flex-wrap items-center gap-6 sm:gap-8">
    <Field orientation="horizontal" class="w-auto gap-2.5">
      <RadioGroupItem id="radio-default" value="default" />
      <Label
        for="radio-default"
        class="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        Default
      </Label>
    </Field>

    <Field orientation="horizontal" class="w-auto gap-2.5">
      <RadioGroupItem id="radio-selected" value="selected" />
      <Label
        for="radio-selected"
        class="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        Selected
      </Label>
    </Field>

    <Field orientation="horizontal" class="w-auto gap-2.5">
      <RadioGroupItem id="radio-disabled" value="disabled" disabled />
      <Label
        for="radio-disabled"
        class="cursor-not-allowed text-sm font-medium text-gray-400 dark:text-gray-600"
      >
        Disabled
      </Label>
    </Field>
  </RadioGroup>
</template>
