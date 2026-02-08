<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-5 sm:space-y-6">
      <ComponentCard title="Pie Chart - Percentage">
        <PieChartOne />
      </ComponentCard>
      <ComponentCard title="Pie Chart - With Labels">
        <PieChartTwo />
      </ComponentCard>
    </div>
  </AdminLayout>
</template>

<script lang="ts" setup>
import PieChartOne from '@/components/charts/PieChart/PieChartOne.vue'
import PieChartTwo from '@/components/charts/PieChart/PieChartTwo.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import { ref } from 'vue'
const currentPageTitle = ref('Pie Chart')
</script>
