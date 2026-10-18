import { ref, computed, onMounted, onUnmounted, provide, inject } from 'vue'
import type { ComputedRef, Ref } from 'vue'
import { useRouter } from 'vue-router'

const SIDEBAR_COOKIE_NAME = 'sidebar_state'
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_KEYBOARD_SHORTCUT = 'b'
// xl breakpoint — matches TailAdmin sidebar's xl:translate-x-0
const MOBILE_BREAKPOINT = 1280

export interface SidebarContextType {
  /** "expanded" | "collapsed" (desktop) */
  state: ComputedRef<'expanded' | 'collapsed'>
  open: Ref<boolean>
  setOpen: (open: boolean) => void
  openMobile: Ref<boolean>
  setOpenMobile: (open: boolean) => void
  /** viewport is below the xl breakpoint */
  isMobile: Ref<boolean>
  isHovered: Ref<boolean>
  setIsHovered: (isHovered: boolean) => void
  toggleSidebar: () => void

  // Used by the example layouts
  isExpanded: ComputedRef<boolean>
  isMobileOpen: Ref<boolean>
  activeItem: Ref<string | null>
  openSubmenu: Ref<string | null>
  toggleMobileSidebar: () => void
  setActiveItem: (item: string | null) => void
  toggleSubmenu: (item: string) => void
}

const SidebarSymbol = Symbol('SidebarContext')

const readSidebarCookie = (defaultOpen: boolean): boolean => {
  if (typeof document === 'undefined') return defaultOpen
  const match = document.cookie.match(new RegExp(`(?:^|; )${SIDEBAR_COOKIE_NAME}=([^;]*)`))
  return match ? match[1] === 'true' : defaultOpen
}

export function useSidebarProvider(defaultOpen = true) {
  const router = useRouter()

  const open = ref(readSidebarCookie(defaultOpen))
  const openMobile = ref(false)
  const isMobile = ref(false)
  const isHovered = ref(false)
  const isCompact = ref(false)
  const activeItem = ref<string | null>(null)
  const openSubmenu = ref<string | null>(null)

  const state = computed<'expanded' | 'collapsed'>(() => (open.value ? 'expanded' : 'collapsed'))

  const handleResize = () => {
    isMobile.value = window.innerWidth < MOBILE_BREAKPOINT
    isCompact.value = window.innerWidth < 768
    if (!isMobile.value) {
      openMobile.value = false
    }
  }

  const setOpen = (value: boolean) => {
    open.value = value
    // This sets the cookie to keep the sidebar state.
    document.cookie = `${SIDEBAR_COOKIE_NAME}=${value}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
  }

  const setOpenMobile = (value: boolean) => {
    openMobile.value = value
  }

  // Helper to toggle the sidebar.
  const toggleSidebar = () => {
    if (isMobile.value) {
      setOpenMobile(!openMobile.value)
    } else {
      setOpen(!open.value)
    }
  }

  const toggleMobileSidebar = () => {
    setOpenMobile(!openMobile.value)
  }

  const setIsHovered = (value: boolean) => {
    isHovered.value = value
  }

  const setActiveItem = (item: string | null) => {
    activeItem.value = item
  }

  const toggleSubmenu = (item: string) => {
    openSubmenu.value = openSubmenu.value === item ? null : item
  }

  // Adds a keyboard shortcut to toggle the sidebar.
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
      event.preventDefault()
      toggleSidebar()
    }
  }

  let removeAfterEach: (() => void) | undefined

  onMounted(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    window.addEventListener('keydown', handleKeyDown)
    // Close mobile sidebar on route change
    removeAfterEach = router.afterEach(() => {
      openMobile.value = false
    })
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    window.removeEventListener('keydown', handleKeyDown)
    removeAfterEach?.()
  })

  const context: SidebarContextType = {
    state,
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    isHovered,
    setIsHovered,
    toggleSidebar,

    isExpanded: computed(() => (isCompact.value ? false : open.value)),
    isMobileOpen: openMobile,
    activeItem,
    openSubmenu,
    toggleMobileSidebar,
    setActiveItem,
    toggleSubmenu,
  }

  provide(SidebarSymbol, context)

  return context
}

export function useSidebar(): SidebarContextType {
  const context = inject<SidebarContextType>(SidebarSymbol)
  if (!context) {
    throw new Error(
      'useSidebar must be used within a component that has SidebarProvider as an ancestor',
    )
  }
  return context
}
