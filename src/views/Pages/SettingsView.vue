<script setup lang="ts">
import { ref } from 'vue'
import BreadcrumbDefault from "@/components/Breadcrumbs/BreadcrumbDefault.vue"
import SettingsCard from '@/components/SettingsCard.vue';

const pageTitle = ref('Settings Page')
</script>

<template>
  <div class="mx-auto max-w-270">
    <BreadcrumbDefault :pageTitle="pageTitle" />
    <SettingsCard />
  </div>
</template>