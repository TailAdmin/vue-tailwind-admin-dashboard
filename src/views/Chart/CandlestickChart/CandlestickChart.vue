<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-5 sm:space-y-6">
      <ComponentCard title="Candlestick Chart">
        <CandlestickChartOne />
      </ComponentCard>
    </div>
  </AdminLayout>
</template>

<script lang="ts" setup>
import CandlestickChartOne from '@/components/charts/CandlestickChart/CandlestickChartOne.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import { ref } from 'vue'
const currentPageTitle = ref('Candlestick Chart')
</script>
