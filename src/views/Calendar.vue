<template>
  <AdminLayout>
    <PageBreadcrumb pageTitle="Calendar" />
    <Calendar />
  </AdminLayout>
</template>

<script setup lang="ts">
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import Calendar from '@/components/main/calendar'
import '@fullcalendar/vue3/skeleton.css'
import '@fullcalendar/vue3/themes/classic/palette.css'
import '@fullcalendar/vue3/themes/classic/theme.css'
</script>
