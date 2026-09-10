<template>
  <div class="space-y-6">
    <!-- Single Select Input -->
    <div>
      <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
        Select Input
      </label>
      <div class="relative z-20 bg-transparent">
        <select
          v-model="singleSelect"
          class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 ltr:pr-11 rtl:pl-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
          :class="{ 'text-gray-800 dark:text-white/90': singleSelect }"
        >
          <option value="" disabled>Select Option</option>
          <option value="marketing" class="text-gray-700 dark:bg-gray-900 dark:text-gray-400">
            Marketing
          </option>
          <option value="template" class="text-gray-700 dark:bg-gray-900 dark:text-gray-400">
            Template
          </option>
          <option value="development" class="text-gray-700 dark:bg-gray-900 dark:text-gray-400">
            Development
          </option>
        </select>
        <span
          class="absolute z-30 text-gray-700 -translate-y-1/2 pointer-events-none ltr:right-4 rtl:left-4 top-1/2 dark:text-gray-400"
        >
          <svg
            class="stroke-current"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.79175 7.396L10.0001 12.6043L15.2084 7.396"
              stroke=""
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
      </div>
    </div>

    <!-- Multiple Select Input -->
    <div>
      <MultipleSelect
        label="Multiple Select Options"
        :options="optionsTwo"
        v-model="selected"
        name="selected_options"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MultipleSelect from './MultipleSelect.vue'

const selected = ref([1, 3])
const optionsTwo = [
  { id: 1, name: 'Option 1' },
  { id: 2, name: 'Option 2' },
  { id: 3, name: 'Option 3' },
  { id: 4, name: 'Option 4' },
  { id: 5, name: 'Option 5' },
]

const singleSelect = ref('')

</script>
