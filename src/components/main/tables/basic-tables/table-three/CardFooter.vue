<script setup lang="ts">
import { computed } from 'vue'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { cn } from '@/utils/cn'

export interface CardFooterProps {
  currentPage?: number
  totalPages?: number
  className?: string
}

const props = withDefaults(defineProps<CardFooterProps>(), {
  currentPage: 1,
  totalPages: 10,
  className: undefined,
})

const emit = defineEmits<{
  (e: 'pageChange', page: number): void
}>()

const pages = computed<(number | 'ellipsis-start' | 'ellipsis-end')[]>(() => {
  const { totalPages, currentPage } = props
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, 'ellipsis-end', totalPages]
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      'ellipsis-start',
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ]
  }

  return [
    1,
    'ellipsis-start',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    'ellipsis-end',
    totalPages,
  ]
})

const goPrevious = () => {
  if (props.currentPage > 1) emit('pageChange', props.currentPage - 1)
}
const goNext = () => {
  if (props.currentPage < props.totalPages) emit('pageChange', props.currentPage + 1)
}
</script>

<template>
  <div :class="cn('border-t-0 px-5 py-4 sm:px-6', className)">
    <!-- Mobile Pagination (< sm) -->
    <div class="flex w-full items-center justify-between sm:hidden">
      <span class="text-sm font-medium text-gray-700 dark:text-gray-400">
        {{ currentPage }}/{{ totalPages }}
      </span>

      <div class="flex items-center gap-2">
        <PaginationPrevious
          href="#"
          size="icon"
          variant="outline"
          :disabled="currentPage <= 1"
          @click.prevent="goPrevious"
        />
        <PaginationNext
          href="#"
          size="icon"
          variant="outline"
          :disabled="currentPage >= totalPages"
          @click.prevent="goNext"
        />
      </div>
    </div>

    <!-- Desktop Pagination (>= sm) -->
    <div class="hidden sm:flex sm:items-center sm:justify-start">
      <Pagination class="mx-0 w-auto justify-start">
        <PaginationContent class="gap-1.5">
          <PaginationItem>
            <PaginationPrevious
              href="#"
              size="icon"
              variant="outline"
              :disabled="currentPage <= 1"
              @click.prevent="goPrevious"
            />
          </PaginationItem>

          <template v-for="item in pages" :key="item">
            <PaginationItem v-if="item === 'ellipsis-start' || item === 'ellipsis-end'">
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem v-else>
              <PaginationLink
                href="#"
                size="icon"
                variant="outline"
                :is-active="currentPage === item"
                @click.prevent="emit('pageChange', item)"
              >
                {{ item }}
              </PaginationLink>
            </PaginationItem>
          </template>
          <PaginationItem>
            <PaginationNext
              href="#"
              size="icon"
              variant="outline"
              :disabled="currentPage >= totalPages"
              @click.prevent="goNext"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  </div>
</template>
