<script setup lang="ts">
import { BoxIcon } from '@/icons/layout'
import { Button } from '@/components/ui/button'
</script>

<template>
  <div class="flex items-center gap-4">
    <Button>
      <BoxIcon />
      <span>Button Text</span>
    </Button>
    <Button variant="outline">
      <span>Button Text</span>
      <BoxIcon />
    </Button>
    <Button variant="outline" size="icon">
      <BoxIcon />
    </Button>
  </div>
</template>
