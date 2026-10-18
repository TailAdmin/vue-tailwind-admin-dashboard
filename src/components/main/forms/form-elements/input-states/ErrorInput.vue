<script setup lang="ts">
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
</script>

<template>
  <Field>
    <FieldLabel>Email</FieldLabel>
    <Input type="email" placeholder="demo-email@tailadmin.com" aria-invalid="true" />
    <FieldError class="text-xs">Clear guidance for users.</FieldError>
  </Field>
</template>
