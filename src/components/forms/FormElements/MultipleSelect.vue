<template>
  <div>
    <label v-if="label" class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
      {{ label }}
    </label>

    <div class="relative" ref="dropdownRef">
      <!-- Hidden input for form submission -->
      <input v-if="name" type="hidden" :name="name" :value="selected.join(',')" />

      <!-- Select Input with Selected Tags -->
      <div
        @click="toggleDropdown"
        class="shadow-theme-xs flex min-h-11 cursor-pointer gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
      >
        <!-- Selected Items as Tags -->
        <div class="flex flex-1 flex-wrap items-center gap-2">
          <div
            v-for="id in selected"
            :key="id"
            class="group flex items-center justify-center rounded-full border-[0.7px] border-transparent bg-gray-100 py-1 ltr:pr-2 ltr:pl-2.5 rtl:pl-2 rtl:pr-2.5 text-sm text-gray-800 hover:border-gray-200 dark:bg-gray-800 dark:text-white/90 dark:hover:border-gray-800"
          >
            <span>{{ getOptionName(id) }}</span>
            <button
              type="button"
              @click.stop="toggleOption(id)"
              class="ltr:ml-1 rtl:mr-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <svg
                class="fill-current"
                role="button"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3.40717 4.46881C3.11428 4.17591 3.11428 3.70104 3.40717 3.40815C3.70006 3.11525 4.17494 3.11525 4.46783 3.40815L6.99943 5.93975L9.53095 3.40822C9.82385 3.11533 10.2987 3.11533 10.5916 3.40822C10.8845 3.70112 10.8845 4.17599 10.5916 4.46888L8.06009 7.00041L10.5916 9.53193C10.8845 9.82482 10.8845 10.2997 10.5916 10.5926C10.2987 10.8855 9.82385 10.8855 9.53095 10.5926L6.99943 8.06107L4.46783 10.5927C4.17494 10.8856 3.70006 10.8856 3.40717 10.5927C3.11428 10.2998 3.11428 9.8249 3.40717 9.53201L5.93877 7.00041L3.40717 4.46881Z"
                  fill=""
                />
              </svg>
            </button>
          </div>

          <!-- Show placeholder when nothing is selected -->
          <span v-if="selected.length === 0" class="text-sm text-gray-500 dark:text-gray-400">
            {{ placeholder }}
          </span>
        </div>

        <!-- Dropdown Arrow -->
        <div class="flex items-start pt-1.5">
          <svg
            class="h-5 w-5 shrink-0 text-gray-500 transition-transform dark:text-gray-400"
            :class="{ 'rotate-180': isOpen }"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      <!-- Dropdown Options List -->
      <div
        v-if="isOpen"
        class="absolute z-50 mt-1 w-full overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900"
        style="max-height: 16rem"
      >
        <div class="overflow-y-auto" style="max-height: 16rem">
          <div
            v-for="option in options"
            :key="option.id"
            @click="toggleOption(option.id)"
            class="cursor-pointer border-b border-gray-200 px-4 py-3 text-sm transition last:border-b-0 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800"
            :class="{ 'bg-gray-100 dark:bg-gray-800/50': isSelected(option.id) }"
          >
            <span class="text-gray-800 dark:text-white/90">
              {{ option.name }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

interface Option {
  id: number
  name: string
}

interface Props {
  label?: string
  options: Option[]
  modelValue?: number[]
  placeholder?: string
  name?: string
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  modelValue: () => [],
  placeholder: 'Select options...',
  name: '',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: number[]): void
}>()

const selected = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const isOpen = ref(false)
const dropdownRef = ref<HTMLDivElement | null>(null)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const toggleOption = (id: number) => {
  if (selected.value.includes(id)) {
    selected.value = selected.value.filter((i) => i !== id)
  } else {
    selected.value = [...selected.value, id]
  }
}

const isSelected = (id: number) => {
  return selected.value.includes(id)
}

const getOptionName = (id: number) => {
  return props.options.find((o) => o.id === id)?.name || ''
}

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})
</script>
