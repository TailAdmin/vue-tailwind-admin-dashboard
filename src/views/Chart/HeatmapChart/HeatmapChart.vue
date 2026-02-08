<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-5 sm:space-y-6">
      <ComponentCard title="Heatmap Chart">
        <HeatmapChartOne />
      </ComponentCard>
    </div>
  </AdminLayout>
</template>

<script lang="ts" setup>
import HeatmapChartOne from '@/components/charts/HeatmapChart/HeatmapChartOne.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import { ref } from 'vue'
const currentPageTitle = ref('Heatmap Chart')
</script>
