<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import { PlusIcon } from './icons'
</script>

<template>
  <div class="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
    <Badge variant="solid" color="primary">
      <PlusIcon />
      <span>Primary</span>
    </Badge>
    <Badge variant="solid" color="success">
      <PlusIcon />
      <span>Success</span>
    </Badge>
    <Badge variant="solid" color="error">
      <PlusIcon />
      <span>Error</span>
    </Badge>
    <Badge variant="solid" color="warning">
      <PlusIcon />
      <span>Warning</span>
    </Badge>
    <Badge variant="solid" color="info">
      <PlusIcon />
      <span>Info</span>
    </Badge>
    <Badge variant="solid" color="gray">
      <PlusIcon />
      <span>Gray</span>
    </Badge>
  </div>
</template>
