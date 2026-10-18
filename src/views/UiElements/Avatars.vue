<script setup lang="ts">
import AdminLayout from '@/components/layout/AdminLayout.vue'
import AvatarGroupPreview from '@/components/others/ui-elements/avatars/AvatarGroup.vue'
import BusyIndicator from '@/components/others/ui-elements/avatars/BusyIndicator.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import DefaultAvatar from '@/components/others/ui-elements/avatars/DefaultAvatar.vue'
import OfflineIndicator from '@/components/others/ui-elements/avatars/OfflineIndicator.vue'
import OnlineIndicator from '@/components/others/ui-elements/avatars/OnlineIndicator.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
</script>

<template>
  <AdminLayout>
    <div>
      <PageBreadcrumb pageTitle="Avatar" />
      <div class="space-y-5 sm:space-y-6">
        <ComponentCard title="Default Avatar">
          <DefaultAvatar />
        </ComponentCard>
        <ComponentCard title="Avatar Group">
          <AvatarGroupPreview />
        </ComponentCard>
        <ComponentCard title="Avatar with Online Indicator">
          <OnlineIndicator />
        </ComponentCard>
        <ComponentCard title="Avatar with Offline Indicator">
          <OfflineIndicator />
        </ComponentCard>
        <ComponentCard title="Avatar with Busy Indicator">
          <BusyIndicator />
        </ComponentCard>
      </div>
    </div>
  </AdminLayout>
</template>
