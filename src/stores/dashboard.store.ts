// stores/dashboard.store.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { dashboardService } from '../services/dashboard.service';
import type { DashboardStatistics } from '../types/dashboard.types';

export const useDashboardStore = defineStore('dashboard', () => {
  // State
  const statistics = ref<DashboardStatistics | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Actions
  async function loadStatistics(): Promise<void> {
    isLoading.value = true;
    error.value = null;

    try {
      statistics.value = await dashboardService.getStatistics();
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { message?: string } } };
      error.value = apiError.response?.data?.message || 'فشل تحميل الإحصائيات';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  function clearError(): void {
    error.value = null;
  }

  function reset(): void {
    statistics.value = null;
    isLoading.value = false;
    error.value = null;
  }

  return {
    // State
    statistics,
    isLoading,
    error,

    // Actions
    loadStatistics,
    clearError,
    reset
  };
});