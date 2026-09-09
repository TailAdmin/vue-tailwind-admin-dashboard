<template>
  <div class="relative" ref="dropdownRef">
    <!-- User Button -->
    <button
      class="flex items-center text-gray-700 dark:text-gray-400 cursor-pointer"
      @click.prevent="toggleDropdown"
      type="button"
    >
      <span class="h-11 w-11 shrink-0 overflow-hidden rounded-full ltr:mr-3 rtl:ml-3">
        <img src="/images/user/owner.png" alt="User" class="h-full w-full object-cover" />
      </span>

      <span class="block font-medium text-theme-sm ltr:mr-1 rtl:ml-1">Musharof</span>

      <!-- Chevron Icon -->
      <ChevronDownIcon
        class="size-5 transition-transform duration-200 text-gray-500 dark:text-gray-400"
        :class="{ 'rotate-180': dropdownOpen }"
      />
    </button>

    <!-- Dropdown Start -->
    <div
      v-if="dropdownOpen"
      class="absolute ltr:right-0 rtl:left-0 z-50 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark animate-fadeIn"
    >
      <!-- User Info -->
      <div>
        <span class="block font-medium text-gray-700 text-theme-sm dark:text-gray-400">
          Musharof Chowdhury
        </span>
        <span class="mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400">
          randomuser@pimjo.com
        </span>
      </div>

      <!-- Menu Items -->
      <ul class="flex flex-col gap-1 pt-4 pb-3 border-b border-gray-200 dark:border-gray-800">
        <li>
          <router-link
            to="/profile"
            @click="closeDropdown"
            class="group flex items-center gap-3 rounded-lg px-3 py-2 text-theme-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
          >
            <UserCircleIcon
              class="fill-gray-500 group-hover:fill-gray-700 dark:fill-gray-400 dark:group-hover:fill-gray-300"
            />
            Edit profile
          </router-link>
        </li>
        <li>
          <router-link
            to="/profile"
            @click="closeDropdown"
            class="group flex items-center gap-3 rounded-lg px-3 py-2 text-theme-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
          >
            <SettingsIcon
              class="fill-gray-500 group-hover:fill-gray-700 dark:fill-gray-400 dark:group-hover:fill-gray-300"
            />
            Account settings
          </router-link>
        </li>
        <li>
          <router-link
            to="/profile"
            @click="closeDropdown"
            class="group flex items-center gap-3 rounded-lg px-3 py-2 text-theme-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
          >
            <InfoCircleIcon
              class="fill-gray-500 group-hover:fill-gray-700 dark:fill-gray-400 dark:group-hover:fill-gray-300"
            />
            Support
          </router-link>
        </li>

        <!-- Language Submenu Item -->
        <li class="relative">
          <button
            type="button"
            @click.stop="toggleSubDropdown"
            class="group flex max-h-10 w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-theme-sm font-medium transition-colors cursor-pointer"
            :class="
              subDropdownOpen
                ? 'bg-gray-100 text-gray-900 dark:bg-white/5 dark:text-white'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300'
            "
          >
            <span class="flex items-center gap-3 text-theme-sm">
              <svg
                class="stroke-gray-500 group-hover:stroke-gray-700 dark:stroke-gray-400 dark:group-hover:stroke-gray-300"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.001 2.75C17.1091 2.75 21.2501 6.89178 21.2501 11.9999C21.2501 17.108 17.1091 21.2498 12.001 21.2498M12.001 2.75C6.89289 2.75 2.75195 6.89178 2.75195 11.9999C2.75195 17.108 6.8929 21.2498 12.001 21.2498M12.001 2.75C14.2097 2.75 16.0005 6.8914 16.0005 11.9993C16.0005 17.1073 14.2098 21.2498 12.001 21.2498M12.001 2.75C9.79226 2.75 8.00195 6.89141 8.00195 11.9994C8.00195 17.1073 9.79226 21.2498 12.001 21.2498M3.24561 8.99976H20.7544M3.24561 14.9998H20.7544"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <span>Language</span>
            </span>

            <span
              class="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-2 py-1 text-theme-xs font-medium text-gray-700 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-300"
            >
              <span>{{ currentLang.shortName }}</span>
              <img
                :src="'/images/icons/' + currentLang.flag"
                :alt="currentLang.shortName"
                class="size-3.5 shrink-0 overflow-hidden rounded-full object-cover"
              />
            </span>
          </button>

          <!-- Submenu Flyout -->
          <div
            v-if="subDropdownOpen"
            class="absolute top-11 ltr:-left-2 rtl:-right-2 z-50 w-[250px] rounded-2xl border border-gray-200 bg-white p-2 shadow-theme-lg md:top-0 ltr:md:right-[calc(100%+14px)] ltr:md:left-auto rtl:md:left-[calc(100%+14px)] rtl:md:right-auto dark:border-gray-800 dark:bg-gray-dark animate-fadeIn"
          >
            <ul class="flex flex-col gap-1">
              <li v-for="language in languages" :key="language.id">
                <button
                  type="button"
                  @click.stop="selectLanguage(language.id)"
                  class="flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-theme-sm font-medium transition-colors cursor-pointer ltr:text-left rtl:text-right"
                  :class="
                    currentLocale === language.id
                      ? 'bg-brand-50 text-brand-500 dark:bg-brand-500/15 dark:text-brand-400'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white'
                  "
                >
                  <span class="flex items-center gap-2">
                    <span
                      class="size-1.5 shrink-0 rounded-full transition-opacity"
                      :class="
                        currentLocale === language.id
                          ? 'bg-brand-500 opacity-100 dark:bg-brand-400'
                          : 'opacity-0'
                      "
                    ></span>
                    <img
                      :src="'/images/icons/' + language.flag"
                      :alt="language.name"
                      class="size-5 shrink-0 overflow-hidden rounded-full object-cover"
                    />
                    <span class="truncate">{{ language.name }}</span>
                  </span>

                  <span
                    v-if="language.badge"
                    class="rounded bg-warning-50 px-1.5 py-0.5 text-theme-xs font-semibold text-warning-600 dark:bg-warning-500/15 dark:text-warning-400"
                  >
                    {{ language.badge }}
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </li>
      </ul>

      <!-- Sign Out -->
      <router-link
        to="/signin"
        @click="signOut"
        class="group mt-3 flex w-full items-center justify-center gap-3 rounded-lg border border-gray-200 px-3 py-2 text-theme-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
      >
        Sign out
      </router-link>
    </div>
    <!-- Dropdown End -->
  </div>
