<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group'
import { useFormValidation } from '@/composables/useFormValidation'
import { EyeCloseIcon, EyeIcon } from '@/icons/layout'
import { validateSignUp, type SignUpFormData } from './schema'

const showPassword = ref(false)
const showConfirmPassword = ref(false)

const { values, errorOf, touch, handleSubmit, isSubmitting } = useFormValidation<SignUpFormData>(
  { fname: '', lname: '', email: '', password: '', confirmPassword: '', terms: false },
  validateSignUp,
)

const onSubmit = handleSubmit(async () => {
  // handle submit action
})
</script>

<template>
  <form class="space-y-5" novalidate @submit="onSubmit">
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <Field :data-invalid="Boolean(errorOf('fname'))">
        <FieldLabel class="mb-1.5 block">
          First Name <span class="text-red-500">*</span>
        </FieldLabel>
        <Input
          v-model="values.fname"
          type="text"
          placeholder="Enter your first name"
          :aria-invalid="errorOf('fname') ? 'true' : undefined"
          @blur="touch('fname')"
        />
        <FieldError :errors="[{ message: errorOf('fname') }]" />
      </Field>

      <Field :data-invalid="Boolean(errorOf('lname'))">
        <FieldLabel class="mb-1.5 block">
          Last Name <span class="text-red-500">*</span>
        </FieldLabel>
        <Input
          v-model="values.lname"
          type="text"
          placeholder="Enter your last name"
          :aria-invalid="errorOf('lname') ? 'true' : undefined"
          @blur="touch('lname')"
        />
        <FieldError :errors="[{ message: errorOf('lname') }]" />
      </Field>
    </div>

    <Field :data-invalid="Boolean(errorOf('email'))">
      <FieldLabel class="mb-1.5 block"> Email <span class="text-red-500">*</span> </FieldLabel>
      <Input
        v-model="values.email"
        type="email"
        placeholder="Enter your email"
        :aria-invalid="errorOf('email') ? 'true' : undefined"
        @blur="touch('email')"
      />
      <FieldError :errors="[{ message: errorOf('email') }]" />
    </Field>

    <Field :data-invalid="Boolean(errorOf('password'))">
      <FieldLabel class="mb-1.5 block"> Password <span class="text-red-500">*</span> </FieldLabel>
      <InputGroup>
        <InputGroupInput
          v-model="values.password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Enter your password"
          :aria-invalid="errorOf('password') ? 'true' : undefined"
          @blur="touch('password')"
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            size="icon-xs"
            :aria-label="showPassword ? 'Hide password' : 'Show password'"
            class="text-gray-500 dark:text-gray-400"
            @click="showPassword = !showPassword"
          >
            <EyeIcon v-if="showPassword" class="fill-current" />
            <EyeCloseIcon v-else class="fill-current" />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <FieldError :errors="[{ message: errorOf('password') }]" />
    </Field>

    <Field :data-invalid="Boolean(errorOf('confirmPassword'))">
      <FieldLabel class="mb-1.5 block">
        Confirm Password <span class="text-red-500">*</span>
      </FieldLabel>
      <InputGroup>
        <InputGroupInput
          v-model="values.confirmPassword"
          :type="showConfirmPassword ? 'text' : 'password'"
          placeholder="Re-enter your password"
          :aria-invalid="errorOf('confirmPassword') ? 'true' : undefined"
          @blur="touch('confirmPassword')"
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            size="icon-xs"
            :aria-label="showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'"
            class="text-gray-500 dark:text-gray-400"
            @click="showConfirmPassword = !showConfirmPassword"
          >
            <EyeIcon v-if="showConfirmPassword" class="fill-current" />
            <EyeCloseIcon v-else class="fill-current" />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <FieldError :errors="[{ message: errorOf('confirmPassword') }]" />
    </Field>

    <Field
      orientation="horizontal"
      class="items-start gap-3"
      :data-invalid="Boolean(errorOf('terms'))"
    >
      <Checkbox
        id="terms"
        class="mt-0.5"
        :model-value="values.terms"
        :aria-invalid="errorOf('terms') ? 'true' : undefined"
        @update:model-value="values.terms = Boolean($event)"
      />
      <div class="flex flex-col gap-1">
        <FieldLabel
          for="terms"
          class="inline-block cursor-pointer text-sm font-normal text-gray-500 dark:text-gray-400"
        >
          By creating an account means you agree to the
          <span class="text-gray-800 dark:text-white/90">Terms and Conditions,</span>
          and our
          <span class="text-gray-800 dark:text-white">Privacy Policy</span>
        </FieldLabel>
        <FieldError :errors="[{ message: errorOf('terms') }]" />
      </div>
    </Field>

    <div>
      <Button class="w-full" size="lg" type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? 'Signing Up...' : 'Sign Up' }}
      </Button>
    </div>
  </form>
</template>
