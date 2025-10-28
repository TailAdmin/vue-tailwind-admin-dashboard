<template>
  <div>
    <div class="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div class="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 class="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            معلومات إضافية
          </h4>

          <div class="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
            <!-- <div>
              <p class="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                الحالة
              </p>
              <p class="text-sm font-medium text-gray-800 dark:text-white/90">
                <span 
                  v-if="user.isActive"
                  class="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-300"
                >
                  نشط
                </span>
                <span 
                  v-else
                  class="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-800 dark:bg-red-900/30 dark:text-red-300"
                >
                  غير نشط
                </span>
              </p>
            </div> -->

            <div>
              <p class="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                الدور
              </p>
              <p class="text-sm font-medium text-gray-800 dark:text-white/90">{{ user.role }}</p>
            </div>

            <div>
              <p class="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                عدد الصلاحيات
              </p>
              <p class="text-sm font-medium text-gray-800 dark:text-white/90">
                {{ user.permissions.length }}
              </p>
            </div>

            <!-- <div>
              <p class="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                تاريخ الإنشاء
              </p>
              <p class="text-sm font-medium text-gray-800 dark:text-white/90">
                {{ formatDate(user.createdAt) }}
              </p>
            </div> -->
          </div>
        </div>

        <button
          @click="showPermissions = !showPermissions"
          class="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
        >
          {{ showPermissions ? 'إخفاء الصلاحيات' : 'عرض الصلاحيات' }}
        </button>
      </div>

      <!-- Permissions List -->
      <div v-if="showPermissions" class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h5 class="mb-4 text-sm font-semibold text-gray-800 dark:text-white/90">
          الصلاحيات ({{ user.permissions.length }})
        </h5>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="permission in user.permissions"
            :key="permission"
            class="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300"
          >
            {{ permission }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { UserInfo } from '@/types/identity.types'

defineProps<{
  user: UserInfo
}>()

const showPermissions = ref(false)

// const formatDate = (date: string | Date) => {
//   return new Date(date).toLocaleDateString('ar-SA', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric'
//   })
// }
</script>