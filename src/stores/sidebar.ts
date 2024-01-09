import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSidebarStore = defineStore('sidebar', () => {
  const isSidebarOpen = ref(false)
  const selected = useStorage('selected', ref('Dashboard'))
  const page = useStorage('page', ref('eCommerce'))

  function toggleSidebar() {
    isSidebarOpen.value = !isSidebarOpen.value
  }

  function navigateToDashboard(routeName: any, submenu: any) {
    if (selected.value !== routeName) {
      selected.value = submenu
      page.value = routeName
    } else {
      selected.value = routeName
      page.value = routeName
    }
    isSidebarOpen.value = false
  }

  return { isSidebarOpen, toggleSidebar, selected, page, navigateToDashboard }
})
