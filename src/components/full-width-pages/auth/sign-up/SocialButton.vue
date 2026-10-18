<script setup lang="ts">
import { cn } from '@/utils'
import { socialProviders } from './data'
import type { SocialAuthProvider } from './types'

withDefaults(
  defineProps<{
    providers?: SocialAuthProvider[]
    class?: string
  }>(),
  { providers: () => socialProviders },
)

defineEmits<{ selectProvider: [providerId: string] }>()
</script>

<template>
  <div :class="cn('grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5', $props.class)">
    <button
      v-for="provider in providers"
      :key="provider.id"
      type="button"
      class="inline-flex items-center justify-center gap-3 rounded-lg bg-gray-100 px-7 py-3 text-sm font-normal text-gray-700 transition-colors hover:bg-gray-200 hover:text-gray-800 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10"
      @click="$emit('selectProvider', provider.id)"
    >
      <component :is="provider.icon" :class="provider.iconClass" />
      Sign up with {{ provider.name }}
    </button>
  </div>
</template>
