<template>
  <AdminLayout>
    <div class="space-y-6">
      <!-- Page Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">Analytics Dashboard</h1>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Track your website performance and user behavior
          </p>
        </div>
        <button
          class="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-600"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Export Report
        </button>
      </div>

      <!-- Metrics Cards -->
      <AnalyticsMetrics />

      <!-- Visitor Analytics Chart -->
      <VisitorAnalytics />

      <!-- Traffic Sources & Top Pages -->
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <TrafficSources />
        <TopPages />
      </div>
    </div>
  </AdminLayout>
</template>

<script lang="ts" setup>
import AdminLayout from '@/components/layout/AdminLayout.vue'
import AnalyticsMetrics from '@/components/analytics/AnalyticsMetrics.vue'
import VisitorAnalytics from '@/components/analytics/VisitorAnalytics.vue'
import TrafficSources from '@/components/analytics/TrafficSources.vue'
import TopPages from '@/components/analytics/TopPages.vue'
</script>
