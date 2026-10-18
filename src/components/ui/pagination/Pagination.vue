<script setup lang="ts">
import { useAttrs } from 'vue'
import { cn } from '@/utils/cn'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()
</script>

<template>
  <nav
    role="navigation"
    aria-label="pagination"
    data-slot="pagination"
    v-bind="{ ...attrs, class: undefined }"
    :class="cn('mx-auto flex w-full justify-center', attrs.class as string)"
  >
    <slot />
  </nav>
</template>
