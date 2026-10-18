<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'
import { AvatarImage, useForwardPropsEmits } from 'reka-ui'
import type { AvatarImageProps, AvatarImageEmits } from 'reka-ui'
import { cn } from '@/utils/cn'

const props = defineProps<AvatarImageProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<AvatarImageEmits>()
const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardPropsEmits(delegated, emits)
</script>

<template>
  <AvatarImage
    data-slot="avatar-image"
    v-bind="forwarded"
    :class="cn(`aspect-square size-full rounded-full object-cover`, props.class)"
  >
  </AvatarImage>
</template>
