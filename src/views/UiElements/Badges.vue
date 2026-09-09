<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-5 sm:space-y-6">
      <ComponentCard title="With Light Background">
        <div class="flex flex-wrap gap-4 sm:items-center sm:justify-center">
          <Badge v-for="color in colors" :key="color" :color="color">
            {{ color }}
          </Badge>
        </div>
      </ComponentCard>
      <ComponentCard title="With Solid Background">
        <div class="flex flex-wrap gap-4 sm:items-center sm:justify-center">
          <Badge v-for="color in colors" :key="color" :color="color" variant="solid">
            {{ color }}
          </Badge>
        </div>
      </ComponentCard>
      <ComponentCard title="Light Background with Trailing Icon">
        <div class="flex flex-wrap gap-4 sm:items-center sm:justify-center">
          <Badge v-for="color in colors" :key="color" :color="color" :endIcon="PlusIcon">
            {{ color }}
          </Badge>
        </div>
      </ComponentCard>
      <ComponentCard title="Solid Background with Leading Icon">
        <div class="flex flex-wrap gap-4 sm:items-center sm:justify-center">
          <Badge
            v-for="color in colors"
            :key="color"
            :color="color"
            variant="solid"
            :startIcon="PlusIcon"
          >
            {{ color }}
          </Badge>
        </div>
      </ComponentCard>
      <ComponentCard title="Light Background with Trailing Icon">
        <div class="flex flex-wrap gap-4 sm:items-center sm:justify-center">
          <Badge v-for="color in colors" :key="color" :color="color" :endIcon="PlusIcon">
            {{ color }}
          </Badge>
        </div>
      </ComponentCard>
      <ComponentCard title="Solid Background with Trailing Icon">
        <div class="flex flex-wrap gap-4 sm:items-center sm:justify-center">
          <Badge
            v-for="color in colors"
            :key="color"
            :color="color"
            variant="solid"
            :endIcon="PlusIcon"
          >
            {{ color }}
          </Badge>
        </div>
      </ComponentCard>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { PlusIcon } from '@/icons'
import { ref } from 'vue'
import ComponentCard from '../../components/common/ComponentCard.vue'
import PageBreadcrumb from '../../components/common/PageBreadcrumb.vue'
import AdminLayout from '../../components/layout/AdminLayout.vue'
import Badge from '../../components/ui/Badge.vue'
const currentPageTitle = ref('Badge')

const colors = ['primary', 'success', 'error', 'warning', 'info', 'light', 'dark'] as const
</script>
