<script setup lang="ts">
import { useAttrs } from 'vue'
import { cn } from '@/utils/cn'

defineOptions({ inheritAttrs: false })

withDefaults(defineProps<{ variant?: 'online' | 'offline' | 'busy' }>(), {
  variant: 'online',
})

const attrs = useAttrs()
</script>

<template>
  <span
    data-slot="avatar-badge"
    :data-variant="variant"
    v-bind="{ ...attrs, class: undefined }"
    :class="
      cn(
        'text-primary-foreground absolute top-0 end-0 z-10 inline-flex items-center justify-center rounded-full bg-blend-color ring-2 ring-white select-none dark:ring-black',
        'data-[variant=busy]:bg-amber-500 data-[variant=offline]:bg-red-500 data-[variant=online]:bg-green-500',
        'group-data-[size=xs]/avatar:size-1.5 group-data-[size=xs]/avatar:[&>svg]:hidden',
        'group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden',
        'group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2',
        'group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2',
        'group-data-[size=xl]/avatar:size-3.5 group-data-[size=xl]/avatar:[&>svg]:size-2.5',
        attrs.class as string,
      )
    "
  >
    <slot />
  </span>
</template>
