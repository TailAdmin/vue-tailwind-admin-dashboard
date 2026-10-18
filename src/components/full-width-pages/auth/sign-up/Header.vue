<script setup lang="ts">
import { cn } from '@/utils'

withDefaults(defineProps<{ title?: string; description?: string; class?: string }>(), {
  title: 'Sign Up',
  description: 'Enter your email and password to sign up!',
})
</script>

<template>
  <div :class="cn('mb-5 sm:mb-8', $props.class)">
    <h1 class="mb-2 text-title-sm font-semibold text-gray-800 dark:text-white/90">
      {{ title }}
    </h1>
    <p class="text-sm text-gray-500 dark:text-gray-400">
      {{ description }}
    </p>
  </div>
</template>
