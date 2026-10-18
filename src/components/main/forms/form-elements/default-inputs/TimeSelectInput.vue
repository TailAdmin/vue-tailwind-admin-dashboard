<script setup lang="ts">
import flatpickr from 'flatpickr'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { TimeIcon } from '@/icons/layout'

const wrapper = ref<HTMLElement | null>(null)
let timeFp: flatpickr.Instance | undefined

onMounted(() => {
  const input = wrapper.value?.querySelector('input')
  if (input) {
    timeFp = flatpickr(input, {
      enableTime: true,
      noCalendar: true,
      dateFormat: 'h:i K',
    })
  }
})

onBeforeUnmount(() => {
  timeFp?.destroy()
})
</script>

<template>
  <Field>
    <FieldLabel>Time Select Input</FieldLabel>
    <div ref="wrapper" class="relative">
      <Input type="text" placeholder="12:00 AM" class="pe-10" />
      <span
        class="pointer-events-none absolute end-3.5 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
      >
        <TimeIcon class="size-5" />
      </span>
    </div>
  </Field>
</template>
