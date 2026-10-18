<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { cn } from '@/utils/cn'
import type { SubItem } from './types'

interface SidebarSubmenuItemProps {
  subItem: SubItem
  isActive: boolean
}

defineProps<SidebarSubmenuItemProps>()
</script>

<template>
  <li>
    <RouterLink
      :to="subItem.path"
      :target="subItem.target"
      :class="
        cn(
          'group menu-dropdown-item',
          isActive ? 'menu-dropdown-item-active' : 'menu-dropdown-item-inactive',
        )
      "
    >
      {{ subItem.name }}
      <span class="ms-auto flex items-center gap-1">
        <span
          v-if="subItem.new"
          :class="
            cn(
              'ms-auto menu-dropdown-badge',
              isActive ? 'menu-dropdown-badge-active' : 'menu-dropdown-badge-inactive',
            )
          "
        >
          new
        </span>
        <span
          v-if="subItem.pro"
          :class="
            cn(
              'ms-auto menu-dropdown-badge-pro',
              isActive ? 'menu-dropdown-badge-pro-active' : 'menu-dropdown-badge-pro-inactive',
            )
          "
        >
          pro
        </span>
      </span>
    </RouterLink>
  </li>
</template>
