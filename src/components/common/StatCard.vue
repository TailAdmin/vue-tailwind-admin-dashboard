<template>
  <div
    class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6"
  >
    <div class="flex items-center justify-between">
      <div class="flex-1">
        <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
          {{ title }}
        </p>
        <p class="mt-2 text-3xl font-bold text-gray-800 dark:text-white/90">
          {{ formatNumber(value) }}
        </p>
        <div v-if="change !== undefined" class="mt-2 flex items-center gap-1">
          <svg
            v-if="change > 0"
            class="h-4 w-4 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>
          <svg
            v-else-if="change < 0"
            class="h-4 w-4 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
            />
          </svg>
          <span
            :class="[
              'text-sm font-medium',
              change > 0 ? 'text-green-600' : change < 0 ? 'text-red-600' : 'text-gray-600'
            ]"
          >
            {{ change > 0 ? '+' : '' }}{{ change }}%
          </span>
          <span class="text-xs text-gray-500 dark:text-gray-400">
            عن الشهر السابق
          </span>
        </div>
      </div>

      <!-- Icon -->
      <div
        :class="[
          'flex h-14 w-14 items-center justify-center rounded-full',
          iconBackgroundColor
        ]"
      >
        <!-- Users Icon -->
        <svg
          v-if="icon === 'users'"
          :class="iconColor"
          class="h-7 w-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>

        <!-- Check Circle Icon -->
        <svg
          v-else-if="icon === 'check-circle'"
          :class="iconColor"
          class="h-7 w-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        <!-- X Circle Icon -->
        <svg
          v-else-if="icon === 'x-circle'"
          :class="iconColor"
          class="h-7 w-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        <!-- Trending Up Icon -->
        <svg
          v-else-if="icon === 'trending-up'"
          :class="iconColor"
          class="h-7 w-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>

        <!-- Chart Icon -->
        <svg
          v-else-if="icon === 'chart'"
          :class="iconColor"
          class="h-7 w-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  title: string
  value: number
  icon: 'users' | 'check-circle' | 'x-circle' | 'trending-up' | 'chart'
  color: 'blue' | 'green' | 'red' | 'purple' | 'yellow' | 'indigo'
  change?: number
}

const props = defineProps<Props>()

const iconBackgroundColor = computed(() => {
  const colors = {
    blue: 'bg-blue-100 dark:bg-blue-900/30',
    green: 'bg-green-100 dark:bg-green-900/30',
    red: 'bg-red-100 dark:bg-red-900/30',
    purple: 'bg-purple-100 dark:bg-purple-900/30',
    yellow: 'bg-yellow-100 dark:bg-yellow-900/30',
    indigo: 'bg-indigo-100 dark:bg-indigo-900/30'
  }
  return colors[props.color]
})

const iconColor = computed(() => {
  const colors = {
    blue: 'text-blue-600 dark:text-blue-400',
    green: 'text-green-600 dark:text-green-400',
    red: 'text-red-600 dark:text-red-400',
    purple: 'text-purple-600 dark:text-purple-400',
    yellow: 'text-yellow-600 dark:text-yellow-400',
    indigo: 'text-indigo-600 dark:text-indigo-400'
  }
  return colors[props.color]
})

const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('ar-SA').format(num)
}
</script>