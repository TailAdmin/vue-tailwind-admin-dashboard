<script setup lang="ts">
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import { AddressSection } from '@/components/main/profile/address'
import { DangerZone } from '@/components/main/profile/danger'
import { PersonalInformationSection } from '@/components/main/profile/personal-information'
import { SecuritySection } from '@/components/main/profile/security'
</script>

<template>
  <AdminLayout>
    <div>
      <PageBreadcrumb page-title="Profile" />
      <div
        class="rounded-2xl border border-gray-200 bg-white p-5 lg:p-6 dark:border-gray-800 dark:bg-white/3"
      >
        <h3 class="mb-5 text-lg font-semibold text-gray-800 lg:mb-7 dark:text-white/90">Profile</h3>
        <div class="space-y-6">
          <PersonalInformationSection />
          <AddressSection />
          <SecuritySection />
          <DangerZone />
        </div>
      </div>
    </div>
  </AdminLayout>
</template>
