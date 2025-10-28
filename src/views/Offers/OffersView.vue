<template>
  <admin-layout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />

    <!-- Statistics Cards -->
    <div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="إجمالي العروض"
        :value="statistics?.totalOffers || 0"
        icon="chart"
        color="blue"
      />
      <StatCard
        title="العروض النشطة"
        :value="statistics?.activeOffers || 0"
        icon="check-circle"
        color="green"
      />
      <StatCard
        title="العروض غير النشطة"
        :value="statistics?.inactiveOffers || 0"
        icon="x-circle"
        color="red"
      />
      <StatCard
        title="متوسط السعر"
        :value="Math.round(statistics?.averagePrice || 0)"
        icon="trending-up"
        color="purple"
      />
    </div>

    <!-- Main Content -->
    <div class="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <!-- Header -->
      <div class="border-b border-gray-200 p-5 dark:border-gray-800 lg:p-6">
        <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">
              إدارة العروض
            </h3>
            <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
              إدارة ومراقبة جميع العروض في المنصة
            </p>
          </div>
          <!-- في OffersView.vue - في القسم Header -->
          <div class="flex flex-wrap gap-3">
            <!-- زر جديد -->
            <router-link
              to="/offers/create"
              class="flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-700"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              إنشاء عرض جديد
            </router-link>

            <button
              @click="showFiltersModal = true"
              class="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]"
            >
              <!-- ... rest of filters button -->
            </button>
            
            <!-- ... rest of buttons -->
          </div>
          <!-- Quick Actions -->
          <div class="flex flex-wrap gap-3">
            <button
              @click="showFiltersModal = true"
              class="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              فلترة
            </button>

            <button
              v-if="offersStore.hasSelection"
              @click="showBulkActionsMenu = !showBulkActionsMenu"
              class="relative flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              إجراءات جماعية ({{ offersStore.selectedOfferIds.length }})
            </button>

            <router-link
              to="/lookup-data"
              class="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              إعدادات البيانات
            </router-link>
          </div>
        </div>

        <!-- Search and Filters Bar -->
        <div class="mt-4 flex flex-col gap-3 sm:flex-row">
          <!-- Search -->
          <div class="relative flex-1">
            <input
              v-model="localSearchTerm"
              @input="onSearchInput"
              type="text"
              placeholder="البحث في العروض..."
              class="h-11 w-full rounded-lg border border-gray-300 bg-white pl-11 pr-4 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
            />
            <svg
              class="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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

          <!-- Offer Type Filter -->
          <select
            v-model="localOfferTypeFilter"
            @change="onOfferTypeFilterChange"
            class="h-11 rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-800 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
          >
            <option :value="undefined">جميع الأنواع</option>
            <option
              v-for="offerType in lookupDataStore.offerTypes"
              :key="offerType.id"
              :value="offerType.id"
            >
              {{ offerType.name }}
            </option>
          </select>

          <!-- Reset Button -->
          <button
            v-if="hasActiveFilters"
            @click="resetFilters"
            class="h-11 rounded-lg border border-gray-300 bg-white px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]"
          >
            إعادة تعيين
          </button>
        </div>
      </div>

      <!-- Bulk Actions Dropdown -->
      <div
        v-if="showBulkActionsMenu"
        v-click-outside="closeBulkActionsMenu"
        class="absolute left-0 z-50 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
      >
        <button
          @click="handleBulkActivate"
          class="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          تفعيل الكل
        </button>

        <button
          @click="handleBulkDeactivate"
          class="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          تعطيل الكل
        </button>

        <hr class="my-1 border-gray-200 dark:border-gray-700" />

        <button
          @click="handleBulkDelete"
          class="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          حذف الكل
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="offersStore.isLoading" class="p-8 text-center">
        <div class="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-brand-600"></div>
        <p class="mt-4 text-gray-600 dark:text-gray-400">جاري التحميل...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="offersStore.error" class="p-8 text-center">
        <p class="text-red-600 dark:text-red-400">{{ offersStore.error }}</p>
        <button
          @click="loadData"
          class="mt-4 rounded-lg bg-brand-600 px-4 py-2 text-white hover:bg-brand-700"
        >
          إعادة المحاولة
        </button>
      </div>

      <!-- Table -->
      <div v-else-if="offersStore.hasOffers" class="overflow-x-auto">
        <table class="w-full">
          <thead class="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/50">
            <tr>
              <th class="px-6 py-4 text-right">
                <input
                  type="checkbox"
                  :checked="isAllSelected"
                  @change="toggleSelectAll"
                  class="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                />
              </th>
              <th class="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-400">
                العرض
              </th>
              <th class="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-400">
                النوع
              </th>
              <th class="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-400">
                السعر
              </th>
              <th class="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-400">
                المدة
              </th>
              <th class="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-400">
                الحالة
              </th>
              <th class="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-400">
                الإجراءات
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
            <tr
              v-for="offer in offersStore.offers"
              :key="offer.id"
              class="hover:bg-gray-50 dark:hover:bg-white/[0.02]"
            >
              <!-- Checkbox -->
              <td class="px-6 py-4">
                <input
                  type="checkbox"
                  :checked="offersStore.selectedOfferIds.includes(offer.id)"
                  @change="offersStore.toggleSelection(offer.id)"
                  class="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                />
              </td>

              <!-- Offer Info -->
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <img
                    v-if="offer.imageUrls && offer.imageUrls.length > 0"
                    :src="getImageUrl(offer.imageUrls[0])"
                    :alt="offer.title"
                    class="h-12 w-12 rounded-lg object-cover"
                  />
                  <div
                    v-else
                    class="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800"
                  >
                    <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p class="font-medium text-gray-800 dark:text-white/90">
                      {{ offer.title }}
                    </p>
                    <p class="mt-0.5 text-sm text-gray-600 dark:text-gray-400">
                      {{ truncateText(offer.description, 50) }}
                    </p>
                  </div>
                </div>
              </td>

              <!-- Offer Type -->
              <td class="px-6 py-4">
                <span class="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                  {{ offer.offerTypeName || 'غير محدد' }}
                </span>
              </td>

              <!-- Price -->
              <td class="px-6 py-4">
                <p class="text-sm font-medium text-gray-800 dark:text-white/90">
                  {{ formatPrice(offer.price) }} ريال
                </p>
              </td>

              <!-- Duration -->
              <td class="px-6 py-4">
                <p class="text-sm text-gray-800 dark:text-white/90">
                  {{ offer.duration }} {{ offer.timeUnitName || 'شهر' }}
                </p>
              </td>

              <!-- Status -->
              <td class="px-6 py-4">
                <span
                  :class="[
                    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                    offer.isActive
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                  ]"
                >
                  {{ offer.isActive ? 'نشط' : 'غير نشط' }}
                </span>
              </td>

              <!-- Actions -->
              <td class="px-6 py-4">
                <div class="flex items-center gap-2">
                  <!-- View Details -->
                  <button
                    @click="viewOfferDetails(offer.id)"
                    class="rounded-lg p-2 text-gray-600 hover:bg-gray-100 hover:text-brand-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-brand-400"
                    title="عرض التفاصيل"
                  >
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>

                  <!-- Toggle Status -->
                  <button
                    @click="toggleStatus(offer.id, offer.isActive)"
                    class="rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                    :class="offer.isActive ? 'hover:text-red-600' : 'hover:text-green-600'"
                    :title="offer.isActive ? 'تعطيل العرض' : 'تفعيل العرض'"
                  >
                    <svg v-if="offer.isActive" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                    </svg>
                    <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>

                  <!-- Delete -->
                  <button
                    @click="deleteOffer(offer.id)"
                    class="rounded-lg p-2 text-gray-600 hover:bg-red-50 hover:text-red-600 dark:text-gray-400 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                    title="حذف العرض"
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
      </div>

      <!-- Empty State -->
      <div v-else class="p-12 text-center">
        <svg class="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        <h3 class="mt-4 text-lg font-medium text-gray-800 dark:text-white/90">
          لا توجد عروض
        </h3>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {{ hasActiveFilters
            ? 'لم يتم العثور على نتائج مطابقة للبحث'
            : 'لا يوجد عروض في النظام حالياً'
          }}
        </p>
      </div>

      <!-- Pagination -->
      <div
        v-if="offersStore.hasOffers && offersStore.totalPages > 1"
        class="flex items-center justify-between border-t border-gray-200 px-6 py-4 dark:border-gray-800"
      >
        <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <span>عرض</span>
          <select
            :value="offersStore.pageSize"
            @change="changePageSize($event)"
            class="rounded-lg border border-gray-300 bg-white px-3 py-1 text-sm focus:border-brand-300 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900"
          >
            <option :value="10">10</option>
            <option :value="20">20</option>
            <option :value="50">50</option>
            <option :value="100">100</option>
          </select>
          <span>من {{ offersStore.totalCount }} عرض</span>
        </div>

        <div class="flex items-center gap-2">
          <button
            @click="offersStore.changePage(offersStore.currentPage - 1)"
            :disabled="offersStore.currentPage === 1"
            class="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            السابق
          </button>

          <div class="flex items-center gap-1">
            <button
              v-for="page in visiblePages"
              :key="page"
              @click="offersStore.changePage(page)"
              :class="[
                'rounded-lg px-3 py-2 text-sm font-medium',
                page === offersStore.currentPage
                  ? 'bg-brand-600 text-white'
                  : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              ]"
            >
              {{ page }}
            </button>
          </div>

          <button
            @click="offersStore.changePage(offersStore.currentPage + 1)"
            :disabled="offersStore.currentPage === offersStore.totalPages"
            class="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            التالي
          </button>
        </div>
      </div>
    </div>

    <!-- Offer Details Modal -->
    <OfferDetailsModal
      v-if="showDetailsModal"
      :offer-id="selectedOfferId"
      @close="showDetailsModal = false"
    />

    <!-- Filters Modal -->
    <FiltersModal
      v-if="showFiltersModal"
      @close="showFiltersModal = false"
      @apply="applyFilters"
    />
  </admin-layout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useOffersStore } from '@/stores/offers.store'