</template>

<script setup lang="ts">
import { UserCircleIcon, ChevronDownIcon, SettingsIcon, InfoCircleIcon } from '@/icons'
import { RouterLink } from 'vue-router'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRTL } from '@/composables/useRTL'

interface Language {
  id: string
  name: string
  shortName: string
  flag: string
  dir: 'ltr' | 'rtl'
  badge?: string
}

const languages: Language[] = [
  {
    id: 'en',
    name: 'English',
    shortName: 'English',
    flag: 'flag-us.svg',
    dir: 'ltr',
  },
  {
    id: 'ar',
    name: 'Arabic (Saudi)',
    shortName: 'Arabic',
    flag: 'flag-sa.svg',
    dir: 'rtl',
    badge: 'RTL',
  },
  {
    id: 'es',
    name: 'Español',
    shortName: 'Español',
    flag: 'flag-es.svg',
    dir: 'ltr',
  },
  {
    id: 'de',
    name: 'Deutsch',
    shortName: 'Deutsch',
    flag: 'flag-de.svg',
    dir: 'ltr',
  },
]

const { isRtl, setRTL } = useRTL()

const currentLocale = ref<string>(isRtl.value ? 'ar' : 'en')
const dropdownOpen = ref(false)
const subDropdownOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

const currentLang = computed<Language>(() => {
  return languages.find((l) => l.id === currentLocale.value) || languages[0]
})

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
  if (!dropdownOpen.value) {
    subDropdownOpen.value = false
  }
}

const closeDropdown = () => {
  dropdownOpen.value = false
  subDropdownOpen.value = false
}

const toggleSubDropdown = () => {
  subDropdownOpen.value = !subDropdownOpen.value
}

const selectLanguage = (localeId: string) => {
  currentLocale.value = localeId
  const selected = languages.find((l) => l.id === localeId)
  if (selected?.dir === 'rtl') {
    setRTL(true)
  } else {
    setRTL(false)
  }
  closeDropdown()
}

const signOut = () => {
  console.log('Signing out...')
  closeDropdown()
}

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    closeDropdown()
  }
}

onMounted(() => {
  if (isRtl.value) {
    currentLocale.value = 'ar'
  }
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
