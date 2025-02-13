<template>
  <div class="space-y-6">
    <div class="flex flex-wrap items-center gap-8">
      <!-- Default Checkbox -->
      <div>
        <label
          for="checkboxLabelOne"
          class="flex items-center text-sm font-medium text-gray-700 cursor-pointer select-none dark:text-gray-400"
        >
          <div class="relative">
            <input type="checkbox" id="checkboxLabelOne" v-model="checkboxOne" class="sr-only" />
            <div
              :class="
                checkboxOne
                  ? 'border-brand-500 bg-brand-500'
                  : 'bg-transparent border-gray-300 dark:border-gray-700'
              "
              class="mr-3 flex h-5 w-5 items-center justify-center rounded-md border-[1.25px] hover:border-brand-500 dark:hover:border-brand-500"
            >
              <span :class="checkboxOne ? '' : 'opacity-0'">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
                    stroke="white"
                    stroke-width="1.94437"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>
          Default
        </label>
      </div>

      <!-- Checked Checkbox -->
      <div>
        <label
          for="checkboxLabelTwo"
          class="flex items-center text-sm font-medium text-gray-700 cursor-pointer select-none dark:text-gray-400"
        >
          <div class="relative">
            <input type="checkbox" id="checkboxLabelTwo" v-model="checkboxTwo" class="sr-only" />
            <div
              :class="
                checkboxTwo
                  ? 'border-brand-500 bg-brand-500'
                  : 'bg-transparent border-gray-300 dark:border-gray-700'
              "
              class="mr-3 flex h-5 w-5 items-center justify-center rounded-md border-[1.25px] hover:border-brand-500 dark:hover:border-brand-500"
            >
              <span :class="checkboxTwo ? '' : 'opacity-0'">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
                    stroke="white"
                    stroke-width="1.94437"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>
          Checked
        </label>
      </div>

      <!-- Disabled Checkbox -->
      <div>
        <label
          for="checkboxLabelThree"
          class="flex items-center text-sm font-medium text-gray-300 cursor-pointer select-none dark:text-gray-700"
        >
          <div class="relative">
            <input
              type="checkbox"
              id="checkboxLabelThree"
              v-model="checkboxThree"
              class="sr-only peer"
              disabled
            />
            <div
              :class="
                checkboxThree
                  ? 'bg-transparent border-gray-200 dark:border-gray-800'
                  : 'border-brand-500 bg-brand-500'
              "
              class="mr-3 flex h-5 w-5 items-center justify-center rounded-md border-[1.25px]"
            >
              <span :class="checkboxThree ? '' : 'opacity-0'">
                <svg
                  class="stroke-gray-200 dark:stroke-gray-800"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
                    stroke=""
                    stroke-width="2.33333"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>
          Disabled
        </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checkboxOne = ref(false)
const checkboxTwo = ref(true)
const checkboxThree = ref(true)
</script>