import { useLookupDataStore } from '@/stores/lookup-data.store'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import StatCard from '@/components/common/StatCard.vue'
import OfferDetailsModal from '@/components/offers/OfferDetailsModal.vue'
import FiltersModal from '@/components/offers/FiltersModal.vue'
import {SERVICES} from "@/config/api.config";


interface ClickOutsideElement extends HTMLElement {
  clickOutsideEvent: (event: MouseEvent) => void
}

const currentPageTitle = ref('إدارة العروض')
const offersStore = useOffersStore()
const lookupDataStore = useLookupDataStore()

// Local state
const localSearchTerm = ref('')
const localStatusFilter = ref<boolean | undefined>(undefined)
const localOfferTypeFilter = ref<string | undefined>(undefined)
const showBulkActionsMenu = ref(false)
const showDetailsModal = ref(false)
const showFiltersModal = ref(false)
const selectedOfferId = ref<string>('')
const searchDebounceTimer = ref<ReturnType<typeof setTimeout> | null>(null)

// Statistics
const statistics = computed(() => offersStore.statistics)

// Pagination
const visiblePages = computed(() => {
  const current = offersStore.currentPage
  const total = offersStore.totalPages
  const pages: number[] = []

  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    if (current <= 4) {
      pages.push(1, 2, 3, 4, 5)
      pages.push(-1)
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

// Filters
const hasActiveFilters = computed(() => {
  return localSearchTerm.value || localStatusFilter.value !== undefined || localOfferTypeFilter.value !== undefined
})

// Selection
const isAllSelected = computed(() => {
  return offersStore.offers.length > 0 && 
         offersStore.selectedOfferIds.length === offersStore.offers.length
})

// Methods
const loadData = async () => {
  await Promise.all([
    offersStore.loadOffers(),
    offersStore.loadStatistics(),
    lookupDataStore.loadOfferTypes()
  ])
}

const getImageUrl = (imageName: string): string => {
  if (imageName.startsWith('http')) {
    return imageName;
  }
  const baseUrl = import.meta.env.VITE_OFFERS_MANAGER_API_URL || SERVICES.offersManager.baseUrl;
  return `${baseUrl}images/${imageName}`;
}

const onSearchInput = () => {
  if (searchDebounceTimer.value) {
    clearTimeout(searchDebounceTimer.value)
  }

  searchDebounceTimer.value = setTimeout(() => {
    offersStore.search(localSearchTerm.value)
  }, 500)
}

const onStatusFilterChange = () => {
  offersStore.filterByStatus(localStatusFilter.value)
}

const onOfferTypeFilterChange = () => {
  offersStore.filterByOfferType(localOfferTypeFilter.value)
}

const resetFilters = () => {
  localSearchTerm.value = ''
  localStatusFilter.value = undefined
  localOfferTypeFilter.value = undefined
  offersStore.resetFilters()
}

const changePageSize = (event: Event) => {
  const target = event.target as HTMLSelectElement
  offersStore.changePageSize(Number(target.value))
}

const toggleSelectAll = () => {
  if (isAllSelected.value) {
    offersStore.deselectAll()
  } else {
    offersStore.selectAll()
  }
}

const closeBulkActionsMenu = () => {
  showBulkActionsMenu.value = false
}

const viewOfferDetails = (offerId: string) => {
  selectedOfferId.value = offerId
  showDetailsModal.value = true
}

const toggleStatus = async (offerId: string, isActive: boolean) => {
  const action = isActive ? 'تعطيل' : 'تفعيل'
  
  if (!confirm(`هل أنت متأكد من ${action} هذا العرض؟`)) {
    return
  }

  try {
    await offersStore.toggleOfferStatus(offerId)
    alert(`تم ${action} العرض بنجاح`)
  } catch (error) {
    console.error('Failed to toggle status:', error)
    alert(`فشل ${action} العرض`)
  }
}

const deleteOffer = async (offerId: string) => {
  if (!confirm('هل أنت متأكد من حذف هذا العرض نهائياً؟')) {
    return
  }

  try {
    await offersStore.deleteOffer(offerId)
    alert('تم حذف العرض بنجاح')
  } catch (error) {
    console.error('Failed to delete offer:', error)
    alert('فشل حذف العرض')
  }
}

const handleBulkActivate = async () => {
  if (!confirm(`هل تريد تفعيل ${offersStore.selectedOfferIds.length} عرض؟`)) {
    return
  }

  try {
    await offersStore.bulkActivate(offersStore.selectedOfferIds)
    alert('تم تفعيل العروض بنجاح')
    closeBulkActionsMenu()
  } catch (error) {
    console.error('Failed to activate offers:', error)
    alert('فشل تفعيل العروض')
  }
}

const handleBulkDeactivate = async () => {
  if (!confirm(`هل تريد تعطيل ${offersStore.selectedOfferIds.length} عرض؟`)) {
    return
  }

  try {
    await offersStore.bulkDeactivate(offersStore.selectedOfferIds)
    alert('تم تعطيل العروض بنجاح')
    closeBulkActionsMenu()
  } catch (error) {
    console.error('Failed to deactivate offers:', error)
    alert('فشل تعطيل العروض')
  }
}

const handleBulkDelete = async () => {
  if (!confirm(`هل تريد حذف ${offersStore.selectedOfferIds.length} عرض نهائياً؟`)) {
    return
  }

  try {
    await offersStore.bulkDelete(offersStore.selectedOfferIds)
    alert('تم حذف العروض بنجاح')
    closeBulkActionsMenu()
  } catch (error) {
    console.error('Failed to delete offers:', error)
    alert('فشل حذف العروض')
  }
}

const applyFilters = () => {
  // Apply advanced filters
  showFiltersModal.value = false
}

const truncateText = (text: string, length: number): string => {
  if (text.length <= length) return text
  return text.substring(0, length) + '...'
}

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('ar-SA').format(price)
}

// Click outside directive
const vClickOutside = {
  mounted(el: HTMLElement, binding: { value: () => void }) {
    const element = el as ClickOutsideElement
    element.clickOutsideEvent = (event: Event) => {
      if (!(element === event.target || element.contains(event.target as Node))) {
        binding.value()
      }
    }
    document.addEventListener('click', element.clickOutsideEvent)
  },
  unmounted(el: HTMLElement) {
    const element = el as ClickOutsideElement
    document.removeEventListener('click', element.clickOutsideEvent)
  }
}

// Lifecycle
onMounted(() => {
  loadData()
})
</script>