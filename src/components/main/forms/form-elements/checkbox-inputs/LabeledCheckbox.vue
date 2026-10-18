<script setup lang="ts">
import { ref } from 'vue'
import { Checkbox } from '@/components/ui/checkbox'
import { Field } from '@/components/ui/field'
import { Label } from '@/components/ui/label'

const isCheckedDefault = ref(false)
const isChecked = ref(true)
</script>

<template>
  <div class="flex flex-wrap items-center gap-6 sm:gap-8">
    <Field orientation="horizontal" class="w-auto gap-2.5">
      <Checkbox
        id="checkbox-default"
        :checked="isCheckedDefault"
        @change="isCheckedDefault = $event"
      />
      <Label
        for="checkbox-default"
        class="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        Default
      </Label>
    </Field>

    <Field orientation="horizontal" class="w-auto gap-2.5">
      <Checkbox id="checkbox-checked" :checked="isChecked" @change="isChecked = $event" />
      <Label
        for="checkbox-checked"
        class="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        Checked
      </Label>
    </Field>

    <Field orientation="horizontal" class="w-auto gap-2.5">
      <Checkbox id="checkbox-disabled" :checked="true" disabled />
      <Label
        for="checkbox-disabled"
        class="cursor-not-allowed text-sm font-medium text-gray-400 dark:text-gray-600"
      >
        Disabled
      </Label>
    </Field>
  </div>
</template>
