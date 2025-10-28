<template>
  <admin-layout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />

    <!-- Tabs Navigation -->
    <div class="mb-6 overflow-x-auto">
      <div class="inline-flex rounded-2xl border border-gray-200 bg-white p-1 dark:border-gray-800 dark:bg-white/[0.03]">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          @click="activeTab = tab.key"
          :class="[
            'flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium transition-all',
            activeTab === tab.key
              ? 'bg-brand-600 text-white shadow-sm'
              : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-white/[0.03]'
          ]"
        >
          <component :is="tab.icon" class="h-5 w-5" />
          {{ tab.label }}
        </button>
      </div>
    </div>

    <!-- Content -->
    <div class="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <!-- Header -->
      <div class="border-b border-gray-200 p-5 dark:border-gray-800 lg:p-6">
        <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">
              {{ getCurrentTabLabel }}
            </h3>
            <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
              إدارة {{ getCurrentTabLabel }} في النظام
            </p>
          </div>

          <button
            @click="openCreateModal"
            class="flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-700"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            إضافة جديد
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="lookupDataStore.isLoading" class="p-8 text-center">
        <div class="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-brand-600"></div>
        <p class="mt-4 text-gray-600 dark:text-gray-400">جاري التحميل...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="lookupDataStore.hasError" class="p-8 text-center">
        <p class="text-red-600 dark:text-red-400">حدث خطأ أثناء تحميل البيانات</p>
        <button
          @click="loadCurrentTabData"
          class="mt-4 rounded-lg bg-brand-600 px-4 py-2 text-white hover:bg-brand-700"
        >
          إعادة المحاولة
        </button>
      </div>

      <!-- Offer Types -->
      <div v-else-if="activeTab === 'offerTypes'" class="overflow-x-auto">
        <table class="w-full">
          <thead class="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/50">
            <tr>
              <th class="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-400">
                #
              </th>
              <th class="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-400">
                الاسم
              </th>
              <th class="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-400">
                الإجراءات
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
            <tr
              v-for="(item, index) in lookupDataStore.offerTypes"
              :key="item.id"
              class="hover:bg-gray-50 dark:hover:bg-white/[0.02]"
            >
              <td class="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                {{ index + 1 }}
              </td>
              <td class="px-6 py-4">
                <p class="font-medium text-gray-800 dark:text-white/90">
                  {{ item.name }}
                </p>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-2">
                  <button
                    @click="openEditModal(item, 'offerTypes')"
                    class="rounded-lg p-2 text-gray-600 hover:bg-gray-100 hover:text-brand-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-brand-400"
                    title="تعديل"
                  >
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    @click="deleteItem(item.id, 'offerTypes')"
                    class="rounded-lg p-2 text-gray-600 hover:bg-red-50 hover:text-red-600 dark:text-gray-400 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                    title="حذف"
                  >
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Empty State -->
        <div v-if="lookupDataStore.offerTypes.length === 0" class="p-12 text-center">
          <svg class="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <h3 class="mt-4 text-lg font-medium text-gray-800 dark:text-white/90">
            لا توجد بيانات
          </h3>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            قم بإضافة أول عنصر الآن
          </p>
        </div>
      </div>

      <!-- Unit Types -->
      <div v-else-if="activeTab === 'unitTypes'" class="overflow-x-auto">
        <table class="w-full">
          <thead class="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/50">
            <tr>
              <th class="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-400">
                #
              </th>
              <th class="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-400">
                الاسم
              </th>
              <th class="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-400">
                الإجراءات
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
            <tr
              v-for="(item, index) in lookupDataStore.unitTypes"
              :key="item.id"
              class="hover:bg-gray-50 dark:hover:bg-white/[0.02]"
            >
              <td class="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                {{ index + 1 }}
              </td>
              <td class="px-6 py-4">
                <p class="font-medium text-gray-800 dark:text-white/90">
                  {{ item.name }}
                </p>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-2">
                  <button
                    @click="openEditModal(item, 'unitTypes')"
                    class="rounded-lg p-2 text-gray-600 hover:bg-gray-100 hover:text-brand-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-brand-400"
                    title="تعديل"
                  >
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    @click="deleteItem(item.id, 'unitTypes')"
                    class="rounded-lg p-2 text-gray-600 hover:bg-red-50 hover:text-red-600 dark:text-gray-400 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                    title="حذف"
                  >
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Empty State -->
        <div v-if="lookupDataStore.unitTypes.length === 0" class="p-12 text-center">
          <svg class="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <h3 class="mt-4 text-lg font-medium text-gray-800 dark:text-white/90">
            لا توجد بيانات
          </h3>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            قم بإضافة أول عنصر الآن
          </p>
        </div>
      </div>

      <!-- Time Units -->
      <div v-else-if="activeTab === 'timeUnits'" class="overflow-x-auto">
        <table class="w-full">
          <thead class="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/50">
            <tr>
              <th class="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-400">
                #
              </th>
              <th class="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-400">
                الاسم
              </th>
              <th class="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-400">
                الإجراءات
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
            <tr
              v-for="(item, index) in lookupDataStore.timeUnits"
              :key="item.id"
              class="hover:bg-gray-50 dark:hover:bg-white/[0.02]"
            >
              <td class="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                {{ index + 1 }}
              </td>
              <td class="px-6 py-4">
                <p class="font-medium text-gray-800 dark:text-white/90">
                  {{ item.name }}
                </p>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-2">
                  <button
                    @click="openEditModal(item, 'timeUnits')"
                    class="rounded-lg p-2 text-gray-600 hover:bg-gray-100 hover:text-brand-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-brand-400"
                    title="تعديل"
                  >
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    @click="deleteItem(item.id, 'timeUnits')"
                    class="rounded-lg p-2 text-gray-600 hover:bg-red-50 hover:text-red-600 dark:text-gray-400 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                    title="حذف"
                  >
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Empty State -->
        <div v-if="lookupDataStore.timeUnits.length === 0" class="p-12 text-center">
          <svg class="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 class="mt-4 text-lg font-medium text-gray-800 dark:text-white/90">
            لا توجد بيانات
          </h3>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            قم بإضافة أول عنصر الآن
          </p>
        </div>
      </div>

      <!-- Offer Features -->
      <div v-else-if="activeTab === 'offerFeatures'" class="overflow-x-auto">
        <table class="w-full">
          <thead class="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/50">
            <tr>
              <th class="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-400">
                #
              </th>
              <th class="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-400">
                الاسم
              </th>
              <th class="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-400">
                الإجراءات
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
            <tr
              v-for="(item, index) in lookupDataStore.offerFeatures"
              :key="item.id"
              class="hover:bg-gray-50 dark:hover:bg-white/[0.02]"
            >
              <td class="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                {{ index + 1 }}
              </td>
              <td class="px-6 py-4">
                <p class="font-medium text-gray-800 dark:text-white/90">
                  {{ item.name }}
                </p>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-2">
                  <button
                    @click="openEditModal(item, 'offerFeatures')"
                    class="rounded-lg p-2 text-gray-600 hover:bg-gray-100 hover:text-brand-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-brand-400"
                    title="تعديل"
                  >
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    @click="deleteItem(item.id, 'offerFeatures')"
                    class="rounded-lg p-2 text-gray-600 hover:bg-red-50 hover:text-red-600 dark:text-gray-400 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                    title="حذف"
                  >
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Empty State -->
        <div v-if="lookupDataStore.offerFeatures.length === 0" class="p-12 text-center">
          <svg class="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
          <h3 class="mt-4 text-lg font-medium text-gray-800 dark:text-white/90">
            لا توجد بيانات
          </h3>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            قم بإضافة أول عنصر الآن
          </p>
        </div>
      </div>

      <!-- Floors -->
      <div v-else-if="activeTab === 'floors'" class="overflow-x-auto">
        <table class="w-full">
          <thead class="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/50">
            <tr>
              <th class="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-400">
                #
              </th>
              <th class="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-400">
                الاسم
              </th>
              <th class="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-400">
                الإجراءات
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
            <tr
              v-for="(item, index) in lookupDataStore.floors"
              :key="item.id"
              class="hover:bg-gray-50 dark:hover:bg-white/[0.02]"
            >
              <td class="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                {{ index + 1 }}
              </td>
              <td class="px-6 py-4">
                <p class="font-medium text-gray-800 dark:text-white/90">
                  {{ item.name }}
                </p>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-2">
                  <button
                    @click="openEditModal(item, 'floors')"
                    class="rounded-lg p-2 text-gray-600 hover:bg-gray-100 hover:text-brand-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-brand-400"
                    title="تعديل"
                  >
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    @click="deleteItem(item.id, 'floors')"
                    class="rounded-lg p-2 text-gray-600 hover:bg-red-50 hover:text-red-600 dark:text-gray-400 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                    title="حذف"
                  >
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Empty State -->
        <div v-if="lookupDataStore.floors.length === 0" class="p-12 text-center">
          <svg class="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <h3 class="mt-4 text-lg font-medium text-gray-800 dark:text-white/90">
            لا توجد بيانات
          </h3>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            قم بإضافة أول عنصر الآن
          </p>
        </div>
      </div>

      <!-- Property Types -->
      <div v-else-if="activeTab === 'propertyTypes'" class="overflow-x-auto">
        <table class="w-full">
          <thead class="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/50">
            <tr>
              <th class="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-400">
                #
              </th>
              <th class="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-400">
                الاسم
              </th>
              <th class="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-400">
                الإجراءات
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
            <tr
              v-for="(item, index) in lookupDataStore.propertyTypes"
              :key="item.id"
              class="hover:bg-gray-50 dark:hover:bg-white/[0.02]"
            >
              <td class="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                {{ index + 1 }}
              </td>
              <td class="px-6 py-4">
                <p class="font-medium text-gray-800 dark:text-white/90">
                  {{ item.name }}
                </p>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-2">
                  <button
                    @click="openEditModal(item, 'propertyTypes')"
                    class="rounded-lg p-2 text-gray-600 hover:bg-gray-100 hover:text-brand-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-brand-400"
                    title="تعديل"
                  >
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    @click="deleteItem(item.id, 'propertyTypes')"
                    class="rounded-lg p-2 text-gray-600 hover:bg-red-50 hover:text-red-600 dark:text-gray-400 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                    title="حذف"
                  >
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Empty State -->
        <div v-if="lookupDataStore.propertyTypes.length === 0" class="p-12 text-center">
          <svg class="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <h3 class="mt-4 text-lg font-medium text-gray-800 dark:text-white/90">
            لا توجد بيانات
          </h3>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            قم بإضافة أول عنصر الآن
          </p>
        </div>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <Modal v-if="showModal" @close="closeModal">
      <template #body>
        <div class="relative w-full max-w-md rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-8">
          <!-- Close Button -->
          <button
            @click="closeModal"
            class="absolute right-5 top-5 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
          >
            <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
              <path d="M6.04289 16.5418C5.65237 16.9323 5.65237 17.5655 6.04289 17.956C6.43342 18.3465 7.06658 18.3465 7.45711 17.956L11.9987 13.4144L16.5408 17.9565C16.9313 18.347 17.5645 18.347 17.955 17.9565C18.3455 17.566 18.3455 16.9328 17.955 16.5423L13.4129 12.0002L17.955 7.45808C18.3455 7.06756 18.3455 6.43439 17.955 6.04387C17.5645 5.65335 16.9313 5.65335 16.5408 6.04387L11.9987 10.586L7.45711 6.04439C7.06658 5.65386 6.43342 5.65386 6.04289 6.04439C5.65237 6.43491 5.65237 7.06808 6.04289 7.4586L10.5845 12.0002L6.04289 16.5418Z" />
            </svg>
          </button>

          <div class="pr-12">
            <!-- Header -->
            <div class="mb-6">
              <h4 class="text-2xl font-semibold text-gray-800 dark:text-white/90">
                {{ isEditMode ? 'تعديل' : 'إضافة' }} {{ getCurrentTabLabel }}
              </h4>
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {{ isEditMode ? 'قم بتعديل البيانات' : 'قم بإضافة عنصر جديد' }}
              </p>
            </div>

            <!-- Form -->
            <form @submit.prevent="saveItem" class="space-y-6">
              <div>
                <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  الاسم
                </label>
                <input
                  v-model="formData.name"
                  type="text"
                  required
                  placeholder="أدخل الاسم"
                  class="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-800 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                />
              </div>

              <!-- Actions -->
              <div class="flex gap-3 border-t border-gray-200 pt-6 dark:border-gray-800">
                <button
                  type="button"
                  @click="closeModal"
                  class="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  :disabled="isSaving"
                  class="flex-1 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {{ isSaving ? 'جاري الحفظ...' : 'حفظ' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </template>
    </Modal>
  </admin-layout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, h } from 'vue'
