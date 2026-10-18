<script setup lang="ts">
import { useAttrs } from 'vue'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/utils/cn'

defineOptions({ inheritAttrs: false })

const model = defineModel<string | number>()

const attrs = useAttrs()
</script>

<template>
  <Textarea
    v-model="model"
    data-slot="input-group-control"
    v-bind="{ ...attrs, class: undefined }"
    :class="
      cn(
        'flex-1 resize-none rounded-none border-0 bg-transparent py-2.5 shadow-none ring-0 focus:border-transparent focus:ring-0 focus:outline-hidden focus-visible:border-transparent focus-visible:ring-0 disabled:bg-transparent disabled:shadow-none aria-invalid:border-transparent aria-invalid:ring-0 focus:aria-invalid:border-transparent focus:aria-invalid:ring-0 focus-visible:aria-invalid:border-transparent focus-visible:aria-invalid:ring-0 data-[success=true]:border-transparent data-[success=true]:ring-0 focus:data-[success=true]:border-transparent focus:data-[success=true]:ring-0 dark:bg-transparent dark:focus:border-transparent dark:focus-visible:border-transparent dark:disabled:bg-transparent dark:aria-invalid:border-transparent dark:aria-invalid:ring-0 dark:focus:aria-invalid:border-transparent dark:focus:aria-invalid:ring-0 dark:data-[success=true]:border-transparent dark:data-[success=true]:ring-0',
        attrs.class as string,
      )
    "
  />
</template>
