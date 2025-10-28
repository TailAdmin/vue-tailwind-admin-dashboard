<template>
  <admin-layout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />

    <!-- Statistics Cards -->
    <div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="إجمالي المستخدمين"
        :value="statistics?.totalUsers || 0"
        icon="users"
        color="blue"
      />
      <StatCard
        title="المستخدمون النشطون"
        :value="statistics?.activeUsers || 0"
        icon="check-circle"
        color="green"
      />
      <StatCard
        title="المستخدمون غير النشطين"
        :value="statistics?.inactiveUsers || 0"
        icon="x-circle"
        color="red"
      />
      <StatCard
        title="مستخدمون جدد هذا الشهر"
        :value="statistics?.newUsersThisMonth || 0"
        icon="trending-up"
        color="purple"
      />
    </div>

    <!-- Main Content -->
    <div class="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <!-- Header -->
      <div class="flex flex-col gap-4 border-b border-gray-200 p-5 dark:border-gray-800 lg:flex-row lg:items-center lg:justify-between lg:p-6">
        <div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">
            مستخدمو التطبيق
          </h3>
          <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
            إدارة ومراقبة مستخدمي التطبيق
          </p>
        </div>

        <!-- Search and Filters -->
        <div class="flex flex-col gap-3 sm:flex-row">
          <!-- Search -->
          <div class="relative">
            <input
              v-model="localSearchTerm"
              @input="onSearchInput"
              type="text"
              placeholder="البحث عن مستخدم..."
              class="h-11 w-full rounded-lg border border-gray-300 bg-white pl-11 pr-4 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 sm:w-64"
            />
            <svg
              class="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <!-- Status Filter -->
          <select
            v-model="localStatusFilter"
            @change="onStatusFilterChange"
            class="h-11 rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-800 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
          >
            <option :value="undefined">جميع الحالات</option>
            <option :value="true">نشط</option>
            <option :value="false">غير نشط</option>
          </select>

          <!-- Reset Button -->
          <button
            v-if="localSearchTerm || localStatusFilter !== undefined"
            @click="resetFilters"
            class="h-11 rounded-lg border border-gray-300 bg-white px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]"
          >
            إعادة تعيين
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="userProfilesStore.isLoading" class="p-8 text-center">
        <div class="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-brand-600"></div>
        <p class="mt-4 text-gray-600 dark:text-gray-400">جاري التحميل...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="userProfilesStore.error" class="p-8 text-center">
        <p class="text-red-600 dark:text-red-400">{{ userProfilesStore.error }}</p>
        <button
          @click="loadData"
          class="mt-4 rounded-lg bg-brand-600 px-4 py-2 text-white hover:bg-brand-700"
        >
          إعادة المحاولة
        </button>
      </div>

      <!-- Table -->
      <div v-else-if="userProfilesStore.hasUsers" class="overflow-x-auto">
        <table class="w-full">
          <thead class="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/50">
            <tr>
              <th class="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-400">
                المستخدم
              </th>
              <th class="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-400">
                البريد الإلكتروني
              </th>
              <th class="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-400">
                الهاتف
              </th>
              <th class="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-400">
                الحالة
              </th>
              <th class="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-400">
                التحقق
              </th>
              <th class="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-400">
                تاريخ التسجيل
              </th>
              <th class="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-400">
                الإجراءات
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
            <tr
              v-for="user in userProfilesStore.users"
              :key="user.id"
              class="hover:bg-gray-50 dark:hover:bg-white/[0.02]"
            >
              <!-- User Info -->
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <img
                    :src="(SERVICE.baseUrl + '/' + user.profile?.profilePicturePath) || '/images/user/user-01.png'"
                    :alt="getFullName(user)"
                    class="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <p class="font-medium text-gray-800 dark:text-white/90">
                      {{ getFullName(user) }}
                    </p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                      {{ user.userName }}
                    </p>
                  </div>
                </div>
              </td>

              <!-- Email -->
              <td class="px-6 py-4">
                <div class="flex items-center gap-2">
                  <p class="text-sm text-gray-800 dark:text-white/90">
                    {{ user.email || 'غير محدد' }}
                  </p>
                  <svg
                    v-if="user.emailConfirmed"
                    class="h-4 w-4 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </td>

              <!-- Phone -->
              <td class="px-6 py-4">
                <div class="flex items-center gap-2">
                  <p class="text-sm text-gray-800 dark:text-white/90">
                    {{ user.phoneNumber || 'غير محدد' }}
                  </p>
                  <svg
                    v-if="user.phoneNumberConfirmed"
                    class="h-4 w-4 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </td>

              <!-- Status -->
              <td class="px-6 py-4">
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
              </td>

              <!-- Verification -->
              <td class="px-6 py-4">
                <div class="flex gap-1">
                  <span
                    v-if="user.emailConfirmed"
                    class="rounded bg-green-100 px-2 py-1 text-xs text-green-800 dark:bg-green-900/30 dark:text-green-300"
                    title="البريد مؤكد"
                  >
                    📧
                  </span>
                  <span
                    v-if="user.phoneNumberConfirmed"
                    class="rounded bg-green-100 px-2 py-1 text-xs text-green-800 dark:bg-green-900/30 dark:text-green-300"
                    title="الهاتف مؤكد"
                  >
                    📱
                  </span>
                  <span
                    v-if="!user.emailConfirmed && !user.phoneNumberConfirmed"
                    class="rounded bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                  >
                    لم يتم التحقق
                  </span>
                </div>
              </td>

              <!-- Created Date -->
              <td class="px-6 py-4">
                <p class="text-sm text-gray-800 dark:text-white/90">
                  {{ formatDate(user.createdAt) }}
                </p>
              </td>

              <!-- Actions -->
              <td class="px-6 py-4">
                <div class="flex items-center gap-2">
                  <!-- View Details -->
                  <button
                    @click="viewUserDetails(user.id)"
                    class="rounded-lg p-2 text-gray-600 hover:bg-gray-100 hover:text-brand-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-brand-400"
                    title="عرض التفاصيل"
                  >
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </button>

                  <!-- Toggle Status -->
                  <button
                    @click="toggleStatus(user.id, user.isActive)"
                    class="rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                    :class="user.isActive ? 'hover:text-red-600' : 'hover:text-green-600'"
                    :title="user.isActive ? 'تعطيل المستخدم' : 'تفعيل المستخدم'"
                  >
                    <svg v-if="user.isActive" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                      />
                    </svg>
                    <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>

                  <!-- More Actions Dropdown -->
                  <div class="relative">
                    <button
                      @click="toggleActionsMenu(user.id)"
                      class="rounded-lg p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                      title="المزيد"
                    >
                      <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>

                    <!-- Dropdown Menu -->
                    <div
                      v-if="activeActionsMenu === user.id"
                      v-click-outside="closeActionsMenu"
                      class="absolute left-0 z-50 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
                    >
                      <button
                        v-if="!user.emailConfirmed"
                        @click="confirmEmail(user.id)"
                        class="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                      >
                        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        تأكيد البريد
                      </button>

                      <button
                        v-if="!user.phoneNumberConfirmed"
                        @click="confirmPhone(user.id)"
                        class="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                      >
                        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        تأكيد الهاتف
                      </button>

                      <hr class="my-1 border-gray-200 dark:border-gray-700" />

                      <button
                        @click="deleteUser(user.id)"
                        class="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                      >
                        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        حذف المستخدم
                      </button>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-else class="p-12 text-center">
        <svg
          class="mx-auto h-16 w-16 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <h3 class="mt-4 text-lg font-medium text-gray-800 dark:text-white/90">
          لا توجد مستخدمين
        </h3>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {{ localSearchTerm || localStatusFilter !== undefined
            ? 'لم يتم العثور على نتائج مطابقة للبحث'
            : 'لا يوجد مستخدمين في النظام حالياً'
          }}
        </p>
      </div>

      <!-- Pagination -->
      <div
        v-if="userProfilesStore.hasUsers && userProfilesStore.totalPages > 1"
        class="flex items-center justify-between border-t border-gray-200 px-6 py-4 dark:border-gray-800"
      >
        <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <span>عرض</span>
          <select
            :value="userProfilesStore.pageSize"
            @change="changePageSize($event)"
            class="rounded-lg border border-gray-300 bg-white px-3 py-1 text-sm focus:border-brand-300 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900"
          >
            <option :value="10">10</option>
            <option :value="20">20</option>
            <option :value="50">50</option>
            <option :value="100">100</option>
          </select>
          <span>من {{ userProfilesStore.totalCount }} مستخدم</span>
        </div>

        <div class="flex items-center gap-2">
          <button
            @click="userProfilesStore.changePage(userProfilesStore.currentPage - 1)"
            :disabled="userProfilesStore.currentPage === 1"
            class="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            السابق
          </button>

          <div class="flex items-center gap-1">
            <button
              v-for="page in visiblePages"
              :key="page"
              @click="userProfilesStore.changePage(page)"
              :class="[
                'rounded-lg px-3 py-2 text-sm font-medium',
                page === userProfilesStore.currentPage
                  ? 'bg-brand-600 text-white'
                  : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              ]"
            >
              {{ page }}
            </button>
          </div>

          <button
            @click="userProfilesStore.changePage(userProfilesStore.currentPage + 1)"
            :disabled="userProfilesStore.currentPage === userProfilesStore.totalPages"
            class="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            التالي
          </button>
        </div>
      </div>
    </div>

    <!-- User Details Modal -->
    <UserDetailsModal
      v-if="showDetailsModal"
      :user-id="selectedUserId"
      @close="showDetailsModal = false"
    />
  </admin-layout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
