<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'
import { TagsInputItem, TagsInputItemDelete, TagsInputItemText, useForwardProps } from 'reka-ui'
import type { TagsInputItemProps } from 'reka-ui'
import { Button } from '@/components/ui/button'
import { XIcon } from '@/icons/layout'
import { cn } from '@/utils/cn'

const props = withDefaults(
  defineProps<TagsInputItemProps & { class?: HTMLAttributes['class']; showRemove?: boolean }>(),
  {
    showRemove: true,
  },
)

const delegated = computed(() => {
  const { class: _class, showRemove: _showRemove, ...rest } = props
  return rest
})
const forwarded = useForwardProps(delegated)
</script>

<template>
  <TagsInputItem
    data-slot="combobox-chip"
    v-bind="forwarded"
    :class="
      cn(
        `flex h-7 w-fit items-center justify-center gap-1.5 rounded-md bg-gray-100 ps-2.5 pe-1 text-xs font-medium text-gray-700 select-none has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:opacity-50 dark:bg-white/5 dark:text-gray-300`,
        props.class,
      )
    "
  >
    <TagsInputItemText>
      <slot />
    </TagsInputItemText>
    <TagsInputItemDelete
      v-if="showRemove"
      data-slot="combobox-chip-remove"
      class="inline-flex items-center justify-center text-gray-400 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
      as-child
    >
      <Button
        variant="ghost"
        size="icon-xs"
        class="size-5 rounded-sm p-0 text-gray-400 hover:bg-gray-200/60 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-gray-200"
      >
        <XIcon class="pointer-events-none size-3.5" />
      </Button>
    </TagsInputItemDelete>
  </TagsInputItem>
</template>
