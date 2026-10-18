<script setup lang="ts">
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
</script>

<template>
  <Field>
    <FieldLabel>Input with Placeholder</FieldLabel>
    <Input type="text" placeholder="info@gmail.com" />
  </Field>
</template>
