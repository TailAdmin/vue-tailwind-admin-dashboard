<script setup lang="ts">
import type { Component } from 'vue'
import { computed } from 'vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import {
  AmazonIcon,
  AppleIcon,
  EnvatoIcon,
  HorizontalDotsIcon,
  NetflixIcon,
  PaypalIcon,
  SpotifyIcon,
  TeslaIcon,
} from '@/icons/layout'
import { cn } from '@/utils/cn'
import type { Transaction, TransactionBrand } from './types'

interface TransactionRowProps {
  transaction: Transaction
}

const brandConfig: Record<
  TransactionBrand,
  { icon: Component; iconClass: string; bgClass: string }
> = {
  paypal: { icon: PaypalIcon, iconClass: 'size-4', bgClass: 'bg-[#1b4bf1] text-white' },
  apple: {
    icon: AppleIcon,
    iconClass: 'size-4 text-white dark:text-black',
    bgClass: 'bg-black dark:bg-white',
  },
  netflix: { icon: NetflixIcon, iconClass: 'size-4', bgClass: 'bg-black text-white' },
  tesla: { icon: TeslaIcon, iconClass: 'size-4 text-white', bgClass: 'bg-[#E82127]' },
  amazon: { icon: AmazonIcon, iconClass: 'size-4.5 text-white', bgClass: 'bg-black' },
  spotify: { icon: SpotifyIcon, iconClass: 'size-4 text-white', bgClass: 'bg-[#1DB954]' },
  envato: { icon: EnvatoIcon, iconClass: 'size-3.5 text-white', bgClass: 'bg-[#82B541]' },
}

const props = defineProps<TransactionRowProps>()

const brand = computed(() => brandConfig[props.transaction.brand])

const badgeColor = computed(() => {
  const status = props.transaction.status.toLowerCase()
  return status === 'success' ? 'success' : status === 'pending' ? 'warning' : 'error'
})
</script>

<template>
  <TableRow class="h-16 border-b border-gray-100 dark:border-gray-800">
    <TableCell class="min-w-44 py-3 ps-5 text-start sm:ps-6">
      <div class="flex items-center gap-3">
        <div
          :class="
            cn(
              'flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full',
              brand?.bgClass,
            )
          "
        >
          <component :is="brand.icon" v-if="brand" :class="brand.iconClass" />
        </div>
        <span class="text-sm font-medium whitespace-nowrap text-gray-800 dark:text-white/90">
          {{ transaction.name }}
        </span>
      </div>
    </TableCell>
    <TableCell
      class="min-w-44 px-4 py-3 text-start text-sm whitespace-nowrap text-gray-700 dark:text-gray-400"
    >
      {{ transaction.date }}
    </TableCell>
    <TableCell
      class="min-w-32 px-4 py-3 text-start text-sm whitespace-nowrap text-gray-700 dark:text-gray-400"
    >
      {{ transaction.price }}
    </TableCell>
    <TableCell
      class="min-w-36 px-4 py-3 text-start text-sm whitespace-nowrap text-gray-700 dark:text-gray-400"
    >
      {{ transaction.category }}
    </TableCell>
    <TableCell class="min-w-28 px-4 py-3 text-start text-sm whitespace-nowrap">
      <Badge size="sm" :color="badgeColor">
        {{ transaction.status }}
      </Badge>
    </TableCell>
    <TableCell class="min-w-16 py-3 pe-5 text-end whitespace-nowrap sm:pe-6">
      <Button size="icon-sm" variant="ghost" aria-label="More options">
        <HorizontalDotsIcon class="size-5" />
      </Button>
    </TableCell>
  </TableRow>
</template>
