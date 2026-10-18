<script setup lang="ts">
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Textarea } from '@/components/ui/textarea'
</script>

<template>
  <Field>
    <FieldLabel>Description</FieldLabel>
    <Textarea placeholder="Enter a description..." :rows="6" aria-invalid="true" />
    <FieldError class="text-xs">Please enter a message in the textarea.</FieldError>
  </Field>
</template>
