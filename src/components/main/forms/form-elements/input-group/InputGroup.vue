<script setup lang="ts">
import ComponentCard from '@/components/common/ComponentCard.vue'
import CopyInput from './CopyInput.vue'
import EmailInput from './EmailInput.vue'
import PhoneInputEnd from './PhoneInputEnd.vue'
import PhoneInputStart from './PhoneInputStart.vue'
import UrlInput from './UrlInput.vue'
</script>

<template>
  <ComponentCard title="Input Group">
    <div class="space-y-6">
      <EmailInput />
      <PhoneInputStart />
      <PhoneInputEnd />
      <UrlInput />
      <CopyInput />
    </div>
  </ComponentCard>
</template>
