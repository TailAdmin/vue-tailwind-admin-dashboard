<script setup lang="ts">
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/utils/cn'
import { tableData as defaultTableData } from './data'
import TableOneRow from './TableOneRow.vue'
import type { TableOneProps } from './types'

withDefaults(defineProps<TableOneProps>(), {
  data: () => defaultTableData,
  className: undefined,
})
</script>

<template>
  <div
    :class="
      cn(
        'overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/5 dark:bg-white/3',
        className,
      )
    "
  >
    <div class="max-w-full overflow-x-auto">
      <Table>
        <TableHeader class="border-b border-gray-100 dark:border-white/5">
          <TableRow>
            <TableCell
              isHeader
              class="px-5 py-3 text-start text-xs font-medium text-gray-500 sm:px-6 dark:text-gray-400"
            >
              User
            </TableCell>
            <TableCell
              isHeader
              class="px-5 py-3 text-start text-xs font-medium text-gray-500 sm:px-6 dark:text-gray-400"
            >
              Project Name
            </TableCell>
            <TableCell
              isHeader
              class="px-5 py-3 text-start text-xs font-medium text-gray-500 sm:px-6 dark:text-gray-400"
            >
              Team
            </TableCell>
            <TableCell
              isHeader
              class="px-5 py-3 text-start text-xs font-medium text-gray-500 sm:px-6 dark:text-gray-400"
            >
              Status
            </TableCell>
            <TableCell
              isHeader
              class="px-5 py-3 text-start text-xs font-medium text-gray-500 sm:px-6 dark:text-gray-400"
            >
              Budget
            </TableCell>
          </TableRow>
        </TableHeader>

        <TableBody class="divide-y divide-gray-100 dark:divide-white/5">
          <TableOneRow v-for="order in data" :key="order.id" :order="order" />
        </TableBody>
      </Table>
    </div>
  </div>
</template>
