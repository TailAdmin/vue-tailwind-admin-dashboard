<script setup lang="ts">
import { Field, FieldLabel } from '@/components/ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
</script>

<template>
  <Field>
    <FieldLabel>URL</FieldLabel>
    <InputGroup class="overflow-hidden">
      <InputGroupAddon
        align="inline-start"
        class="self-stretch border-e border-gray-200 ps-3.5 pe-3 dark:border-gray-800"
      >
        <span class="text-sm font-normal text-gray-500 dark:text-gray-400">http://</span>
      </InputGroupAddon>
      <InputGroupInput type="text" placeholder="www.tailadmin.com" />
    </InputGroup>
  </Field>
</template>
