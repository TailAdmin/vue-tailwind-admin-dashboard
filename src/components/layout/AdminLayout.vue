<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { cn } from '@/utils/cn'
import AppHeader from './app-layout/header/AppHeader.vue'
import AppSidebar from './app-layout/sidebar/AppSidebar.vue'

const route = useRoute()

const isAiRoute = computed(
  () => route.path.startsWith('/ai-chat') || route.path.startsWith('/ai-settings'),
)

// Route-specific styles for the main content container
const routeSpecificStyles = computed(() =>
  isAiRoute.value
    ? 'flex-1 min-h-0 flex flex-col'
    : 'p-4 mx-auto w-full max-w-(--breakpoint-2xl) md:p-6',
)
</script>

<template>
  <SidebarProvider :class="cn(isAiRoute && 'h-svh overflow-hidden')">
    <AppSidebar />

    <SidebarInset :class="cn(isAiRoute && 'h-svh overflow-hidden')">
      <AppHeader />

      <div :class="routeSpecificStyles">
        <slot />
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
