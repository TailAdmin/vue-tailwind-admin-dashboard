<!-- ========================================
     FormSelect Component - components/FormSelect.vue
     ======================================== -->
<template>
  <div>
    <label
      v-if="label"
      :for="selectId"
      class="mb-1.5 block text-sm font-medium"
      :class="[
        error ? 'text-error-500' : 'text-gray-700 dark:text-gray-400',
        disabled ? 'text-gray-300 dark:text-white/15' : ''
      ]"
    >
      {{ label }}
      <span v-if="required" class="text-error-500">*</span>
    </label>

    <div class="relative z-20 bg-transparent">
      <select
        :id="selectId"
        :value="modelValue"
        @change="handleChange"
        :disabled="disabled"
        class="h-11 w-full appearance-none rounded-lg border bg-transparent bg-none px-4 py-2.5 pr-11 text-sm shadow-theme-xs focus:outline-hidden focus:ring-3"
        :class="[
          // States
          error
            ? 'border-error-300 focus:border-error-300 focus:ring-error-500/10 dark:border-error-700 dark:focus:border-error-800'
            : 'border-gray-300 focus:border-brand-300 focus:ring-brand-500/10 dark:border-gray-700 dark:focus:border-brand-800',
          
          // Colors
          modelValue
            ? 'text-gray-800 dark:text-white/90'
            : 'text-gray-400 dark:text-white/30',
          'placeholder:text-gray-400',
          'dark:bg-gray-900',
          
          // Disabled
          disabled
            ? 'disabled:border-gray-100 disabled:bg-gray-50 disabled:text-gray-300 dark:disabled:border-gray-800 dark:disabled:bg-white/[0.03] dark:disabled:text-white/15'
            : ''
        ]"
      >
        <option value="" disabled>{{ placeholder || 'اختر خياراً' }}</option>
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
          class="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
        >
          {{ option.label }}
        </option>
      </select>

      <span
        class="absolute right-4 top-1/2 z-30 -translate-y-1/2 pointer-events-none"
        :class="disabled ? 'text-gray-300 dark:text-white/15' : 'text-gray-500 dark:text-gray-400'"
      >
        <svg
          class="stroke-current"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.79175 7.396L10.0001 12.6043L15.2084 7.396"
            stroke=""
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
    </div>

    <!-- Error Message -->
    <p v-if="error" class="mt-1.5 text-xs text-error-500">
      {{ error }}
    </p>

    <!-- Helper Text -->
    <p v-else-if="helperText" class="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
      {{ helperText }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

export interface SelectOption {
  label: string;
  value: string | number;
}

interface Props {
  modelValue: string | number;
  options: SelectOption[];
  label?: string;
  placeholder?: string;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  required?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  disabled: false,
  required: false
});

const emit = defineEmits<{
  'update:modelValue': [value: string | number];
}>();

const selectId = computed(() => `select-${Math.random().toString(36).substr(2, 9)}`);

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  emit('update:modelValue', target.value);
};
</script>
