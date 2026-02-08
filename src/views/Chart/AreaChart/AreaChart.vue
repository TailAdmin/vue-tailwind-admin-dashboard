<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-5 sm:space-y-6">
      <ComponentCard title="Area Chart - Gradient">
        <AreaChartOne />
      </ComponentCard>
      <ComponentCard title="Area Chart - Stacked">
        <AreaChartTwo />
      </ComponentCard>
    </div>
  </AdminLayout>
</template>

<script lang="ts" setup>
import AreaChartOne from '@/components/charts/AreaChart/AreaChartOne.vue'
import AreaChartTwo from '@/components/charts/AreaChart/AreaChartTwo.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import { ref } from 'vue'
const currentPageTitle = ref('Area Chart')
</script>
