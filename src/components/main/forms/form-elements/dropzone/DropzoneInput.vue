<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { EyeIcon, TrashBinIcon, UploadIcon } from '@/icons/layout'

interface FileWithPreview {
  file: File
  preview?: string
}

const ACCEPTED_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml']
const MAX_SIZE = 5 * 1024 * 1024

const files = ref<FileWithPreview[]>([])
const previewImage = ref<FileWithPreview | null>(null)
const isPreviewOpen = ref(false)
const inputRef = ref<HTMLInputElement | null>(null)

const isDragActive = ref(false)
const isDragReject = ref(false)
const isFocused = ref(false)

const isDragAccept = computed(() => isDragActive.value && !isDragReject.value)

const addFiles = (incoming: File[]) => {
  const accepted = incoming.filter((f) => ACCEPTED_TYPES.includes(f.type) && f.size <= MAX_SIZE)
  files.value = [
    ...files.value,
    ...accepted.map((file) => ({
      file,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
    })),
  ]
}

const removeFile = (fileName: string) => {
  const target = files.value.find((f) => f.file.name === fileName)
  if (target?.preview) URL.revokeObjectURL(target.preview)
  files.value = files.value.filter((f) => f.file.name !== fileName)
}

const clearAll = () => {
  files.value.forEach((f) => {
    if (f.preview) URL.revokeObjectURL(f.preview)
  })
  files.value = []
}

const handleOpenPreview = (file: FileWithPreview) => {
  previewImage.value = file
  isPreviewOpen.value = true
}

const openPicker = () => inputRef.value?.click()

const onInputChange = (e: Event) => {
  const input = e.target as HTMLInputElement
  if (input.files) addFiles(Array.from(input.files))
  input.value = ''
}

const onDragEnter = (e: DragEvent) => {
  isDragActive.value = true
  const items = Array.from(e.dataTransfer?.items ?? [])
  isDragReject.value = items.length > 0 && items.some((i) => !ACCEPTED_TYPES.includes(i.type))
}

const onDragLeave = () => {
  isDragActive.value = false
  isDragReject.value = false
}

const onDrop = (e: DragEvent) => {
  isDragActive.value = false
  isDragReject.value = false
  if (e.dataTransfer?.files) addFiles(Array.from(e.dataTransfer.files))
}

const borderColor = computed(() => {
  if (isDragReject.value) return 'border-error-500 bg-error-50/60 dark:bg-error-950/20'
  if (isDragAccept.value) return 'border-brand-500 bg-brand-50/60 dark:bg-brand-950/20'
  if (isFocused.value)
    return 'border-brand-500 ring-2 ring-brand-500/20 bg-gray-50 dark:bg-gray-900'
  return 'border-gray-300 bg-gray-50 hover:border-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-brand-500'
})

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

onBeforeUnmount(() => {
  files.value.forEach((f) => {
    if (f.preview) URL.revokeObjectURL(f.preview)
  })
})
</script>

