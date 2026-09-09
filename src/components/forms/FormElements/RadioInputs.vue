<template>
  <div class="flex flex-wrap items-center gap-8">
    <div>
      <label
        for="radioLabelOne"
        class="flex cursor-pointer select-none items-center text-sm font-medium text-gray-700 dark:text-gray-400"
      >
        <div class="relative">
          <input type="checkbox" id="radioLabelOne" class="sr-only" v-model="checkboxToggleOne" />
          <div
            :class="
              checkboxToggleOne
                ? 'border-brand-500 bg-brand-500'
                : 'bg-transparent border-gray-300 dark:border-gray-700'
            "
            class="ltr:mr-3 rtl:ml-3 flex h-5 w-5 items-center justify-center rounded-full border-[1.25px] hover:border-brand-500 dark:hover:border-brand-500"
          >
            <span
              class="h-2 w-2 rounded-full"
              :class="checkboxToggleOne ? 'bg-white' : 'bg-white dark:bg-[#171f2e]'"
            ></span>
          </div>
        </div>
        Default
      </label>
    </div>

    <div>
      <label
        for="radioLabelTwo"
        class="flex cursor-pointer select-none items-center text-sm font-medium text-gray-700 dark:text-gray-400"
      >
        <div class="relative">
          <input type="checkbox" id="radioLabelTwo" class="sr-only" v-model="checkboxToggleTwo" />
          <div
            :class="
              checkboxToggleTwo
                ? 'border-brand-500 bg-brand-500'
                : 'bg-transparent border-gray-300 dark:border-gray-700'
            "
            class="ltr:mr-3 rtl:ml-3 flex h-5 w-5 items-center justify-center rounded-full border-[1.25px] hover:border-brand-500 dark:hover:border-brand-500"
          >
            <span
              class="h-2 w-2 rounded-full"
              :class="checkboxToggleTwo ? 'bg-white' : 'bg-white dark:bg-[#171f2e]'"
            ></span>
          </div>
        </div>
        Secondary
      </label>
    </div>

    <div>
      <label
        for="radioLabelThree"
        class="flex cursor-pointer select-none items-center text-sm font-medium text-gray-300 dark:text-gray-700"
      >
        <div class="relative">
          <input
            type="checkbox"
            id="radioLabelThree"
            class="peer sr-only"
            v-model="checkboxToggleThree"
            disabled
          />
          <div
            :class="
              checkboxToggleThree
                ? 'bg-transparent border-gray-300 dark:border-gray-700'
                : 'border-brand-500 bg-brand-500'
            "
            class="ltr:mr-3 rtl:ml-3 flex h-5 w-5 items-center justify-center rounded-full border-[1.25px]"
          >
            <span
              class="h-2 w-2 rounded-full"
              :class="checkboxToggleThree ? 'bg-white' : 'bg-white dark:bg-[#171f2e]'"
            ></span>
          </div>
        </div>
        Disabled Secondary
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checkboxToggleOne = ref(false)
const checkboxToggleTwo = ref(true)
const checkboxToggleThree = ref(false)
</script>
