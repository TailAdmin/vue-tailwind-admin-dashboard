<script setup lang="ts">
import { Field, FieldLabel } from '@/components/ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { MastercardIcon } from '@/icons/layout'
</script>

<template>
  <Field>
    <FieldLabel>Input with Payment</FieldLabel>
    <InputGroup>
      <InputGroupAddon
        align="inline-start"
        class="self-stretch border-e border-gray-200 ps-3.5 pe-3 dark:border-gray-800"
      >
        <MastercardIcon class="h-5 w-auto" />
      </InputGroupAddon>
      <InputGroupInput type="text" placeholder="Card number" />
    </InputGroup>
  </Field>
</template>
