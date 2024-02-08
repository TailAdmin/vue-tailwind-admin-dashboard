<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { onClickOutside } from '@vueuse/core'

interface Option {
  value: string
  text: string
  selected: boolean
  element?: HTMLElement
}

const target = ref(null)
const options = ref<Option[]>([])
const selected = ref<number[]>([])
const show = ref(false)

const open = () => {
  show.value = true
}

const isOpen = () => {
  return show.value === true
}

onClickOutside(target, () => {
  show.value = false
})

onMounted(() => {
  loadOptions()
})

const loadOptions = () => {
  const optionsEl = document.getElementById('multiSelect') as HTMLSelectElement | null
  if (optionsEl) {
    options.value = Array.from(optionsEl.options).map((option) => ({
      value: option.value,
      text: option.innerText,
      selected: option.selected
    }))
  }
}

const select = (index: number, event: MouseEvent) => {
  const newOptions = [...options.value]
  if (!newOptions[index].selected) {
    newOptions[index].selected = true
    newOptions[index].element = event.target as HTMLElement
    selected.value = [...selected.value, index]
  } else {
    newOptions[index].selected = false
    selected.value = selected.value.filter((i) => i !== index)
  }
  options.value = newOptions
}

const remove = (index: number) => {
  const newOptions = [...options.value]
  if (selected.value.includes(index)) {
    newOptions[index].selected = false
    selected.value = selected.value.filter((i) => i !== index)
    options.value = newOptions
  }
}

const selectedValues = () => {
  return selected.value.map((option) => options.value[option].value)
}
</script>

<template>
  <div class="relative z-50">
    <label class="mb-3 block text-sm font-medium text-black dark:text-white">
      Multiselect Dropdown
    </label>
    <div>
      <select class="hidden" id="multiSelect">
        <option value="1">Option 2</option>
        <option value="2">Option 3</option>
        <option value="3">Option 4</option>
        <option value="4">Option 5</option>
      </select>

      <div class="flex flex-col items-center">
        <input name="values" type="hidden" :value="selectedValues()" />
        <div class="relative z-20 inline-block w-full">
          <div class="relative flex flex-col items-center">
            <div @click="open" class="w-full">
              <div
                class="mb-2 flex rounded border border-stroke py-2 pl-3 pr-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
              >
                <div class="flex flex-auto flex-wrap gap-3">
                  <template v-for="index in selected" :key="index">
                    <div
                      class="my-1.5 flex items-center justify-center rounded border-[.5px] border-stroke bg-gray px-2.5 py-1.5 text-sm font-medium dark:border-strokedark dark:bg-white/30"
                    >
                      <div class="max-w-full flex-initial">{{ options[index].text }}</div>
                      <div class="flex flex-auto flex-row-reverse">
                        <div @click="remove(index)" class="cursor-pointer pl-2 hover:text-danger">
                          <svg
                            class="fill-current"
                            role="button"
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M9.35355 3.35355C9.54882 3.15829 9.54882 2.84171 9.35355 2.64645C9.15829 2.45118 8.84171 2.45118 8.64645 2.64645L6 5.29289L3.35355 2.64645C3.15829 2.45118 2.84171 2.45118 2.64645 2.64645C2.45118 2.84171 2.45118 3.15829 2.64645 3.35355L5.29289 6L2.64645 8.64645C2.45118 8.84171 2.45118 9.15829 2.64645 9.35355C2.84171 9.54882 3.15829 9.54882 3.35355 9.35355L6 6.70711L8.64645 9.35355C8.84171 9.54882 9.15829 9.54882 9.35355 9.35355C9.54882 9.15829 9.54882 8.84171 9.35355 8.64645L6.70711 6L9.35355 3.35355Z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </template>

                  <div v-show="selected.length === 0" class="flex-1">
                    <input
                      placeholder="Select an option"
                      class="h-full w-full appearance-none bg-transparent p-1 px-2 outline-none"
                      :value="selectedValues()"
                    />
                  </div>
                </div>
                <div class="flex w-8 items-center py-1 pl-1 pr-1">
                  <button
                    @click="open"
                    type="button"
                    class="h-6 w-6 cursor-pointer outline-none focus:outline-none"
                    :class="isOpen() ? 'rotate-180' : ''"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.8">
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                          fill="#637381"
                        ></path>
                      </g>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div class="w-full px-4">
              <div
                v-show="isOpen()"
                ref="target"
                class="max-h-select absolute left-0 top-full z-40 w-full overflow-y-auto rounded bg-white shadow dark:bg-form-input"
              >
                <div class="flex w-full flex-col">
                  <div v-for="(option, index) in options" :key="index">
                    <div
                      @click="select(index, $event)"
                      class="w-full cursor-pointer rounded-t border-b border-stroke hover:bg-primary/5 dark:border-form-strokedark"
                    >
                      <div
                        :class="[
                          'relative flex w-full items-center border-l-2 border-transparent p-2 pl-2',
                          option.selected ? 'border-primary' : ''
                        ]"
                      >
                        <div class="flex w-full items-center">
                          <div class="mx-2 leading-6">{{ option.text }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
