<script setup lang="ts">
import AdminLayout from '@/components/layout/AdminLayout.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import VideoAspectRatioPreviews from '@/components/others/ui-elements/videos/AspectRatio.vue'
</script>

<template>
  <AdminLayout>
    <div>
      <PageBreadcrumb pageTitle="Videos" />
      <VideoAspectRatioPreviews />
    </div>
  </AdminLayout>
</template>
