<script setup lang="ts">
import { computed, ref } from 'vue'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { PencilIcon } from '@/icons/layout'
import { cn } from '@/utils/cn'
import { defaultPersonalInfo } from './data'
import EditPersonalInfoDialog from './edit-dialog/EditPersonalInfoDialog.vue'
import InfoField from './InfoField.vue'
import SocialLinks from './SocialLinks.vue'
import type { PersonalInfo, PersonalInfoCardProps } from './types'

const props = withDefaults(defineProps<PersonalInfoCardProps>(), {
  data: () => defaultPersonalInfo,
})

const profileData = ref<PersonalInfo>({ ...props.data })
const isDialogOpen = ref(false)

const initialLetter = computed(() =>
  profileData.value.firstName?.trim() ? profileData.value.firstName.trim()[0].toUpperCase() : 'M',
)
</script>

<template>
  <Card
    :class="
      cn(
        'relative overflow-hidden border border-gray-200 p-5 sm:p-6 lg:p-7 dark:border-gray-700',
        className,
      )
    "
  >
    <!-- Top Header Row: Title & Edit Button -->
    <div class="flex items-center justify-between gap-4">
      <h2 class="text-base font-semibold text-gray-800 sm:text-lg dark:text-white/90">
        Personal Information
      </h2>

      <Button
        type="button"
        variant="outline"
        size="sm"
        class="h-9 gap-2 px-3.5"
        @click="isDialogOpen = true"
      >
        <PencilIcon class="size-4.5" />
        <span>Edit</span>
      </Button>
    </div>

    <!-- Profile Pic & Basic Meta -->
    <div class="mt-2 flex items-center gap-4 sm:gap-6">
      <Avatar class="size-16 shrink-0 sm:size-20">
        <AvatarImage
          :src="profileData.avatarUrl || '/images/user/owner.png'"
          :alt="profileData.fullName || 'User profile'"
        />
        <AvatarFallback
          class="bg-brand-400 text-xl font-medium text-white sm:text-2xl dark:bg-brand-400 dark:text-white"
        >
          {{ initialLetter }}
        </AvatarFallback>
      </Avatar>

      <div class="flex flex-col gap-1">
        <h3 class="text-base font-semibold text-gray-800 sm:text-lg dark:text-white/90">
          {{ profileData.fullName }}
        </h3>

        <div
          class="flex flex-wrap items-center gap-2 text-xs text-gray-500 sm:text-sm dark:text-gray-400"
        >
          <span>{{ profileData.role }}</span>
          <span class="inline-block h-3.5 w-px bg-gray-300 dark:bg-gray-700" />
          <span>{{ profileData.location }}</span>
        </div>
      </div>
    </div>

    <!-- Details & Social Links Grid -->
    <div class="mt-2 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <div class="flex flex-col gap-6">
        <InfoField label="First Name" :value="profileData.firstName" />
        <InfoField label="Email address" :value="profileData.email" />
      </div>

      <div class="flex flex-col gap-6">
        <InfoField label="Last Name" :value="profileData.lastName" />
        <InfoField label="Phone" :value="profileData.phone" />
      </div>

      <div class="flex flex-col gap-6">
        <InfoField label="Bio" :value="profileData.bio" />
      </div>

      <div class="flex flex-col gap-6">
        <SocialLinks :social-links="profileData.socialLinks" />
      </div>
    </div>
  </Card>

  <!-- Edit Personal Information Dialog -->
  <EditPersonalInfoDialog
    :is-open="isDialogOpen"
    :initial-data="profileData"
    @open-change="isDialogOpen = $event"
    @save="profileData = $event"
  />
</template>
