<script setup lang="ts">
import { nextTick, onUnmounted, ref, watch } from 'vue'
import flatpickr from 'flatpickr'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { CloseIcon } from './icons'
import type { CalendarEvent, EventFormData } from './types'

export interface CalendarEventModalProps {
  isOpen: boolean
  selectedEvent: CalendarEvent | null
  initialStartDate?: string
  initialEndDate?: string
}

const props = withDefaults(defineProps<CalendarEventModalProps>(), {
  initialStartDate: '',
  initialEndDate: '',
})

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save', data: EventFormData): void
}>()

const EVENT_COLORS = ['Primary', 'Danger', 'Success', 'Warning', 'Info'] as const

const eventTitle = ref('')
const eventStartDate = ref('')
const eventEndDate = ref('')
const eventLevel = ref('Primary')

const startDateInput = ref<any>(null)
const endDateInput = ref<any>(null)
let startPicker: flatpickr.Instance | null = null
let endPicker: flatpickr.Instance | null = null

const prevArrowSvg =
  '<svg class="stroke-current" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.5 15L7.5 10L12.5 5" stroke="" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
const nextArrowSvg =
  '<svg class="stroke-current" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 15L12.5 10L7.5 5" stroke="" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'

const destroyPickers = () => {
  if (startPicker) {
    startPicker.destroy()
    startPicker = null
  }
  if (endPicker) {
    endPicker.destroy()
    endPicker = null
  }
}

watch(
  () => [props.isOpen, props.selectedEvent, props.initialStartDate, props.initialEndDate] as const,
  ([isOpen, selectedEvent, initialStart, initialEnd]) => {
    if (isOpen) {
      if (selectedEvent) {
        eventTitle.value = (selectedEvent.title as string) || ''
        const startStr =
          typeof selectedEvent.start === 'string'
            ? selectedEvent.start.split('T')[0]
            : selectedEvent.start instanceof Date
              ? selectedEvent.start.toISOString().split('T')[0]
              : ''
        const endStr =
          typeof selectedEvent.end === 'string'
            ? selectedEvent.end.split('T')[0]
            : selectedEvent.end instanceof Date
              ? selectedEvent.end.toISOString().split('T')[0]
              : ''
        eventStartDate.value = startStr
        eventEndDate.value = endStr || startStr
        eventLevel.value = selectedEvent.extendedProps?.calendar || 'Primary'
      } else {
        eventTitle.value = ''
        eventStartDate.value = initialStart
        eventEndDate.value = initialEnd || initialStart
        eventLevel.value = 'Primary'
      }

      nextTick(() => {
        destroyPickers()
        const startEl = startDateInput.value?.$el ?? startDateInput.value
        const endEl = endDateInput.value?.$el ?? endDateInput.value

        if (startEl) {
          const fp = flatpickr(startEl, {
            dateFormat: 'Y-m-d',
            defaultDate: eventStartDate.value || undefined,
            monthSelectorType: 'static',
            static: true,
            clickOpens: true,
            prevArrow: prevArrowSvg,
            nextArrow: nextArrowSvg,
            onChange: (_dates, dateStr) => {
              eventStartDate.value = dateStr
            },
          })
          startPicker = Array.isArray(fp) ? fp[0] : fp
        }

        if (endEl) {
          const fp = flatpickr(endEl, {
            dateFormat: 'Y-m-d',
            defaultDate: eventEndDate.value || undefined,
            monthSelectorType: 'static',
            static: true,
            clickOpens: true,
            prevArrow: prevArrowSvg,
            nextArrow: nextArrowSvg,
            onChange: (_dates, dateStr) => {
              eventEndDate.value = dateStr
            },
          })
          endPicker = Array.isArray(fp) ? fp[0] : fp
        }
      })
    } else {
      destroyPickers()
    }
  },
  { immediate: true },
)

watch(eventStartDate, (newDate) => {
  if (startPicker && newDate) {
    startPicker.setDate(newDate, false)
  }
})

watch(eventEndDate, (newDate) => {
  if (endPicker && newDate) {
    endPicker.setDate(newDate, false)
  }
})

onUnmounted(() => {
  destroyPickers()
})

