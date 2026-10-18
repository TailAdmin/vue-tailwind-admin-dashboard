<script setup lang="ts">
import { BoxIcon, UsersIcon } from '@/icons/layout'
import MetricCard from './MetricCard.vue'
</script>

<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
    <MetricCard title="Customers" value="3,782" change="11.01%" direction="up">
      <template #icon><UsersIcon /></template>
    </MetricCard>
    <MetricCard title="Orders" value="5,359" change="9.05%" direction="down">
      <template #icon><BoxIcon /></template>
    </MetricCard>
  </div>
</template>
