<script setup lang="ts">
import { RouterLink } from 'vue-router'
import GridShape from '@/components/common/CommonGridShape.vue'
import ThemeToggler from '@/components/full-width-pages/auth/ThemeToggler.vue'
</script>

<template>
  <div class="relative z-1 bg-white p-6 sm:p-0 dark:bg-gray-900">
    <div
      class="relative flex h-screen w-full flex-col justify-center sm:p-0 lg:flex-row dark:bg-gray-900"
    >
      <slot />
      <div
        class="relative hidden h-full w-full items-center justify-center bg-brand-950 lg:grid lg:w-1/2 dark:bg-white/5"
      >
        <div class="z-1 flex h-full items-center justify-center">
          <GridShape />

          <div class="flex max-w-xs flex-col items-center">
            <RouterLink to="/" class="mb-4 block">
              <img width="231" height="48" src="/images/logo/auth-logo.svg" alt="Logo" />
            </RouterLink>
            <p class="text-center text-gray-400 dark:text-white/60">
              Free and Open-Source Tailwind CSS Admin Dashboard Template
            </p>
          </div>
        </div>
      </div>

      <div class="fixed end-6 bottom-6 z-50 hidden sm:block">
        <ThemeToggler />
      </div>
    </div>
  </div>
</template>
