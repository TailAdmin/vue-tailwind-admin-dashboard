<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-6">
      <ComponentCard title="Basic Table 1">
        <TableOne />
      </ComponentCard>
      <ComponentCard title="Basic Table 2">
        <TableTwo />
      </ComponentCard>
      <ComponentCard title="Basic Table 3">
        <TableThree />
      </ComponentCard>
      <ComponentCard title="Basic Table 4">
        <TableFour />
      </ComponentCard>
      <ComponentCard title="Basic Table 5">
        <TableFive />
      </ComponentCard>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import TableFive from '@/components/main/tables/basic-tables/table-five'
import TableTwo from '@/components/main/tables/basic-tables/table-two'
import TableFour from '@/components/main/tables/basic-tables/table-four'
import TableOne from '@/components/main/tables/basic-tables/table-one'
import TableThree from '@/components/main/tables/basic-tables/table-three'

const currentPageTitle = ref('Basic Tables')
</script>
