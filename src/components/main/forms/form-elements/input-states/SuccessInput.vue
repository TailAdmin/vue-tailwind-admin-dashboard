<script setup lang="ts">
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
</script>

<template>
  <Field>
    <FieldLabel>Email</FieldLabel>
    <Input type="email" default-value="demoemail@gmail.com" data-success="true" />
    <p class="text-xs text-green-600 dark:text-green-400">This is an success message.</p>
  </Field>
</template>
