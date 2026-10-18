<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { useTheme } from '@/composables/useTheme'
import { MoonIcon, SunIcon } from '@/icons/layout'

const { toggleTheme } = useTheme()
</script>

<template>
  <Button class="size-14 rounded-full" @click="toggleTheme">
    <MoonIcon class="block dark:hidden" />
    <SunIcon class="hidden dark:block" />
  </Button>
</template>
