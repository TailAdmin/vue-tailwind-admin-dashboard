<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useFormValidation } from '@/composables/useFormValidation'
import type { PersonalInfo } from '../types'
import AvatarUploadSection from './AvatarUploadSection.vue'
import PersonalDetailsFields from './PersonalDetailsFields.vue'
import { validatePersonalInfo } from './schema'
import SocialLinksFields from './SocialLinksFields.vue'
import type { PersonalInfoFormData } from './types'

const props = defineProps<{
  isOpen: boolean
  initialData: PersonalInfo
}>()

const emit = defineEmits<{
  (e: 'openChange', open: boolean): void
  (e: 'save', data: PersonalInfo): void
}>()

const avatarFileUrl = ref<string | null>(null)

const previewAvatarUrl = computed(
  () => avatarFileUrl.value || props.initialData.avatarUrl || '/images/user/user-01.jpg',
)

const toFormValues = (data: PersonalInfo): PersonalInfoFormData => ({
  firstName: data.firstName,
  lastName: data.lastName,
  email: data.email,
  phone: data.phone,
  bio: data.bio,
  facebook: data.socialLinks.facebook,
  x: data.socialLinks.x,
  linkedin: data.socialLinks.linkedin,
  instagram: data.socialLinks.instagram,
  avatarUrl: data.avatarUrl,
})

const { values, errorOf, touch, reset, handleSubmit, isSubmitting } =
  useFormValidation<PersonalInfoFormData>(toFormValues(props.initialData), validatePersonalInfo)

// Mirror react-hook-form's `values` option: re-sync whenever the dialog opens.
watch(
  () => [props.isOpen, props.initialData] as const,
  ([open]) => {
    if (open) {
      Object.assign(values, toFormValues(props.initialData))
      reset()
      Object.assign(values, toFormValues(props.initialData))
    }
  },
)

const handleOpenChange = (open: boolean) => {
  if (!open) {
    avatarFileUrl.value = null
  }
  emit('openChange', open)
}

const onSubmit = handleSubmit((formData) => {
  const updatedFullName = `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim()
  emit('save', {
    ...props.initialData,
    avatarUrl: previewAvatarUrl.value,
    fullName: updatedFullName || props.initialData.fullName,
    firstName: formData.firstName.trim(),
    lastName: formData.lastName.trim(),
    email: formData.email.trim(),
    phone: formData.phone.trim(),
    bio: formData.bio?.trim() ?? '',
    socialLinks: {
      facebook: formData.facebook?.trim() ?? '',
      x: formData.x?.trim() ?? '',
      linkedin: formData.linkedin?.trim() ?? '',
      instagram: formData.instagram?.trim() ?? '',
    },
  })
  handleOpenChange(false)
})

const initialLetter = computed(() =>
  props.initialData.firstName?.trim() ? props.initialData.firstName.trim()[0].toUpperCase() : 'M',
)
</script>

<template>
  <Dialog :open="isOpen" @update:open="handleOpenChange">
    <DialogContent class="max-h-[90vh] w-full overflow-hidden p-0 sm:max-w-2xl">
      <ScrollArea scrollbars="vertical" class="max-h-[90vh]">
        <div class="p-6 sm:p-8">
          <DialogHeader class="gap-1 sm:gap-2">
            <DialogTitle class="text-xl font-semibold text-gray-800 sm:text-2xl dark:text-white/90">
              Edit Personal Information
            </DialogTitle>
            <DialogDescription class="text-sm text-gray-500 dark:text-gray-400">
              Update your details to keep your profile up-to-date.
            </DialogDescription>
          </DialogHeader>

          <form class="mt-4 space-y-6" novalidate @submit="onSubmit">
            <AvatarUploadSection
              :preview-avatar-url="previewAvatarUrl"
              :full-name="initialData.fullName"
              :fallback-letter="initialLetter"
              @avatar-change="avatarFileUrl = $event"
            />

            <PersonalDetailsFields v-model:form="values" :error-of="errorOf" :touch="touch" />

            <SocialLinksFields v-model:form="values" :error-of="errorOf" :touch="touch" />

            <!-- Footer Actions -->
            <div class="flex flex-col-reverse justify-end gap-3 pt-3 sm:flex-row">
              <Button type="button" variant="outline" @click="handleOpenChange(false)">
                Close
              </Button>
              <Button type="submit" :disabled="isSubmitting">Save Changes</Button>
            </div>
          </form>
        </div>
      </ScrollArea>
    </DialogContent>
  </Dialog>
</template>
