<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-5 sm:space-y-6">
      <ComponentCard title="Timeline Chart">
        <TimelineChartOne />
      </ComponentCard>
    </div>
  </AdminLayout>
</template>

<script lang="ts" setup>
import TimelineChartOne from '@/components/charts/TimelineChart/TimelineChartOne.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import { ref } from 'vue'
const currentPageTitle = ref('Timeline Chart')
</script>
