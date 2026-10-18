<script setup lang="ts">
import { ref, useAttrs } from 'vue'
import { cn } from '@/utils/cn'

defineOptions({ inheritAttrs: false })

const model = defineModel<string>()

const attrs = useAttrs()
const el = ref<HTMLInputElement | null>(null)

defineExpose({ focus: () => el.value?.focus() })
</script>

<template>
  <input
    ref="el"
    v-model="model"
    data-slot="input-group-control"
    v-bind="{ ...attrs, class: undefined }"
    :class="
      cn(
        'h-11 w-full min-w-0 rounded-[10px] border border-gray-300 bg-white py-2.5 ps-4 pe-4 text-sm font-normal text-gray-800 shadow-theme-xs outline-hidden transition-colors file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-gray-700 placeholder:text-gray-400 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/20 focus-visible:border-brand-300 focus-visible:ring-3 focus-visible:ring-brand-500/20 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-100/50 disabled:text-gray-400 disabled:shadow-none aria-invalid:border-red-500 aria-invalid:ring-3 aria-invalid:ring-red-500/20 focus:aria-invalid:border-red-500 focus:aria-invalid:ring-red-500/20 focus-visible:aria-invalid:border-red-500 focus-visible:aria-invalid:ring-red-500/20 data-[success=true]:border-green-500 data-[success=true]:ring-3 data-[success=true]:ring-green-500/20 focus:data-[success=true]:border-green-500 focus:data-[success=true]:ring-green-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:file:text-gray-300 dark:placeholder:text-gray-500 dark:focus:border-brand-500/40 dark:focus-visible:border-brand-500/40 dark:disabled:border-gray-800 dark:disabled:bg-gray-800/50 dark:disabled:text-gray-500 dark:aria-invalid:border-red-500/50 dark:aria-invalid:ring-red-500/40 dark:focus:aria-invalid:border-red-500/50 dark:focus:aria-invalid:ring-red-500/40 dark:focus-visible:aria-invalid:border-red-500/50 dark:focus-visible:aria-invalid:ring-red-500/40 dark:data-[success=true]:border-green-500/50 dark:data-[success=true]:ring-green-500/40 dark:focus:data-[success=true]:border-green-500/50 dark:focus:data-[success=true]:ring-green-500/40',
        'h-full flex-1 rounded-none border-0 bg-transparent shadow-none ring-0 focus:border-transparent focus:ring-0 focus:outline-hidden focus-visible:border-transparent focus-visible:ring-0 disabled:bg-transparent disabled:shadow-none aria-invalid:border-transparent aria-invalid:ring-0 focus:aria-invalid:border-transparent focus:aria-invalid:ring-0 focus-visible:aria-invalid:border-transparent focus-visible:aria-invalid:ring-0 data-[success=true]:border-transparent data-[success=true]:ring-0 focus:data-[success=true]:border-transparent focus:data-[success=true]:ring-0 dark:bg-transparent dark:focus:border-transparent dark:focus-visible:border-transparent dark:disabled:bg-transparent dark:aria-invalid:border-transparent dark:aria-invalid:ring-0 dark:focus:aria-invalid:border-transparent dark:focus:aria-invalid:ring-0 dark:data-[success=true]:border-transparent dark:data-[success=true]:ring-0',
        attrs.class as string,
      )
    "
  />
</template>
