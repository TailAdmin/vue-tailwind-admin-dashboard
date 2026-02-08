<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-5 sm:space-y-6">
      <ComponentCard title="Line Chart - Area Style">
        <LineChartOne />
      </ComponentCard>
      <ComponentCard title="Line Chart - Smooth Multi-Series">
        <LineChartTwo />
      </ComponentCard>
      <ComponentCard title="Line Chart - Stepline">
        <LineChartThree />
      </ComponentCard>
    </div>
  </AdminLayout>
</template>

<script lang="ts" setup>
import LineChartOne from '@/components/charts/LineChart/LineChartOne.vue'
import LineChartTwo from '@/components/charts/LineChart/LineChartTwo.vue'
import LineChartThree from '@/components/charts/LineChart/LineChartThree.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import { ref } from 'vue'
const currentPageTitle = ref('Line Chart')
</script>
