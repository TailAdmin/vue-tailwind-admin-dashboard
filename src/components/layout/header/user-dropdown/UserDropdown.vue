<script setup lang="ts">
import { computed, ref } from 'vue'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useRTL } from '@/composables/useRTL'
import {
  ChevronDownIcon,
  GearIcon,
  GlobeIcon,
  InfoCircleIcon,
  LogOutIcon,
  UserCircleIcon,
} from '@/icons/layout'
import { cn } from '@/utils/cn'

interface Language {
  id: string
  name: string
  shortName: string
  flag: string
  dir: 'ltr' | 'rtl'
  badge?: string
}

const languages: Language[] = [
  { id: 'en', name: 'English', shortName: 'English', flag: 'flag-us.svg', dir: 'ltr' },
  {
    id: 'ar',
    name: 'Arabic (Saudi)',
    shortName: 'Arabic',
    flag: 'flag-sa.svg',
    dir: 'rtl',
    badge: 'RTL',
  },
  { id: 'es', name: 'Español', shortName: 'Español', flag: 'flag-es.svg', dir: 'ltr' },
  { id: 'de', name: 'Deutsch', shortName: 'Deutsch', flag: 'flag-de.svg', dir: 'ltr' },
]

const { isRtl, setRTL } = useRTL()
const isOpen = ref(false)
const currentLocale = ref<string>(isRtl.value ? 'ar' : 'en')
const currentLang = computed<Language>(
  () => languages.find((l) => l.id === currentLocale.value) ?? languages[0],
)

const handleSelectLanguage = (id: string) => {
  const language = languages.find((l) => l.id === id)
  if (!language) return
  currentLocale.value = id
  setRTL(language.dir === 'rtl')
}
</script>

<template>
  <DropdownMenu :open="isOpen" @update:open="isOpen = $event">
    <DropdownMenuTrigger class="dropdown-toggle flex items-center text-gray-700 dark:text-gray-400">
      <span class="me-3 h-11 w-11 overflow-hidden rounded-lg">
        <img width="44" height="44" src="/images/user/owner.png" alt="User" />
      </span>

      <span class="me-1 block text-sm font-medium">Musharof</span>

      <ChevronDownIcon
        :class="
          cn(
            'size-5 text-gray-500 duration-200 dark:text-gray-400',
            isOpen ? 'rotate-180' : 'rotate-0',
          )
        "
      />
    </DropdownMenuTrigger>

    <DropdownMenuContent align="end" :side-offset="12" class="w-65 p-3">
      <div class="px-3 py-2">
        <span class="block text-sm font-medium text-gray-700 dark:text-gray-400">
          Musharof Chowdhury
        </span>
        <span class="mt-0.5 block text-xs text-gray-500 dark:text-gray-400">
          randomuser@pimjo.com
        </span>
      </div>

      <DropdownMenuSeparator />

      <DropdownMenuItem to="/profile">
        <UserCircleIcon class="size-6" />
        Edit profile
      </DropdownMenuItem>

      <DropdownMenuItem to="/profile">
        <GearIcon class="size-6" />
        Account settings
      </DropdownMenuItem>

      <DropdownMenuItem to="/profile">
        <InfoCircleIcon class="size-6" />
        Support
      </DropdownMenuItem>

      <DropdownMenuSub>
        <DropdownMenuSubTrigger show-icon>
          <GlobeIcon class="size-6" />
          <span>Language</span>
          <Badge
            variant="light"
            color="gray"
            size="sm"
            class="ms-auto me-1 h-auto gap-1.5 border border-gray-200 bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700 text-shadow-none dark:border-gray-800 dark:bg-white/3 dark:text-gray-300 dark:text-shadow-none [&>img]:size-3.5"
          >
            <span>{{ currentLang.shortName }}</span>
            <img
              :src="`/images/icons/${currentLang.flag}`"
              :alt="currentLang.name"
              class="size-3.5 shrink-0 overflow-hidden rounded-full"
            />
          </Badge>
        </DropdownMenuSubTrigger>

        <DropdownMenuPortal>
          <DropdownMenuSubContent class="w-56 p-2">
            <DropdownMenuItem
              v-for="language in languages"
              :key="language.id"
              :class="
                cn(
                  'flex items-center justify-between gap-2',
                  currentLocale === language.id &&
                    'bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400',
                )
              "
              @click="handleSelectLanguage(language.id)"
            >
              <span class="flex items-center gap-2">
                <span
                  :class="
                    cn(
                      'size-1.5 shrink-0 rounded-full transition-opacity',
                      currentLocale === language.id
                        ? 'bg-brand-500 opacity-100 dark:bg-brand-400'
                        : 'opacity-0',
                    )
                  "
                />
                <img
                  :src="`/images/icons/${language.flag}`"
                  :alt="language.name"
                  class="size-5 shrink-0 overflow-hidden rounded-full"
                />
                <span class="truncate">{{ language.name }}</span>
              </span>

              <Badge v-if="language.badge" variant="light" color="warning" class="rounded text-xs">
                {{ language.badge }}
              </Badge>
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuPortal>
      </DropdownMenuSub>

      <DropdownMenuSeparator />

      <DropdownMenuItem variant="destructive" to="/signin">
        <LogOutIcon />
        Sign out
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
