// ========================================
// Pagination Composable - composables/usePagination.ts
// ========================================

import { ref, computed } from 'vue';

export interface PaginationOptions {
  initialPage?: number;
  initialPageSize?: number;
  pageSizeOptions?: number[];
}

export function usePagination(options: PaginationOptions = {}) {
  const currentPage = ref(options.initialPage || 1);
  const pageSize = ref(options.initialPageSize || 10);
  const totalItems = ref(0);
  const pageSizeOptions = ref(options.pageSizeOptions || [5, 10, 20, 50, 100]);

  // ========================================
  // Computed
  // ========================================
  const totalPages = computed(() => 
    Math.ceil(totalItems.value / pageSize.value) || 1
  );

  const hasNextPage = computed(() => 
    currentPage.value < totalPages.value
  );

  const hasPreviousPage = computed(() => 
    currentPage.value > 1
  );

  const startIndex = computed(() => 
    (currentPage.value - 1) * pageSize.value + 1
  );

  const endIndex = computed(() => 
    Math.min(currentPage.value * pageSize.value, totalItems.value)
  );

  const isFirstPage = computed(() => currentPage.value === 1);
  const isLastPage = computed(() => currentPage.value === totalPages.value);

  // ========================================
  // Methods
  // ========================================

  /**
   * الانتقال للصفحة التالية
   */
  function nextPage(): void {
    if (hasNextPage.value) {
      currentPage.value++;
    }
  }

  /**
   * الانتقال للصفحة السابقة
   */
  function previousPage(): void {
    if (hasPreviousPage.value) {
      currentPage.value--;
    }
  }

  /**
   * الانتقال لصفحة محددة
   */
  function goToPage(page: number): void {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
    }
  }

  /**
   * الانتقال للصفحة الأولى
   */
  function goToFirstPage(): void {
    currentPage.value = 1;
  }

  /**
   * الانتقال للصفحة الأخيرة
   */
  function goToLastPage(): void {
    currentPage.value = totalPages.value;
  }

  /**
   * تغيير حجم الصفحة
   */
  function changePageSize(newSize: number): void {
    pageSize.value = newSize;
    currentPage.value = 1; // العودة للصفحة الأولى
  }

  /**
   * تحديث العدد الكلي للعناصر
   */
  function setTotalItems(total: number): void {
    totalItems.value = total;
    
    // التأكد من أن الصفحة الحالية لا تزال صالحة
    if (currentPage.value > totalPages.value && totalPages.value > 0) {
      currentPage.value = totalPages.value;
    }
  }

  /**
   * إعادة تعيين
   */
  function reset(): void {
    currentPage.value = options.initialPage || 1;
    pageSize.value = options.initialPageSize || 10;
    totalItems.value = 0;
  }

  /**
   * الحصول على أرقام الصفحات للعرض
   */
  function getPageNumbers(maxVisible: number = 5): number[] {
    const pages: number[] = [];
    const total = totalPages.value;
    
    if (total <= maxVisible) {
      // عرض جميع الصفحات
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      // عرض محدود
      const current = currentPage.value;
      const half = Math.floor(maxVisible / 2);
      
      let start = Math.max(1, current - half);
      const end = Math.min(total, start + maxVisible - 1);
      
      if (end - start < maxVisible - 1) {
        start = Math.max(1, end - maxVisible + 1);
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  }

  return {
    // State
    currentPage,
    pageSize,
    totalItems,
    pageSizeOptions,

    // Computed
    totalPages,
    hasNextPage,
    hasPreviousPage,
    startIndex,
    endIndex,
    isFirstPage,
    isLastPage,

    // Methods
    nextPage,
    previousPage,
    goToPage,
    goToFirstPage,
    goToLastPage,
    changePageSize,
    setTotalItems,
    reset,
    getPageNumbers
  };
}
