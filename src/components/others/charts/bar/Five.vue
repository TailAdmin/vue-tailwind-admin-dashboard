<script setup lang="ts">
import { ScrollArea } from '@/components/ui/scroll-area'

// Time slots from top to bottom as per Figma design (node-id: 7572:55864)
const timeLabels = ['01:00 PM', '12:00 PM', '11:00 AM', '10:00 AM', '09:00 AM', '08:00 AM']

const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

// 6 rows x 7 days grid slots matching Figma design colors
// Row 1 (01:00 PM): brand-100, gray-50, gray-50, brand-100, gray-50, brand-100, brand-100
// Row 2 (12:00 PM): brand-300, brand-300, brand-300, brand-300, brand-200, brand-100, brand-200
// Row 3 (11:00 AM): brand-100, brand-400, brand-100, brand-200, brand-200, brand-400, brand-300
// Row 4 (10:00 AM): brand-300, brand-200, gray-50, brand-400, brand-200, brand-400, brand-500
// Row 5 (09:00 AM): brand-500, brand-500, brand-500, brand-300, brand-300, brand-500, brand-500
// Row 6 (08:00 AM): brand-300, brand-200, gray-50, brand-400, brand-200, brand-400, brand-500
const gridSlots = [
  // Row 1 (01:00 PM)
  'bg-brand-100 dark:bg-brand-500/20',
  'bg-gray-50 dark:bg-gray-800/60',
  'bg-gray-50 dark:bg-gray-800/60',
  'bg-brand-100 dark:bg-brand-500/20',
  'bg-gray-50 dark:bg-gray-800/60',
  'bg-brand-100 dark:bg-brand-500/20',
  'bg-brand-100 dark:bg-brand-500/20',
  // Row 2 (12:00 PM)
  'bg-brand-300 dark:bg-brand-500/50',
  'bg-brand-300 dark:bg-brand-500/50',
  'bg-brand-300 dark:bg-brand-500/50',
  'bg-brand-300 dark:bg-brand-500/50',
  'bg-brand-200 dark:bg-brand-500/35',
  'bg-brand-100 dark:bg-brand-500/20',
  'bg-brand-200 dark:bg-brand-500/35',
  // Row 3 (11:00 AM)
  'bg-brand-100 dark:bg-brand-500/20',
  'bg-brand-400 dark:bg-brand-500/70',
  'bg-brand-100 dark:bg-brand-500/20',
  'bg-brand-200 dark:bg-brand-500/35',
  'bg-brand-200 dark:bg-brand-500/35',
  'bg-brand-400 dark:bg-brand-500/70',
  'bg-brand-300 dark:bg-brand-500/50',
  // Row 4 (10:00 AM)
  'bg-brand-300 dark:bg-brand-500/50',
  'bg-brand-200 dark:bg-brand-500/35',
  'bg-gray-50 dark:bg-gray-800/60',
  'bg-brand-400 dark:bg-brand-500/70',
  'bg-brand-200 dark:bg-brand-500/35',
  'bg-brand-400 dark:bg-brand-500/70',
  'bg-brand-500 dark:bg-brand-500',
  // Row 5 (09:00 AM)
  'bg-brand-500 dark:bg-brand-500',
  'bg-brand-500 dark:bg-brand-500',
  'bg-brand-500 dark:bg-brand-500',
  'bg-brand-300 dark:bg-brand-500/50',
  'bg-brand-300 dark:bg-brand-500/50',
  'bg-brand-500 dark:bg-brand-500',
  'bg-brand-500 dark:bg-brand-500',
  // Row 6 (08:00 AM)
  'bg-brand-300 dark:bg-brand-500/50',
  'bg-brand-200 dark:bg-brand-500/35',
  'bg-gray-50 dark:bg-gray-800/60',
  'bg-brand-400 dark:bg-brand-500/70',
  'bg-brand-200 dark:bg-brand-500/35',
  'bg-brand-400 dark:bg-brand-500/70',
  'bg-brand-500 dark:bg-brand-500',
]
</script>

<template>
  <ScrollArea class="max-w-full">
    <div class="min-w-140 xl:min-w-full">
      <div class="flex items-center gap-4">
        <!-- Time axis column -->
        <div class="flex h-65.25 shrink-0 flex-col items-start pb-7.5">
          <div
            v-for="(time, index) in timeLabels"
            class="flex min-h-px w-13.75 flex-1 items-center justify-start text-start"
            :key="index"
          >
            <span class="font-outfit text-xs font-normal text-gray-700 dark:text-gray-400">
              {{ time }}
            </span>
          </div>
        </div>

        <!-- Tracker grid & Day labels column -->
        <div class="flex flex-1 flex-col gap-7">
          <!-- Heatmap / tracker grid -->
          <div class="grid h-[231.2px] w-full grid-cols-7 grid-rows-6 gap-x-2 gap-y-1">
            <div
              v-for="(bgClass, index) in gridSlots"
              :class="`rounded-lg ${bgClass}`"
              :key="index"
            />
          </div>

          <!-- Day labels row -->
          <div
            class="flex items-center justify-between text-center font-outfit text-xs font-normal text-gray-700 dark:text-gray-400"
          >
            <span v-for="(day, index) in dayLabels" class="flex-1" :key="index">
              {{ day }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </ScrollArea>
</template>
