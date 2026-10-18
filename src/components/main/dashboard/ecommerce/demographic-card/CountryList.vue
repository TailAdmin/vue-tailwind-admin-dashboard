<script setup lang="ts">
import { demographicData } from './data'

// Only display the top 2 countries in the list
const topCountries = demographicData.slice(0, 3)
</script>

<template>
  <div class="flex flex-col gap-5">
    <div
      v-for="country in topCountries"
      :key="country.id"
      class="flex items-center justify-between"
    >
      <div class="flex items-center gap-3">
        <div class="relative size-8 shrink-0 overflow-hidden rounded-lg">
          <img
            width="32"
            height="32"
            :src="country.flag"
            :alt="country.name"
            class="size-full object-cover"
          />
        </div>
        <div>
          <p class="text-sm font-semibold text-gray-800 dark:text-white/90">
            {{ country.name }}
          </p>
          <span class="block text-xs font-normal text-gray-500 dark:text-gray-400">
            {{ country.customerCount }} Customers
          </span>
        </div>
      </div>

      <div class="flex items-center justify-center">
        <p class="text-sm font-medium text-gray-700 dark:text-gray-300">
          {{ country.percentage }}
        </p>
      </div>
    </div>
  </div>
</template>
