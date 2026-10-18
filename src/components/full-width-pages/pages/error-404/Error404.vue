<script setup lang="ts">
import { RouterLink } from 'vue-router'
import GridShape from '@/components/common/CommonGridShape.vue'
import { Button } from '@/components/ui/button'
import { cn } from '@/utils/cn'
import type { Error404Props } from './types'

withDefaults(defineProps<Error404Props>(), {
  title: 'ERROR',
  description: 'We can’t seem to find the page you are looking for!',
  homeLinkText: 'Back to Home Page',
  homeHref: '/',
  className: undefined,
})
</script>

<template>
  <div
    :class="
      cn(
        'relative z-1 flex min-h-screen flex-col items-center justify-center overflow-hidden p-6',
        className,
      )
    "
  >
    <GridShape />
    <div class="mx-auto w-full max-w-60.5 text-center sm:max-w-118">
      <h1 class="mb-8 font-bold text-gray-800 dark:text-white/90">
        {{ title }}
      </h1>

      <img src="/images/error/404.svg" alt="404" class="dark:hidden" width="472" height="152" />
      <img
        src="/images/error/404-dark.svg"
        alt="404"
        class="hidden dark:block"
        width="472"
        height="152"
      />

      <p class="mt-10 mb-6 text-base text-gray-700 sm:text-lg dark:text-gray-400">
        {{ description }}
      </p>

      <Button size="lg" variant="outline" class="h-12.5 bg-white" as-child>
        <RouterLink :to="homeHref">
          {{ homeLinkText }}
        </RouterLink>
      </Button>
    </div>

    <p
      class="absolute start-1/2 bottom-6 -translate-x-1/2 text-center text-sm text-gray-500 rtl:translate-x-1/2 dark:text-gray-400"
    >
      &copy; {{ new Date().getFullYear() }} - TailAdmin
    </p>
  </div>
</template>
