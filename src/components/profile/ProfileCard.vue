<template>
  <div>
    <div class="mb-6 p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div class="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <!-- Avatar and Info -->
        <div class="flex items-center gap-4">
          <div
            class="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800"
          >
            <img src="https://icon-library.com/images/user-png-icon/user-png-icon-16.jpg" alt="user" />
          </div>
          <div>
            <h4 class="text-xl font-bold text-gray-800 dark:text-white/90">
              {{ user.fullName }}
            </h4>
            <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {{ user.email }}
            </p>
            <div class="mt-2 flex flex-wrap gap-2">
              <span class="inline-flex items-center rounded-full bg-brand-100 px-2.5 py-0.5 text-xs font-medium text-brand-800 dark:bg-brand-900/30 dark:text-brand-300">
                {{ user.role }}
              </span>
              <!-- <span 
                v-if="user.isActive"
                class="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-300"
              >
                نشط
              </span> -->
            </div>
          </div>
        </div>

        
      </div>
    </div>

    
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { UserInfo } from '@/types/identity.types'
//import Modal from './Modal.vue'

defineProps<{
  user: UserInfo
}>()

const isProfilePhotoModal = ref(false)
//const isUploading = ref(false)
//const selectedFile = ref<File | null>(null)
//const previewUrl = ref<string>('')
//const fileInput = ref<HTMLInputElement>()

// const onFileChange = (event: Event) => {
//   const target = event.target as HTMLInputElement
//   const file = target.files?.[0]
  
//   if (file) {
//     // Validate file size (2MB max)
//     if (file.size > 2 * 1024 * 1024) {
//       alert('حجم الملف يجب أن يكون أقل من 2 ميجابايت')
//       return
//     }

//     // Validate file type
//     if (!file.type.startsWith('image/')) {
//       alert('يرجى اختيار ملف صورة')
//       return
//     }

//     selectedFile.value = file

//     // Create preview
//     const reader = new FileReader()
//     reader.onload = (e) => {
//       previewUrl.value = e.target?.result as string
//     }
//     reader.readAsDataURL(file)
//   }
// }

// const uploadPhoto = async () => {
//   if (!selectedFile.value) return

//   try {
//     isUploading.value = true

//     // TODO: استدعاء API لرفع الصورة
//     const formData = new FormData()
//     formData.append('avatar', selectedFile.value)

//     // Example: await authStore.uploadAvatar(formData)

//     console.log('Uploading photo:', selectedFile.value.name)

//     // Reset
//     selectedFile.value = null
//     previewUrl.value = ''
//     isProfilePhotoModal.value = false
//   } catch (error) {
//     console.error('Failed to upload photo:', error)
//     alert('فشل رفع الصورة')
//   } finally {
//     isUploading.value = false
//   }
// }
</script>