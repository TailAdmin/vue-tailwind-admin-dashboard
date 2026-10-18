<script setup lang="ts">
import { computed } from 'vue'
import { Badge } from '@/components/ui/badge'
import { TableCell, TableRow } from '@/components/ui/table'
import type { Campaign } from './types'

export interface CampaignRowProps {
  campaign: Campaign
}

const props = defineProps<CampaignRowProps>()

const badgeColor = computed(() => {
  const status = props.campaign.status.toLowerCase()
  return status === 'success' ? 'success' : status === 'pending' ? 'warning' : 'error'
})
</script>

<template>
  <TableRow>
    <TableCell class="py-3">
      <div class="flex items-center gap-4.5">
        <div class="h-10 w-10 overflow-hidden rounded-full">
          <img width="40" height="40" :src="campaign.creator.image" :alt="campaign.creator.name" />
        </div>
        <div>
          <p class="text-sm text-gray-700 dark:text-gray-400">
            {{ campaign.creator.name }}
          </p>
        </div>
      </div>
    </TableCell>
    <TableCell class="py-3">
      <div class="flex w-full items-center gap-5">
        <div class="w-full max-w-8">
          <img width="40" height="40" :src="campaign.campaign.image" alt="brand" />
        </div>
        <div class="truncate">
          <p class="mb-0.5 truncate text-sm font-medium text-gray-700 dark:text-gray-400">
            {{ campaign.campaign.name }}
          </p>
          <span class="text-xs text-gray-500 dark:text-gray-400">
            {{ campaign.campaign.type }}
          </span>
        </div>
      </div>
    </TableCell>
    <TableCell class="py-3">
      <Badge size="sm" :color="badgeColor">
        {{ campaign.status }}
      </Badge>
    </TableCell>
  </TableRow>
</template>
