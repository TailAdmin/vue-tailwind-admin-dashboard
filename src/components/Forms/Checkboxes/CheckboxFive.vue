<script setup lang="ts">
import { ref } from 'vue'

const checkboxToggle = ref<boolean>(false)
</script>

<template>
  <div>
    <label for="checkboxLabelFive" class="flex cursor-pointer select-none items-center">
      <div class="relative">
        <input
          type="checkbox"
          id="checkboxLabelFive"
          class="sr-only"
          @change="checkboxToggle = !checkboxToggle"
        />
        <div
          :class="checkboxToggle && '!border-4'"
          class="box mr-4 flex h-5 w-5 items-center justify-center rounded-full border border-primary"
        >
          <span class="h-2.5 w-2.5 rounded-full bg-white dark:bg-transparent"> </span>
        </div>
      </div>
      Checkbox Text
    </label>
  </div>
</template>
