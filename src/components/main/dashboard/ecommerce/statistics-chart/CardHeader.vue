<script setup lang="ts">
import flatpickr from 'flatpickr'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'
import { CalendarIcon } from '@/icons/layout'
import { cn } from '@/utils/cn'
import type { StatisticTab } from './data'

defineProps<{
  selectedTab: StatisticTab
}>()

const emit = defineEmits<{
  (e: 'tabChange', tab: StatisticTab): void
  (e: 'dateRangeChange', dates: [Date, Date]): void
}>()

const tabLabels: Record<StatisticTab, string> = {
  overview: 'Overview',
  sales: 'Sales',
  revenue: 'Revenue',
}

const tabs: StatisticTab[] = ['overview', 'sales', 'revenue']

const datePickerRef = ref<HTMLInputElement | null>(null)
let fp: flatpickr.Instance | null = null

onMounted(() => {
  if (!datePickerRef.value) return

  const today = new Date()
  const startDate = new Date()
  startDate.setDate(today.getDate() - 30)

  const instance = flatpickr(datePickerRef.value, {
    mode: 'range',
    static: true,
    monthSelectorType: 'static',
    dateFormat: 'd M',
    defaultDate: [startDate, today],
    clickOpens: true,
    prevArrow:
      '<svg class="stroke-current" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.5 15L7.5 10L12.5 5" stroke="" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    nextArrow:
      '<svg class="stroke-current" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 15L12.5 10L7.5 5" stroke="" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    onChange: (selectedDates) => {
      if (selectedDates.length === 2) {
        emit('dateRangeChange', [selectedDates[0], selectedDates[1]])
      }
    },
  })

  fp = Array.isArray(instance) ? instance[0] : instance
})

onBeforeUnmount(() => {
  fp?.destroy()
})
</script>

<template>
  <div class="mb-6 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">Statistics</h3>
      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Target you've set for each month</p>
    </div>

    <div class="flex flex-wrap items-center gap-3 sm:justify-end">
      <ButtonGroup
        class="gap-0.5 rounded-lg bg-gray-100 p-0.5 *:data-slot:rounded-md! dark:bg-gray-900"
      >
        <Button
          v-for="tab in tabs"
          :key="tab"
          variant="ghost"
          size="sm"
          :class="
            cn(
              'h-8 px-3 text-sm font-medium transition-colors',
              selectedTab === tab
                ? 'bg-white text-gray-900 shadow-theme-xs hover:bg-white hover:text-gray-900 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-800 dark:hover:text-white'
                : 'text-gray-500 hover:bg-transparent hover:text-gray-900 dark:text-gray-400 dark:hover:bg-transparent dark:hover:text-white',
            )
          "
          @click="emit('tabChange', tab)"
        >
          {{ tabLabels[tab] }}
        </Button>
      </ButtonGroup>

      <div class="relative inline-flex items-center">
        <CalendarIcon
          class="pointer-events-none absolute start-3 top-1/2 z-10 -translate-y-1/2 text-gray-500 dark:text-gray-400"
        />
        <input
          ref="datePickerRef"
          class="h-9 w-40 cursor-pointer rounded-lg border border-gray-200 bg-white ps-9 pe-3 text-sm font-medium text-gray-700 shadow-theme-xs outline-none hover:bg-gray-50 focus:border-brand-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700/50"
          placeholder="Select date range"
        />
      </div>
    </div>
  </div>
</template>
