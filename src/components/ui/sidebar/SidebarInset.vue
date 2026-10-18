<script setup lang="ts">
import { useAttrs } from 'vue'
import { cn } from '@/utils/cn'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()
</script>

<template>
  <main
    data-slot="sidebar-inset"
    v-bind="{ ...attrs, class: undefined }"
    :class="
      cn(
        'relative flex min-w-0 w-full flex-1 flex-col transition-all duration-300 ease-in-out xl:peer-data-[variant=inset]:m-2 xl:peer-data-[variant=inset]:ms-0 xl:peer-data-[variant=inset]:rounded-xl xl:peer-data-[variant=inset]:shadow-sm xl:peer-data-[variant=inset]:peer-data-[state=collapsed]:ms-2',
        attrs.class as string,
      )
    "
  >
    <slot />
  </main>
</template>