//import { useRouter } from 'vue-router'
import { useUserProfilesStore } from '@/stores/user-profiles.store'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import StatCard from '@/components/common/StatCard.vue'
import UserDetailsModal from '@/components/user-profiles/UserDetailsModal.vue'
import type { AppUser } from '@/types/user-profile.types'
import { SERVICES } from '@/config/api.config'

const SERVICE = SERVICES.userProfiles

interface ClickOutsideElement extends HTMLElement {
  clickOutsideEvent: (event: MouseEvent) => void
}

const currentPageTitle = ref('مستخدمو التطبيق')
const userProfilesStore = useUserProfilesStore()
//const router = useRouter()

// Local state
const localSearchTerm = ref('')
const localStatusFilter = ref<boolean | undefined>(undefined)
const activeActionsMenu = ref<string | null>(null)
const showDetailsModal = ref(false)
const selectedUserId = ref<string>('')
const searchDebounceTimer = ref<ReturnType<typeof setTimeout> | null>(null)

// Statistics
const statistics = computed(() => userProfilesStore.statistics)

// Pagination
const visiblePages = computed(() => {
  const current = userProfilesStore.currentPage
  const total = userProfilesStore.totalPages
  const pages: number[] = []

  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    if (current <= 4) {
      pages.push(1, 2, 3, 4, 5)
      pages.push(-1) // Ellipsis
      pages.push(total)
    } else if (current >= total - 3) {
      pages.push(1)
      pages.push(-1)
      for (let i = total - 4; i <= total; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)
      pages.push(-1)
      pages.push(current - 1, current, current + 1)
      pages.push(-1)
      pages.push(total)
    }
  }

  return pages
})

