<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { HorizontalSlideIcon, SearchIcon } from '@/icons/layout'
import type { DealStatus } from './types'

export interface CardHeaderProps {
  searchQuery: string
  statusFilter: DealStatus | 'all'
}

defineProps<CardHeaderProps>()

const emit = defineEmits<{
  (e: 'searchChange', value: string): void
  (e: 'statusFilterChange', status: DealStatus | 'all'): void
}>()

const filterOptions: { value: DealStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'complete', label: 'Complete' },
  { value: 'pending', label: 'Pending' },
  { value: 'cancel', label: 'Cancel' },
]
</script>

<template>
  <div class="flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
    <div>
      <CardTitle class="text-lg font-semibold text-gray-800 dark:text-white/90">
        Recent Orders
      </CardTitle>
    </div>

    <div class="flex w-full items-center gap-3 sm:w-auto">
      <div class="flex-1 sm:w-64 sm:flex-initial md:w-72">
        <InputGroup class="h-10 rounded-[10px] border-gray-300 dark:border-gray-700">
          <InputGroupAddon class="ps-3.5 pe-0">
            <SearchIcon class="size-5 text-gray-700 dark:text-gray-300" />
          </InputGroupAddon>
          <InputGroupInput
            type="text"
            placeholder="Search..."
            :model-value="searchQuery"
            class="text-sm placeholder:text-gray-400 dark:placeholder:text-gray-500"
            @update:model-value="(value) => emit('searchChange', String(value ?? ''))"
          />
        </InputGroup>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button
            variant="outline"
            size="sm"
            class="h-10 shrink-0 gap-2 rounded-[10px] border-gray-300 px-4 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/5"
          >
            <HorizontalSlideIcon class="size-5" />
            Filter
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" class="w-40">
          <DropdownMenuItem
            v-for="option in filterOptions"
            :key="option.value"
            :class="
              statusFilter === option.value
                ? 'font-semibold text-brand-500 dark:text-brand-400'
                : ''
            "
            @select="emit('statusFilterChange', option.value)"
          >
            {{ option.label }}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
</template>
