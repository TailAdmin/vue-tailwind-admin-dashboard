<template>
  <div class="relative" ref="dropdownRef">
    <button
      class="flex items-center text-gray-700 dark:text-gray-400"
      @click.prevent="toggleDropdown"
    >
      <span class="mr-3 overflow-hidden rounded-full h-11 w-11">
        <img 
          src= 'https://icon-library.com/images/user-png-icon/user-png-icon-16.jpg'
          :alt="userFullName"
          class="h-full w-full object-cover"
          @error="handleImageError"
        />
      </span>

      <span class="block mr-1 font-medium text-theme-sm">
        {{ userDisplayName }}
      </span>

      <ChevronDownIcon :class="{ 'rotate-180': dropdownOpen }" />
    </button>

    <!-- Dropdown Start -->
    <div
      v-if="dropdownOpen"
      class="absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
    >
      <div>
        <span class="block font-medium text-gray-700 text-theme-sm dark:text-gray-400">
          {{ userFullName }}
        </span>
        <span class="mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400">
          {{ userEmail }}
        </span>
      </div>

      <ul class="flex flex-col gap-1 pt-4 pb-3 border-b border-gray-200 dark:border-gray-800">
        <li v-for="item in menuItems" :key="item.href">
          <router-link
            :to="item.href"
            class="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            @click="closeDropdown"
          >
            <component
              :is="item.icon"
              class="text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300"
            />
            {{ item.text }}
          </router-link>
        </li>
      </ul>

      <button
        @click="handleSignOut"
        class="flex items-center gap-3 px-3 py-2 mt-3 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
      >
        <LogoutIcon
          class="text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300"
        />
        تسجيل الخروج
      </button>
    </div>
    <!-- Dropdown End -->
  </div>
</template>

<script setup lang="ts">
import { UserCircleIcon, ChevronDownIcon, LogoutIcon, SettingsIcon, InfoCircleIcon } from '@/icons'
import { RouterLink, useRouter } from 'vue-router'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '@/stores/auth.store'

const router = useRouter()
const authStore = useAuthStore()

const dropdownOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)
const imageError = ref(false)

// ========================================
// Computed Properties
// ========================================

/**
 * الاسم الكامل للمستخدم
 */
const userFullName = computed(() => {
  const user = authStore.user
  if (!user) return 'مستخدم'
  
  return user.fullName || user.email || 'مستخدم'
})

/**
 * الاسم المختصر للعرض
 */
const userDisplayName = computed(() => {
  const fullName = userFullName.value
  
  // إذا كان الاسم طويل، اختصره
  if (fullName.length > 20) {
    return fullName.substring(0, 17) + '...'
  }
  
  return fullName
})

/**
 * البريد الإلكتروني
 */
const userEmail = computed(() => {
  return authStore.user?.email || 'لا يوجد بريد'
})

/**
 * صورة المستخدم
 */
const userAvatar = computed(() => {
  if (imageError.value) {
    return '/images/user/user-01.png' // صورة افتراضية
  }
  
  return '/images/user/user-01.png'
})

// ========================================
// Menu Items
// ========================================

const menuItems = [
  { href: '/profile', icon: UserCircleIcon, text: 'تعديل الملف الشخصي' },
  { href: '/settings', icon: SettingsIcon, text: 'إعدادات الحساب' },
  { href: '/support', icon: InfoCircleIcon, text: 'الدعم' },
]

// ========================================
// Methods
// ========================================

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const closeDropdown = () => {
  dropdownOpen.value = false
}

const handleImageError = () => {
  imageError.value = true
}

const handleSignOut = async () => {
  closeDropdown()
  
  try {
    await authStore.logout()
    router.push('/signin')
  } catch (error) {
    console.error('Sign out error:', error)
    // يمكن إضافة toast notification هنا
  }
}

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    closeDropdown()
  }
}

// ========================================
// Lifecycle
// ========================================

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  
  // تحميل بيانات المستخدم إذا لم تكن موجودة
  // if (!authStore.user) {
  //   authStore.user
  // }
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* يمكن إضافة أي styles مخصصة هنا */
</style>