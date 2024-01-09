<script setup lang="ts">
import { ref } from 'vue'
import BreadcrumbDefault from "@/components/Breadcrumbs/BreadcrumbDefault.vue"
import TableOne from '@/components/Tables/TableOne.vue';
import TableTwo from '@/components/Tables/TableTwo.vue';
import TableThree from '@/components/Tables/TableThree.vue';

const pageTitle = ref('Tables')
</script>

<template>
  <BreadcrumbDefault :pageTitle="pageTitle" />

  <div class="flex flex-col gap-10">
    <TableOne />
    <TableTwo />
    <TableThree />
  </div>
</template>