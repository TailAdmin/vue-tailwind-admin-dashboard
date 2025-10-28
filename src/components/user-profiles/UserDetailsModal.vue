<template>
  <Modal @close="$emit('close')">
    <template #body>
      <div
        class="relative w-full max-w-4xl rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-8"
      >
        <!-- Close Button -->
        <button
          @click="$emit('close')"
          class="absolute right-5 top-5 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
        >
          <svg
            class="h-6 w-6 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M6.04289 16.5418C5.65237 16.9323 5.65237 17.5655 6.04289 17.956C6.43342 18.3465 7.06658 18.3465 7.45711 17.956L11.9987 13.4144L16.5408 17.9565C16.9313 18.347 17.5645 18.347 17.955 17.9565C18.3455 17.566 18.3455 16.9328 17.955 16.5423L13.4129 12.0002L17.955 7.45808C18.3455 7.06756 18.3455 6.43439 17.955 6.04387C17.5645 5.65335 16.9313 5.65335 16.5408 6.04387L11.9987 10.586L7.45711 6.04439C7.06658 5.65386 6.43342 5.65386 6.04289 6.04439C5.65237 6.43491 5.65237 7.06808 6.04289 7.4586L10.5845 12.0002L6.04289 16.5418Z"
            />
          </svg>
        </button>

        <!-- Loading -->
        <div v-if="isLoading" class="py-12 text-center">
          <div class="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-brand-600"></div>
          <p class="mt-4 text-gray-600 dark:text-gray-400">جاري التحميل...</p>
        </div>

        <!-- Error -->
        <div v-else-if="error" class="py-12 text-center">
          <p class="text-red-600 dark:text-red-400">{{ error }}</p>
          <button
            @click="loadUser"
            class="mt-4 rounded-lg bg-brand-600 px-4 py-2 text-white hover:bg-brand-700"
          >
            إعادة المحاولة
          </button>
        </div>

        <!-- Content -->
        <div v-else-if="user" class="pr-12">
          <!-- Header -->
          <div class="mb-6">
            <h4 class="text-2xl font-semibold text-gray-800 dark:text-white/90">
              تفاصيل المستخدم
            </h4>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
              معلومات تفصيلية عن المستخدم
            </p>
          </div>

          <!-- User Profile Card -->
          <div class="mb-6 flex items-center gap-6 rounded-xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900/50">
            <img
              :src="(SERVICE.baseUrl + '/' + user.profile?.profilePicturePath) || '/images/user/user-01.png'"
              :alt="getFullName(user)"
              class="h-24 w-24 rounded-full object-cover"
            />
            <div class="flex-1">
              <h5 class="text-xl font-bold text-gray-800 dark:text-white/90">
                {{ getFullName(user) }}
              </h5>
              <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {{ user.email }}
              </p>
              <div class="mt-3 flex flex-wrap gap-2">
                <span
                  :class="[
                    'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium',
                    user.isActive
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                  ]"
                >
                  {{ user.isActive ? 'نشط' : 'غير نشط' }}
                </span>
                <span
                  v-if="user.emailConfirmed"
                  class="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                >
                  البريد مؤكد
                </span>
                <span
                  v-if="user.phoneNumberConfirmed"
                  class="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                >
                  الهاتف مؤكد
                </span>
              </div>
            </div>
          </div>

          <!-- Details Grid -->
          <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <!-- Basic Information -->
            <div class="rounded-xl border border-gray-200 p-5 dark:border-gray-800">
              <h6 class="mb-4 font-semibold text-gray-800 dark:text-white/90">
                المعلومات الأساسية
              </h6>
              <div class="space-y-3">
                <div>
                  <p class="text-xs text-gray-500 dark:text-gray-400">اسم المستخدم</p>
                  <p class="mt-1 text-sm font-medium text-gray-800 dark:text-white/90">
                    {{ user.userName || 'غير محدد' }}
                  </p>
                </div>
                <div>
                  <p class="text-xs text-gray-500 dark:text-gray-400">البريد الإلكتروني</p>
                  <p class="mt-1 text-sm font-medium text-gray-800 dark:text-white/90">
                    {{ user.email || 'غير محدد' }}
                  </p>
                </div>
                <div>
                  <p class="text-xs text-gray-500 dark:text-gray-400">رقم الهاتف</p>
                  <p class="mt-1 text-sm font-medium text-gray-800 dark:text-white/90">
                    {{ user.phoneNumber || 'غير محدد' }}
                  </p>
                </div>
                <div>
                  <p class="text-xs text-gray-500 dark:text-gray-400">الرقم الوطني</p>
                  <p class="mt-1 text-sm font-medium text-gray-800 dark:text-white/90">
                    {{ user.nationalId || 'غير محدد' }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Profile Information -->
            <div class="rounded-xl border border-gray-200 p-5 dark:border-gray-800">
              <h6 class="mb-4 font-semibold text-gray-800 dark:text-white/90">
                معلومات الملف الشخصي
              </h6>
              <div class="space-y-3">
                <div>
                  <p class="text-xs text-gray-500 dark:text-gray-400">الاسم الأول</p>
                  <p class="mt-1 text-sm font-medium text-gray-800 dark:text-white/90">
                    {{ user.profile?.firstName || 'غير محدد' }}
                  </p>
                </div>
                <div>
                  <p class="text-xs text-gray-500 dark:text-gray-400">الاسم الأخير</p>
                  <p class="mt-1 text-sm font-medium text-gray-800 dark:text-white/90">
                    {{ user.profile?.lastName || 'غير محدد' }}
                  </p>
                </div>
                <div>
                  <p class="text-xs text-gray-500 dark:text-gray-400">المدينة</p>
                  <p class="mt-1 text-sm font-medium text-gray-800 dark:text-white/90">
                    {{ user.profile?.city || 'غير محدد' }}
                  </p>
                </div>
                <div>
                  <p class="text-xs text-gray-500 dark:text-gray-400">الدولة</p>
                  <p class="mt-1 text-sm font-medium text-gray-800 dark:text-white/90">
                    {{ user.profile?.country || 'غير محدد' }}
                  </p>
                </div>
                <div v-if="user.profile?.dateOfBirth">
                  <p class="text-xs text-gray-500 dark:text-gray-400">تاريخ الميلاد</p>
                  <p class="mt-1 text-sm font-medium text-gray-800 dark:text-white/90">
                    {{ formatDate(user.profile.dateOfBirth) }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Account Status -->
            <div class="rounded-xl border border-gray-200 p-5 dark:border-gray-800">
              <h6 class="mb-4 font-semibold text-gray-800 dark:text-white/90">
                حالة الحساب
              </h6>
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <p class="text-sm text-gray-600 dark:text-gray-400">الحالة</p>
                  <span
                    :class="[
                      'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                      user.isActive
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                    ]"
                  >
                    {{ user.isActive ? 'نشط' : 'غير نشط' }}
                  </span>
                </div>
                <div class="flex items-center justify-between">
                  <p class="text-sm text-gray-600 dark:text-gray-400">البريد الإلكتروني</p>
                  <span
                    :class="[
                      'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                      user.emailConfirmed
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
                    ]"
                  >
                    {{ user.emailConfirmed ? 'مؤكد' : 'غير مؤكد' }}
                  </span>
                </div>
                <div class="flex items-center justify-between">
                  <p class="text-sm text-gray-600 dark:text-gray-400">رقم الهاتف</p>
                  <span
                    :class="[
                      'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                      user.phoneNumberConfirmed
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
                    ]"
                  >
                    {{ user.phoneNumberConfirmed ? 'مؤكد' : 'غير مؤكد' }}
                  </span>
                </div>
                <div class="flex items-center justify-between">
                  <p class="text-sm text-gray-600 dark:text-gray-400">القفل</p>
                  <span
                    :class="[
                      'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                      user.lockoutEnabled
                        ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
                    ]"
                  >
                    {{ user.lockoutEnabled ? 'مفعل' : 'غير مفعل' }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Dates -->
            <div class="rounded-xl border border-gray-200 p-5 dark:border-gray-800">
              <h6 class="mb-4 font-semibold text-gray-800 dark:text-white/90">
                التواريخ
              </h6>
              <div class="space-y-3">
                <div>
                  <p class="text-xs text-gray-500 dark:text-gray-400">تاريخ التسجيل</p>
                  <p class="mt-1 text-sm font-medium text-gray-800 dark:text-white/90">
                    {{ formatDateTime(user.createdAt) }}
                  </p>
                </div>
                <div v-if="user.lockoutEnd">
                  <p class="text-xs text-gray-500 dark:text-gray-400">تاريخ انتهاء القفل</p>
                  <p class="mt-1 text-sm font-medium text-gray-800 dark:text-white/90">
                    {{ formatDateTime(user.lockoutEnd) }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="mt-6 flex justify-end gap-3">
            <button
              @click="$emit('close')"
              class="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              إغلاق
            </button>
          </div>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserProfilesStore } from '@/stores/user-profiles.store'
import Modal from '@/components/profile/Modal.vue'
import type { AppUser } from '@/types/user-profile.types'
import { SERVICES } from '@/config/api.config'

interface Props {
  userId: string
}
const SERVICE = SERVICES.userProfiles
const props = defineProps<Props>()
defineEmits<{
  close: []
}>()

const userProfilesStore = useUserProfilesStore()
const user = ref<AppUser | null>(null)
const isLoading = ref(false)
const error = ref<string | null>(null)

const loadUser = async () => {
  isLoading.value = true
  error.value = null

  try {
    await userProfilesStore.loadUserById(props.userId)
    user.value = userProfilesStore.currentUser
  } catch (err) {
    console.error('Failed to load user:', err)
    error.value = 'فشل تحميل بيانات المستخدم'
  } finally {
    isLoading.value = false
  }
}

const getFullName = (user: AppUser): string => {
  if (user.profile?.firstName && user.profile?.lastName) {
    return `${user.profile.firstName} ${user.profile.lastName}`
  }
  return user.userName || user.email || 'مستخدم'
}

const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const formatDateTime = (date: string): string => {
  return new Date(date).toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(() => {
  loadUser()
})
</script>