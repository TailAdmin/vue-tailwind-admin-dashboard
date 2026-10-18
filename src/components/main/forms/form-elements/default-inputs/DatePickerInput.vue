<script setup lang="ts">
import flatpickr from 'flatpickr'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { CalendarIcon } from '@/icons/layout'

const wrapper = ref<HTMLElement | null>(null)
let dateFp: flatpickr.Instance | undefined

onMounted(() => {
  const input = wrapper.value?.querySelector('input')
  if (input) {
    dateFp = flatpickr(input, {
      mode: 'single',
      dateFormat: 'm/d/Y',
    })
  }
})

onBeforeUnmount(() => {
  dateFp?.destroy()
})
</script>

<template>
  <Field>
    <FieldLabel>Date Picker Input</FieldLabel>
    <div ref="wrapper" class="relative">
      <Input type="text" placeholder="mm/dd/yyy" class="pe-10" />
      <span
        class="pointer-events-none absolute end-3.5 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
      >
        <CalendarIcon class="size-5" />
      </span>
    </div>
  </Field>
</template>
