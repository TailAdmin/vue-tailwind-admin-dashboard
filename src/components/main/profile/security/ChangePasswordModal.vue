<script setup lang="ts">
import { watch } from 'vue'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useFormValidation } from '@/composables/useFormValidation'
import { validateChangePassword } from './schema'
import type { ChangePasswordFormData, ChangePasswordModalProps } from './types'

const props = defineProps<ChangePasswordModalProps>()

const emit = defineEmits<{
  (e: 'openChange', open: boolean): void
  (e: 'submitSuccess', data: ChangePasswordFormData): void
}>()

const { values, errorOf, touch, reset, handleSubmit, isSubmitting } =
  useFormValidation<ChangePasswordFormData>(
    { currentPassword: '', newPassword: '', confirmPassword: '' },
    validateChangePassword,
  )

watch(
  () => props.isOpen,
  (open) => {
    if (open) reset()
  },
)

const onSubmit = handleSubmit((data) => {
  emit('submitSuccess', data)
  emit('openChange', false)
})
</script>

<template>
  <Dialog :open="isOpen" @update:open="emit('openChange', $event)">
    <DialogContent class="max-w-[calc(100%-2rem)] rounded-3xl p-6 sm:max-w-146 sm:p-10">
      <DialogHeader class="gap-2 pe-14 text-start">
        <DialogTitle class="text-xl font-semibold text-gray-800 sm:text-2xl dark:text-white/90">
          Change Password
        </DialogTitle>
        <DialogDescription class="text-sm text-gray-500 dark:text-gray-400">
          Use a strong password to protect your account
        </DialogDescription>
      </DialogHeader>

      <form class="space-y-5" novalidate @submit="onSubmit">
        <Field :data-invalid="Boolean(errorOf('currentPassword'))" class="gap-1.5">
          <FieldLabel>Current Password</FieldLabel>
          <Input
            v-model="values.currentPassword"
            type="password"
            placeholder="Enter current password"
            :aria-invalid="errorOf('currentPassword') ? 'true' : undefined"
            @blur="touch('currentPassword')"
          />
          <FieldError :errors="[{ message: errorOf('currentPassword') }]" />
        </Field>

        <Field :data-invalid="Boolean(errorOf('newPassword'))" class="gap-1.5">
          <FieldLabel>New Password</FieldLabel>
          <Input
            v-model="values.newPassword"
            type="password"
            placeholder="Enter new password"
            :aria-invalid="errorOf('newPassword') ? 'true' : undefined"
            @blur="touch('newPassword')"
          />
          <FieldError :errors="[{ message: errorOf('newPassword') }]" />
        </Field>

        <Field :data-invalid="Boolean(errorOf('confirmPassword'))" class="gap-1.5">
          <FieldLabel>Confirm Password</FieldLabel>
          <Input
            v-model="values.confirmPassword"
            type="password"
            placeholder="Confirm new password"
            :aria-invalid="errorOf('confirmPassword') ? 'true' : undefined"
            @blur="touch('confirmPassword')"
          />
          <FieldError :errors="[{ message: errorOf('confirmPassword') }]" />
        </Field>

        <DialogFooter class="mx-0 mb-0 gap-3 p-0 pt-2 sm:justify-end">
          <DialogClose as-child>
            <Button variant="outline" type="button">Close</Button>
          </DialogClose>
          <Button type="submit" :disabled="isSubmitting">Save Changes</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
