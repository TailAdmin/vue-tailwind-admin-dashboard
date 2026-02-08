<template>
  <div class="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
    <h3 class="mb-6 text-lg font-semibold text-gray-900 dark:text-white">Top Pages</h3>
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <th class="pb-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
              Page
            </th>
            <th class="pb-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
              Views
            </th>
            <th class="pb-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
              Avg. Time
            </th>
            <th class="pb-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
              Bounce Rate
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(page, index) in pages"
            :key="index"
            class="border-b border-gray-100 last:border-0 dark:border-gray-700"
          >
            <td class="py-4">
              <p class="text-sm font-medium text-gray-900 dark:text-white">{{ page.title }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">{{ page.path }}</p>
            </td>
            <td class="py-4 text-sm text-gray-700 dark:text-gray-300">{{ page.views }}</td>
            <td class="py-4 text-sm text-gray-700 dark:text-gray-300">{{ page.avgTime }}</td>
            <td class="py-4">
              <span
                :class="[
                  'inline-flex rounded-full px-2 py-1 text-xs font-medium',
                  page.bounceRate < 40
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                    : page.bounceRate < 60
                      ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
                      : 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400',
                ]"
              >
                {{ page.bounceRate }}%
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const pages = ref([
  {
    title: 'Home Page',
    path: '/',
    views: '45.2K',
    avgTime: '3m 24s',
    bounceRate: 32,
  },
  {
    title: 'Product Catalog',
    path: '/products',
    views: '38.5K',
    avgTime: '4m 12s',
    bounceRate: 28,
  },
  {
    title: 'About Us',
    path: '/about',
    views: '22.1K',
    avgTime: '2m 45s',
    bounceRate: 45,
  },
  {
    title: 'Contact',
    path: '/contact',
    views: '18.3K',
    avgTime: '1m 58s',
    bounceRate: 68,
  },
  {
    title: 'Blog',
    path: '/blog',
    views: '15.7K',
    avgTime: '5m 32s',
    bounceRate: 24,
  },
])
</script>