import { useLookupDataStore } from '@/stores/lookup-data.store'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import Modal from '@/components/profile/Modal.vue'

const currentPageTitle = ref('إدارة البيانات الثابتة')
const lookupDataStore = useLookupDataStore()

// Tabs
const activeTab = ref('offerTypes')

const tabs = [
  { 
    key: 'offerTypes', 
    label: 'أنواع العروض',
    icon: () => h('svg', { class: 'h-5 w-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z' })
    ])
  },
  { 
    key: 'unitTypes', 
    label: 'أنواع الوحدات',
    icon: () => h('svg', { class: 'h-5 w-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' })
    ])
  },
  { 
    key: 'timeUnits', 
    label: 'الوحدات الزمنية',
    icon: () => h('svg', { class: 'h-5 w-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' })
    ])
  },
  { 
    key: 'offerFeatures', 
    label: 'مميزات العروض',
    icon: () => h('svg', { class: 'h-5 w-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' })
    ])
  },
  { 
    key: 'floors', 
    label: 'الأدوار',
    icon: () => h('svg', { class: 'h-5 w-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' })
    ])
  },
  { 
    key: 'propertyTypes', 
    label: 'أنواع العقارات',
    icon: () => h('svg', { class: 'h-5 w-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' })
    ])
  }
]

