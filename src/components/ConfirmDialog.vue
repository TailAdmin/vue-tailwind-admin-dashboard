<!-- ========================================
     ConfirmDialog Component - components/ConfirmDialog.vue
     ======================================== -->
<template>
  <BaseModal :is-open="isOpen" size="sm" :persistent="true" :closable="false">
    <div class="text-center">
      <!-- Icon -->
      <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full" :class="iconBgClass">
        <svg
          v-if="options.type === 'danger'"
          class="h-8 w-8"
          :class="iconColorClass"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <svg
          v-else-if="options.type === 'warning'"
          class="h-8 w-8"
          :class="iconColorClass"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <svg
          v-else-if="options.type === 'info'"
          class="h-8 w-8"
          :class="iconColorClass"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <svg
          v-else
          class="h-8 w-8"
          :class="iconColorClass"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      <!-- Title -->
      <h3 class="mb-2 text-xl font-semibold text-gray-800 dark:text-white/90">
        {{ options.title }}
      </h3>

      <!-- Message -->
      <p class="mb-6 text-sm text-gray-500 dark:text-gray-400">
        {{ options.message }}
      </p>

      <!-- Actions -->
      <div class="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <button
          @click="handleCancel"
          type="button"
          class="order-2 flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:order-1 sm:w-auto"
        >
          {{ options.cancelText }}
        </button>
        <button
          @click="handleConfirm"
          type="button"
          class="order-1 flex w-full justify-center rounded-lg px-4 py-2.5 text-sm font-medium text-white sm:order-2 sm:w-auto"
          :class="confirmButtonClass"
        >
          {{ options.confirmText }}
        </button>
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BaseModal from './BaseModal.vue';

interface ConfirmOptions {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'info' | 'warning' | 'danger' | 'success';
}

interface Props {
  isOpen: boolean;
  options: ConfirmOptions;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'confirm': [];
  'cancel': [];
}>();

const iconBgClass = computed(() => {
  const classes = {
    info: 'bg-blue-100 dark:bg-blue-900/20',
    warning: 'bg-yellow-100 dark:bg-yellow-900/20',
    danger: 'bg-red-100 dark:bg-red-900/20',
    success: 'bg-green-100 dark:bg-green-900/20'
  };
  return classes[props.options.type || 'warning'];
});

const iconColorClass = computed(() => {
  const classes = {
    info: 'text-blue-600 dark:text-blue-400',
    warning: 'text-yellow-600 dark:text-yellow-400',
    danger: 'text-red-600 dark:text-red-400',
    success: 'text-green-600 dark:text-green-400'
  };
  return classes[props.options.type || 'warning'];
});

const confirmButtonClass = computed(() => {
  const classes = {
    info: 'bg-blue-500 hover:bg-blue-600',
    warning: 'bg-yellow-500 hover:bg-yellow-600',
    danger: 'bg-red-500 hover:bg-red-600',
    success: 'bg-green-500 hover:bg-green-600'
  };
  return classes[props.options.type || 'warning'];
});

const handleConfirm = () => {
  emit('confirm');
};

const handleCancel = () => {
  emit('cancel');
};
</script>
