<script setup lang="ts">
import { ref } from 'vue'
import BreadcrumbDefault from "@/components/Breadcrumbs/BreadcrumbDefault.vue"
import ProfileCard from '@/components/ProfileCard.vue';

const pageTitle = ref('Profile')
</script>

<template>
  <div class="mx-auto max-w-242.5">
    <BreadcrumbDefault :pageTitle="pageTitle" />
    <ProfileCard />
  </div>
</template>