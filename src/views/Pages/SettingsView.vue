<script setup lang="ts">
import { ref } from 'vue'
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import SettingsCard from '@/components/SettingsCard.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const pageTitle = ref('Settings Page')
</script>

<template>
  <DefaultLayout>
    <div class="mx-auto max-w-270">
      <!-- Breadcrumb Start -->
      <BreadcrumbDefault :pageTitle="pageTitle" />
      <!-- Breadcrumb End -->
      <SettingsCard />
    </div>
  </DefaultLayout>
</template>
