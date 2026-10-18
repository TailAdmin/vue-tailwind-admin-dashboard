<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table'
import { HorizontalSlideIcon } from '@/icons/layout'
import { cn } from '@/utils/cn'
import { recentOrdersData } from './data'
import OrderRow from './OrderRow.vue'
import type { TableFiveProps } from './types'

withDefaults(defineProps<TableFiveProps>(), {
  data: () => recentOrdersData,
  className: undefined,
})
</script>

<template>
  <div
    :class="
      cn(
        'overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pt-4 pb-3 sm:px-6 dark:border-gray-800 dark:bg-white/3',
        className,
      )
    "
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

    <div class="-mx-4 overflow-x-auto sm:-mx-6">
      <Table>
        <!-- Table Header -->
        <TableHeader class="border-y border-gray-100 dark:border-gray-800">
          <TableRow>
            <TableCell
              isHeader
              class="py-3 ps-4 text-start text-xs font-medium text-gray-500 sm:ps-6 dark:text-gray-400"
            >
              Products
            </TableCell>
            <TableCell
              isHeader
              class="py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400"
            >
              Category
            </TableCell>
            <TableCell
              isHeader
              class="py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400"
            >
              Country
            </TableCell>
            <TableCell
              isHeader
              class="py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400"
            >
              CR
            </TableCell>
            <TableCell
              isHeader
              class="py-3 pe-4 text-start text-xs font-medium text-gray-500 sm:pe-6 dark:text-gray-400"
            >
              Value
            </TableCell>
          </TableRow>
        </TableHeader>

        <!-- Table Body -->
        <TableBody class="divide-y divide-gray-100 dark:divide-gray-800">
          <OrderRow v-for="order in data" :key="order.id" :order="order" />
        </TableBody>
      </Table>
    </div>
  </div>
</template>
