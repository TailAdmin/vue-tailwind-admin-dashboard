<script setup lang="ts">
import ComponentCard from '@/components/common/ComponentCard.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import LineChartFive from '@/components/others/charts/line/Five.vue'
import LineChartFour from '@/components/others/charts/line/Four.vue'
import LineChartOne from '@/components/others/charts/line/One.vue'
import LineChartThree from '@/components/others/charts/line/Three.vue'
import LineChartTwo from '@/components/others/charts/line/Two.vue'
</script>

<template>
  <AdminLayout>
    <div>
      <PageBreadcrumb pageTitle="Line Chart" />
      <div class="space-y-6 overflow-x-hidden">
        <ComponentCard title="Line Chart 1">
          <LineChartOne />
        </ComponentCard>
        <ComponentCard title="Line Chart 2">
          <LineChartTwo />
        </ComponentCard>
        <ComponentCard title="Line Chart 3">
          <LineChartThree />
        </ComponentCard>
        <ComponentCard title="Line Chart 4">
          <LineChartFour />
        </ComponentCard>
        <ComponentCard title="Line Chart 5">
          <LineChartFive />
        </ComponentCard>
      </div>
    </div>
  </AdminLayout>
</template>
