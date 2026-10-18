<script setup lang="ts">
import { ref } from 'vue'
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
} from '@/components/ui/combobox'
import { Field, FieldLabel } from '@/components/ui/field'

const frameworks = [
  'Next.js',
  'React',
  'Vue.js',
  'Svelte',
  'Angular',
  'Nuxt.js',
  'Remix',
  'Astro',
  'Gatsby',
]

const selected = ref<string>()
</script>

<template>
  <Field>
    <FieldLabel>Searchable Select (Combobox)</FieldLabel>
    <Combobox v-model="selected">
      <ComboboxInput placeholder="Select framework..." show-trigger show-clear />
      <ComboboxContent>
        <ComboboxEmpty>No framework found.</ComboboxEmpty>
        <ComboboxItem v-for="item in frameworks" :key="item" :value="item">
          {{ item }}
        </ComboboxItem>
      </ComboboxContent>
    </Combobox>
  </Field>
</template>
