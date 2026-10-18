<script setup lang="ts">
import { computed, ref } from 'vue'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Table,
  TableBody,
  TableCell,
  TableHeader as TableHead,
  TableRow,
} from '@/components/ui/table'
import { BoxIcon } from '@/icons/layout'
import { cn } from '@/utils/cn'
import CardFooter from './CardFooter.vue'
import CardHeader from './CardHeader.vue'
import { latestTransactionsData } from './data'
import TransactionRow from './TransactionRow.vue'
import type { TableThreeProps } from './types'

const props = withDefaults(defineProps<TableThreeProps>(), {
  data: () => latestTransactionsData,
  className: undefined,
})

const searchQuery = ref('')
const currentPage = ref(1)

const rows = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) return props.data
  return props.data.filter(
    ({ name, category, status, price, date }) =>
      name.toLowerCase().includes(query) ||
      category.toLowerCase().includes(query) ||
      status.toLowerCase().includes(query) ||
      price.toLowerCase().includes(query) ||
      date.toLowerCase().includes(query),
  )
})
</script>

<template>
  <Card
    :class="
      cn(
        'w-full max-w-full min-w-0 gap-0 overflow-hidden rounded-2xl border border-gray-200 bg-white p-0 sm:p-0 dark:border-gray-800 dark:bg-white/3',
        className,
      )
    "
  >
    <!-- Table Header Controls -->
    <CardHeader :search-query="searchQuery" @search-change="(value) => (searchQuery = value)" />

    <!-- Table Content -->
    <CardContent class="p-0">
      <ScrollArea class="w-full">
        <Table>
          <TableHead class="border-y border-gray-100 dark:border-gray-800">
            <TableRow>
              <TableCell
                isHeader
                class="h-11 min-w-44 py-3 ps-5 text-start text-sm font-normal text-gray-500 sm:ps-6 dark:text-gray-400"
              >
                Name
              </TableCell>
              <TableCell
                isHeader
                class="h-11 min-w-44 px-4 py-3 text-start text-sm font-normal text-gray-500 dark:text-gray-400"
              >
                Date
              </TableCell>
              <TableCell
                isHeader
                class="h-11 min-w-32 px-4 py-3 text-start text-sm font-normal text-gray-500 dark:text-gray-400"
              >
                Price
              </TableCell>
              <TableCell
                isHeader
                class="h-11 min-w-36 px-4 py-3 text-start text-sm font-normal text-gray-500 dark:text-gray-400"
              >
                Category
              </TableCell>
              <TableCell
                isHeader
                class="h-11 min-w-28 px-4 py-3 text-start text-sm font-normal text-gray-500 dark:text-gray-400"
              >
                Status
              </TableCell>
              <TableCell isHeader class="h-11 min-w-16 py-3 pe-5 sm:pe-6" />
            </TableRow>
          </TableHead>

          <TableBody class="divide-y divide-gray-100 dark:divide-gray-800">
            <template v-if="rows.length > 0">
              <TransactionRow v-for="row in rows" :key="row.id" :transaction="row" />
            </template>
            <TableRow v-else>
              <TableCell
                :colspan="6"
                class="px-6 py-12 text-center text-sm text-gray-500 dark:text-gray-400"
              >
                <div class="flex flex-col items-center justify-center">
                  <div
                    class="mb-3 flex size-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800"
                  >
                    <BoxIcon class="size-6 text-gray-800 dark:text-white/90" />
                  </div>
                  <h4 class="text-base font-semibold text-gray-800 dark:text-white/90">
                    No transactions found
                  </h4>
                  <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Try adjusting your search to find what you're looking for.
                  </p>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ScrollArea>
    </CardContent>

    <!-- Table Footer - Pagination -->
    <CardFooter
      :current-page="currentPage"
      :total-pages="10"
      @page-change="(page) => (currentPage = page)"
    />
  </Card>
</template>
