<script setup lang="ts">
import { Field, FieldLabel } from '@/components/ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { EnvelopeIcon } from '@/icons/layout'
</script>

<template>
  <Field>
    <FieldLabel>Email</FieldLabel>
    <InputGroup class="overflow-hidden">
      <InputGroupAddon
        align="inline-start"
        class="self-stretch border-e border-gray-200 ps-3.5 pe-3 dark:border-gray-800"
      >
        <EnvelopeIcon class="size-5 text-gray-500 dark:text-gray-400" />
      </InputGroupAddon>
      <InputGroupInput type="email" placeholder="info@gmail.com" />
    </InputGroup>
  </Field>
</template>
