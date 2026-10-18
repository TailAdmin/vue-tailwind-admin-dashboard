<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { useSidebar } from '@/composables/useSidebar'
import { cn } from '@/utils/cn'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    side?: 'left' | 'right'
    variant?: 'sidebar' | 'floating' | 'inset'
    collapsible?: 'offcanvas' | 'icon' | 'none'
  }>(),
  {
    side: 'left',
    variant: 'sidebar',
    collapsible: 'offcanvas',
  },
)

const attrs = useAttrs()
const { isMobile, state, openMobile, setOpenMobile, isHovered, setIsHovered } = useSidebar()

// When hovered on collapsed desktop sidebar, temporarily act as expanded
const effectiveState = computed(() =>
  !isMobile.value && isHovered.value && state.value === 'collapsed' ? 'expanded' : state.value,
)

const isFloatingOrInset = computed(() => props.variant === 'floating' || props.variant === 'inset')
</script>

<template>
  <!-- collapsible="none" -->
  <div
    v-if="collapsible === 'none'"
    data-slot="sidebar"
    :class="
      cn(
        'flex h-full w-(--sidebar-width) flex-col border-e border-gray-200 bg-white text-gray-900 dark:border-gray-800 dark:bg-gray-900',
        attrs.class as string,
      )
    "
  >
    <slot />
  </div>

  <!-- Mobile: sheet -->
  <Teleport v-else-if="isMobile" to="body">
    <Transition
      enter-active-class="transition-opacity duration-200"
      leave-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="openMobile"
        data-slot="sheet-overlay"
        class="fixed inset-0 isolate z-100 bg-black/50 supports-backdrop-filter:backdrop-blur-xs dark:bg-black/70"
        @click="setOpenMobile(false)"
      />
    </Transition>
    <Transition
      enter-active-class="transition-transform duration-200 ease-in-out"
      leave-active-class="transition-transform duration-200 ease-in-out"
      :enter-from-class="
        side === 'left'
          ? 'ltr:-translate-x-full rtl:translate-x-full'
          : 'ltr:translate-x-full rtl:-translate-x-full'
      "
      :leave-to-class="
        side === 'left'
          ? 'ltr:-translate-x-full rtl:translate-x-full'
          : 'ltr:translate-x-full rtl:-translate-x-full'
      "
    >
      <div
        v-if="openMobile"
        role="dialog"
        data-sidebar="sidebar"
        data-slot="sidebar"
        data-mobile="true"
        :data-side="side"
        :style="{ '--sidebar-width': '18.125rem' }"
        :class="[
          'fixed inset-y-0 z-101 flex h-full w-(--sidebar-width) flex-col gap-4 border-e border-gray-200 bg-white p-0 text-sm text-gray-900 shadow-theme-lg outline-none dark:border-gray-800 dark:bg-gray-900',
          side === 'left' ? 'start-0' : 'end-0',
        ]"
      >
        <div class="sr-only">
          <h2>Sidebar</h2>
          <p>Displays the mobile sidebar.</p>
        </div>
        <div class="flex h-full w-full flex-col">
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>

  <!-- Desktop -->
  <div
    v-else
    class="group/sidebar peer hidden xl:block"
    :data-state="effectiveState"
    :data-collapsible="effectiveState === 'collapsed' ? collapsible : ''"
    :data-variant="variant"
    :data-side="side"
    data-slot="sidebar"
  >
    <!-- This is what handles the sidebar gap on desktop -->
    <div
      data-slot="sidebar-gap"
      :class="[
        'relative w-(--sidebar-width) bg-transparent transition-[width] duration-300 ease-in-out',
        'group-data-[collapsible=offcanvas]/sidebar:w-0',
        'group-data-[side=right]/sidebar:rotate-180',
        isFloatingOrInset
          ? 'group-data-[collapsible=icon]/sidebar:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]'
          : 'group-data-[collapsible=icon]/sidebar:w-(--sidebar-width-icon)',
      ]"
    />
    <div
      data-slot="sidebar-container"
      :data-side="side"
      :class="
        cn(
          'fixed inset-y-0 z-50 hidden h-svh w-(--sidebar-width) transition-[inset,width] duration-300 ease-in-out data-[side=left]:start-0 data-[side=left]:group-data-[collapsible=offcanvas]/sidebar:-start-(--sidebar-width) data-[side=right]:end-0 data-[side=right]:group-data-[collapsible=offcanvas]/sidebar:-end-(--sidebar-width) xl:flex',
          // Adjust the padding for floating and inset variants.
          isFloatingOrInset
            ? 'p-2 group-data-[collapsible=icon]/sidebar:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]'
            : 'border-gray-200 group-data-[collapsible=icon]/sidebar:w-(--sidebar-width-icon) group-data-[side=left]/sidebar:border-e group-data-[side=right]/sidebar:border-s dark:border-gray-800',
          attrs.class as string,
        )
      "
      @mouseenter="state === 'collapsed' && setIsHovered(true)"
      @mouseleave="setIsHovered(false)"
    >
      <div
        data-sidebar="sidebar"
        data-slot="sidebar-inner"
        class="flex size-full flex-col bg-white text-gray-900 group-data-[variant=floating]/sidebar:rounded-lg group-data-[variant=floating]/sidebar:shadow-sm group-data-[variant=floating]/sidebar:ring-1 group-data-[variant=floating]/sidebar:ring-gray-200 dark:bg-gray-900 dark:group-data-[variant=floating]/sidebar:ring-gray-800"
      >
        <slot />
      </div>
    </div>
  </div>
</template>