<template>
  <div class="w-full">
    <div
      role="button"
      tabindex="0"
      :class="`relative flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed p-7 text-center transition-all duration-200 outline-hidden lg:p-10 ${borderColor}`"
      @click="openPicker"
      @keydown.enter.prevent="openPicker"
      @keydown.space.prevent="openPicker"
      @focus="isFocused = true"
      @blur="isFocused = false"
      @dragenter.prevent="onDragEnter"
      @dragover.prevent
      @dragleave.prevent="onDragLeave"
      @drop.prevent="onDrop"
    >
      <input
        ref="inputRef"
        type="file"
        multiple
        accept=".png,.jpg,.jpeg,.webp,.svg"
        class="hidden"
        tabindex="-1"
        @click.stop
        @change="onInputChange"
      />

      <div class="flex flex-col items-center">
        <!-- Circular Upload Icon -->
        <div
          class="mb-4 flex size-17 items-center justify-center rounded-full bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
        >
          <UploadIcon class="size-7 text-current" />
        </div>

        <!-- Heading -->
        <h4 class="mb-2 text-xl font-semibold text-gray-800 dark:text-white/90">
          {{
            isDragReject
              ? 'File type not supported'
              : isDragAccept
                ? 'Drop images here'
                : isDragActive
                  ? 'Drop files here'
                  : 'Drop File Here'
          }}
        </h4>

        <!-- Subtitle -->
        <p class="mb-4 max-w-72.5 text-sm text-gray-700 dark:text-gray-400">
          {{
            isDragReject
              ? 'Only PNG, JPG, WebP, and SVG images up to 5MB are allowed'
              : 'Drag and drop your PNG, JPG, WebP, SVG images here or browse'
          }}
        </p>

        <!-- Browse Action -->
        <span class="text-sm font-medium text-brand-500 underline hover:text-brand-600">
          Browse File
        </span>
      </div>
    </div>

    <!-- Uploaded Images Preview Gallery -->
    <div v-if="files.length > 0" class="mt-6 space-y-4">
      <div class="flex items-center justify-between">
        <h5 class="text-sm font-medium text-gray-700 dark:text-gray-300">
          Uploaded Images ({{ files.length }})
        </h5>
        <button
          type="button"
          class="text-xs font-medium text-error-500 hover:text-error-600 dark:text-error-400"
          @click="clearAll"
        >
          Clear all
        </button>
      </div>

      <div class="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div
          v-for="item in files"
          :key="`${item.file.name}-${item.file.lastModified}`"
          class="group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-theme-xs transition hover:shadow-theme-sm dark:border-gray-800 dark:bg-gray-900"
        >
          <!-- Image Preview Container -->
          <div class="relative aspect-4/3 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
            <img
              v-if="item.preview"
              :src="item.preview"
              :alt="item.file.name"
              class="absolute inset-0 size-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div v-else class="flex h-full w-full items-center justify-center text-gray-400">
              <UploadIcon class="size-8" />
            </div>

            <!-- Hover Action Overlay -->
            <div
              class="absolute inset-0 flex items-center justify-center gap-2 bg-gray-900/60 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            >
              <button
                v-if="item.preview"
                type="button"
                class="flex size-8 items-center justify-center rounded-full bg-white/90 text-gray-800 backdrop-blur-xs transition hover:bg-white dark:bg-gray-800/90 dark:text-white dark:hover:bg-gray-800"
                title="Preview image"
                :aria-label="`Preview ${item.file.name}`"
                @click="handleOpenPreview(item)"
              >
                <EyeIcon class="size-4" />
              </button>
              <button
                type="button"
                class="flex size-8 items-center justify-center rounded-full bg-white/90 text-error-500 backdrop-blur-xs transition hover:bg-white dark:bg-gray-800/90 dark:text-error-400 dark:hover:bg-gray-800"
                title="Remove image"
                :aria-label="`Remove ${item.file.name}`"
                @click="removeFile(item.file.name)"
              >
                <TrashBinIcon class="size-4" />
              </button>
            </div>
          </div>

          <!-- File Metadata -->
          <div class="p-3">
            <p
              class="truncate text-xs font-medium text-gray-800 dark:text-white/90"
              :title="item.file.name"
            >
              {{ item.file.name }}
            </p>
            <p class="mt-0.5 text-[11px] text-gray-500 dark:text-gray-400">
              {{ formatFileSize(item.file.size) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Image Preview Dialog -->
    <Dialog v-model:open="isPreviewOpen">
      <DialogContent class="max-w-2xl p-6 sm:p-8">
        <div v-if="previewImage">
          <DialogHeader class="mb-4">
            <DialogTitle class="text-lg font-semibold text-gray-800 dark:text-white/90">
              Image Preview
            </DialogTitle>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              {{ previewImage.file.name }} • {{ formatFileSize(previewImage.file.size) }}
            </p>
          </DialogHeader>

          <div
            class="relative aspect-video w-full overflow-hidden rounded-xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-gray-800"
          >
            <img
              v-if="previewImage.preview"
              :src="previewImage.preview"
              :alt="previewImage.file.name"
              class="absolute inset-0 size-full object-contain"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>
