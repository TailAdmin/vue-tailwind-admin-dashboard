<script setup lang="ts">
import { Field, FieldLabel } from '@/components/ui/field'
import { Textarea } from '@/components/ui/textarea'
</script>

<template>
  <Field>
    <FieldLabel>Description</FieldLabel>
    <Textarea placeholder="Enter a description..." :rows="6" />
  </Field>
</template>
