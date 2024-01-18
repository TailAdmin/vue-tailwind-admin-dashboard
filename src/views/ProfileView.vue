<script setup lang="ts">
import { ref } from 'vue'
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import ProfileCard from '@/components/ProfileCard.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const pageTitle = ref('Profile')
</script>

<template>
  <DefaultLayout>
    <div class="mx-auto max-w-242.5">
      <!-- Breadcrumb Start -->
      <BreadcrumbDefault :pageTitle="pageTitle" />
      <!-- Breadcrumb End -->
      <ProfileCard />
    </div>
  </DefaultLayout>
</template>
