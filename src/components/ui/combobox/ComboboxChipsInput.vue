<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'
import { ComboboxInput, TagsInputInput, useForwardPropsEmits } from 'reka-ui'
import type { ComboboxInputEmits, ComboboxInputProps } from 'reka-ui'
import { cn } from '@/utils/cn'

const props = defineProps<ComboboxInputProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<ComboboxInputEmits>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardPropsEmits(delegated, emits)
</script>

<template>
  <ComboboxInput v-bind="forwarded" as-child>
    <TagsInputInput
      data-slot="combobox-chip-input"
      :class="
        cn(
          `min-w-16 flex-1 bg-transparent py-1 text-sm font-normal text-gray-800 outline-none placeholder:text-gray-400 dark:text-white/90 dark:placeholder:text-gray-500`,
          props.class,
        )
      "
    />
  </ComboboxInput>
</template>
