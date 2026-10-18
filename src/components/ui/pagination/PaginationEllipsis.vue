<script setup lang="ts">
import { useAttrs } from 'vue'
import { HorizontalDotsIcon } from '@/icons/layout'
import { cn } from '@/utils/cn'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()
</script>

<template>
  <span
    aria-hidden="true"
    data-slot="pagination-ellipsis"
    v-bind="{ ...attrs, class: undefined }"
    :class="
      cn(
        `flex size-8 items-center justify-center dark:text-white/90 [&_svg:not([class*='size-'])]:size-4`,
        attrs.class as string,
      )
    "
  >
    <slot>
      <HorizontalDotsIcon />
    </slot>
    <span class="sr-only">More pages</span>
  </span>
</template>
