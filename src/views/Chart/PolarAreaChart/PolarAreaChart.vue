<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-5 sm:space-y-6">
      <ComponentCard title="Polar Area Chart">
        <PolarAreaChartOne />
      </ComponentCard>
    </div>
  </AdminLayout>
</template>

<script lang="ts" setup>
import PolarAreaChartOne from '@/components/charts/PolarAreaChart/PolarAreaChartOne.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import { ref } from 'vue'
const currentPageTitle = ref('Polar Area Chart')
</script>
