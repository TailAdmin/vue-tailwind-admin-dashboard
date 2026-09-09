import { ref, computed } from 'vue'

const isRtl = ref<boolean>(false)
const isInitialized = ref<boolean>(false)

export function applyDirection(dir: 'ltr' | 'rtl') {
  if (typeof document === 'undefined') return

  const root = document.documentElement
  root.setAttribute('dir', dir)

  if (dir === 'rtl') {
    root.classList.add('rtl')
    root.classList.remove('ltr')
  } else {
    root.classList.add('ltr')
    root.classList.remove('rtl')
  }

  if (document.body) {
    document.body.setAttribute('dir', dir)
  }
}

export function setRTL(enabled: boolean) {
  isRtl.value = enabled
  const dir = enabled ? 'rtl' : 'ltr'

  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('rtl_mode', enabled ? 'true' : 'false')
  }

  applyDirection(dir)

  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('rtl-changed', {
        detail: { isRtl: enabled, dir },
      }),
    )
  }
}

export function toggleRTL() {
  setRTL(!isRtl.value)
}

export function initRTL() {
  if (isInitialized.value) return

  let savedRtl = false
  if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem('rtl_mode')
    if (saved !== null) {
      savedRtl = saved === 'true'
    } else if (typeof document !== 'undefined') {
      savedRtl = document.documentElement.getAttribute('dir') === 'rtl'
    }
  }

  isRtl.value = savedRtl
  applyDirection(savedRtl ? 'rtl' : 'ltr')
  isInitialized.value = true
}

export function useRTL() {
  return {
    isRtl: computed(() => isRtl.value),
    toggleRTL,
    setRTL,
    initRTL,
  }
}
