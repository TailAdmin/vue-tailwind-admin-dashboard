<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-5 sm:space-y-6">
      <ComponentCard title="Radial Bar Chart - Single">
        <RadialBarChartOne />
      </ComponentCard>
      <ComponentCard title="Radial Bar Chart - Multiple">
        <RadialBarChartTwo />
      </ComponentCard>
    </div>
  </AdminLayout>
</template>

<script lang="ts" setup>
import RadialBarChartOne from '@/components/charts/RadialBarChart/RadialBarChartOne.vue'
import RadialBarChartTwo from '@/components/charts/RadialBarChart/RadialBarChartTwo.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import { ref } from 'vue'
const currentPageTitle = ref('Radial Bar Chart')
</script>
