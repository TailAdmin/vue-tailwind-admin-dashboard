<script setup lang="ts">
import { computed } from 'vue'
import { Badge } from '@/components/ui/badge'
import type { Product } from './types'

export interface OrderRowProps {
  order: Product
}

const props = defineProps<OrderRowProps>()

const categoryLabels: Record<Product['category'], string> = {
  laptop: 'Laptop',
  watch: 'Watch',
  smartphone: 'SmartPhone',
  electronics: 'Electronics',
  accessories: 'Accessories',
}

const statusLabels: Record<Product['status'], string> = {
  delivered: 'Delivered',
  pending: 'Pending',
  canceled: 'Canceled',
}

const statusColor = computed(() =>
  props.order.status === 'delivered'
    ? 'success'
    : props.order.status === 'pending'
      ? 'warning'
      : 'error',
)
</script>

<template>
  <tr>
    <td class="py-3">
      <div class="flex items-center gap-3">
        <div class="h-12.5 w-12.5 overflow-hidden rounded-md">
          <img width="50" height="50" :src="order.image" class="h-12.5 w-12.5" :alt="order.name" />
        </div>
        <div>
          <p class="text-sm font-medium text-gray-800 dark:text-white/90">
            {{ order.name }}
          </p>
          <span class="text-xs text-gray-500 dark:text-gray-400">
            {{ order.variants }} {{ order.variants === 1 ? 'Variant' : 'Variants' }}
          </span>
        </div>
      </div>
    </td>
    <td class="py-3 text-sm text-gray-500 dark:text-gray-400">
      {{ categoryLabels[order.category] }}
    </td>
    <td class="py-3 text-sm text-gray-500 dark:text-gray-400">
      {{ order.price }}
    </td>
    <td class="py-3 text-sm text-gray-500 dark:text-gray-400">
      <Badge size="sm" :color="statusColor">
        {{ statusLabels[order.status] }}
      </Badge>
    </td>
  </tr>
</template>
