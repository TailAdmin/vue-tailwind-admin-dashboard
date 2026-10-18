<script setup lang="ts">
import { useAttrs } from 'vue'
import { cn } from '@/utils/cn'

defineOptions({ inheritAttrs: false })
const attrs = useAttrs()
</script>

<template>
  <div
    data-slot="field-group"
    v-bind="{ ...attrs, class: undefined }"
    :class="
      cn(
        'group/field-group @container/field-group flex w-full flex-col gap-5 data-[slot=checkbox-group]:gap-3 *:data-[slot=field-group]:gap-4',
        attrs.class as string,
      )
    "
  >
    <slot />
  </div>
</template>
