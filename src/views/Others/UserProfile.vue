<template>
  <admin-layout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />

    <div
      class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6"
    >
      <h3 class="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
        الملف الشخصي
      </h3>

      <!-- Loading State -->
      <div v-if="authStore.isLoading" class="text-center py-8">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600 mx-auto"></div>
        <p class="mt-4 text-gray-600 dark:text-gray-400">جاري التحميل...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="authStore.error" class="text-center py-8">
        <p class="text-red-600 dark:text-red-400">{{ authStore.error }}</p>
        <button 
          @click="loadProfile" 
          class="mt-4 px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700"
        >
          إعادة المحاولة
        </button>
      </div>

      <!-- Profile Content -->
      <template v-else-if="authStore.user">
        <profile-card :user="authStore.user" />
        <personal-info-card :user="authStore.user" />
        <address-card :user="authStore.user" />
      </template>
    </div>
  </admin-layout>
</template>

<script setup lang="ts">
import AdminLayout from '../../components/layout/AdminLayout.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import ProfileCard from '../../components/profile/ProfileCard.vue'
import PersonalInfoCard from '../../components/profile/PersonalInfoCard.vue'
import AddressCard from '../../components/profile/AddressCard.vue'
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth.store'

const currentPageTitle = ref('الملف الشخصي')
const authStore = useAuthStore()

// تحميل بيانات المستخدم
const loadProfile = async () => {
  try {
    await authStore.refreshUser()
  } catch (error) {
    console.error('Failed to load profile:', error)
  }
}

onMounted(() => {
  // إذا لم يكن المستخدم محملاً، نحمله
  if (!authStore.user) {
    loadProfile()
  }
})
</script>