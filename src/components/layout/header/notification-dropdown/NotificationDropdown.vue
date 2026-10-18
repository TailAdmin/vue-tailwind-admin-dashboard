<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ScrollArea } from '@/components/ui/scroll-area'
import { BellIcon, DotIcon, XIcon } from '@/icons/layout'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/utils/cn'
import { getInitials } from '@/utils/get-initials'
import { notifications } from './data'

const isOpen = ref(false)
const notifying = ref(true)

const handleOpenChange = (open: boolean) => {
  isOpen.value = open
  if (open) {
    notifying.value = false
  }
}
</script>

<template>
  <DropdownMenu :open="isOpen" @update:open="handleOpenChange">
    <DropdownMenuTrigger
      :class="buttonVariants({ variant: 'outline', size: 'icon-lg', class: 'relative' })"
      aria-label="Toggle notifications"
    >
      <span
        :class="
          cn(
            'absolute end-0 -top-0.5 z-10 h-2 w-2 translate-x-1/2 rounded-full bg-orange-400',
            !notifying ? 'hidden' : 'flex',
          )
        "
      >
        <span
          class="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"
        />
      </span>
      <BellIcon class="size-auto!" />
    </DropdownMenuTrigger>

    <DropdownMenuContent
      align="end"
      :side-offset="12"
      class="w-87.5 overflow-hidden p-3 sm:w-90.25 dark:bg-[#1E2635]"
    >
      <div class="flex items-center justify-between pb-3">
        <h5 class="text-lg font-semibold text-gray-800 dark:text-gray-200">Notification</h5>
        <Button
          variant="ghost"
          size="icon-xs"
          aria-label="Close notifications"
          @click="isOpen = false"
        >
          <XIcon class="size-5" />
        </Button>
      </div>

      <DropdownMenuSeparator class="my-0" />

      <ScrollArea class="h-96">
        <div class="flex flex-col pe-2">
          <template v-for="item in notifications" :key="item.id">
            <DropdownMenuItem
              class="flex items-start gap-3 rounded-lg p-3 hover:bg-gray-100 dark:hover:bg-white/5"
            >
              <Avatar size="default">
                <AvatarImage :src="item.avatar" :alt="item.name" />
                <AvatarFallback>{{ getInitials(item.name) }}</AvatarFallback>
                <AvatarBadge :variant="item.status" />
              </Avatar>
              <span class="block flex-1 text-start">
                <span class="mb-1.5 block space-x-1 text-sm text-gray-500 dark:text-gray-400">
                  <span class="font-medium text-gray-800 dark:text-white/90">
                    {{ item.name }}
                  </span>
                  <span>{{ item.action }}</span>
                  <span class="font-medium text-gray-800 dark:text-white/90">
                    {{ item.project }}
                  </span>
                </span>
                <span class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <span>Project</span>
                  <DotIcon class="size-2 text-gray-400 dark:text-gray-500" />
                  <span>{{ item.time }}</span>
                </span>
              </span>
            </DropdownMenuItem>
            <DropdownMenuSeparator
              class="my-0.5 bg-gray-100 last-of-type:hidden dark:bg-gray-700"
            />
          </template>
        </div>
      </ScrollArea>

      <RouterLink
        to="/"
        :class="buttonVariants({ variant: 'outline', size: 'default', class: 'mt-3 w-full' })"
        @click="isOpen = false"
      >
        View All Notifications
      </RouterLink>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
