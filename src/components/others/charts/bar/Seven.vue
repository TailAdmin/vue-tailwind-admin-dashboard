<script setup lang="ts">
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/utils'

interface CategoryItem {
  name: string
  color: string
}

const categories: CategoryItem[] = [
  { name: 'Activity', color: 'bg-[#7592FF]' },
  { name: 'Online Purchases', color: 'bg-[#7CD4FD]' },
  { name: 'Groceries', color: 'bg-[#BDB4FE]' },
  { name: 'Digital Goods', color: 'bg-[#FE9EFE]' },
  { name: 'Stationery', color: 'bg-[#6FEAA6]' },
  { name: 'Others', color: 'bg-[#D0D5DD] dark:bg-gray-700' },
]
</script>

<template>
  <ScrollArea class="max-w-full">
    <div class="flex min-w-105 flex-col gap-5 xl:min-w-full">
      <!-- Progress Bar Row -->
      <div class="flex w-full items-center gap-0.5">
        <div class="h-8 min-w-px flex-1 rounded bg-[#7592FF]" />
        <div class="h-8 w-10.5 shrink-0 rounded bg-[#7CD4FD]" />
        <div class="h-8 w-6.5 shrink-0 rounded bg-[#BDB4FE]" />
        <div class="h-8 w-10 shrink-0 rounded bg-[#FE9EFE]" />
        <div class="h-8 w-3.25 shrink-0 rounded bg-[#6FEAA6]" />
        <div class="h-8 w-13 shrink-0 rounded bg-[#D0D5DD] dark:bg-gray-700" />
      </div>

      <!-- Spending Categories Grid -->
      <div class="grid grid-cols-2 gap-x-3 gap-y-3">
        <div v-for="category in categories" class="flex items-center gap-2" :key="category.name">
          <span :class="cn('size-2.5 shrink-0 rounded-full', category.color)" />
          <span class="text-sm font-normal text-gray-700 dark:text-gray-300">
            {{ category.name }}
          </span>
        </div>
      </div>
    </div>
  </ScrollArea>
</template>