// Modal
const showModal = ref(false)
const isEditMode = ref(false)
const isSaving = ref(false)
const formData = ref({
  id: '',
  name: ''
})

// Computed
const getCurrentTabLabel = computed(() => {
  return tabs.find(tab => tab.key === activeTab.value)?.label || ''
})

// Methods
const loadCurrentTabData = async () => {
  switch (activeTab.value) {
    case 'offerTypes':
      await lookupDataStore.loadOfferTypes()
      break
    case 'unitTypes':
      await lookupDataStore.loadUnitTypes()
      break
    case 'timeUnits':
      await lookupDataStore.loadTimeUnits()
      break
    case 'offerFeatures':
      await lookupDataStore.loadOfferFeatures()
      break
    case 'floors':
      await lookupDataStore.loadFloors()
      break
    case 'propertyTypes':
      await lookupDataStore.loadPropertyTypes()
      break
  }
}

const openCreateModal = () => {
  isEditMode.value = false
  formData.value = { id: '', name: '' }
  showModal.value = true
}

const openEditModal = (item: any, tabKey: string) => {
  isEditMode.value = true
  formData.value = { id: item.id, name: item.name }
  activeTab.value = tabKey
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  formData.value = { id: '', name: '' }
  isEditMode.value = false
}

const saveItem = async () => {
  isSaving.value = true

  try {
    if (isEditMode.value) {
      // Update
      switch (activeTab.value) {
        case 'offerTypes':
          await lookupDataStore.updateOfferType(formData.value.id, formData.value.name)
          break
        case 'unitTypes':
          await lookupDataStore.updateUnitType(formData.value.id, formData.value.name)
          break
        case 'timeUnits':
          await lookupDataStore.updateTimeUnit(formData.value.id, formData.value.name)
          break
        case 'offerFeatures':
          await lookupDataStore.updateOfferFeature(formData.value.id, formData.value.name)
          break
        case 'floors':
          await lookupDataStore.updateFloor(formData.value.id, formData.value.name)
          break
        case 'propertyTypes':
          await lookupDataStore.updatePropertyType(formData.value.id, formData.value.name)
          break
      }
      alert('تم التحديث بنجاح')
    } else {
      // Create
      switch (activeTab.value) {
        case 'offerTypes':
          await lookupDataStore.createOfferType(formData.value.name)
          break
        case 'unitTypes':
          await lookupDataStore.createUnitType(formData.value.name)
          break
        case 'timeUnits':
          await lookupDataStore.createTimeUnit(formData.value.name)
          break
        case 'offerFeatures':
          await lookupDataStore.createOfferFeature(formData.value.name)
          break
        case 'floors':
          await lookupDataStore.createFloor(formData.value.name)
          break
        case 'propertyTypes':
          await lookupDataStore.createPropertyType(formData.value.name)
          break
      }
      alert('تمت الإضافة بنجاح')
    }

    closeModal()
  } catch (error) {
    console.error('Failed to save:', error)
    alert('فشلت العملية')
  } finally {
    isSaving.value = false
  }
}

const deleteItem = async (id: string, tabKey: string) => {
  if (!confirm('هل أنت متأكد من الحذف؟')) {
    return
  }

  try {
    switch (tabKey) {
      case 'offerTypes':
        await lookupDataStore.deleteOfferType(id)
        break
      case 'unitTypes':
        await lookupDataStore.deleteUnitType(id)
        break
      case 'timeUnits':
        await lookupDataStore.deleteTimeUnit(id)
        break
      case 'offerFeatures':
        await lookupDataStore.deleteOfferFeature(id)
        break
      case 'floors':
        await lookupDataStore.deleteFloor(id)
        break
      case 'propertyTypes':
        await lookupDataStore.deletePropertyType(id)
        break
    }
    alert('تم الحذف بنجاح')
  } catch (error) {
    console.error('Failed to delete:', error)
    alert('فشل الحذف')
  }
}

// Lifecycle
onMounted(async () => {
  await lookupDataStore.loadAll()
})
</script>