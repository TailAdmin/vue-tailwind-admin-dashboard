<script setup lang="ts">
import { computed } from 'vue'
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { TableCell, TableRow } from '@/components/ui/table'
import type { Order } from './types'

export interface TableOneRowProps {
  order: Order
}

const props = defineProps<TableOneRowProps>()

const initials = computed(() =>
  props.order.user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2),
)

const colorMap: Record<string, 'success' | 'warning' | 'error' | 'gray'> = {
  Active: 'success',
  Pending: 'warning',
  Cancel: 'error',
}
</script>

<template>
  <TableRow class="transition hover:bg-gray-50/50 dark:hover:bg-white/2">
    <TableCell class="px-5 py-4 text-start sm:px-6">
      <!-- User Cell -->
      <div class="flex items-center gap-3">
        <Avatar size="default">
          <AvatarImage :src="order.user.image" :alt="order.user.name" />
          <AvatarFallback>{{ initials }}</AvatarFallback>
        </Avatar>
        <div>
          <span class="block text-sm font-medium text-gray-800 dark:text-white/90">
            {{ order.user.name }}
          </span>
          <span class="block text-xs text-gray-500 dark:text-gray-400">
            {{ order.user.role }}
          </span>
        </div>
      </div>
    </TableCell>
    <TableCell class="px-5 py-4 text-start text-sm text-gray-500 sm:px-6 dark:text-gray-400">
      {{ order.projectName }}
    </TableCell>
    <TableCell class="px-5 py-4 text-start text-sm text-gray-500 sm:px-6 dark:text-gray-400">
      <!-- Team Cell -->
      <AvatarGroup class="-space-x-2">
        <Avatar v-for="(image, index) in order.team.images" :key="index" size="xs">
          <AvatarImage :src="image" :alt="`Team member ${index + 1}`" />
          <AvatarFallback>{{ index + 1 }}</AvatarFallback>
        </Avatar>
      </AvatarGroup>
    </TableCell>
    <TableCell class="px-5 py-4 text-start text-sm text-gray-500 sm:px-6 dark:text-gray-400">
      <Badge size="sm" :color="colorMap[order.status] ?? 'gray'">
        {{ order.status }}
      </Badge>
    </TableCell>
    <TableCell class="px-5 py-4 text-start text-sm text-gray-500 sm:px-6 dark:text-gray-400">
      {{ order.budget }}
    </TableCell>
  </TableRow>
</template>
