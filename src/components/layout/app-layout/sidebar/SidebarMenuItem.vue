<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { SidebarMenuItem as UiSidebarMenuItem } from '@/components/ui/sidebar'
import { ChevronDownIcon } from '@/icons/layout'
import { cn } from '@/utils/cn'
import SidebarSubmenuItem from './SidebarSubmenuItem.vue'
import type { NavItem } from './types'

interface SidebarMenuItemProps {
  nav: NavItem
  isOpen: boolean
  showContent: boolean
  pathname: string
}

const props = defineProps<SidebarMenuItemProps>()

const emit = defineEmits<{ (e: 'toggle'): void }>()

const isSubItemActive = (path: string) => path === props.pathname

const hasSubItems = computed(() => Boolean(props.nav.subItems?.length))
const hasActiveChild = computed(() =>
  Boolean(props.nav.subItems?.some((subItem) => isSubItemActive(subItem.path))),
)
const isDirectActive = computed(() => Boolean(props.nav.path && props.nav.path === props.pathname))
const isItemActive = computed(() =>
  hasSubItems.value ? props.isOpen || hasActiveChild.value : isDirectActive.value,
)
const isPanelOpen = computed(() => props.showContent && props.isOpen)
</script>

<template>
  <UiSidebarMenuItem>
    <Collapsible v-if="hasSubItems" :open="isPanelOpen" @update:open="emit('toggle')">
      <CollapsibleTrigger
        :class="
          cn(
            'group menu-item cursor-pointer',
            isItemActive ? 'menu-item-active' : 'menu-item-inactive',
            !showContent ? 'lg:justify-center' : 'lg:justify-start',
          )
        "
      >
        <span :class="cn(isItemActive ? 'menu-item-icon-active' : 'menu-item-icon-inactive')">
          <component :is="nav.icon" class="size-6 stroke-[1.5px]" />
        </span>
        <span v-if="showContent" class="menu-item-text">{{ nav.name }}</span>
        <span
          v-if="nav.new && showContent"
          :class="
            cn(
              'menu-dropdown-badge absolute end-10 ms-auto',
              isItemActive ? 'menu-dropdown-badge-active' : 'menu-dropdown-badge-inactive',
            )
          "
        >
          new
        </span>
        <ChevronDownIcon
          v-if="showContent"
          :class="
            cn(
              'ms-auto h-5 w-5 transition-transform duration-200',
              isOpen ? 'rotate-180 text-brand-500' : '',
            )
          "
        />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <ul class="ms-9 mt-2 space-y-1">
          <SidebarSubmenuItem
            v-for="subItem in nav.subItems"
            :key="subItem.name"
            :sub-item="subItem"
            :is-active="isSubItemActive(subItem.path)"
          />
        </ul>
      </CollapsibleContent>
    </Collapsible>
    <RouterLink
      v-else-if="nav.path"
      :to="nav.path"
      :target="nav.target"
      :class="cn('group menu-item', isItemActive ? 'menu-item-active' : 'menu-item-inactive')"
    >
      <span :class="cn(isItemActive ? 'menu-item-icon-active' : 'menu-item-icon-inactive')">
        <component :is="nav.icon" class="size-6 stroke-[1.5px]" />
      </span>
      <span v-if="showContent" class="menu-item-text">{{ nav.name }}</span>
    </RouterLink>
  </UiSidebarMenuItem>
</template>