const handleSubmit = (e: Event) => {
  e.preventDefault()
  const titleVal = eventTitle.value.trim() || (props.selectedEvent ? 'Event' : 'New Event')
  const startDateVal = eventStartDate.value
  const endDateVal = eventEndDate.value || startDateVal
  const levelVal = eventLevel.value || 'Primary'

  emit('save', {
    title: titleVal,
    start: startDateVal,
    end: endDateVal,
    level: levelVal,
  })
}

const handleClose = () => {
  emit('close')
}
</script>

<template>
  <Dialog
    :open="isOpen"
    @update:open="
      (val: boolean) => {
        if (!val) handleClose()
      }
    "
  >
    <DialogContent
      :show-close-button="false"
      class="overflow-visible border-none bg-transparent p-0 shadow-none sm:max-w-175"
    >
      <Card
        class="relative w-full rounded-3xl border border-gray-200 bg-white p-6 shadow-theme-lg sm:p-11 dark:border-gray-800 dark:bg-[#1E2635]"
      >
        <!-- Top-end circular close button (Figma large design) -->
        <DialogClose as-child>
          <Button
            variant="ghost"
            size="icon-lg"
            class="absolute end-6 top-6 hidden size-11 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-800 sm:flex dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <CloseIcon class="size-6" />
            <span class="sr-only">Close</span>
          </Button>
        </DialogClose>

        <!-- Title and subtitle -->
        <div class="flex flex-col gap-2">
          <DialogTitle
            class="text-title-lg leading-8 font-semibold text-gray-800 sm:text-2xl dark:text-white/90"
          >
            Add / Edit Event
          </DialogTitle>
          <DialogDescription class="text-sm leading-5 font-normal text-gray-500 dark:text-gray-400">
            Plan your next big moment: schedule or edit an event to stay on track
          </DialogDescription>
        </div>

        <!-- Form fields -->
        <form @submit="handleSubmit" class="mt-6 space-y-5 sm:mt-8 sm:space-y-6">
          <!-- Event Title -->
          <div>
            <Label
              for="event-title"
              class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Event Title
            </Label>
            <Input id="event-title" v-model="eventTitle" class="h-11 rounded-[10px]" />
          </div>

          <!-- Event Color -->
          <div>
            <Label class="mb-3 block text-sm font-medium text-gray-700 sm:mb-4 dark:text-gray-300">
              Event Color
            </Label>
            <RadioGroup v-model="eventLevel" class="flex flex-wrap items-center gap-4 sm:gap-5">
              <div v-for="color in EVENT_COLORS" :key="color" class="flex items-center gap-2">
                <RadioGroupItem :value="color" :id="`modal-color-${color.toLowerCase()}`" />
                <Label
                  :for="`modal-color-${color.toLowerCase()}`"
                  class="cursor-pointer text-sm font-normal text-gray-700 dark:text-gray-400"
                >
                  {{ color }}
                </Label>
              </div>
            </RadioGroup>
          </div>

          <!-- Enter Start Date -->
          <div>
            <Label
              for="event-start-date"
              class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Enter Start Date
            </Label>
            <Input
              ref="startDateInput"
              id="event-start-date"
              placeholder="dd/mm/yyyy"
              v-model="eventStartDate"
              class="h-11 rounded-[10px]"
            />
          </div>

          <!-- Enter End Date -->
          <div>
            <Label
              for="event-end-date"
              class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Enter End Date
            </Label>
            <Input
              ref="endDateInput"
              id="event-end-date"
              placeholder="dd/mm/yyyy"
              v-model="eventEndDate"
              class="h-11 rounded-[10px]"
            />
          </div>

          <!-- Action buttons (Small: 2 columns full-width, Large: right-aligned) -->
          <div class="grid grid-cols-2 gap-3 pt-2 sm:flex sm:justify-end sm:pt-4">
            <Button
              type="button"
              variant="outline"
              class="h-11 w-full rounded-[10px] px-5 py-3 sm:w-auto"
              @click="handleClose"
            >
              Close
            </Button>
            <Button type="submit" class="h-11 w-full rounded-[10px] px-5 py-3 sm:w-auto">
              {{ selectedEvent ? 'Save Changes' : 'Add Event' }}
            </Button>
          </div>
        </form>
      </Card>
    </DialogContent>
  </Dialog>
</template>
