<script setup lang="ts">
import { useAttrs } from 'vue'
import { cn } from '@/utils/cn'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()
</script>

<template>
  <div
    data-slot="card-content"
    v-bind="{ ...attrs, class: undefined }"
    :class="cn(attrs.class as string)"
  >
    <slot />
  </div>
</template>
