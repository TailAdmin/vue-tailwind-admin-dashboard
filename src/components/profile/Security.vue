<template>
  <div class="mb-6 rounded-2xl border border-gray-200 p-5 lg:p-6 dark:border-gray-800">
    <h4 class="text-lg mb-3 font-semibold text-gray-800 lg:mb-6 dark:text-white/90">Security</h4>
    <div>
      <div
        class="flex flex-col justify-between gap-4 border-b border-gray-200 py-4 first:pt-0 last:border-b-0 last:pb-0 sm:flex-row sm:items-end dark:border-gray-800"
      >
        <div>
          <span class="block font-medium text-base mb-1 text-gray-800 dark:text-white/90"
            >Change Password</span
          >
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Receive real-time notifications and team alerts.
          </p>
        </div>
        <div>
          <button
            class="shadow-theme-xs flex h-10 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white py-2.5 pr-4 pl-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/3 dark:hover:text-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M12.3861 5.08087L14.9182 7.61296M15.6437 3.5917L16.408 4.35603C16.8962 4.84419 16.8962 5.63564 16.408 6.1238L7.83547 14.6963C7.69039 14.8414 7.51182 14.9486 7.31554 15.0083L3.97461 16.0251L4.99141 12.6842C5.05115 12.4879 5.15829 12.3093 5.30337 12.1642L13.8759 3.5917C14.3641 3.10355 15.1555 3.10355 15.6437 3.5917Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Change Password
          </button>
        </div>
      </div>
      <div
        class="flex flex-col justify-between gap-4 border-b border-gray-200 py-4 first:pt-0 last:border-b-0 last:pb-0 sm:flex-row sm:items-end dark:border-gray-800"
      >
        <div>
          <span class="block mb-1 font-medium text-base text-gray-800 dark:text-white/90"
            >Two-factor authentication (2FA)</span
          >
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Keep your account secure by enabling 2FA
          </p>
        </div>
        <div>
          <label
            for="toggle1"
            class="flex cursor-pointer items-center gap-3 text-sm font-medium text-gray-700 select-none dark:text-gray-400"
          >
            <div class="relative">
              <input type="checkbox" id="toggle1" class="sr-only" v-model="switcherToggle" />
              <div
                class="block h-5 w-9 rounded-full"
                :class="
                  switcherToggle ? 'bg-brand-500 dark:bg-brand-500' : 'bg-gray-200 dark:bg-white/10'
                "
              ></div>
              <div
                :class="switcherToggle ? 'translate-x-full rtl:-translate-x-full' : 'translate-x-0'"
                class="shadow-theme-sm absolute top-0.5 start-0.5 h-4 w-4 rounded-full bg-white duration-200 ease-linear"
              ></div>
            </div>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const switcherToggle = ref(false)
</script>
