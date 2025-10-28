<!-- ========================================
     BaseModal Component - components/BaseModal.vue
     ======================================== -->
<template>
  <teleport to="body">
    <transition
      enter-active-class="duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-gray-900/50 p-4 backdrop-blur-sm"
        @click.self="handleBackdropClick"
      >
        <transition
          enter-active-class="duration-300 ease-out"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="duration-200 ease-in"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div
            v-if="isOpen"
            class="relative w-full overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900"
            :class="sizeClasses"
          >
            <!-- Close Button -->
            <button
              v-if="closable"
              @click="close"
              class="absolute right-5 top-5 z-[10000] flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-600 dark:bg-white/[0.05] dark:text-gray-400 dark:hover:bg-white/[0.07] dark:hover:text-gray-300"
            >
              <svg
                class="fill-current"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M6.04289 16.5418C5.65237 16.9323 5.65237 17.5655 6.04289 17.956C6.43342 18.3465 7.06658 18.3465 7.45711 17.956L11.9987 13.4144L16.5408 17.9565C16.9313 18.347 17.5645 18.347 17.955 17.9565C18.3455 17.566 18.3455 16.9328 17.955 16.5423L13.4129 12.0002L17.955 7.45808C18.3455 7.06756 18.3455 6.43439 17.955 6.04387C17.5645 5.65335 16.9313 5.65335 16.5408 6.04387L11.9987 10.586L7.45711 6.04439C7.06658 5.65386 6.43342 5.65386 6.04289 6.04439C5.65237 6.43491 5.65237 7.06808 6.04289 7.4586L10.5845 12.0002L6.04289 16.5418Z"
                />
              </svg>
            </button>

            <!-- Modal Content -->
            <div class="px-2" :class="closable ? 'pr-14' : ''">
              <!-- Header -->
              <div v-if="title || $slots.header" class="mb-6 lg:mb-7">
                <slot name="header">
                  <h4 class="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                    {{ title }}
                  </h4>
                  <p v-if="description" class="text-sm text-gray-500 dark:text-gray-400">
                    {{ description }}
                  </p>
                </slot>
              </div>

              <!-- Body -->
              <div class="custom-scrollbar overflow-y-auto">
                <slot></slot>
              </div>

              <!-- Footer -->
              <div v-if="$slots.footer" class="mt-6 flex items-center gap-3 lg:justify-end">
                <slot name="footer"></slot>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';

interface Props {
  isOpen: boolean;
  title?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closable?: boolean;
  persistent?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  closable: true,
  persistent: false
});

const emit = defineEmits<{
  'update:isOpen': [value: boolean];
  'close': [];
}>();

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'max-w-md lg:p-6',
    md: 'max-w-2xl lg:p-8',
    lg: 'max-w-4xl lg:p-10',
    xl: 'max-w-6xl lg:p-11',
    full: 'max-w-[95vw] lg:p-11'
  };
  return sizes[props.size];
});

const close = () => {
  if (!props.persistent) {
    emit('update:isOpen', false);
    emit('close');
  }
};

const handleBackdropClick = () => {
  if (!props.persistent) {
    close();
  }
};

// Lock body scroll when modal is open
watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
);
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 3px;
}

.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background: #4b5563;
}
</style>
