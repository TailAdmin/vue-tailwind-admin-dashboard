<script setup lang="ts">
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import type { PersonalInfoFormData } from './types'

defineProps<{
  errorOf: (field: keyof PersonalInfoFormData) => string | undefined
  touch: (field: keyof PersonalInfoFormData) => void
}>()

const form = defineModel<PersonalInfoFormData>('form', { required: true })
</script>

<template>
  <div class="space-y-4">
    <h3 class="text-base font-medium text-gray-800 dark:text-white/90">Social Links</h3>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Field :data-invalid="Boolean(errorOf('facebook'))">
        <FieldLabel class="mb-1.5 block">Facebook</FieldLabel>
        <Input
          v-model="form.facebook"
          type="url"
          placeholder="https://facebook.com/username"
          :aria-invalid="errorOf('facebook') ? 'true' : undefined"
          @blur="touch('facebook')"
        />
        <FieldError :errors="[{ message: errorOf('facebook') }]" />
      </Field>
      <Field :data-invalid="Boolean(errorOf('x'))">
        <FieldLabel class="mb-1.5 block">X.com</FieldLabel>
        <Input
          v-model="form.x"
          type="url"
          placeholder="https://x.com/username"
          :aria-invalid="errorOf('x') ? 'true' : undefined"
          @blur="touch('x')"
        />
        <FieldError :errors="[{ message: errorOf('x') }]" />
      </Field>
      <Field :data-invalid="Boolean(errorOf('linkedin'))">
        <FieldLabel class="mb-1.5 block">Linkedin</FieldLabel>
        <Input
          v-model="form.linkedin"
          type="url"
          placeholder="https://linkedin.com/in/username"
          :aria-invalid="errorOf('linkedin') ? 'true' : undefined"
          @blur="touch('linkedin')"
        />
        <FieldError :errors="[{ message: errorOf('linkedin') }]" />
      </Field>
      <Field :data-invalid="Boolean(errorOf('instagram'))">
        <FieldLabel class="mb-1.5 block">Instagram</FieldLabel>
        <Input
          v-model="form.instagram"
          type="url"
          placeholder="https://instagram.com/username"
          :aria-invalid="errorOf('instagram') ? 'true' : undefined"
          @blur="touch('instagram')"
        />
        <FieldError :errors="[{ message: errorOf('instagram') }]" />
      </Field>
    </div>
  </div>
</template>
