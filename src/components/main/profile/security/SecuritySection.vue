<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { PencilIcon } from '@/icons/layout'
import { cn } from '@/utils/cn'
import ChangePasswordModal from './ChangePasswordModal.vue'
import { defaultSecuritySettings } from './data'
import SecurityItem from './SecurityItem.vue'
import type { ChangePasswordFormData, SecurityProps } from './types'

const props = withDefaults(defineProps<SecurityProps>(), {
  initialSettings: () => defaultSecuritySettings,
})

const emit = defineEmits<{
  (e: 'passwordChange', data: ChangePasswordFormData): void
  (e: 'twoFactorChange', enabled: boolean): void
}>()

const isModalOpen = ref(false)
const twoFactorEnabled = ref(props.initialSettings.twoFactorEnabled)

const handleTwoFactorChange = (checked: boolean) => {
  twoFactorEnabled.value = checked
  emit('twoFactorChange', checked)
}
</script>

<template>
  <Card
    :class="
      cn(
        'rounded-2xl border border-gray-200 bg-white p-5 lg:p-6 dark:border-gray-700 dark:bg-white/3',
        className,
      )
    "
  >
    <h4 class="text-lg font-semibold text-gray-800 dark:text-white/90">Security</h4>

    <div class="mt-1">
      <SecurityItem
        title="Change Password"
        description="Receive real-time notifications and team alerts."
        has-divider
      >
        <template #action>
          <Button type="button" variant="outline" class="gap-2" @click="isModalOpen = true">
            <PencilIcon class="size-5" />
            <span>Change Password</span>
          </Button>
        </template>
      </SecurityItem>

      <SecurityItem
        title="Two-factor authentication (2FA)"
        description="Keep your account secure by enabling 2FA"
      >
        <template #action>
          <Switch
            size="sm"
            :model-value="twoFactorEnabled"
            aria-label="Toggle two-factor authentication"
            @update:model-value="handleTwoFactorChange"
          />
        </template>
      </SecurityItem>
    </div>
  </Card>

  <ChangePasswordModal
    :is-open="isModalOpen"
    @open-change="isModalOpen = $event"
    @submit-success="emit('passwordChange', $event)"
  />
</template>
