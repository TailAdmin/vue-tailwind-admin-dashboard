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
import { validateAddress, type AddressFormData } from './schema'
import type { AddressData, EditAddressModalProps } from './types'

const props = defineProps<EditAddressModalProps>()

const emit = defineEmits<{
  (e: 'openChange', open: boolean): void
  (e: 'save', data: AddressData): void
}>()

const { values, errorOf, touch, reset, handleSubmit, isSubmitting } =
  useFormValidation<AddressFormData>({ ...props.initialData }, validateAddress)

watch(
  () => props.isOpen,
  (open) => {
    if (open) {
      reset()
      Object.assign(values, props.initialData)
    }
  },
)

const onSubmit = handleSubmit((data) => {
  emit('save', data)
  emit('openChange', false)
})
</script>

<template>
  <Dialog :open="isOpen" @update:open="emit('openChange', $event)">
    <DialogContent class="max-w-[calc(100%-2rem)] rounded-3xl p-6 sm:max-w-146 sm:p-10">
      <DialogHeader class="gap-2 pe-14 text-start">
        <DialogTitle class="text-2xl font-semibold text-gray-800 dark:text-white/90">
          Edit Address
        </DialogTitle>
        <DialogDescription class="text-sm text-gray-500 dark:text-gray-400">
          Update your details to keep your profile up-to-date.
        </DialogDescription>
      </DialogHeader>

      <form class="space-y-6" novalidate @submit="onSubmit">
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
          <Field :data-invalid="Boolean(errorOf('country'))" class="gap-1.5">
            <FieldLabel>Country</FieldLabel>
            <Input
              v-model="values.country"
              placeholder="Country"
              :aria-invalid="errorOf('country') ? 'true' : undefined"
              @blur="touch('country')"
            />
            <FieldError :errors="[{ message: errorOf('country') }]" />
          </Field>

          <Field :data-invalid="Boolean(errorOf('cityState'))" class="gap-1.5">
            <FieldLabel>City/State</FieldLabel>
            <Input
              v-model="values.cityState"
              placeholder="City/State"
              :aria-invalid="errorOf('cityState') ? 'true' : undefined"
              @blur="touch('cityState')"
            />
            <FieldError :errors="[{ message: errorOf('cityState') }]" />
          </Field>

          <Field :data-invalid="Boolean(errorOf('postalCode'))" class="gap-1.5">
            <FieldLabel>Postal Code</FieldLabel>
            <Input
              v-model="values.postalCode"
              placeholder="Postal Code"
              :aria-invalid="errorOf('postalCode') ? 'true' : undefined"
              @blur="touch('postalCode')"
            />
            <FieldError :errors="[{ message: errorOf('postalCode') }]" />
          </Field>

          <Field :data-invalid="Boolean(errorOf('taxId'))" class="gap-1.5">
            <FieldLabel>TAX ID</FieldLabel>
            <Input
              v-model="values.taxId"
              placeholder="TAX ID"
              :aria-invalid="errorOf('taxId') ? 'true' : undefined"
              @blur="touch('taxId')"
            />
            <FieldError :errors="[{ message: errorOf('taxId') }]" />
          </Field>
        </div>

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
