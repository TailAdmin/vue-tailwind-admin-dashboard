<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'
import { AvatarRoot, useForwardProps } from 'reka-ui'
import type { AvatarRootProps } from 'reka-ui'
import { cn } from '@/utils/cn'

const props = withDefaults(
  defineProps<
    AvatarRootProps & {
      class?: HTMLAttributes['class']
      size?: 'default' | 'xs' | 'sm' | 'lg' | 'xl'
    }
  >(),
  {
    size: 'default',
  },
)

const delegated = computed(() => {
  const { class: _class, size: _size, ...rest } = props
  return rest
})
const forwarded = useForwardProps(delegated)
</script>

<template>
  <AvatarRoot
    data-slot="avatar"
    :data-size="size"
    v-bind="forwarded"
    :class="
      cn(
        `group/avatar relative flex size-10 shrink-0 rounded-full select-none data-[size=lg]:size-12 data-[size=sm]:size-8 data-[size=xl]:size-14 data-[size=xs]:size-6 dark:after:mix-blend-lighten`,
        props.class,
      )
    "
  >
    <slot />
  </AvatarRoot>
</template>
