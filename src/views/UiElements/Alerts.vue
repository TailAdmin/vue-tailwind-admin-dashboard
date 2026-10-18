<script setup lang="ts">
import AdminLayout from '@/components/layout/AdminLayout.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import DefaultAlert from '@/components/others/ui-elements/alerts/DefaultAlert.vue'
import ErrorAlert from '@/components/others/ui-elements/alerts/ErrorAlert.vue'
import InfoAlert from '@/components/others/ui-elements/alerts/InfoAlert.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import SuccessAlert from '@/components/others/ui-elements/alerts/SuccessAlert.vue'
import WarningAlert from '@/components/others/ui-elements/alerts/WarningAlert.vue'
</script>

<template>
  <AdminLayout>
    <div>
      <PageBreadcrumb pageTitle="Alerts" />
      <div class="space-y-5 sm:space-y-6">
        <ComponentCard title="Default Alert">
          <DefaultAlert />
        </ComponentCard>
        <ComponentCard title="Success Alert">
          <SuccessAlert />
        </ComponentCard>
        <ComponentCard title="Warning Alert">
          <WarningAlert />
        </ComponentCard>
        <ComponentCard title="Error Alert">
          <ErrorAlert />
        </ComponentCard>
        <ComponentCard title="Info Alert">
          <InfoAlert />
        </ComponentCard>
      </div>
    </div>
  </AdminLayout>
</template>
