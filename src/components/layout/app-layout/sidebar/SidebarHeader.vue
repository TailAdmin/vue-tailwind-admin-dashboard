<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { SidebarHeader } from '@/components/ui/sidebar'

interface AppSidebarHeaderProps {
  showContent: boolean
}

defineProps<AppSidebarHeaderProps>()
</script>

<template>
  <SidebarHeader class="px-5 py-8">
    <RouterLink to="/">
      <template v-if="showContent">
        <img
          class="dark:hidden"
          src="/images/logo/logo.svg"
          alt="Logo"
          width="150"
          height="40"
          :style="{ width: 'auto', height: 'auto' }"
        />
        <img
          class="hidden dark:block"
          src="/images/logo/logo-dark.svg"
          alt="Logo"
          width="150"
          height="40"
          :style="{ width: 'auto', height: 'auto' }"
        />
      </template>
      <img
        v-else
        src="/images/logo/logo-icon.svg"
        alt="Logo"
        width="32"
        height="32"
        :style="{ width: 'auto', height: 'auto' }"
      />
    </RouterLink>
  </SidebarHeader>
</template>
