<script setup lang="ts">
import { ref } from 'vue'

const checkboxToggle = ref<boolean>(false)
</script>

<template>
  <div>
    <label for="checkboxLabelFour" class="flex cursor-pointer select-none items-center">
      <div class="relative">
        <input
          type="checkbox"
          id="checkboxLabelFour"
          class="sr-only"
          @change="checkboxToggle = !checkboxToggle"
        />
        <div
          :class="checkboxToggle && 'border-primary'"
          class="mr-4 flex h-5 w-5 items-center justify-center rounded-full border"
        >
          <span
            :class="checkboxToggle && '!bg-primary'"
            class="h-2.5 w-2.5 rounded-full bg-transparent"
          >
          </span>
        </div>
      </div>
      Checkbox Text
    </label>
  </div>
</template>
