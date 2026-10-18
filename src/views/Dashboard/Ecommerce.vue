<template>
  <AdminLayout>
    <div class="grid grid-cols-12 gap-4 md:gap-6">
      <div class="col-span-12 space-y-6 xl:col-span-7">
        <EcommerceMetrics />

        <MonthlySalesChart />
      </div>

      <div class="col-span-12 xl:col-span-5">
        <MonthlyTarget />
      </div>

      <div class="col-span-12">
        <StatisticsChart />
      </div>

      <div class="col-span-12 xl:col-span-5">
        <DemographicCard />
      </div>

      <div class="col-span-12 xl:col-span-7">
        <RecentOrders />
      </div>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import AdminLayout from '@/components/layout/AdminLayout.vue'
import DemographicCard from '@/components/main/dashboard/ecommerce/demographic-card/index.ts'
import EcommerceMetrics from '@/components/main/dashboard/ecommerce/metrics/index.ts'
import MonthlySalesChart from '@/components/main/dashboard/ecommerce/monthly-sales-chart/index.ts'
import MonthlyTarget from '@/components/main/dashboard/ecommerce/monthly-target/index.ts'
import RecentOrders from '@/components/main/dashboard/ecommerce/recent-orders/index.ts'
import StatisticsChart from '@/components/main/dashboard/ecommerce/statistics-chart/index.ts'
</script>
