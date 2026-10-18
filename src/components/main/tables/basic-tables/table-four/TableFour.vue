<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table'
import { VerticalDotsIcon } from '@/icons/layout'
import { cn } from '@/utils/cn'
import CampaignRow from './CampaignRow.vue'
import { featuredCampaignsData } from './data'
import type { TableFourProps } from './types'

withDefaults(defineProps<TableFourProps>(), {
  data: () => featuredCampaignsData,
  className: undefined,
})
</script>

<template>
  <div
    :class="
      cn(
        'overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-4 pb-3 sm:px-6 dark:border-gray-800 dark:bg-white/3',
        className,
      )
    "
  >
    <div class="mb-4 flex justify-between gap-2 sm:items-center">
      <div>
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">Featured Campaigns</h3>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger class="dropdown-toggle">
          <VerticalDotsIcon class="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" class="w-40 p-2">
          <DropdownMenuItem
            class="flex w-full rounded-lg text-start font-normal text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
          >
            View More
          </DropdownMenuItem>
          <DropdownMenuItem
            class="flex w-full rounded-lg text-start font-normal text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

    <div class="custom-scrollbar max-w-full overflow-x-auto">
      <div class="min-w-full">
        <Table>
          <!-- Table Header -->
          <TableHeader class="border-y border-gray-100 dark:border-gray-800">
            <TableRow>
              <TableCell
                isHeader
                class="py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Products
              </TableCell>
              <TableCell
                isHeader
                class="py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Campaign
              </TableCell>
              <TableCell
                isHeader
                class="py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Status
              </TableCell>
            </TableRow>
          </TableHeader>

          <!-- Table Body -->
          <TableBody class="divide-y divide-gray-100 dark:divide-gray-800">
            <CampaignRow v-for="campaign in data" :key="campaign.id" :campaign="campaign" />
          </TableBody>
        </Table>
      </div>
    </div>
  </div>
</template>
