<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
</script>

<template>
  <div class="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
    <Badge variant="solid" color="primary">Primary</Badge>
    <Badge variant="solid" color="success">Success</Badge>
    <Badge variant="solid" color="error">Error</Badge>
    <Badge variant="solid" color="warning">Warning</Badge>
    <Badge variant="solid" color="info">Info</Badge>
    <Badge variant="solid" color="gray">Gray</Badge>
  </div>
</template>
