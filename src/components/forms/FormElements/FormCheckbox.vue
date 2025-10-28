<!-- ========================================
     FormCheckbox Component - components/FormCheckbox.vue
     ======================================== -->
<template>
  <div class="flex items-start">
    <div class="flex h-5 items-center">
      <input
        :id="checkboxId"
        type="checkbox"
        :checked="modelValue"
        @change="handleChange"
        :disabled="disabled"
        class="h-5 w-5 rounded border-gray-300 text-brand-500 focus:ring-2 focus:ring-brand-500/20 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:checked:bg-brand-500"
      />
    </div>
    <div class="ml-3 text-sm">
      <label
        :for="checkboxId"
        class="font-medium cursor-pointer"
        :class="[
          disabled
            ? 'text-gray-300 dark:text-white/15 cursor-not-allowed'
            : 'text-gray-700 dark:text-gray-400'
        ]"
      >
        {{ label }}
        <span v-if="required" class="text-error-500">*</span>
      </label>
      <p v-if="description" class="text-gray-500 dark:text-gray-400">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  modelValue: boolean;
  label: string;
  description?: string;
  disabled?: boolean;
  required?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  required: false
});

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();

const checkboxId = computed(() => `checkbox-${Math.random().toString(36).substr(2, 9)}`);

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.checked);
};
</script>
