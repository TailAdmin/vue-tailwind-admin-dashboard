<template>
  <Modal @close="$emit('close')">
    <template #body>
      <div class="relative w-full max-w-6xl rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-8">
        <!-- Close Button -->
        <button
          @click="$emit('close')"
          class="absolute right-5 top-5 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
        >
          <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
            <path d="M6.04289 16.5418C5.65237 16.9323 5.65237 17.5655 6.04289 17.956C6.43342 18.3465 7.06658 18.3465 7.45711 17.956L11.9987 13.4144L16.5408 17.9565C16.9313 18.347 17.5645 18.347 17.955 17.9565C18.3455 17.566 18.3455 16.9328 17.955 16.5423L13.4129 12.0002L17.955 7.45808C18.3455 7.06756 18.3455 6.43439 17.955 6.04387C17.5645 5.65335 16.9313 5.65335 16.5408 6.04387L11.9987 10.586L7.45711 6.04439C7.06658 5.65386 6.43342 5.65386 6.04289 6.04439C5.65237 6.43491 5.65237 7.06808 6.04289 7.4586L10.5845 12.0002L6.04289 16.5418Z" />
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
            @click="loadOffer"
            class="mt-4 rounded-lg bg-brand-600 px-4 py-2 text-white hover:bg-brand-700"
          >
            إعادة المحاولة
          </button>
        </div>

        <!-- Content -->
        <div v-else-if="offer" class="pr-12">
          <!-- Header -->
          <div class="mb-6">
            <div class="flex items-start justify-between">
              <div>
                <h4 class="text-2xl font-semibold text-gray-800 dark:text-white/90">
                  {{ offer.title }}
                </h4>
                <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  تفاصيل العرض
                </p>
              </div>
              <span
                :class="[
                  'inline-flex items-center rounded-full px-3 py-1 text-sm font-medium',
                  offer.isActive
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                ]"
              >
                {{ offer.isActive ? 'نشط' : 'غير نشط' }}
              </span>
            </div>
          </div>

          <!-- Images Carousel -->
          <div v-if="offer.imageUrls && offer.imageUrls.length > 0" class="mb-6">
            <div class="relative overflow-hidden rounded-xl">
              <img
                :src="getImageUrl(offer.imageUrls[currentImageIndex])"
                :alt="offer.title"
                class="h-96 w-full object-cover"
              />
              
              <!-- Navigation Buttons -->
              <button
                v-if="offer.imageUrls.length > 1"
                @click="previousImage"
                class="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800"
              >
                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                v-if="offer.imageUrls.length > 1"
                @click="nextImage"
                class="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800"
              >
                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <!-- Dots Indicator -->
              <div v-if="offer.imageUrls.length > 1" class="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                <button
                  v-for="(imageUrl, index) in offer.imageUrls"
                  :key="index"
                  @click="currentImageIndex = index"
                  :class="[
                    'h-2 w-2 rounded-full transition-all',
                    index === currentImageIndex
                      ? 'w-8 bg-white'
                      : 'bg-white/50 hover:bg-white/75'
                  ]"
                />
              </div>
            </div>
          </div>


          <!-- Main Details Grid -->
          <div class="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <!-- Basic Info -->
            <div class="rounded-xl border border-gray-200 p-5 dark:border-gray-800">
              <h6 class="mb-4 font-semibold text-gray-800 dark:text-white/90">
                المعلومات الأساسية
              </h6>
              <div class="space-y-3">
                <div>
                  <p class="text-xs text-gray-500 dark:text-gray-400">الوصف</p>
                  <p class="mt-1 text-sm font-medium text-gray-800 dark:text-white/90">
                    {{ offer.description }}
                  </p>
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <p class="text-xs text-gray-500 dark:text-gray-400">نوع العرض</p>
                    <p class="mt-1 text-sm font-medium text-gray-800 dark:text-white/90">
                      {{ offer.offerTypeName || 'غير محدد' }}
                    </p>
                  </div>
                  <div>
                    <p class="text-xs text-gray-500 dark:text-gray-400">نوع الوحدة</p>
                    <p class="mt-1 text-sm font-medium text-gray-800 dark:text-white/90">
                      {{ offer.unitTypeName || 'غير محدد' }}
                    </p>
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <p class="text-xs text-gray-500 dark:text-gray-400">نوع العقار</p>
                    <p class="mt-1 text-sm font-medium text-gray-800 dark:text-white/90">
                      {{ offer.propertyTypeName || 'غير محدد' }}
                    </p>
                  </div>
                  <div>
                    <p class="text-xs text-gray-500 dark:text-gray-400">الدور</p>
                    <p class="mt-1 text-sm font-medium text-gray-800 dark:text-white/90">
                      {{ offer.floorName || 'غير محدد' }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Price & Duration -->
            <div class="rounded-xl border border-gray-200 p-5 dark:border-gray-800">
              <h6 class="mb-4 font-semibold text-gray-800 dark:text-white/90">
                السعر والمدة
              </h6>
              <div class="space-y-3">
                <div>
                  <p class="text-xs text-gray-500 dark:text-gray-400">السعر</p>
                  <p class="mt-1 text-2xl font-bold text-brand-600 dark:text-brand-400">
                    {{ formatPrice(offer.price) }} ريال
                  </p>
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <p class="text-xs text-gray-500 dark:text-gray-400">المدة</p>
                    <p class="mt-1 text-sm font-medium text-gray-800 dark:text-white/90">
                      {{ offer.duration }} {{ offer.timeUnitName || 'شهر' }}
                    </p>
                  </div>
                  <div>
                    <p class="text-xs text-gray-500 dark:text-gray-400">نوع الإيجار</p>
                    <p class="mt-1 text-sm font-medium text-gray-800 dark:text-white/90">
                      {{ offer.rentalTypeName }}
                    </p>
                  </div>
                </div>
                <div>
                  <p class="text-xs text-gray-500 dark:text-gray-400">نوع الطلب</p>
                  <p class="mt-1 text-sm font-medium text-gray-800 dark:text-white/90">
                    {{ getBillTypeName(offer.billType) }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Property Details -->
            <div class="rounded-xl border border-gray-200 p-5 dark:border-gray-800">
              <h6 class="mb-4 font-semibold text-gray-800 dark:text-white/90">
                تفاصيل العقار
              </h6>
              <div class="space-y-3">
                <div class="grid grid-cols-3 gap-4">
                  <div v-if="offer.area">
                    <p class="text-xs text-gray-500 dark:text-gray-400">المساحة</p>
                    <p class="mt-1 text-sm font-medium text-gray-800 dark:text-white/90">
                      {{ offer.area }} م²
                    </p>
                  </div>
                  <div v-if="offer.roomCount">
                    <p class="text-xs text-gray-500 dark:text-gray-400">الغرف</p>
                    <p class="mt-1 text-sm font-medium text-gray-800 dark:text-white/90">
                      {{ offer.roomCount }}
                    </p>
                  </div>
                  <div v-if="offer.bathroomCount">
                    <p class="text-xs text-gray-500 dark:text-gray-400">دورات المياه</p>
                    <p class="mt-1 text-sm font-medium text-gray-800 dark:text-white/90">
                      {{ offer.bathroomCount }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Contact Methods -->
            <div class="rounded-xl border border-gray-200 p-5 dark:border-gray-800">
              <h6 class="mb-4 font-semibold text-gray-800 dark:text-white/90">
                طرق التواصل
              </h6>
              <div class="space-y-3">
                <div class="flex items-center gap-3">
                  <div
                    :class="[
                      'flex h-10 w-10 items-center justify-center rounded-lg',
                      offer.isPhoneAllowed ? 'bg-green-100 dark:bg-green-900/30' : 'bg-gray-100 dark:bg-gray-800'
                    ]"
                  >
                    <svg
                      :class="offer.isPhoneAllowed ? 'text-green-600' : 'text-gray-400'"
                      class="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-800 dark:text-white/90">الاتصال الهاتفي</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                      {{ offer.isPhoneAllowed ? 'متاح' : 'غير متاح' }}
                    </p>
                  </div>
                </div>

                <div class="flex items-center gap-3">
                  <div
                    :class="[
                      'flex h-10 w-10 items-center justify-center rounded-lg',
                      offer.isWhatsappAllowed ? 'bg-green-100 dark:bg-green-900/30' : 'bg-gray-100 dark:bg-gray-800'
                    ]"
                  >
                    <svg
                      :class="offer.isWhatsappAllowed ? 'text-green-600' : 'text-gray-400'"
                      class="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-800 dark:text-white/90">واتساب</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                      {{ offer.isWhatsappAllowed ? 'متاح' : 'غير متاح' }}
                    </p>
                  </div>
                </div>

                <div class="flex items-center gap-3">
                  <div
                    :class="[
                      'flex h-10 w-10 items-center justify-center rounded-lg',
                      offer.isMessagingAllowed ? 'bg-green-100 dark:bg-green-900/30' : 'bg-gray-100 dark:bg-gray-800'
                    ]"
                  >
                    <svg
                      :class="offer.isMessagingAllowed ? 'text-green-600' : 'text-gray-400'"
                      class="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-800 dark:text-white/90">المراسلة</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                      {{ offer.isMessagingAllowed ? 'متاحة' : 'غير متاحة' }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Location -->
          <div v-if="offer.locationDescription || offer.latitude" class="mb-6 rounded-xl border border-gray-200 p-5 dark:border-gray-800">
            <h6 class="mb-4 font-semibold text-gray-800 dark:text-white/90">
              الموقع
            </h6>
            <div class="space-y-3">
              <div v-if="offer.locationDescription">
                <p class="text-xs text-gray-500 dark:text-gray-400">وصف الموقع</p>
                <p class="mt-1 text-sm font-medium text-gray-800 dark:text-white/90">
                  {{ offer.locationDescription }}
                </p>
              </div>
              <div v-if="offer.latitude && offer.longitude" class="grid grid-cols-2 gap-4">
                <div>
                  <p class="text-xs text-gray-500 dark:text-gray-400">خط العرض</p>
                  <p class="mt-1 text-sm font-medium text-gray-800 dark:text-white/90">
                    {{ offer.latitude }}
                  </p>
                </div>
                <div>
                  <p class="text-xs text-gray-500 dark:text-gray-400">خط الطول</p>
                  <p class="mt-1 text-sm font-medium text-gray-800 dark:text-white/90">
                    {{ offer.longitude }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Videos -->
          <!-- <div v-if="offer.videos && offer.videos.length > 0" class="mb-6">
            <h6 class="mb-4 font-semibold text-gray-800 dark:text-white/90">
              الفيديوهات
            </h6>
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div v-for="video in offer.videos" :key="video.id" class="rounded-lg overflow-hidden">
                <video controls class="w-full">
                  <source :src="video.videoPath" type="video/mp4">
                  متصفحك لا يدعم عرض الفيديو
                </video>
              </div>
            </div>
          </div> -->

          <!-- Actions -->
          <div class="flex justify-end gap-3 border-t border-gray-200 pt-6 dark:border-gray-800">
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
import { useOffersStore } from '@/stores/offers.store'
import Modal from '@/components/profile/Modal.vue'
import type { Offer, BillType } from '@/types/offers.types'
import {SERVICES} from "@/config/api.config";

interface Props {
  offerId: string
}

const props = defineProps<Props>()
defineEmits<{
  close: []
}>()

const offersStore = useOffersStore()
const offer = ref<Offer | null>(null)
const isLoading = ref(false)
const error = ref<string | null>(null)
const currentImageIndex = ref(0)

const loadOffer = async () => {
  isLoading.value = true
  error.value = null

  try {
    await offersStore.loadOfferById(props.offerId)
    offer.value = offersStore.currentOffer
  } catch (err) {
    console.error('Failed to load offer:', err)
    error.value = 'فشل تحميل بيانات العرض'
  } finally {
    isLoading.value = false
  }
}

const getImageUrl = (imageName: string): string => {
  // إذا كان URL كامل
  if (imageName.startsWith('http')) {
    return imageName;
  }
  // إذا كان اسم ملف فقط، أضف base URL
  const baseUrl = import.meta.env.VITE_OFFERS_MANAGER_API_URL || SERVICES.offersManager.baseUrl;
  return `${baseUrl}images/${imageName}`;
}

const nextImage = () => {
  if (offer.value && offer.value.imageUrls) {
    currentImageIndex.value = (currentImageIndex.value + 1) % offer.value.imageUrls.length
  }
}

const previousImage = () => {
  if (offer.value && offer.value.imageUrls) {
    currentImageIndex.value = currentImageIndex.value === 0 
      ? offer.value.imageUrls.length - 1 
      : currentImageIndex.value - 1
  }
}

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('ar-SA').format(price)
}

const getBillTypeName = (billType: BillType): string => {
  return billType === 0 ? 'عرض' : 'طلب'
}

onMounted(() => {
  loadOffer()
})
</script>