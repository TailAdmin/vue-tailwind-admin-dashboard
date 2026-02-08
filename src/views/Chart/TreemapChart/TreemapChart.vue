<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-5 sm:space-y-6">
      <ComponentCard title="Treemap Chart - Basic">
        <TreemapChartOne />
      </ComponentCard>
      <ComponentCard title="Treemap Chart - Multi-Dimensional">
        <TreemapChartTwo />
      </ComponentCard>
    </div>
  </AdminLayout>
</template>

<script lang="ts" setup>
import TreemapChartOne from '@/components/charts/TreemapChart/TreemapChartOne.vue'
import TreemapChartTwo from '@/components/charts/TreemapChart/TreemapChartTwo.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import { ref } from 'vue'
const currentPageTitle = ref('Treemap Chart')
</script>
