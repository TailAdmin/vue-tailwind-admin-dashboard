<template>
  <Modal @close="$emit('close')">
    <template #body>
      <div class="relative w-full max-w-2xl rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-8">
        <!-- Close Button -->
        <button
          @click="$emit('close')"
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
              فلترة العروض
            </h4>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
              اختر الفلاتر المتقدمة للبحث
            </p>
          </div>

          <!-- Filters Form -->
          <form @submit.prevent="applyFilters" class="space-y-6">
            <!-- Price Range -->
            <div>
              <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
                نطاق السعر
              </label>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <input
                    v-model="filters.minPrice"
                    type="number"
                    placeholder="من"
                    class="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-800 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                  />
                </div>
                <div>
                  <input
                    v-model="filters.maxPrice"
                    type="number"
                    placeholder="إلى"
                    class="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-800 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                  />
                </div>
              </div>
            </div>

            <!-- Offer Type -->
            <div>
              <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
                نوع العرض
              </label>
              <select
                v-model="filters.offerTypeId"
                class="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-800 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
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
            </div>

            <!-- Status -->
            <div>
              <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
                الحالة
              </label>
              <select
                v-model="filters.isActive"
                class="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-800 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
              >
                <option :value="undefined">جميع الحالات</option>
                <option :value="true">نشط</option>
                <option :value="false">غير نشط</option>
              </select>
            </div>

            <!-- Actions -->
            <div class="flex gap-3 border-t border-gray-200 pt-6 dark:border-gray-800">
              <button
                type="button"
                @click="resetFilters"
                class="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                إعادة تعيين
              </button>
              <button
                type="submit"
                class="flex-1 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-700"
              >
                تطبيق الفلاتر
              </button>
            </div>
          </form>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useLookupDataStore } from '@/stores/lookup-data.store'
import Modal from '@/components/profile/Modal.vue'

const emit = defineEmits<{
  close: []
  apply: [filters: any]
}>()

const lookupDataStore = useLookupDataStore()

const filters = ref({
  minPrice: undefined as number | undefined,
  maxPrice: undefined as number | undefined,
  offerTypeId: undefined as string | undefined,
  isActive: undefined as boolean | undefined
})

const applyFilters = () => {
  emit('apply', filters.value)
  emit('close')
}

const resetFilters = () => {
  filters.value = {
    minPrice: undefined,
    maxPrice: undefined,
    offerTypeId: undefined,
    isActive: undefined
  }
}
</script>