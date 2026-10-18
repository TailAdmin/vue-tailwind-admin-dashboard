<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { useSidebar } from '@/composables/useSidebar'
import { HorizontalDotsIcon, MenuTwoIcon, SearchIcon, XIcon } from '@/icons/layout'
import NotificationDropdown from '../../header/notification-dropdown/NotificationDropdown.vue'
import ThemeToggleButton from '../../header/theme-toggler/ThemeToggler.vue'
import UserDropdown from '../../header/user-dropdown/UserDropdown.vue'
import { cn } from '@/utils/cn'

const inputRef = ref<InstanceType<typeof InputGroupInput> | null>(null)
const isApplicationMenuOpen = ref(false)
const { openMobile, toggleSidebar } = useSidebar()

const toggleApplicationMenu = () => {
  isApplicationMenuOpen.value = !isApplicationMenuOpen.value
}

const handleKeyDown = (event: KeyboardEvent) => {
  if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
    event.preventDefault()
    inputRef.value?.focus()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeyDown)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <header
    class="sticky top-0 z-50 flex w-full shrink-0 border-gray-200 bg-white xl:border-b dark:border-gray-800 dark:bg-gray-900"
  >
    <div class="flex grow flex-col items-center justify-between xl:flex-row xl:px-6">
      <!-- Left side content -->
      <div
        class="flex w-full items-center justify-between gap-2 border-b border-gray-200 px-3 py-3 sm:gap-4 xl:justify-normal xl:border-b-0 xl:px-0 xl:py-4 dark:border-gray-800"
      >
        <Button
          variant="outline"
          size="icon"
          class="text-gray-500 lg:size-11 dark:text-gray-400"
          aria-label="Toggle Sidebar"
          @click="toggleSidebar"
        >
          <XIcon v-if="openMobile" class="size-6" />
          <MenuTwoIcon v-else class="size-auto! rtl:-scale-x-100" />
        </Button>

        <RouterLink to="/" class="xl:hidden">
          <img width="154" height="32" class="dark:hidden" src="/images/logo/logo.svg" alt="Logo" />
          <img
            width="154"
            height="32"
            class="hidden dark:block"
            src="/images/logo/logo-dark.svg"
            alt="Logo"
          />
        </RouterLink>

        <Button
          variant="ghost"
          size="icon"
          aria-label="Toggle application menu"
          class="text-gray-700 xl:hidden dark:text-gray-400"
          @click="toggleApplicationMenu"
        >
          <HorizontalDotsIcon />
        </Button>

        <div class="hidden xl:block">
          <form @submit.prevent>
            <Field class="xl:w-107.5">
              <InputGroup
                class="border-gray-200 bg-transparent dark:border-gray-800 dark:bg-white/3"
              >
                <InputGroupAddon align="inline-start">
                  <SearchIcon class="size-5 text-gray-500 dark:text-gray-400" />
                </InputGroupAddon>
                <InputGroupInput
                  ref="inputRef"
                  type="text"
                  placeholder="Search or type command..."
                  class="text-gray-800 placeholder:text-gray-400 dark:text-white/90 dark:placeholder:text-white/30"
                />
                <InputGroupAddon align="inline-end">
                  <Badge
                    variant="light"
                    color="gray"
                    size="sm"
                    class="cursor-pointer gap-0.5 rounded-lg border border-gray-200 bg-gray-50 px-1.75 py-[4.5px] text-xs tracking-[-0.2px] text-gray-500 shadow-none dark:border-gray-800 dark:bg-white/3 dark:text-gray-400"
                  >
                    <span>⌘</span>
                    <span>K</span>
                  </Badge>
                </InputGroupAddon>
              </InputGroup>
            </Field>
          </form>
        </div>
      </div>

      <!-- Right side content -->
      <div
        :class="
          cn(
            'flex w-full items-center justify-between gap-4 px-5 py-4 shadow-theme-md xl:flex xl:justify-end xl:px-0 xl:shadow-none',
            isApplicationMenuOpen ? 'flex' : 'hidden',
          )
        "
      >
        <div class="2xsm:gap-3 flex items-center gap-2">
          <ThemeToggleButton />

          <NotificationDropdown />
        </div>
        <UserDropdown />
      </div>
    </div>
  </header>
</template>
