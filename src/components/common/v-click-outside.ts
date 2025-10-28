// directives/clickOutside.ts
import type { DirectiveBinding } from 'vue'

interface ClickOutsideElement extends HTMLElement {
  clickOutsideEvent: (event: MouseEvent) => void
}

export default {
  beforeMount(el: HTMLElement, binding: DirectiveBinding) {
    const element = el as ClickOutsideElement
    element.clickOutsideEvent = (event: MouseEvent) => {
      if (!(element === event.target || element.contains(event.target as Node))) {
        binding.value(event)
      }
    }
    document.addEventListener('click', element.clickOutsideEvent)
  },
  unmounted(el: HTMLElement) {
    const element = el as ClickOutsideElement
    document.removeEventListener('click', element.clickOutsideEvent)
  },
}