<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div className="space-y-5 sm:space-y-6">
      <ComponentCard title="Success Alert">
        <Alert
          variant="success"
          title="Success Message"
          message="Be cautious when performing this action."
          :showLink="true"
          linkHref="/"
          linkText="Learn more"
        />
        <Alert
          variant="success"
          title="Success Message"
          message="Be cautious when performing this action."
          :showLink="false"
        />
      </ComponentCard>
      <ComponentCard title="Warning Alert">
        <Alert
          variant="warning"
          title="Warning  Message"
          message="Be cautious when performing this action."
          :showLink="true"
          linkHref="/"
          linkText="Learn more"
        />
        <Alert
          variant="warning"
          title="Warning Message Message"
          message="Be cautious when performing this action."
          :showLink="false"
        />
      </ComponentCard>
      <ComponentCard title="Error Alert">
        <Alert
          variant="error"
          title="Error  Message"
          message="Be cautious when performing this action."
          :showLink="true"
          linkHref="/"
          linkText="Learn more"
        />
        <Alert
          variant="error"
          title="Error Message Message"
          message="Be cautious when performing this action."
          :showLink="false"
        />
      </ComponentCard>
      <ComponentCard title="Info Alert">
        <Alert
          variant="info"
          title="Info  Message"
          message="Be cautious when performing this action."
          :showLink="true"
          linkHref="/"
          linkText="Learn more"
        />
        <Alert
          variant="info"
          title="Info Message Message"
          message="Be cautious when performing this action."
          :showLink="false"
        />
      </ComponentCard>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref } from 'vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import Alert from '@/components/ui/Alert.vue'
const currentPageTitle = ref('Alerts')
</script>

<style></style>
