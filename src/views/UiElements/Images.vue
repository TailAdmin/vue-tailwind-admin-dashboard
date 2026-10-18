<script setup lang="ts">
import AdminLayout from '@/components/layout/AdminLayout.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import ResponsiveImage from '@/components/others/ui-elements/images/Responsive.vue'
import ThreeColumnImageGrid from '@/components/others/ui-elements/images/ThreeColumnGreed.vue'
import TwoColumnImageGrid from '@/components/others/ui-elements/images/TwoColumnGrid.vue'
</script>

<template>
  <AdminLayout>
    <div>
      <PageBreadcrumb pageTitle="Images" />
      <div class="space-y-5 sm:space-y-6">
        <ComponentCard title="Responsive image">
          <ResponsiveImage />
        </ComponentCard>
        <ComponentCard title="Image in 2 Grid">
          <TwoColumnImageGrid />
        </ComponentCard>
        <ComponentCard title="Image in 3 Grid">
          <ThreeColumnImageGrid />
        </ComponentCard>
      </div>
    </div>
  </AdminLayout>
</template>
