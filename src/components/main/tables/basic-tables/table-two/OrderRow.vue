<script setup lang="ts">
import { computed } from 'vue'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { TableCell, TableRow } from '@/components/ui/table'
import { TrashBinIcon } from '@/icons/layout'
import { cn } from '@/utils/cn'
import type { CrmOrder, DealStatus } from './types'

export interface OrderRowProps {
  order: CrmOrder
  isSelected: boolean
  onSelect: (id: string) => void
  onDelete?: (id: string) => void
}

const statusBadgeConfig: Record<
  DealStatus,
  { label: string; color: 'success' | 'warning' | 'error' }
> = {
  complete: { label: 'Complete', color: 'success' },
  pending: { label: 'Pending', color: 'warning' },
  cancel: { label: 'Cancel', color: 'error' },
}

const props = defineProps<OrderRowProps>()

const statusConfig = computed(
  () =>
    statusBadgeConfig[props.order.status] ?? {
      label: props.order.status,
      color: 'warning' as const,
    },
)
</script>

<template>
  <TableRow>
    <TableCell class="px-6 py-4 text-start">
      <div class="flex items-center gap-3">
        <Checkbox
          :checked="isSelected"
          :aria-label="`Select deal ${order.dealId}`"
          @change="onSelect(order.id)"
        />
        <span class="text-sm font-medium text-gray-700 dark:text-gray-400">
          {{ order.dealId }}
        </span>
      </div>
    </TableCell>

    <TableCell class="px-6 py-4 text-start">
      <div class="flex items-center gap-3">
        <Avatar class="size-10">
          <AvatarFallback
            :class="cn('size-full text-xs font-semibold select-none', order.user.avatarClassName)"
          >
            {{ order.user.initials }}
          </AvatarFallback>
        </Avatar>
        <div>
          <span class="block text-sm font-medium text-gray-800 dark:text-white/90">
            {{ order.user.name }}
          </span>
          <span class="block text-sm text-gray-500 dark:text-gray-400">
            {{ order.user.email }}
          </span>
        </div>
      </div>
    </TableCell>

    <TableCell class="px-6 py-4 text-start">
      <span class="text-sm text-gray-700 dark:text-gray-400">
        {{ order.productName }}
      </span>
    </TableCell>

    <TableCell class="px-6 py-4 text-start">
      <span class="text-sm text-gray-700 dark:text-gray-400">
        {{ order.dealValue }}
      </span>
    </TableCell>

    <TableCell class="px-6 py-4 text-start">
      <span class="text-sm text-gray-700 dark:text-gray-400">
        {{ order.closeDate }}
      </span>
    </TableCell>

    <TableCell class="px-6 py-4 text-start">
      <Badge variant="light" size="sm" :color="statusConfig.color">
        {{ statusConfig.label }}
      </Badge>
    </TableCell>

    <TableCell class="px-6 py-4 text-center">
      <Button
        variant="ghost"
        size="icon-xs"
        class="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-500"
        aria-label="Delete order"
        @click="onDelete?.(order.id)"
      >
        <TrashBinIcon class="size-5" />
      </Button>
    </TableCell>
  </TableRow>
</template>
