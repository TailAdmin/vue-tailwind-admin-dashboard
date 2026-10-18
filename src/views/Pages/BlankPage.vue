<script setup lang="ts">
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import BlankPageContent from '@/components/main/pages/blank-page'
</script>

<template>
  <AdminLayout>
    <div>
      <PageBreadcrumb pageTitle="Blank Page" />
      <BlankPageContent />
    </div>
  </AdminLayout>
</template>
