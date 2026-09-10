<template>
  <div class="relative" v-click-outside="closeDropdown" ref="dropdown">
    <!-- Dropdown Trigger Button -->
    <button @click="toggleDropdown" :class="buttonClass">
      <slot name="icon">
        <!-- Default icon -->
        <svg
          class="fill-current"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M5.99902 10.245C6.96552 10.245 7.74902 11.0285 7.74902 11.995V12.005C7.74902 12.9715 6.96552 13.755 5.99902 13.755C5.03253 13.755 4.24902 12.9715 4.24902 12.005V11.995C4.24902 11.0285 5.03253 10.245 5.99902 10.245ZM17.999 10.245C18.9655 10.245 19.749 11.0285 19.749 11.995V12.005C19.749 12.9715 18.9655 13.755 17.999 13.755C17.0325 13.755 16.249 12.9715 16.249 12.005V11.995C16.249 11.0285 17.0325 10.245 17.999 10.245ZM13.749 11.995C13.749 11.0285 12.9655 10.245 11.999 10.245C11.0325 10.245 10.249 11.0285 10.249 11.995V12.005C10.249 12.9715 11.0325 13.755 11.999 13.755C12.9655 13.755 13.749 12.9715 13.749 12.005V11.995Z"
            fill="currentColor"
          />
        </svg>
      </slot>
    </button>

    <!-- Dropdown Menu -->
    <div
      v-if="open"
      ref="menuRef"
      :class="computedMenuClass"
    >
      <slot name="menu">
        <!-- Default menu items -->
        <template v-for="(item, index) in menuItems">
          <router-link
            v-if="item.to"
            :key="`router-${index}`"
            :to="item.to"
            @click="handleMenuItemClick(item.onClick)"
            :class="itemClass"
          >
            {{ item.label }}
          </router-link>

          <button
            v-else
            :key="`button-${index}`"
            @click="handleMenuItemClick(item.onClick)"
            :class="itemClass"
          >
            {{ item.label }}
          </button>
        </template>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, type PropType } from 'vue'
import vClickOutside from './v-click-outside.vue'

export interface DropdownMenuItem {
  label?: string
  to?: string | object
  onClick?: () => void
  [key: string]: any
}

const props = defineProps({
  menuItems: {
    type: Array as PropType<DropdownMenuItem[]>,
    default: () => [],
  },
  buttonClass: {
    type: String,
    default: 'text-gray-500 dark:text-gray-400',
  },
  menuClass: {
    type: String,
    default:
      'absolute end-0 z-40 w-40 p-2 space-y-1 bg-white border border-gray-200 rounded-2xl shadow-lg dark:border-gray-800 dark:bg-gray-dark',
  },
  itemClass: {
    type: String,
    default:
      'flex w-full px-3 py-2 font-medium text-start text-gray-500 rounded-lg text-theme-xs hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300',
  },
  openUpward: {
    type: Boolean,
    default: false,
  },
})

defineSlots<{
  default?: (props: Record<string, never>) => any
  icon?: (props: Record<string, never>) => any
  menu?: (props: Record<string, never>) => any
}>()

const open = ref(false)
const dropdown = ref<HTMLElement | null>(null)
const menuRef = ref<HTMLElement | null>(null)
const isUpward = ref(false)

const computedMenuClass = computed(() => {
  const shouldOpenUp = props.openUpward || isUpward.value
  let baseClass = props.menuClass
  if (shouldOpenUp) {
    baseClass = baseClass.replace(/\btop-full\b/g, '').replace(/\bmt-\d+\b/g, '').trim()
    return `${baseClass} bottom-full mb-1 top-auto!`
  }
  return baseClass.includes('top-full') ? baseClass : `${baseClass} top-full mt-1`
})

const updateDropdownPosition = () => {
  if (props.openUpward) {
    isUpward.value = true
    return
  }

  const dropdownEl = dropdown.value
  if (!dropdownEl) return

  const dropdownRect = dropdownEl.getBoundingClientRect()
  const menuHeight = menuRef.value?.offsetHeight || 115

  // Check space relative to viewport bottom
  const spaceBelowViewport = window.innerHeight - dropdownRect.bottom

  // Check space relative to closest scrollable parent (e.g. table overflow container)
  const scrollParent = dropdownEl.closest('.overflow-x-auto, .overflow-y-auto, table, tbody')
  let spaceBelowParent = Infinity
  if (scrollParent) {
    const parentRect = scrollParent.getBoundingClientRect()
    spaceBelowParent = parentRect.bottom - dropdownRect.bottom
  }

  if (spaceBelowViewport < menuHeight + 10 || spaceBelowParent < menuHeight + 10) {
    isUpward.value = true
  } else {
    isUpward.value = false
  }
}

const toggleDropdown = async () => {
  open.value = !open.value
  if (open.value) {
    if (props.openUpward) {
      isUpward.value = true
    } else if (dropdown.value) {
      const dropdownRect = dropdown.value.getBoundingClientRect()
      const scrollParent = dropdown.value.closest('.overflow-x-auto, .overflow-y-auto, table, tbody')
      let spaceBelowParent = Infinity
      if (scrollParent) {
        spaceBelowParent = scrollParent.getBoundingClientRect().bottom - dropdownRect.bottom
      }
      const spaceBelowViewport = window.innerHeight - dropdownRect.bottom
      if (spaceBelowViewport < 130 || spaceBelowParent < 130) {
        isUpward.value = true
      } else {
        isUpward.value = false
      }
    }
    await nextTick()
    updateDropdownPosition()
  }
}

const closeDropdown = () => {
  open.value = false
  isUpward.value = props.openUpward
}

const handleMenuItemClick = (callback: any) => {
  if (typeof callback === 'function') {
    callback()
  }
  closeDropdown()
}
</script>

