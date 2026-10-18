<script setup lang="ts">
import { Card } from '@/components/ui/card'
import { cn } from '@/utils/cn'
import DangerItem from './DangerItem.vue'
import { defaultDangerActions } from './data'
import type { DangerZoneProps } from './types'

withDefaults(defineProps<DangerZoneProps>(), {
  title: 'Danger Zone',
  items: () => defaultDangerActions,
})

const emit = defineEmits<{
  (e: 'logout'): void
  (e: 'delete'): void
}>()

const handleAction = (id: string, customOnClick?: () => void) => {
  if (customOnClick) {
    customOnClick()
    return
  }
  if (id === 'logout-all') {
    emit('logout')
  } else if (id === 'delete-account') {
    emit('delete')
  }
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
    <h4 class="text-lg font-semibold text-gray-800 dark:text-white/90">
      {{ title }}
    </h4>

    <div class="mt-1">
      <DangerItem
        v-for="(item, index) in items"
        :key="item.id"
        :title="item.title"
        :description="item.description"
        :button-text="item.buttonText"
        :icon="item.icon"
        :icon-class="item.iconClass"
        :variant="item.variant"
        :has-divider="index < items.length - 1"
        @action="handleAction(item.id, item.onClick)"
      />
    </div>
  </Card>
</template>
