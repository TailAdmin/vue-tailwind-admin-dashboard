<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { DialogClose } from 'reka-ui'
import { Button } from '@/components/ui/button'
import { cn } from '@/utils/cn'

const props = withDefaults(
  defineProps<{ class?: HTMLAttributes['class']; showCloseButton?: boolean }>(),
  {
    showCloseButton: false,
  },
)
</script>

<template>
  <div
    data-slot="dialog-footer"
    :class="
      cn(
        `-mx-6 -mb-6 flex flex-col-reverse gap-3 rounded-b-2xl p-4 sm:flex-row sm:justify-end`,
        props.class,
      )
    "
  >
    <slot />
    <DialogClose v-if="showCloseButton" as-child>
      <Button variant="outline">Close</Button>
    </DialogClose>
  </div>
</template>
