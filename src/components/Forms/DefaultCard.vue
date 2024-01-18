<script setup lang="ts">
const props = defineProps(['cardTitle'])
</script>

<template>
  <div
    class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
  >
    <div class="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
      <h3 class="font-medium text-black dark:text-white">{{ props.cardTitle }}</h3>
    </div>
    <slot></slot>
  </div>
</template>
