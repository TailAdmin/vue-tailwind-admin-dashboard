<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Sidebar, SidebarContent, useSidebar } from '@/components/ui/sidebar'
import { navItems, othersItems } from './data'
import AppSidebarHeader from './SidebarHeader.vue'
import SidebarNavGroup from './SidebarNavGroup.vue'
import SidebarWidget from './SidebarWidget.vue'
import type { MenuType, NavItem } from './types'

const menuSections: { type: MenuType; label: string; items: NavItem[] }[] = [
  { type: 'main', label: 'Menu', items: navItems },
  { type: 'others', label: 'Others', items: othersItems },
]

const findMatchingSubmenu = (path: string) => {
  for (const section of menuSections) {
    for (let index = 0; index < section.items.length; index++) {
      const nav = section.items[index]
      if (nav.subItems?.some((subItem) => subItem.path === path)) {
        return { type: section.type, index }
      }
    }
  }
  return null
}

const route = useRoute()
const { open, isMobile, isHovered } = useSidebar()

const pathname = computed(() => route.path)

const showContent = computed(() => open.value || isHovered.value || isMobile.value)

const openSubmenu = ref<{ type: MenuType; index: number } | null>(
  findMatchingSubmenu(pathname.value),
)

watch(pathname, (path) => {
  openSubmenu.value = findMatchingSubmenu(path)
})

const handleSubmenuToggle = (index: number, menuType: MenuType) => {
  const prevOpenSubmenu = openSubmenu.value
  if (prevOpenSubmenu && prevOpenSubmenu.type === menuType && prevOpenSubmenu.index === index) {
    openSubmenu.value = null
    return
  }
  openSubmenu.value = { type: menuType, index }
}
</script>

<template>
  <Sidebar side="left" collapsible="icon">
    <AppSidebarHeader :show-content="showContent" />

    <SidebarContent class="overflow-y-auto px-5 duration-300 ease-linear">
      <nav class="mb-6">
        <div class="flex flex-col gap-4">
          <SidebarNavGroup
            v-for="section in menuSections"
            :key="section.type"
            :label="section.label"
            :menu-type="section.type"
            :items="section.items"
            :open-submenu="openSubmenu"
            :show-content="showContent"
            :pathname="pathname"
            @toggle-submenu="handleSubmenuToggle"
          />
        </div>
      </nav>
      <SidebarWidget v-if="showContent" />
    </SidebarContent>
  </Sidebar>
</template>
