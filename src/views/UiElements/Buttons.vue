<script setup lang="ts">
import AdminLayout from '@/components/layout/AdminLayout.vue'
import ButtonGroupDemo from '@/components/others/ui-elements/buttons/ButtonGroup.vue'
import ButtonSizes from '@/components/others/ui-elements/buttons/Sizes.vue'
import ButtonVariants from '@/components/others/ui-elements/buttons/Variants.vue'
import ButtonsWithIcon from '@/components/others/ui-elements/buttons/WithIcon.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
</script>

<template>
  <AdminLayout>
    <div>
      <PageBreadcrumb pageTitle="Buttons" />
      <div class="space-y-5 sm:space-y-6">
        <ComponentCard title="Button Variants">
          <ButtonVariants />
        </ComponentCard>
        <ComponentCard title="Button Sizes">
          <ButtonSizes />
        </ComponentCard>
        <ComponentCard title="Button with Icon">
          <ButtonsWithIcon />
        </ComponentCard>
        <ComponentCard title="Button Group">
          <ButtonGroupDemo />
        </ComponentCard>
      </div>
    </div>
  </AdminLayout>
</template>
