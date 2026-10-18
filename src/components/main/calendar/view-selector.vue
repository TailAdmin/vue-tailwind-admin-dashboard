<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { cn } from '@/utils/cn'
import { CALENDAR_VIEW_OPTIONS } from './types'

export interface CalendarViewSelectProps {
  currentView: string
  portalNode: Element | null
}

const props = defineProps<CalendarViewSelectProps>()
const emit = defineEmits<{
  (e: 'viewChange', viewKey: string): void
}>()

const isOpen = ref(false)
const dropdownRef = ref<HTMLDivElement | null>(null)

const activeOption = computed(
  () =>
    CALENDAR_VIEW_OPTIONS.find((v) => v.key === props.currentView) ||
    CALENDAR_VIEW_OPTIONS.find((v) => v.key === 'dayGridMonth') ||
    CALENDAR_VIEW_OPTIONS[1],
)

const handleSelect = (viewKey: string) => {
  emit('viewChange', viewKey)
  isOpen.value = false
}

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <Teleport v-if="portalNode" :to="portalNode">
    <div ref="dropdownRef" class="calendar-view-dropdown relative">
      <button
        type="button"
        class="calendar-view-btn flex h-9 w-full min-w-18 items-center justify-center gap-1 rounded-lg border border-gray-300 ps-2.5 pe-1.5 text-xs font-medium text-gray-700 shadow-xs sm:min-w-20 sm:gap-1.5 sm:ps-3 sm:pe-2 sm:text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
        :aria-expanded="isOpen"
        aria-haspopup="listbox"
        @click.stop="isOpen = !isOpen"
      >
        <span class="calendar-view-label">{{ activeOption.label }}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          :class="
            cn(
              'calendar-view-chevron h-4 w-4 transition-transform duration-200 sm:h-4.5 sm:w-4.5',
              {
                'rotate-180': isOpen,
              },
            )
          "
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <div
        v-if="isOpen"
        class="calendar-view-menu absolute end-0 z-50 mt-1.5 w-36 max-w-[calc(100vw-32px)] space-y-0.5 rounded-xl border border-gray-200 bg-white p-1.5 shadow-lg sm:w-38 dark:border-gray-700 dark:bg-gray-900"
      >
        <button
          v-for="view in CALENDAR_VIEW_OPTIONS"
          :key="view.key"
          type="button"
          :data-view-key="view.key"
          :class="
            cn(
              'calendar-view-option w-full rounded-lg px-2.5 py-1.5 text-start text-xs text-gray-700 hover:bg-gray-100 sm:text-sm dark:text-gray-300 dark:hover:bg-white/5',
              currentView === view.key ? 'bg-gray-100 font-medium dark:bg-white/5' : 'font-normal',
            )
          "
          @click="handleSelect(view.key)"
        >
          {{ view.label }}
        </button>
      </div>
    </div>
  </Teleport>
</template>
