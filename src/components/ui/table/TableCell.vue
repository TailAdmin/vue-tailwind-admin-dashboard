<script setup lang="ts">
defineOptions({ inheritAttrs: true })

withDefaults(defineProps<{ isHeader?: boolean }>(), { isHeader: false })
</script>

<template>
  <component :is="isHeader ? 'th' : 'td'">
    <slot />
  </component>
</template>
