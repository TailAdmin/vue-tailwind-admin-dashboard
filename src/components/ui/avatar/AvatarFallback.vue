<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'
import { AvatarFallback, useForwardProps } from 'reka-ui'
import type { AvatarFallbackProps } from 'reka-ui'
import { cn } from '@/utils/cn'

const props = defineProps<AvatarFallbackProps & { class?: HTMLAttributes['class'] }>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardProps(delegated)
</script>

<template>
  <AvatarFallback
    data-slot="avatar-fallback"
    v-bind="forwarded"
    :class="
      cn(
        `flex size-full items-center justify-center rounded-full bg-[#F3F4F6] text-sm text-gray-700 group-data-[size=sm]/avatar:text-xs group-data-[size=xs]/avatar:text-xs dark:bg-[rgba(255,255,255,0.05)] dark:text-gray-400`,
        props.class,
      )
    "
  >
    <slot />
  </AvatarFallback>
</template>
