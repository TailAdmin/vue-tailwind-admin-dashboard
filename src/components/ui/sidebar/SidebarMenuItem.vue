<script setup lang="ts">
import { useAttrs } from 'vue'
import { cn } from '@/utils/cn'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()
</script>

<template>
  <li
    data-slot="sidebar-menu-item"
    data-sidebar="menu-item"
    v-bind="{ ...attrs, class: undefined }"
    :class="cn('group/menu-item relative', attrs.class as string)"
  >
    <slot />
  </li>
</template>
