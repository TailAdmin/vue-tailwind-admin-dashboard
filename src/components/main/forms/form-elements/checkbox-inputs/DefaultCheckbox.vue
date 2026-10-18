<script setup lang="ts">
import { ref } from 'vue'
import { Checkbox } from '@/components/ui/checkbox'

const isCheckedOne = ref(false)
const isCheckedTwo = ref(true)
</script>

<template>
  <div class="flex flex-row items-center gap-6">
    <Checkbox
      :checked="isCheckedOne"
      aria-label="Default unchecked checkbox"
      @change="isCheckedOne = $event"
    />
    <Checkbox
      :checked="isCheckedTwo"
      aria-label="Checked checkbox"
      @change="isCheckedTwo = $event"
    />
    <Checkbox disabled aria-label="Disabled checked checkbox" :checked="true" />
  </div>
</template>
