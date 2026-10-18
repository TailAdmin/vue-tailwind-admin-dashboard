<script setup lang="ts">
import { ref } from 'vue'
import { Field, FieldLabel } from '@/components/ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { CheckIcon, CopyIcon } from '@/icons/layout'

const value = ref('www.tailadmin.com')
const copied = ref(false)

const handleCopy = async () => {
  try {
    await navigator.clipboard.writeText(value.value)
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  } catch (err) {
    console.error('Failed to copy text: ', err)
  }
}
</script>

<template>
  <Field>
    <FieldLabel>Website</FieldLabel>
    <InputGroup class="overflow-hidden">
      <InputGroupInput v-model="value" type="text" placeholder="www.tailadmin.com" />
      <InputGroupAddon
        align="inline-end"
        class="self-stretch border-s border-gray-200 p-0 dark:border-gray-800"
      >
        <button
          type="button"
          class="flex h-full cursor-pointer items-center gap-1.5 rounded-e-[10px] px-3.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 focus:outline-hidden dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white"
          @click="handleCopy"
        >
          <template v-if="copied">
            <CheckIcon class="size-4 text-green-500" />
            <span class="text-green-500">Copied!</span>
          </template>
          <template v-else>
            <CopyIcon class="size-4 text-gray-500 dark:text-gray-400" />
            <span>Copy</span>
          </template>
        </button>
      </InputGroupAddon>
    </InputGroup>
  </Field>
</template>
