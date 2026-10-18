<script setup lang="ts">
import { SidebarGroup, SidebarGroupLabel, SidebarMenu } from '@/components/ui/sidebar'
import { HorizontalDotsIcon } from '@/icons/layout'
import { cn } from '@/utils/cn'
import SidebarMenuItem from './SidebarMenuItem.vue'
import type { MenuType, NavItem } from './types'

interface SidebarNavGroupProps {
  label: string
  menuType: MenuType
  items: NavItem[]
  openSubmenu: { type: MenuType; index: number } | null
  showContent: boolean
  pathname: string
}

defineProps<SidebarNavGroupProps>()

const emit = defineEmits<{ (e: 'toggleSubmenu', index: number, menuType: MenuType): void }>()
</script>

<template>
  <SidebarGroup class="p-0">
    <SidebarGroupLabel
      :class="
        cn(
          'mb-4 flex h-auto p-0 text-xs leading-5 text-gray-400 uppercase',
          !showContent ? 'xl:justify-center' : 'justify-start',
        )
      "
    >
      <template v-if="showContent">{{ label }}</template>
      <HorizontalDotsIcon v-else />
    </SidebarGroupLabel>
    <SidebarMenu class="gap-1">
      <SidebarMenuItem
        v-for="(nav, index) in items"
        :key="nav.name"
        :nav="nav"
        :is-open="openSubmenu?.type === menuType && openSubmenu?.index === index"
        :show-content="showContent"
        :pathname="pathname"
        @toggle="emit('toggleSubmenu', index, menuType)"
      />
    </SidebarMenu>
  </SidebarGroup>
</template>
