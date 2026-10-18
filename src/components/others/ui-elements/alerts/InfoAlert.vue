<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { InfoIcon } from '@/icons/layout'
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="space-y-4">
    <Alert variant="info" class="p-4">
      <InfoIcon class="size-5" />
      <AlertTitle>Info Message</AlertTitle>
      <AlertDescription>
        <p>Be cautious when performing this action.</p>
        <RouterLink
          to="/"
          class="mt-3 inline-block text-sm font-medium text-gray-500 underline dark:text-gray-400"
          >Learn more</RouterLink
        >
      </AlertDescription>
    </Alert>
    <Alert variant="info" class="p-4">
      <InfoIcon class="size-5" />
      <AlertTitle>Info Message</AlertTitle>
      <AlertDescription>Be cautious when performing this action.</AlertDescription>
    </Alert>
  </div>
</template>
