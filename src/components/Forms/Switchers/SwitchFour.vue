<script setup lang="ts">
import { ref } from 'vue'

const switcherToggle = ref<boolean>(false)
</script>

<template>
  <div>
    <label for="toggle4" class="flex cursor-pointer select-none items-center">
      <div class="relative">
        <input
          type="checkbox"
          id="toggle4"
          class="sr-only"
          @change="switcherToggle = !switcherToggle"
        />
        <div
          :class="switcherToggle && '!bg-primary'"
          class="block h-8 w-14 rounded-full bg-black"
        ></div>
        <div
          :class="switcherToggle && '!right-1 !translate-x-full'"
          class="absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition"
        ></div>
      </div>
    </label>
  </div>
</template>
