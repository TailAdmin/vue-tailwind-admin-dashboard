<template>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4">
    <div
      v-for="metric in metrics"
      :key="metric.title"
      class="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]"
    >
      <div class="flex items-center justify-between">
        <div>
          <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400">
            {{ metric.title }}
          </h4>
          <div class="mt-2 flex items-baseline">
            <p class="text-2xl font-semibold text-gray-900 dark:text-white">
              {{ metric.value }}
            </p>
            <span
              :class="[
                'ml-2 flex items-center text-sm font-medium',
                metric.trend === 'up'
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400',
              ]"
            >
              <svg
                v-if="metric.trend === 'up'"
                class="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
              <svg v-else class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
              {{ metric.change }}
            </span>
          </div>
        </div>
        <div :class="['flex h-12 w-12 items-center justify-center rounded-full', metric.bgColor]">
          <component :is="metric.icon" :class="['h-6 w-6', metric.iconColor]" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Eye, Users, MousePointerClick, Clock } from 'lucide-vue-next'

const metrics = ref([
  {
    title: 'Total Views',
    value: '3.456M',
    change: '+12.5%',
    trend: 'up',
    icon: Eye,
    bgColor: 'bg-blue-100 dark:bg-blue-900/20',
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
  {
    title: 'Total Users',
    value: '45.2K',
    change: '+8.3%',
    trend: 'up',
    icon: Users,
    bgColor: 'bg-green-100 dark:bg-green-900/20',
    iconColor: 'text-green-600 dark:text-green-400',
  },
  {
    title: 'Total Clicks',
    value: '2.318M',
    change: '-4.2%',
    trend: 'down',
    icon: MousePointerClick,
    bgColor: 'bg-orange-100 dark:bg-orange-900/20',
    iconColor: 'text-orange-600 dark:text-orange-400',
  },
  {
    title: 'Avg. Session',
    value: '3m 42s',
    change: '+18.1%',
    trend: 'up',
    icon: Clock,
    bgColor: 'bg-purple-100 dark:bg-purple-900/20',
    iconColor: 'text-purple-600 dark:text-purple-400',
  },
])
</script>
