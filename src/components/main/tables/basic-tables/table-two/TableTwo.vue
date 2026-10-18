<script setup lang="ts">
import { computed, ref } from 'vue'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table'
import { BoxIcon } from '@/icons/layout'
import { cn } from '@/utils/cn'
import CardHeader from './CardHeader.vue'
import { recentOrdersData } from './data'
import OrderRow from './OrderRow.vue'
import type { CrmOrder, DealStatus } from './types'

export interface TableTwoProps {
  data?: CrmOrder[]
  className?: string
}

const props = withDefaults(defineProps<TableTwoProps>(), {
  data: () => recentOrdersData,
  className: undefined,
})

const orders = ref<CrmOrder[]>([...props.data])
const searchQuery = ref('')
const statusFilter = ref<DealStatus | 'all'>('all')
const rowSelection = ref<Record<string, boolean>>({ '1': true })

const rows = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  return orders.value.filter((order) => {
    if (statusFilter.value !== 'all' && order.status !== statusFilter.value) return false
    if (!query) return true
    const { dealId, user, productName } = order
    return (
      dealId.toLowerCase().includes(query) ||
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      productName.toLowerCase().includes(query)
    )
  })
})

const isAllSelected = computed(
  () => rows.value.length > 0 && rows.value.every((order) => !!rowSelection.value[order.id]),
)

const handleSelectAll = () => {
  const next = { ...rowSelection.value }
  const select = !isAllSelected.value
  rows.value.forEach((order) => {
    if (select) next[order.id] = true
    else delete next[order.id]
  })
  rowSelection.value = next
}

const handleRowSelect = (id: string) => {
  const next = { ...rowSelection.value }
  if (next[id]) delete next[id]
  else next[id] = true
  rowSelection.value = next
}

const handleDelete = (id: string) => {
  orders.value = orders.value.filter((order) => order.id !== id)
  const next = { ...rowSelection.value }
  delete next[id]
  rowSelection.value = next
}
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
    <CardHeader
      :search-query="searchQuery"
      :status-filter="statusFilter"
      @search-change="(value) => (searchQuery = value)"
      @status-filter-change="(status) => (statusFilter = status)"
    />

    <!-- Table Content -->
    <div class="max-w-full overflow-x-auto">
      <div class="min-w-175 2xl:min-w-202">
        <Table>
          <TableHeader
            class="border-y border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-900"
          >
            <TableRow>
              <TableCell
                isHeader
                class="px-6 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400"
              >
                <div class="flex items-center gap-3">
                  <Checkbox
                    :checked="isAllSelected"
                    aria-label="Select all orders"
                    @change="handleSelectAll"
                  />
                  <span>Deal ID</span>
                </div>
              </TableCell>

              <TableCell
                isHeader
                class="px-6 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Customer
              </TableCell>

              <TableCell
                isHeader
                class="px-6 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Product/Service
              </TableCell>

              <TableCell
                isHeader
                class="px-6 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Deal Value
              </TableCell>

              <TableCell
                isHeader
                class="px-6 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Close Date
              </TableCell>

              <TableCell
                isHeader
                class="px-6 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Status
              </TableCell>

              <TableCell
                isHeader
                class="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Action
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody class="min-h-96 divide-y divide-gray-100 dark:divide-gray-800">
            <template v-if="rows.length > 0">
              <OrderRow
                v-for="order in rows"
                :key="order.id"
                :order="order"
                :is-selected="!!rowSelection[order.id]"
                :on-select="handleRowSelect"
                :on-delete="handleDelete"
              />
            </template>
            <TableRow v-else>
              <TableCell
                :colspan="7"
                class="px-6 py-12 text-center text-sm text-gray-500 dark:text-gray-400"
              >
                <div class="flex flex-col items-center justify-center">
                  <div
                    class="mb-3 flex size-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800"
                  >
                    <BoxIcon class="size-6 text-gray-800 dark:text-white/90" />
                  </div>
                  <h4 class="text-base font-semibold text-gray-800 dark:text-white/90">
                    No orders found
                  </h4>
                  <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Try adjusting your search or filter to find what you're looking for.
                  </p>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  </Card>
</template>
