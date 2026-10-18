<script setup lang="ts">
import ComponentCard from '@/components/common/ComponentCard.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import BarChartFive from '@/components/others/charts/bar/Five.vue'
import BarChartFour from '@/components/others/charts/bar/Four.vue'
import BarChartOne from '@/components/others/charts/bar/One.vue'
import BarChartSeven from '@/components/others/charts/bar/Seven.vue'
import BarChartSix from '@/components/others/charts/bar/Six.vue'
import BarChartThree from '@/components/others/charts/bar/Three.vue'
import BarChartTwo from '@/components/others/charts/bar/Two.vue'
</script>

<template>
  <AdminLayout>
    <div>
      <PageBreadcrumb pageTitle="Bar Chart" />
      <div class="space-y-6 overflow-x-hidden">
        <ComponentCard title="Bar Chart 1">
          <BarChartOne />
        </ComponentCard>
        <ComponentCard title="Bar Chart 2">
          <BarChartTwo />
        </ComponentCard>
        <ComponentCard title="Bar Chart 3">
          <BarChartThree />
        </ComponentCard>

        <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ComponentCard title="Bar Chart 4">
            <BarChartFour />
          </ComponentCard>
          <ComponentCard title="Bar Chart 5">
            <BarChartFive />
          </ComponentCard>
          <ComponentCard title="Bar Chart 6">
            <BarChartSix />
          </ComponentCard>
          <ComponentCard title="Bar Chart 7">
            <BarChartSeven />
          </ComponentCard>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>