// Methods
const loadData = async () => {
  await Promise.all([
    userProfilesStore.loadUsers(),
    userProfilesStore.loadStatistics()
  ])
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
    month: 'short',
    day: 'numeric'
  })
}

const onSearchInput = () => {
  if (searchDebounceTimer.value) {
    clearTimeout(searchDebounceTimer.value)
  }

  searchDebounceTimer.value = setTimeout(() => {
    userProfilesStore.search(localSearchTerm.value)
  }, 500)
}

const onStatusFilterChange = () => {
  userProfilesStore.filterByStatus(localStatusFilter.value)
}

const resetFilters = () => {
  localSearchTerm.value = ''
  localStatusFilter.value = undefined
  userProfilesStore.resetFilters()
}

const changePageSize = (event: Event) => {
  const target = event.target as HTMLSelectElement
  userProfilesStore.changePageSize(Number(target.value))
}

const toggleActionsMenu = (userId: string) => {
  activeActionsMenu.value = activeActionsMenu.value === userId ? null : userId
}

const closeActionsMenu = () => {
  activeActionsMenu.value = null
}

const viewUserDetails = (userId: string) => {
  selectedUserId.value = userId
  showDetailsModal.value = true
}

const toggleStatus = async (userId: string, isActive: boolean) => {
  const action = isActive ? 'تعطيل' : 'تفعيل'
  
  if (!confirm(`هل أنت متأكد من ${action} هذا المستخدم؟`)) {
    return
  }

  try {
    await userProfilesStore.toggleUserStatus(userId)
    alert(`تم ${action} المستخدم بنجاح`)
  } catch (error) {
    console.error('Failed to toggle status:', error)
    alert(`فشل ${action} المستخدم`)
  }
}

const confirmEmail = async (userId: string) => {
  if (!confirm('هل تريد تأكيد البريد الإلكتروني يدوياً؟')) {
    return
  }

  try {
    await userProfilesStore.confirmEmail(userId)
    alert('تم تأكيد البريد الإلكتروني بنجاح')
    closeActionsMenu()
  } catch (error) {
    console.error('Failed to confirm email:', error)
    alert('فشل تأكيد البريد الإلكتروني')
  }
}

const confirmPhone = async (userId: string) => {
  if (!confirm('هل تريد تأكيد رقم الهاتف يدوياً؟')) {
    return
  }

  try {
    await userProfilesStore.confirmPhone(userId)
    alert('تم تأكيد رقم الهاتف بنجاح')
    closeActionsMenu()
  } catch (error) {
    console.error('Failed to confirm phone:', error)
    alert('فشل تأكيد رقم الهاتف')
  }
}

const deleteUser = async (userId: string) => {
  if (!confirm('هل أنت متأكد من حذف هذا المستخدم نهائياً؟ لا يمكن التراجع عن هذا الإجراء!')) {
    return
  }

  try {
    await userProfilesStore.deleteUser(userId)
    alert('تم حذف المستخدم بنجاح')
    closeActionsMenu()
  } catch (error) {
    console.error('Failed to delete user:', error)
    alert('فشل حذف المستخدم')
  }
}

// Click outside directive
const vClickOutside = {
  mounted(el: HTMLElement, binding: { value: () => void }) {
    const ell = el as ClickOutsideElement
    ell.clickOutsideEvent = (event: Event) => {
      if (!(ell === event.target || ell.contains(event.target as Node))) {
        binding.value()
      }
    }
    document.addEventListener('click', ell.clickOutsideEvent)
  },
  unmounted(el: HTMLElement) {
    const ell = el as ClickOutsideElement
    document.removeEventListener('click', ell.clickOutsideEvent)
  }
}

// Lifecycle
onMounted(() => {
  loadData()
})
</script>

<style scoped>
/* Custom scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background: #475569;
}

.dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #64748b;
}
</style>