<script setup lang="ts">
import { useAttrs } from 'vue'
import { cn } from '@/utils/cn'

defineOptions({ inheritAttrs: false })
const attrs = useAttrs()
</script>

<template>
  <div
    data-slot="field-content"
    v-bind="{ ...attrs, class: undefined }"
    :class="
      cn('group/field-content flex flex-1 flex-col gap-0.5 leading-snug', attrs.class as string)
    "
  >
    <slot />
  </div>
</template>
