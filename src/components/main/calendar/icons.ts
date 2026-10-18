import { defineComponent, h } from 'vue'

export const ChevronLeftIcon = defineComponent({
  name: 'ChevronLeftIcon',
  props: {
    class: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    return () =>
      h(
        'svg',
        {
          xmlns: 'http://www.w3.org/2000/svg',
          width: 24,
          height: 24,
          viewBox: '0 0 24 24',
          fill: 'none',
          'stroke-width': 1.5,
          stroke: 'currentColor',
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          class: props.class,
        },
        [h('path', { d: 'M15 18l-6-6 6-6' })],
      )
  },
})

export const ChevronRightIcon = defineComponent({
  name: 'ChevronRightIcon',
  props: {
    class: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    return () =>
      h(
        'svg',
        {
          xmlns: 'http://www.w3.org/2000/svg',
          width: 24,
          height: 24,
          viewBox: '0 0 24 24',
          fill: 'none',
          stroke: 'currentColor',
          'stroke-width': 1.5,
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          class: props.class,
        },
        [h('path', { d: 'M9 18l6-6-6-6' })],
      )
  },
})

export const PlusIcon = defineComponent({
  name: 'PlusIcon',
  props: {
    class: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    return () =>
      h(
        'svg',
        {
          xmlns: 'http://www.w3.org/2000/svg',
          width: 24,
          height: 24,
          viewBox: '0 0 24 24',
          fill: 'none',
          stroke: 'currentColor',
          'stroke-width': 2,
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          class: props.class,
        },
        [h('path', { d: 'M5 12h14M12 5v14' })],
      )
  },
})

export const BookmarkIcon = defineComponent({
  name: 'BookmarkIcon',
  props: {
    class: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    return () =>
      h(
        'svg',
        {
          xmlns: 'http://www.w3.org/2000/svg',
          width: 24,
          height: 24,
          viewBox: '0 0 24 24',
          fill: 'currentColor',
          stroke: 'currentColor',
          'stroke-width': 2,
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          class: props.class,
        },
        [
          h('path', {
            d: 'M19 3v17a1 1 0 01-1.496.868l-4.512-2.578a2 2 0 00-1.984 0l-4.512 2.578A1 1 0 015 20V3z',
          }),
        ],
      )
  },
})

export const CloseIcon = defineComponent({
  name: 'CloseIcon',
  props: {
    class: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    return () =>
      h(
        'svg',
        {
          xmlns: 'http://www.w3.org/2000/svg',
          width: 24,
          height: 24,
          viewBox: '0 0 24 24',
          fill: 'none',
          stroke: 'currentColor',
          'stroke-width': 2,
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          class: props.class,
        },
        [h('path', { d: 'M18 6L6 18M6 6l12 12' })],
      )
  },
})

export const chevronLeftSvg =
  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="size-5 sm:size-6 bg-transparent text-gray-700 rtl:rotate-180 dark:text-gray-400"><path d="M15 18l-6-6 6-6" /></svg>'

export const chevronRightSvg =
  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="size-5 sm:size-6 bg-transparent text-gray-700 rtl:rotate-180 dark:text-gray-400"><path d="M9 18l6-6-6-6" /></svg>'

export const bookmarkSvg =
  '<span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4.5 sm:size-5.5 text-brand-500"><path d="M19 3v17a1 1 0 01-1.496.868l-4.512-2.578a2 2 0 00-1.984 0l-4.512 2.578A1 1 0 015 20V3z" /></svg></span>'

export const closeSvg =
  '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4"><path d="M18 6L6 18M6 6l12 12" /></svg>'
