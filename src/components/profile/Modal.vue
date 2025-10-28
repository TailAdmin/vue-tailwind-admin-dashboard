<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="fixed inset-0 flex items-center justify-center overflow-y-auto modal z-99999">
    <!-- الخلفية -->
    <div
      class="fixed inset-0 h-full w-full bg-gray-400/50 backdrop-blur-[32px]"
      aria-hidden="true"
      @click="$emit('close')"
    ></div>

    <!-- محتوى المودال -->
    <div class="relative z-10 bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-lg">
      <slot name="body" />
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
// No additional setup needed
</script>
