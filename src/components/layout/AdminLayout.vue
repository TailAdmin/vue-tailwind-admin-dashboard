<template>
  <div class="relative flex">
    <div class="flex-none">
      <AppSidebar class="block"/>
    </div>
    <div class="flex-1">
      <AppHeader />
      <div class="p-5">
      <RouterView />
    </div>
    </div>
  </div>
</template>

<script setup>
import AppHeader from './AppHeader.vue';
import AppSidebar from './AppSidebar.vue';
import { RouterView } from 'vue-router'
</script>
