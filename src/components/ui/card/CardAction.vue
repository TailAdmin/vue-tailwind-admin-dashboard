<script setup lang="ts">
import { useAttrs } from 'vue'
import { cn } from '@/utils/cn'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()
</script>

<template>
  <div
    data-slot="card-action"
    v-bind="{ ...attrs, class: undefined }"
    :class="
      cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', attrs.class as string)
    "
  >
    <slot />
  </div>
</template>
