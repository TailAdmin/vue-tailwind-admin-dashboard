<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { useTheme } from '@/composables/useTheme'
import { MoonIcon, SunIcon } from '@/icons/layout'

const { toggleTheme, isDarkMode } = useTheme()
</script>

<template>
  <Button
    variant="outline"
    size="icon-lg"
    class="relative"
    aria-label="Toggle theme"
    @click="toggleTheme"
  >
    <SunIcon v-if="isDarkMode" />
    <MoonIcon v-else />
  </Button>
</template>
