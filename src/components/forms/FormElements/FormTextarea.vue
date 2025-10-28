<!-- ========================================
     FormTextarea Component - components/FormTextarea.vue
     ======================================== -->
<template>
  <div>
    <label
      v-if="label"
      :for="textareaId"
      class="mb-1.5 block text-sm font-medium"
      :class="[
        error ? 'text-error-500' : 'text-gray-700 dark:text-gray-400',
        disabled ? 'text-gray-300 dark:text-white/15' : ''
      ]"
    >
      {{ label }}
      <span v-if="required" class="text-error-500">*</span>
    </label>

    <textarea
      :id="textareaId"
      :value="modelValue"
      @input="handleInput"
      @blur="handleBlur"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :rows="rows"
      class="w-full rounded-lg border bg-transparent px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3"
      :class="[
        // States
        error
          ? 'border-error-300 focus:border-error-300 focus:ring-error-500/10 dark:border-error-700 dark:focus:border-error-800'
          : 'border-gray-300 focus:border-brand-300 focus:ring-brand-500/10 dark:border-gray-700 dark:focus:border-brand-800',
        
        // Colors
        'text-gray-800 dark:text-white/90',
        'dark:placeholder:text-white/30',
        'dark:bg-gray-900',
        
        // Disabled
        disabled
          ? 'disabled:border-gray-100 disabled:bg-gray-50 disabled:placeholder:text-gray-300 dark:disabled:border-gray-800 dark:disabled:bg-white/[0.03] dark:disabled:placeholder:text-white/15'
          : ''
      ]"
    ></textarea>

    <!-- Character Count -->
    <div v-if="maxLength" class="mt-1.5 flex justify-between text-xs">
      <p v-if="error" class="text-error-500">{{ error }}</p>
      <p v-else-if="helperText" class="text-gray-500 dark:text-gray-400">{{ helperText }}</p>
      <span class="text-gray-500 dark:text-gray-400 ml-auto">
        {{ characterCount }} / {{ maxLength }}
      </span>
    </div>

    <!-- Error Message (without maxLength) -->
    <p v-else-if="error" class="mt-1.5 text-xs text-error-500">
      {{ error }}
    </p>

    <!-- Helper Text (without maxLength) -->
    <p v-else-if="helperText" class="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
      {{ helperText }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  modelValue: string;
  label?: string;
  placeholder?: string;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  rows?: number;
  maxLength?: number;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  disabled: false,
  readonly: false,
  required: false,
  rows: 6
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
  'blur': [];
}>();

const textareaId = computed(() => `textarea-${Math.random().toString(36).substr(2, 9)}`);
const characterCount = computed(() => props.modelValue?.length || 0);

const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement;
  let value = target.value;

  // Enforce maxLength if specified
  if (props.maxLength && value.length > props.maxLength) {
    value = value.substring(0, props.maxLength);
    target.value = value;
  }

  emit('update:modelValue', value);
};

const handleBlur = () => {
  emit('blur');
};
</script>
