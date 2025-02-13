<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div className="space-y-5 sm:space-y-6">
      <ComponentCard title="Default Avatar">
        <div className="flex flex-col items-center justify-center gap-5 sm:flex-row">
          <Avatar :src="avatarSrc" :size="size" v-for="size in sizes" :key="size" />
        </div>
      </ComponentCard>
      <ComponentCard title="Avatar with online indicator">
        <div className="flex flex-col items-center justify-center gap-5 sm:flex-row">
          <Avatar :src="avatarSrc" status="online" :size="size" v-for="size in sizes" :key="size" />
        </div>
      </ComponentCard>
      <ComponentCard title="Avatar with Offline indicator">
        <div className="flex flex-col items-center justify-center gap-5 sm:flex-row">
          <Avatar
            :src="avatarSrc"
            status="offline"
            :size="size"
            v-for="size in sizes"
            :key="size"
          />
        </div>
      </ComponentCard>
      <ComponentCard title="Avatar with busy indicator">
        <div className="flex flex-col items-center justify-center gap-5 sm:flex-row">
          <Avatar :src="avatarSrc" status="busy" :size="size" v-for="size in sizes" :key="size" />
        </div>
      </ComponentCard>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import Avatar from '@/components/ui/Avatar.vue'
const currentPageTitle = ref('Avatars')

const avatarSrc = '/images/user/user-01.jpg'
const sizes = ['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge'] as const
</script>
