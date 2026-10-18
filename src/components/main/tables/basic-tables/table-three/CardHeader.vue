<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { CardTitle } from '@/components/ui/card'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { CalendarIcon, SearchIcon } from '@/icons/layout'
import { cn } from '@/utils/cn'

export interface CardHeaderProps {
  searchQuery?: string
  className?: string
}

withDefaults(defineProps<CardHeaderProps>(), {
  searchQuery: '',
  className: undefined,
})

const emit = defineEmits<{
  (e: 'searchChange', value: string): void
}>()
</script>

<template>
  <div
    :class="
      cn(
        'flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6',
        className,
      )
    "
  >
    <div>
      <CardTitle class="text-lg font-semibold text-gray-800 dark:text-white/90">
        Latest Transactions
      </CardTitle>
    </div>

    <div class="flex w-full items-center gap-3 sm:w-auto">
      <InputGroup class="h-10 flex-1 sm:w-75 sm:flex-initial">
        <InputGroupAddon align="inline-start">
          <SearchIcon class="size-5 text-gray-400" />
        </InputGroupAddon>
        <InputGroupInput
          type="text"
          placeholder="Search..."
          :model-value="searchQuery"
          @update:model-value="(value) => emit('searchChange', String(value ?? ''))"
        />
      </InputGroup>

      <Button
        variant="outline"
        class="h-10 shrink-0 px-3.5 text-gray-700 sm:px-4 sm:py-2.5 dark:text-gray-300"
      >
        <CalendarIcon class="size-5" />
        <span class="hidden sm:inline">05 Feb - 06 March</span>
      </Button>
    </div>
  </div>
</template>
