<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircleIcon } from '@/icons/layout'
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="space-y-4">
    <Alert variant="success" class="p-4">
      <CheckCircleIcon class="size-5" />
      <AlertTitle>Success Message</AlertTitle>
      <AlertDescription>
        <p>Be cautious when performing this action.</p>
        <RouterLink
          to="/"
          class="mt-3 inline-block text-sm font-medium text-gray-500 underline dark:text-gray-400"
          >Learn more</RouterLink
        >
      </AlertDescription>
    </Alert>
    <Alert variant="success" class="p-4">
      <CheckCircleIcon class="size-5" />
      <AlertTitle>Success Message</AlertTitle>
      <AlertDescription>Be cautious when performing this action.</AlertDescription>
    </Alert>
  </div>
</template>
