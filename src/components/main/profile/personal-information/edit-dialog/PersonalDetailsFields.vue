<script setup lang="ts">
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import type { PersonalInfoFormData } from './types'

defineProps<{
  errorOf: (field: keyof PersonalInfoFormData) => string | undefined
  touch: (field: keyof PersonalInfoFormData) => void
}>()

const form = defineModel<PersonalInfoFormData>('form', { required: true })
</script>

<template>
  <div class="space-y-4">
    <h3 class="text-base font-medium text-gray-800 dark:text-white/90">Personal Information</h3>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Field :data-invalid="Boolean(errorOf('firstName'))">
        <FieldLabel class="mb-1.5 block">First Name <span class="text-red-500">*</span></FieldLabel>
        <Input
          v-model="form.firstName"
          type="text"
          placeholder="Enter first name"
          :aria-invalid="errorOf('firstName') ? 'true' : undefined"
          @blur="touch('firstName')"
        />
        <FieldError :errors="[{ message: errorOf('firstName') }]" />
      </Field>
      <Field :data-invalid="Boolean(errorOf('lastName'))">
        <FieldLabel class="mb-1.5 block">Last Name <span class="text-red-500">*</span></FieldLabel>
        <Input
          v-model="form.lastName"
          type="text"
          placeholder="Enter last name"
          :aria-invalid="errorOf('lastName') ? 'true' : undefined"
          @blur="touch('lastName')"
        />
        <FieldError :errors="[{ message: errorOf('lastName') }]" />
      </Field>
    </div>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Field :data-invalid="Boolean(errorOf('email'))">
        <FieldLabel class="mb-1.5 block"
          >Email Address <span class="text-red-500">*</span></FieldLabel
        >
        <Input
          v-model="form.email"
          type="email"
          placeholder="info@example.com"
          :aria-invalid="errorOf('email') ? 'true' : undefined"
          @blur="touch('email')"
        />
        <FieldError :errors="[{ message: errorOf('email') }]" />
      </Field>
      <Field :data-invalid="Boolean(errorOf('phone'))">
        <FieldLabel class="mb-1.5 block">Phone <span class="text-red-500">*</span></FieldLabel>
        <Input
          v-model="form.phone"
          type="text"
          placeholder="+09 363 398 46"
          :aria-invalid="errorOf('phone') ? 'true' : undefined"
          @blur="touch('phone')"
        />
        <FieldError :errors="[{ message: errorOf('phone') }]" />
      </Field>
    </div>

    <Field :data-invalid="Boolean(errorOf('bio'))">
      <FieldLabel class="mb-1.5 block">Bio</FieldLabel>
      <Textarea
        v-model="form.bio"
        :rows="3"
        placeholder="Write a brief bio..."
        :aria-invalid="errorOf('bio') ? 'true' : undefined"
        @blur="touch('bio')"
      />
      <FieldError :errors="[{ message: errorOf('bio') }]" />
    </Field>
  </div>
</template>
