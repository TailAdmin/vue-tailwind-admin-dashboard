<script setup lang="ts">
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import { CheckboxInputs } from '@/components/main/forms/form-elements/checkbox-inputs'
import { DefaultInputs } from '@/components/main/forms/form-elements/default-inputs'
import { Dropzone } from '@/components/main/forms/form-elements/dropzone'
import { FileInputSection } from '@/components/main/forms/form-elements/file-input'
import { InputGroupSection } from '@/components/main/forms/form-elements/input-group'
import { InputStates } from '@/components/main/forms/form-elements/input-states'
import { RadioButtons } from '@/components/main/forms/form-elements/radio-buttons'
import { SelectInputs } from '@/components/main/forms/form-elements/select-inputs'
import { TextAreaInput } from '@/components/main/forms/form-elements/textarea-input'
import { ToggleSwitch } from '@/components/main/forms/form-elements/toggle-switch'
</script>

<template>
  <AdminLayout>
    <div>
      <PageBreadcrumb page-title="Form Elements" />
      <div class="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div class="space-y-6">
          <DefaultInputs />
          <SelectInputs />
          <TextAreaInput />
          <InputStates />
        </div>
        <div class="space-y-6">
          <InputGroupSection />
          <FileInputSection />
          <CheckboxInputs />
          <RadioButtons />
          <ToggleSwitch />
          <Dropzone />
        </div>
      </div>
    </div>
  </AdminLayout>
</template>
