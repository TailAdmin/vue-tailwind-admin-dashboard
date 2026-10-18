<script setup lang="ts">
import { ref } from 'vue'
import { Field, FieldLabel } from '@/components/ui/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group'
import { EyeCloseIcon, EyeIcon } from '@/icons/layout'

const showPassword = ref(false)
</script>

<template>
  <Field>
    <FieldLabel>Password Input</FieldLabel>
    <InputGroup>
      <InputGroupInput :type="showPassword ? 'text' : 'password'" placeholder="••••••••" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          size="icon-xs"
          variant="ghost"
          :aria-label="showPassword ? 'Hide password' : 'Show password'"
          @click="showPassword = !showPassword"
        >
          <EyeIcon
            v-if="showPassword"
            class="size-5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          />
          <EyeCloseIcon
            v-else
            class="size-5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  </Field>
</template>
