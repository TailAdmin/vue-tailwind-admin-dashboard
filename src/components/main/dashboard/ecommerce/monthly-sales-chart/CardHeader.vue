<script setup lang="ts">
import { buttonVariants } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { HorizontalDotsIcon } from '@/icons/layout'
</script>

<template>
  <div class="flex items-center justify-between">
    <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">Monthly Sales</h3>
    <DropdownMenu>
      <DropdownMenuTrigger :class="buttonVariants({ variant: 'ghost', size: 'icon-xs' })">
        <HorizontalDotsIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" class="w-40">
        <DropdownMenuItem>View More</DropdownMenuItem>
        <DropdownMenuItem>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>
