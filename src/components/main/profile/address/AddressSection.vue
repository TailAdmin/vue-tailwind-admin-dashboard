<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { PencilIcon } from '@/icons/layout'
import AddressItem from './AddressItem.vue'
import { defaultAddressData } from './data'
import EditAddressModal from './EditAddressModal.vue'
import type { AddressData } from './types'

const address = ref<AddressData>({ ...defaultAddressData })
const isModalOpen = ref(false)

const handleSave = (updatedData: AddressData) => {
  address.value = updatedData
}
</script>

<template>
  <Card class="rounded-2xl border border-gray-200 p-5 lg:p-6 dark:border-gray-700">
    <div class="flex flex-col gap-6 sm:flex-row lg:items-start lg:justify-between">
      <div class="flex-1">
        <h4 class="mb-4 text-lg font-semibold text-gray-800 lg:mb-6 dark:text-white/90">Address</h4>

        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-7 2xl:gap-x-32">
          <AddressItem label="Country" :value="address.country" />
          <AddressItem label="City/State" :value="address.cityState" />
          <AddressItem label="Postal Code" :value="address.postalCode" />
          <AddressItem label="TAX ID" :value="address.taxId" />
        </div>
      </div>

      <div>
        <Button variant="outline" class="w-full lg:w-auto" @click="isModalOpen = true">
          <PencilIcon class="size-5" />
          Edit
        </Button>
      </div>
    </div>
  </Card>

  <EditAddressModal
    :is-open="isModalOpen"
    :initial-data="address"
    @open-change="isModalOpen = $event"
    @save="handleSave"
  />
</template>
