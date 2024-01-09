<script setup lang="ts">
import { ref } from 'vue'
import BreadcrumbDefault from "@/components/Breadcrumbs/BreadcrumbDefault.vue"
import CalendarCard from "@/components/CalendarCard.vue"

const pageTitle = ref('Calender')
</script>

<template>
  <div class="mx-auto max-w-7xl">
    <BreadcrumbDefault :pageTitle="pageTitle" />
    <CalendarCard />
  </div>
</template>