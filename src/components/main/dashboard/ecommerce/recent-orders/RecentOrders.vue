<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { HorizontalSlideIcon } from '@/icons/layout'
import { recentOrdersData } from './data'
import OrderRow from './OrderRow.vue'
</script>

<template>
  <div
    class="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pt-4 pb-3 sm:px-6 dark:border-gray-800 dark:bg-white/3"
  >
    <div class="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">Recent Orders</h3>
      </div>

      <div class="flex items-center gap-3">
        <Button variant="outline">
          <HorizontalSlideIcon />
          Filter
        </Button>
        <Button variant="outline">See all</Button>
      </div>
    </div>
    <div class="max-w-full overflow-x-auto">
      <table class="min-w-full">
        <!-- Table Header -->
        <thead class="border-y border-gray-100 dark:border-gray-800">
          <tr>
            <th class="py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400">
              Products
            </th>
            <th class="py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400">
              Category
            </th>
            <th class="py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400">
              Price
            </th>
            <th class="py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400">
              Status
            </th>
          </tr>
        </thead>

        <!-- Table Body -->
        <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
          <OrderRow v-for="order in recentOrdersData" :key="order.id" :order="order" />
        </tbody>
      </table>
    </div>
  </div>
</template>
