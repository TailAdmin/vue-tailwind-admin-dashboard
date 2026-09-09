<template>
  <div class="file-uploader">
    <form
      ref="dropzoneForm"
      :id="dropzoneId"
      :action="uploadUrl"
      class="border-gray-300 border-dashed dropzone rounded-xl bg-gray-50 p-7 hover:border-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-brand-500 lg:p-10"
    >
      <div class="dz-message m-0!">
        <div class="mb-[22px] flex justify-center">
          <div
            class="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
          >
            <svg
              class="fill-current"
              width="29"
              height="28"
              viewBox="0 0 29 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M14.5019 3.91699C14.2852 3.91699 14.0899 4.00891 13.953 4.15589L8.57363 9.53186C8.28065 9.82466 8.2805 10.2995 8.5733 10.5925C8.8661 10.8855 9.34097 10.8857 9.63396 10.5929L13.7519 6.47752V18.667C13.7519 19.0812 14.0877 19.417 14.5019 19.417C14.9161 19.417 15.2519 19.0812 15.2519 18.667V6.48234L19.3653 10.5929C19.6583 10.8857 20.1332 10.8855 20.426 10.5925C20.7188 10.2995 20.7186 9.82463 20.4256 9.53184L15.0838 4.19378C14.9463 4.02488 14.7367 3.91699 14.5019 3.91699ZM5.91626 18.667C5.91626 18.2528 5.58047 17.917 5.16626 17.917C4.75205 17.917 4.41626 18.2528 4.41626 18.667V21.8337C4.41626 23.0763 5.42362 24.0837 6.66626 24.0837H22.3339C23.5766 24.0837 24.5839 23.0763 24.5839 21.8337V18.667C24.5839 18.2528 24.2482 17.917 23.8339 17.917C23.4197 17.917 23.0839 18.2528 23.0839 18.667V21.8337C23.0839 22.2479 22.7482 22.5837 22.3339 22.5837H6.66626C6.25205 22.5837 5.91626 22.2479 5.91626 21.8337V18.667Z"
                fill=""
              />
            </svg>
          </div>
        </div>

        <h4 class="mb-3 font-semibold text-gray-800 text-theme-xl dark:text-white/90">
          Drag & Drop File Here
        </h4>
        <span
          class="mx-auto mb-5 block w-full max-w-[290px] text-sm text-gray-700 dark:text-gray-400"
        >
          Drag and drop your PNG, JPG, WebP, SVG images here or browse
        </span>

        <span class="font-medium underline cursor-pointer text-theme-sm text-brand-500">
          Browse File
        </span>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import Dropzone from 'dropzone'
import 'dropzone/dist/dropzone.css'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  uploadUrl: {
    type: String,
    default: '/upload',
  },
  maxFilesize: {
    type: Number,
    default: 5,
  },
})

const dropzoneForm = ref(null)
const dropzoneId = `dropzone-${Math.random().toString(36).substr(2, 9)}`
let dropzoneInstance: Dropzone | null = null

onMounted(() => {
  Dropzone.autoDiscover = false

  dropzoneInstance = new Dropzone(`#${dropzoneId}`, {
    url: props.uploadUrl,
    thumbnailWidth: 150,
    maxFilesize: props.maxFilesize,
    acceptedFiles: 'image/jpeg,image/png,image/gif,image/webp,image/svg+xml',
    headers: { 'My-Awesome-Header': 'header value' },
    dictDefaultMessage: '',
    addRemoveLinks: true,
    init: function () {
      const setupRemoveHandlers = (file: any) => {
        if (!file?.previewElement) return

        // Make the error mark (the big X close icon in the center) clickable to reset/remove
        const errorMark = file.previewElement.querySelector('.dz-error-mark')
        if (errorMark && !errorMark.hasAttribute('data-remove-attached')) {
          errorMark.setAttribute('data-remove-attached', 'true')
          errorMark.setAttribute('title', 'Remove file')
          errorMark.addEventListener('click', (e: Event) => {
            e.preventDefault()
            e.stopPropagation()
            this.removeFile(file)
          })
        }

        // Make error message clickable to remove
        const errorMsg = file.previewElement.querySelector('.dz-error-message')
        if (errorMsg && !errorMsg.hasAttribute('data-remove-attached')) {
          errorMsg.setAttribute('data-remove-attached', 'true')
          errorMsg.addEventListener('click', (e: Event) => {
            e.preventDefault()
            e.stopPropagation()
            this.removeFile(file)
          })
        }

        // Add a corner close icon (X) to the preview card so user can also remove any uploaded file
        if (!file.previewElement.querySelector('.dz-custom-remove')) {
          const closeBtn = document.createElement('button')
          closeBtn.type = 'button'
          closeBtn.className = 'dz-custom-remove'
          closeBtn.title = 'Remove file'
          closeBtn.innerHTML = `
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 2L2 8M2 2L8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          `
          closeBtn.addEventListener('click', (e: Event) => {
            e.preventDefault()
            e.stopPropagation()
            this.removeFile(file)
          })
          file.previewElement.appendChild(closeBtn)
        }
      }

      this.on('addedfile', (file: any) => {
        console.log('A file has been added', file)
        setupRemoveHandlers(file)
      })
      this.on('error', (file: any, error: any) => {
        console.error('An error occurred during upload', file, error)
        setupRemoveHandlers(file)
      })
      this.on('success', (file: any, response: any) => {
        console.log('File successfully uploaded', file, response)
      })
    },
  })
})

onBeforeUnmount(() => {
  if (dropzoneInstance) {
    dropzoneInstance.destroy()
  }
})
</script>

<style>
.dropzone {
  border: 1px dashed #d0d5dd;
  transition: all 0.3s ease;
}

.dropzone:hover {
  border-color: #465fff;
}

.dropzone .dz-preview {
  position: relative;
  margin: 10px;
}

.dropzone .dz-preview .dz-image {
  border-radius: 8px;
}

.dropzone .dz-preview .dz-details {
  padding: 1em;
}

.dropzone .dz-preview .dz-progress {
  height: 10px;
}

.dropzone .dz-preview .dz-progress .dz-upload {
  background: #4f46e5;
}

/* Make error mark (close X icon) interactive */
.dropzone .dz-preview .dz-error-mark {
  pointer-events: auto !important;
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.dropzone .dz-preview .dz-error-mark:hover {
  transform: scale(1.1);
}

.dropzone .dz-preview.dz-error .dz-error-message {
  cursor: pointer;
}

/* Custom corner remove button */
.dropzone .dz-preview .dz-custom-remove {
  position: absolute;
  top: -6px;
  right: -6px;
  width: 22px;
  height: 22px;
  border-radius: 9999px;
  background-color: #ef4444;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 600;
  cursor: pointer;
  border: 2px solid #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;
  padding: 0;
}

.dark .dropzone .dz-preview .dz-custom-remove {
  border-color: #111827;
}

.dropzone .dz-preview .dz-custom-remove:hover {
  background-color: #dc2626;
  transform: scale(1.1);
}

/* Dropzone default remove link */
.dropzone .dz-preview .dz-remove {
  margin-top: 8px;
  font-size: 13px;
  color: #ef4444;
  text-align: center;
  display: block;
  cursor: pointer;
  text-decoration: underline;
  transition: color 0.2s ease;
}

.dropzone .dz-preview .dz-remove:hover {
  color: #dc2626;
}

.dark .dropzone {
  background-color: #111827;
  border-color: #374151;
}

.dark .dropzone:hover {
  border-color: #6366f1;
}
</style>
