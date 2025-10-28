// stores/offers.store.ts
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { offersService } from '@/services/offers.service';
import type {
  Offer,
  OfferStatistics,
  OffersResponse,
  SearchOffersParams
} from '@/types/offers.types';

export const useOffersStore = defineStore('offers', () => {
  // ========================================
  // State
  // ========================================
  const offers = ref<Offer[]>([]);
  const currentOffer = ref<Offer | null>(null);
  const statistics = ref<OfferStatistics | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Pagination
  const currentPage = ref(1);
  const pageSize = ref(10);
  const totalCount = ref(0);
  const totalPages = ref(0);

  // Filters
  const searchTerm = ref('');
  const statusFilter = ref<boolean | undefined>(undefined);
  const ownerIdFilter = ref<string | undefined>(undefined);
  const offerTypeIdFilter = ref<string | undefined>(undefined);
  const minPriceFilter = ref<number | undefined>(undefined);
  const maxPriceFilter = ref<number | undefined>(undefined);

  // Selection
  const selectedOfferIds = ref<string[]>([]);

  // ========================================
  // Getters
  // ========================================
  const activeOffers = computed(() => offers.value.filter(o => o.isActive));
  const inactiveOffers = computed(() => offers.value.filter(o => !o.isActive));
  const hasOffers = computed(() => offers.value.length > 0);
  const hasSelection = computed(() => selectedOfferIds.value.length > 0);
  const selectedOffers = computed(() => 
    offers.value.filter(o => selectedOfferIds.value.includes(o.id))
  );

  // ========================================
  // Actions
  // ========================================

  /**
   * تحميل جميع العروض
   */
  async function loadOffers(params?: SearchOffersParams): Promise<void> {
    isLoading.value = true;
    error.value = null;

    try {
      const result: OffersResponse = await offersService.getAll({
        pageNumber: params?.pageNumber || currentPage.value,
        pageSize: params?.pageSize || pageSize.value,
        searchTerm: params?.searchTerm || searchTerm.value,
        isActive: params?.isActive !== undefined ? params.isActive : statusFilter.value,
        ownerId: params?.ownerId || ownerIdFilter.value,
        offerTypeId: params?.offerTypeId || offerTypeIdFilter.value,
        minPrice: params?.minPrice || minPriceFilter.value,
        maxPrice: params?.maxPrice || maxPriceFilter.value
      });

      offers.value = result.offers;
      totalCount.value = result.totalCount;
      totalPages.value = result.pageCount;
      currentPage.value = params?.pageNumber || currentPage.value;
      pageSize.value = params?.pageSize || pageSize.value;
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { message?: string } } };
      error.value = apiError.response?.data?.message || 'فشل تحميل العروض';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * تحميل عرض بواسطة ID
   */
  async function loadOfferById(id: string): Promise<void> {
    isLoading.value = true;
    error.value = null;

    try {
      currentOffer.value = await offersService.getById(id);
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { message?: string } } };
      error.value = apiError.response?.data?.message || 'فشل تحميل العرض';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * تحميل الإحصائيات
   */
  async function loadStatistics(): Promise<void> {
    isLoading.value = true;
    error.value = null;

    try {
      statistics.value = await offersService.getStatistics();
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { message?: string } } };
      error.value = apiError.response?.data?.message || 'فشل تحميل الإحصائيات';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * تفعيل عرض
   */
  async function activateOffer(id: string): Promise<void> {
    isLoading.value = true;
    error.value = null;

    try {
      await offersService.activate(id);
      
      // تحديث محلياً
      const offerIndex = offers.value.findIndex(o => o.id === id);
      if (offerIndex !== -1) {
        offers.value[offerIndex].isActive = true;
      }

      if (currentOffer.value?.id === id) {
        currentOffer.value.isActive = true;
      }
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { message?: string } } };
      error.value = apiError.response?.data?.message || 'فشل تفعيل العرض';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * تعطيل عرض
   */
  async function deactivateOffer(id: string): Promise<void> {
    isLoading.value = true;
    error.value = null;

    try {
      await offersService.deactivate(id);
      
      // تحديث محلياً
      const offerIndex = offers.value.findIndex(o => o.id === id);
      if (offerIndex !== -1) {
        offers.value[offerIndex].isActive = false;
      }

      if (currentOffer.value?.id === id) {
        currentOffer.value.isActive = false;
      }
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { message?: string } } };
      error.value = apiError.response?.data?.message || 'فشل تعطيل العرض';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * تفعيل/تعطيل عرض
   */
  async function toggleOfferStatus(id: string): Promise<void> {
    isLoading.value = true;
    error.value = null;

    try {
      await offersService.toggleStatus(id);
      
      // تحديث محلياً
      const offerIndex = offers.value.findIndex(o => o.id === id);
      if (offerIndex !== -1) {
        offers.value[offerIndex].isActive = !offers.value[offerIndex].isActive;
      }

      if (currentOffer.value?.id === id) {
        currentOffer.value.isActive = !currentOffer.value.isActive;
      }
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { message?: string } } };
      error.value = apiError.response?.data?.message || 'فشل تغيير حالة العرض';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * حذف عرض
   */
  async function deleteOffer(id: string): Promise<void> {
    isLoading.value = true;
    error.value = null;

    try {
      await offersService.delete(id);
      
      // إزالة من القائمة المحلية
      offers.value = offers.value.filter(o => o.id !== id);
      totalCount.value--;

      if (currentOffer.value?.id === id) {
        currentOffer.value = null;
      }

      // إزالة من التحديد
      selectedOfferIds.value = selectedOfferIds.value.filter(oid => oid !== id);
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { message?: string } } };
      error.value = apiError.response?.data?.message || 'فشل حذف العرض';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * تفعيل عروض متعددة
   */
  async function bulkActivate(offerIds: string[]): Promise<void> {
    isLoading.value = true;
    error.value = null;

    try {
      await offersService.bulkActivate(offerIds);
      
      // تحديث محلياً
      offers.value.forEach(offer => {
        if (offerIds.includes(offer.id)) {
          offer.isActive = true;
        }
      });

      // مسح التحديد
      selectedOfferIds.value = [];
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { message?: string } } };
      error.value = apiError.response?.data?.message || 'فشل تفعيل العروض';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * تعطيل عروض متعددة
   */
  async function bulkDeactivate(offerIds: string[]): Promise<void> {
    isLoading.value = true;
    error.value = null;

    try {
      await offersService.bulkDeactivate(offerIds);
      
      // تحديث محلياً
      offers.value.forEach(offer => {
        if (offerIds.includes(offer.id)) {
          offer.isActive = false;
        }
      });

      // مسح التحديد
      selectedOfferIds.value = [];
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { message?: string } } };
      error.value = apiError.response?.data?.message || 'فشل تعطيل العروض';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * حذف عروض متعددة
   */
  async function bulkDelete(offerIds: string[]): Promise<void> {
    isLoading.value = true;
    error.value = null;

    try {
      await offersService.bulkDelete(offerIds);
      
      // إزالة من القائمة المحلية
      offers.value = offers.value.filter(o => !offerIds.includes(o.id));
      totalCount.value -= offerIds.length;

      // مسح التحديد
      selectedOfferIds.value = [];
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { message?: string } } };
      error.value = apiError.response?.data?.message || 'فشل حذف العروض';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * البحث عن عروض
   */
  async function search(term: string): Promise<void> {
    searchTerm.value = term;
    currentPage.value = 1;
    await loadOffers();
  }

  /**
   * تصفية حسب الحالة
   */
  async function filterByStatus(isActive: boolean | undefined): Promise<void> {
    statusFilter.value = isActive;
    currentPage.value = 1;
    await loadOffers();
  }

  /**
   * تصفية حسب نوع العرض
   */
  async function filterByOfferType(offerTypeId: string | undefined): Promise<void> {
    offerTypeIdFilter.value = offerTypeId;
    currentPage.value = 1;
    await loadOffers();
  }

  /**
   * تصفية حسب السعر
   */
  async function filterByPrice(minPrice?: number, maxPrice?: number): Promise<void> {
    minPriceFilter.value = minPrice;
    maxPriceFilter.value = maxPrice;
    currentPage.value = 1;
    await loadOffers();
  }

  /**
   * تغيير الصفحة
   */
  async function changePage(page: number): Promise<void> {
    currentPage.value = page;
    await loadOffers();
  }

  /**
   * تغيير حجم الصفحة
   */
  async function changePageSize(size: number): Promise<void> {
    pageSize.value = size;
    currentPage.value = 1;
    await loadOffers();
  }

  /**
   * إعادة تعيين الفلاتر
   */
  async function resetFilters(): Promise<void> {
    searchTerm.value = '';
    statusFilter.value = undefined;
    ownerIdFilter.value = undefined;
    offerTypeIdFilter.value = undefined;
    minPriceFilter.value = undefined;
    maxPriceFilter.value = undefined;
    currentPage.value = 1;
    await loadOffers();
  }

  /**
   * تحديد/إلغاء تحديد عرض
   */
  function toggleSelection(offerId: string): void {
    const index = selectedOfferIds.value.indexOf(offerId);
    if (index > -1) {
      selectedOfferIds.value.splice(index, 1);
    } else {
      selectedOfferIds.value.push(offerId);
    }
  }

  /**
   * تحديد جميع العروض
   */
  function selectAll(): void {
    selectedOfferIds.value = offers.value.map(o => o.id);
  }

  /**
   * إلغاء تحديد جميع العروض
   */
  function deselectAll(): void {
    selectedOfferIds.value = [];
  }

  /**
   * مسح الخطأ
   */
  function clearError(): void {
    error.value = null;
  }

  /**
   * إعادة تعيين الحالة
   */
  function reset(): void {
    offers.value = [];
    currentOffer.value = null;
    statistics.value = null;
    isLoading.value = false;
    error.value = null;
    currentPage.value = 1;
    pageSize.value = 10;
    totalCount.value = 0;
    totalPages.value = 0;
    searchTerm.value = '';
    statusFilter.value = undefined;
    ownerIdFilter.value = undefined;
    offerTypeIdFilter.value = undefined;
    minPriceFilter.value = undefined;
    maxPriceFilter.value = undefined;
    selectedOfferIds.value = [];
  }

  return {
    // State
    offers,
    currentOffer,
    statistics,
    isLoading,
    error,
    currentPage,
    pageSize,
    totalCount,
    totalPages,
    searchTerm,
    statusFilter,
    ownerIdFilter,
    offerTypeIdFilter,
    minPriceFilter,
    maxPriceFilter,
    selectedOfferIds,

    // Getters
    activeOffers,
    inactiveOffers,
    hasOffers,
    hasSelection,
    selectedOffers,

    // Actions
    loadOffers,
    loadOfferById,
    loadStatistics,
    activateOffer,
    deactivateOffer,
    toggleOfferStatus,
    deleteOffer,
    bulkActivate,
    bulkDeactivate,
    bulkDelete,
    search,
    filterByStatus,
    filterByOfferType,
    filterByPrice,
    changePage,
    changePageSize,
    resetFilters,
    toggleSelection,
    selectAll,
    deselectAll,
    clearError,
    reset
  };
});