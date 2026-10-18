<script setup lang="ts">
import AdminLayout from '@/components/layout/AdminLayout.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import GhostVariant from '@/components/others/ui-elements/badges/GhostVariant.vue'
import GhostVariantWithLeadingIcon from '@/components/others/ui-elements/badges/GhostVariantWithLeadingIcon.vue'
import GhostVariantWithTrailingIcon from '@/components/others/ui-elements/badges/GhostVariantWithTrailingIcon.vue'
import LightVariant from '@/components/others/ui-elements/badges/LightVariant.vue'
import LightVariantWithLeadingIcon from '@/components/others/ui-elements/badges/LightVariantWithLeadingIcon.vue'
import LightVariantWithTrailingIcon from '@/components/others/ui-elements/badges/LightVariantWithTrailingIcon.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import SolidBadgeVariant from '@/components/others/ui-elements/badges/SolidVariant.vue'
import SolidVariantWithLeadingIcon from '@/components/others/ui-elements/badges/SolidVariantWithLeadingIcon.vue'
import SolidVariantWithTrailingIcon from '@/components/others/ui-elements/badges/SolidVariantWithTrailingIcon.vue'
</script>

<template>
  <AdminLayout>
    <div>
      <PageBreadcrumb pageTitle="Badges" />
      <div class="space-y-5 sm:space-y-6">
        <ComponentCard title="With Solid Background">
          <SolidBadgeVariant />
        </ComponentCard>
        <ComponentCard title="With Light Background">
          <LightVariant />
        </ComponentCard>
        <ComponentCard title="Ghost Variant">
          <GhostVariant />
        </ComponentCard>
        <ComponentCard title="Solid Background with Leading Icon">
          <SolidVariantWithLeadingIcon />
        </ComponentCard>
        <ComponentCard title="Light Background with Leading Icon">
          <LightVariantWithLeadingIcon />
        </ComponentCard>
        <ComponentCard title="Ghost Variant with Leading Icon">
          <GhostVariantWithLeadingIcon />
        </ComponentCard>
        <ComponentCard title="Solid Background with Trailing Icon">
          <SolidVariantWithTrailingIcon />
        </ComponentCard>
        <ComponentCard title="Light Background with Trailing Icon">
          <LightVariantWithTrailingIcon />
        </ComponentCard>
        <ComponentCard title="Ghost Variant with Trailing Icon">
          <GhostVariantWithTrailingIcon />
        </ComponentCard>
      </div>
    </div>
  </AdminLayout>
</template>
