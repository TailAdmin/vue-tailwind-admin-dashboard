<script setup lang="ts">
import { ref } from 'vue'
import { Field, FieldLabel } from '@/components/ui/field'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { XIcon } from '@/icons/layout'

const colorOptions = [
  { value: 'Blue', label: 'Blue' },
  { value: 'Green', label: 'Green' },
  { value: 'Red', label: 'Red' },
  { value: 'Yellow', label: 'Yellow' },
  { value: 'Purple', label: 'Purple' },
  { value: 'Orange', label: 'Orange' },
]

const selectedValues = ref<string[]>(['Blue', 'Green'])

const handleRemove = (valueToRemove: string) => {
  selectedValues.value = selectedValues.value.filter((val) => val !== valueToRemove)
}
</script>

<template>
  <Field>
    <FieldLabel>Multiple Select Options</FieldLabel>
    <Select v-model="selectedValues" multiple>
      <SelectTrigger class="h-auto min-h-11 cursor-pointer py-1.5 ps-3 pe-3.5">
        <div v-if="selectedValues.length > 0" class="flex flex-wrap items-center gap-2">
          <span
            v-for="val in selectedValues"
            :key="val"
            class="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-100 py-1 ps-2.5 pe-1.5 text-sm font-normal text-gray-800 dark:border-gray-800 dark:bg-white/5 dark:text-white/90"
          >
            <span>{{ val }}</span>
            <span
              role="button"
              tabindex="0"
              :aria-label="`Remove ${val}`"
              class="inline-flex size-3.5 cursor-pointer items-center justify-center rounded-full text-gray-400 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              @click.stop.prevent="handleRemove(val)"
              @pointerdown.stop.prevent
              @keydown.enter.stop.prevent="handleRemove(val)"
              @keydown.space.stop.prevent="handleRemove(val)"
            >
              <XIcon class="size-3" />
            </span>
          </span>
        </div>
        <SelectValue v-else placeholder="Select Option" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem v-for="option in colorOptions" :key="option.value" :value="option.value">
          {{ option.label }}
        </SelectItem>
      </SelectContent>
    </Select>
  </Field>
</template>
