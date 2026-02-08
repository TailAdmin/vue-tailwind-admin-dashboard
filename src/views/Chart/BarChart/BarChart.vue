<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-5 sm:space-y-6">
      <ComponentCard title="Bar Chart - Vertical">
        <BarChartOne />
      </ComponentCard>
      <ComponentCard title="Bar Chart - Stacked">
        <BarChartTwo />
      </ComponentCard>
      <ComponentCard title="Bar Chart - Horizontal">
        <BarChartThree />
      </ComponentCard>
    </div>
  </AdminLayout>
</template>

<script lang="ts" setup>
import BarChartOne from '@/components/charts/BarChart/BarChartOne.vue'
import BarChartTwo from '@/components/charts/BarChart/BarChartTwo.vue'
import BarChartThree from '@/components/charts/BarChart/BarChartThree.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import { ref } from 'vue'
const currentPageTitle = ref('Bar Chart')
</script>
