<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'
import { RadioGroupRoot, useForwardPropsEmits } from 'reka-ui'
import type { RadioGroupRootProps, RadioGroupRootEmits } from 'reka-ui'
import { cn } from '@/utils/cn'

const props = defineProps<RadioGroupRootProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<RadioGroupRootEmits>()
const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardPropsEmits(delegated, emits)
</script>

<template>
  <RadioGroupRoot
    data-slot="radio-group"
    v-bind="forwarded"
    :class="cn(`grid w-full gap-2`, props.class)"
  >
    <slot />
  </RadioGroupRoot>
</template>
