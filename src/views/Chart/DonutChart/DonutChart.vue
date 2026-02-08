<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-5 sm:space-y-6">
      <ComponentCard title="Donut Chart - Multi Category">
        <DonutChartOne />
      </ComponentCard>
      <ComponentCard title="Donut Chart - Progress">
        <DonutChartTwo />
      </ComponentCard>
    </div>
  </AdminLayout>
</template>

<script lang="ts" setup>
import DonutChartOne from '@/components/charts/DonutChart/DonutChartOne.vue'
import DonutChartTwo from '@/components/charts/DonutChart/DonutChartTwo.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import { ref } from 'vue'
const currentPageTitle = ref('Donut Chart')
</script>
