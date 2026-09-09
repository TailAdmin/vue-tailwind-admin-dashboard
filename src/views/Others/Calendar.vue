<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div
      ref="calendarContainerRef"
      class="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]"
    >
      <div class="custom-calendar relative">
        <FullCalendar ref="calendarRef" class="min-h-screen" :options="calendarOptions" />
      </div>

      <!-- Modal -->
      <Modal v-if="isOpen" @close="closeModal">
        <template #body>
          <div
            class="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-6 dark:bg-gray-900 lg:p-10"
          >
            <button
              @click="closeModal"
              class="absolute ltr:right-3 rtl:left-3 top-3 z-999 flex h-9.5 w-9.5 items-center justify-center rounded-full bg-gray-100 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white sm:ltr:right-6 sm:rtl:left-6 sm:top-6 sm:h-11 sm:w-11 cursor-pointer"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M6.04289 16.5413C5.65237 16.9318 5.65237 17.565 6.04289 17.9555C6.43342 18.346 7.06658 18.346 7.45711 17.9555L11.9987 13.4139L16.5408 17.956C16.9313 18.3466 17.5645 18.3466 17.955 17.956C18.3455 17.5655 18.3455 16.9323 17.955 16.5418L13.4129 11.9997L17.955 7.4576C18.3455 7.06707 18.3455 6.43391 17.955 6.04338C17.5645 5.65286 16.9313 5.65286 16.5408 6.04338L11.9987 10.5855L7.45711 6.0439C7.06658 5.65338 6.43342 5.65338 6.04289 6.0439C5.65237 6.43442 5.65237 7.06759 6.04289 7.45811L10.5845 11.9997L6.04289 16.5413Z"
                  fill="currentColor"
                />
              </svg>
            </button>

            <h5
              class="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl ltr:pr-14 rtl:pl-14"
            >
              {{ selectedEvent ? 'Edit Event' : 'Add Event' }}
            </h5>
            <p class="text-sm text-gray-500 dark:text-gray-400 ltr:pr-14 rtl:pl-14">
              Plan your next big moment: schedule or edit an event to stay on track
            </p>

            <div class="mt-8">
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Event Title
                </label>
                <input
                  id="event-title"
                  v-model="eventTitle"
                  type="text"
                  placeholder="Enter event title"
                  class="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                />
              </div>

              <!-- Event Color -->
              <div class="mt-6">
                <label class="block mb-4 text-sm font-medium text-gray-700 dark:text-gray-400">
                  Event Color
                </label>
                <div class="flex flex-wrap items-center gap-4 sm:gap-5">
                  <div v-for="entry in calendarsEvents" :key="entry.key" class="n-chk">
                    <div :class="`form-check form-check-${entry.value} form-check-inline`">
                      <label
                        class="flex items-center text-sm text-gray-700 form-check-label dark:text-gray-400 cursor-pointer"
                        :for="'modal' + entry.key"
                      >
                        <span class="relative">
                          <input
                            type="radio"
                            name="event-level"
                            :value="entry.key"
                            :id="'modal' + entry.key"
                            v-model="eventLevel"
                            class="sr-only form-check-input"
                          />
                          <span
                            class="flex items-center justify-center w-5 h-5 ltr:mr-2 rtl:ml-2 border border-gray-300 rounded-full box dark:border-gray-700"
                          >
                          </span>
                        </span>
                        {{ entry.key }}
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Start Date -->
              <div class="mt-6">
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Enter Start Date
                </label>
                <div class="relative">
                  <input
                    id="event-start-date"
                    type="date"
                    v-model="eventStartDate"
                    @click="($event.target as any).showPicker?.()"
                    class="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 cursor-pointer"
                  />
                  <span
                    class="absolute top-1/2 right-3.5 -translate-y-1/2 pointer-events-none text-gray-700 dark:text-gray-400"
                  >
                    <svg
                      class="fill-current"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M4.33317 0.0830078C4.74738 0.0830078 5.08317 0.418794 5.08317 0.833008V1.24967H8.9165V0.833008C8.9165 0.418794 9.25229 0.0830078 9.6665 0.0830078C10.0807 0.0830078 10.4165 0.418794 10.4165 0.833008V1.24967L11.3332 1.24967C12.2997 1.24967 13.0832 2.03318 13.0832 2.99967V4.99967V11.6663C13.0832 12.6328 12.2997 13.4163 11.3332 13.4163H2.6665C1.70001 13.4163 0.916504 12.6328 0.916504 11.6663V4.99967V2.99967C0.916504 2.03318 1.70001 1.24967 2.6665 1.24967L3.58317 1.24967V0.833008C3.58317 0.418794 3.91896 0.0830078 4.33317 0.0830078ZM4.33317 2.74967H2.6665C2.52843 2.74967 2.4165 2.8616 2.4165 2.99967V4.24967H11.5832V2.99967C11.5832 2.8616 11.4712 2.74967 11.3332 2.74967H9.6665H4.33317ZM11.5832 5.74967H2.4165V11.6663C2.4165 11.8044 2.52843 11.9163 2.6665 11.9163H11.3332C11.4712 11.9163 11.5832 11.8044 11.5832 11.6663V5.74967Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                </div>
              </div>

              <!-- End Date -->
              <div class="mt-6">
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Enter End Date
                </label>
                <div class="relative">
                  <input
                    id="event-end-date"
                    type="date"
                    v-model="eventEndDate"
                    @click="($event.target as any).showPicker?.()"
                    class="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 cursor-pointer"
                  />
                  <span
                    class="absolute top-1/2 right-3.5 -translate-y-1/2 pointer-events-none text-gray-700 dark:text-gray-400"
                  >
                    <svg
                      class="fill-current"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M4.33317 0.0830078C4.74738 0.0830078 5.08317 0.418794 5.08317 0.833008V1.24967H8.9165V0.833008C8.9165 0.418794 9.25229 0.0830078 9.6665 0.0830078C10.0807 0.0830078 10.4165 0.418794 10.4165 0.833008V1.24967L11.3332 1.24967C12.2997 1.24967 13.0832 2.03318 13.0832 2.99967V4.99967V11.6663C13.0832 12.6328 12.2997 13.4163 11.3332 13.4163H2.6665C1.70001 13.4163 0.916504 12.6328 0.916504 11.6663V4.99967V2.99967C0.916504 2.03318 1.70001 1.24967 2.6665 1.24967L3.58317 1.24967V0.833008C3.58317 0.418794 3.91896 0.0830078 4.33317 0.0830078ZM4.33317 2.74967H2.6665C2.52843 2.74967 2.4165 2.8616 2.4165 2.99967V4.24967H11.5832V2.99967C11.5832 2.8616 11.4712 2.74967 11.3332 2.74967H9.6665H4.33317ZM11.5832 5.74967H2.4165V11.6663C2.4165 11.8044 2.52843 11.9163 2.6665 11.9163H11.3332C11.4712 11.9163 11.5832 11.8044 11.5832 11.6663V5.74967Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>

            <!-- Modal Footer -->
            <div class="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
              <button
                @click="closeModal"
                type="button"
                class="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
              >
                Close
              </button>

              <button
                @click="handleAddOrUpdateEvent"
                type="button"
                class="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
              >
                {{ selectedEvent ? 'Update Changes' : 'Add Event' }}
              </button>
            </div>
          </div>
        </template>
      </Modal>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted, onUnmounted } from 'vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import Modal from '@/components/profile/Modal.vue'
import { useRTL } from '@/composables/useRTL'

import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/vue3/daygrid'
import interactionPlugin from '@fullcalendar/vue3/interaction'
import multiMonthPlugin from '@fullcalendar/vue3/multimonth'
import themePlugin from '@fullcalendar/vue3/themes/classic'
import timeGridPlugin from '@fullcalendar/vue3/timegrid'

import '@fullcalendar/vue3/skeleton.css'
import '@fullcalendar/vue3/themes/classic/palette.css'
import '@fullcalendar/vue3/themes/classic/theme.css'

const { isRtl } = useRTL()

const currentPageTitle = ref('Calendar')
const calendarContainerRef = ref<HTMLElement | null>(null)
const calendarRef = ref<any>(null)

const isOpen = ref(false)
const selectedEvent = ref<any>(null)
const eventTitle = ref('')
const eventStartDate = ref('')
const eventEndDate = ref('')
const eventLevel = ref('Primary')
const currentView = ref('dayGridMonth')

const locale = 'en'

const viewOptions = [
  { key: 'dayGridMonth', label: 'Month' },
  { key: 'multiMonthYear', label: 'Year' },
  { key: 'timeGridWeek', label: 'Week' },
  { key: 'timeGridDay', label: 'Day' },
]

const calendarsEvents = [
  { key: 'Danger', value: 'danger' },
  { key: 'Success', value: 'success' },
  { key: 'Primary', value: 'primary' },
  { key: 'Warning', value: 'warning' },
]

const events = ref([
  {
    id: '1',
    title: 'Event Conf.',
    start: new Date().toISOString().split('T')[0],
    extendedProps: { calendar: 'Danger' },
  },
  {
    id: '2',
    title: 'Meeting',
    start: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    extendedProps: { calendar: 'Success' },
  },
  {
    id: '3',
    title: 'Workshop',
    start: new Date(Date.now() + 172800000).toISOString().split('T')[0],
    end: new Date(Date.now() + 259200000).toISOString().split('T')[0],
    extendedProps: { calendar: 'Primary' },
  },
])

const openModal = () => {
  isOpen.value = true
}

const closeModal = () => {
  isOpen.value = false
  resetModalFields()
}

const resetModalFields = () => {
  eventTitle.value = ''
  eventStartDate.value = ''
  eventEndDate.value = ''
  eventLevel.value = 'Primary'
  selectedEvent.value = null
}

const handleOpenAddModal = () => {
  resetModalFields()
  const currentDate = new Date()
  const yyyy = currentDate.getFullYear()
  const mm = String(currentDate.getMonth() + 1).padStart(2, '0')
  const dd = String(currentDate.getDate()).padStart(2, '0')
  const combineDate = `${yyyy}-${mm}-${dd}`

  eventStartDate.value = combineDate
  eventEndDate.value = combineDate
  openModal()
}

const handleDateSelect = (selectInfo: any) => {
  resetModalFields()
  eventStartDate.value = selectInfo.startStr ? selectInfo.startStr.split('T')[0] : ''
  eventEndDate.value = selectInfo.endStr
    ? selectInfo.endStr.split('T')[0]
    : eventStartDate.value
  openModal()
}

const handleEventClick = (clickInfo: any) => {
  const event = clickInfo.event
  if (event.url) {
    window.open(event.url)
    clickInfo.jsEvent.preventDefault()
    return
  }

  selectedEvent.value = event
  eventTitle.value = event.title
  eventStartDate.value = event.startStr ? event.startStr.split('T')[0] : ''
  eventEndDate.value = event.endStr ? event.endStr.split('T')[0] : eventStartDate.value
  eventLevel.value = event.extendedProps?.calendar || 'Primary'
  openModal()
}

const handleAddOrUpdateEvent = () => {
  const titleVal = eventTitle.value.trim() || (selectedEvent.value ? 'Event' : 'New Event')

  if (selectedEvent.value) {
    events.value = events.value.map((ev) =>
      ev.id === selectedEvent.value.id
        ? {
            ...ev,
            title: titleVal,
            start: eventStartDate.value,
            end: eventEndDate.value || eventStartDate.value,
            extendedProps: { calendar: eventLevel.value || 'Primary' },
          }
        : ev,
    )
  } else {
    const newEvent = {
      id: Date.now().toString(),
      title: titleVal,
      start: eventStartDate.value,
      end: eventEndDate.value || eventStartDate.value,
      allDay: true,
      extendedProps: { calendar: eventLevel.value || 'Primary' },
    }
    events.value = [...events.value, newEvent]
  }

  const calApi = calendarRef.value?.getApi()
  if (calApi) {
    calApi.removeAllEvents()
    events.value.forEach((ev) => calApi.addEvent(ev))
  }

  closeModal()
  resetModalFields()
}

const renderEventContent = (eventInfo: any) => {
  const calendarLevel = (
    eventInfo.event.extendedProps?.calendar || 'primary'
  ).toLowerCase()

  const colorMap: Record<string, { bg: string; dot: string; title: string; time: string }> = {
    success: {
      bg: 'border border-success-100 bg-success-50 dark:border-success-500/20 dark:bg-success-500/15',
      dot: 'bg-success-500',
      title: 'text-success-700 dark:text-success-400',
      time: 'text-success-600/80 dark:text-success-400/80',
    },
    danger: {
      bg: 'border border-error-100 bg-error-50 dark:border-error-500/20 dark:bg-error-500/15',
      dot: 'bg-error-500',
      title: 'text-error-700 dark:text-error-400',
      time: 'text-error-600/80 dark:text-error-400/80',
    },
    primary: {
      bg: 'border border-brand-100 bg-brand-50 dark:border-brand-500/20 dark:bg-brand-500/15',
      dot: 'bg-brand-500',
      title: 'text-brand-700 dark:text-brand-400',
      time: 'text-brand-600/80 dark:text-brand-400/80',
    },
    warning: {
      bg: 'border border-orange-100 bg-orange-50 dark:border-orange-500/20 dark:bg-orange-500/15',
      dot: 'bg-orange-500',
      title: 'text-orange-700 dark:text-orange-400',
      time: 'text-orange-600/80 dark:text-orange-400/80',
    },
  }

  const colors = colorMap[calendarLevel] || colorMap.primary
  const isTimeGridView =
    !eventInfo.event?.allDay &&
    eventInfo.view?.type &&
    eventInfo.view.type.startsWith('timeGrid')

  if (isTimeGridView) {
    return {
      html: `
        <div dir="ltr" class="event-fc-color flex h-full w-full flex-col justify-start overflow-hidden rounded-lg p-1.5 transition-colors ${colors.bg}">
          <div class="flex items-center gap-1.5">
            <div class="size-2 shrink-0 rounded-full ${colors.dot}"></div>
            <div class="truncate text-xs font-semibold leading-tight ${colors.title}">${eventInfo.event.title || ''}</div>
          </div>
          ${
            eventInfo.timeText
              ? `<div class="mt-0.5 truncate ps-3.5 text-[11px] font-medium leading-tight ${colors.time}">${eventInfo.timeText}</div>`
              : ''
          }
        </div>
      `,
    }
  }

  return {
    html: `
      <div dir="ltr" class="event-fc-color flex items-center rounded-lg py-1.5 ps-2.5 pe-3 transition-colors ${colors.bg}">
        <div class="fc-daygrid-event-dot ms-0 me-2 h-3.5 w-1 shrink-0 rounded-full border-none ${colors.dot}"></div>
        ${
          eventInfo.timeText
            ? `<div class="fc-event-time me-1.5 p-0 text-xs font-normal text-gray-500 dark:text-gray-400">${eventInfo.timeText}</div>`
            : ''
        }
        <div class="fc-event-title truncate p-0 text-xs font-medium text-gray-700 dark:text-white">${eventInfo.event.title || ''}</div>
      </div>
    `,
  }
}

function renderViewSelect(containerEl: HTMLElement, activeViewKey: string) {
  if (!containerEl) return
  const activeOption = viewOptions.find((v) => v.key === activeViewKey) || viewOptions[0]

  containerEl.innerHTML = `
    <div class="relative calendar-view-dropdown">
      <button
        type="button"
        class="calendar-view-btn flex h-9 w-full min-w-20 items-center justify-center gap-1.5 rounded-lg border border-gray-300 ps-3 pe-2 text-sm font-medium text-gray-700 shadow-xs dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
        aria-expanded="false"
        aria-haspopup="listbox"
      >
        <span class="calendar-view-label">${activeOption.label}</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="calendar-view-chevron h-4.5 w-4.5 transition-transform duration-200">
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </button>
      <div class="calendar-view-menu absolute end-0 z-50 mt-1.5 hidden w-38 space-y-0.5 rounded-xl border border-gray-200 bg-white p-1.5 shadow-lg dark:border-gray-700 dark:bg-gray-900!">
        ${viewOptions
          .map(
            (view) => `
          <button
            type="button"
            data-view-key="${view.key}"
            class="calendar-view-option w-full rounded-lg px-2.5 py-1.5 text-start text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5 ${
              activeViewKey === view.key
                ? 'bg-gray-100 font-medium dark:bg-white/5'
                : 'font-normal'
            }"
          >
            ${view.label}
          </button>
        `,
          )
          .join('')}
      </div>
    </div>
  `

  const dropdownContainer = containerEl.querySelector('.calendar-view-dropdown')
  if (!dropdownContainer) return
  const btn = dropdownContainer.querySelector('.calendar-view-btn') as HTMLElement
  const menu = dropdownContainer.querySelector('.calendar-view-menu') as HTMLElement
  const chevron = dropdownContainer.querySelector('.calendar-view-chevron') as HTMLElement

  btn?.addEventListener('click', (e) => {
    e.stopPropagation()
    const isHidden = menu.classList.contains('hidden')
    document.querySelectorAll('.calendar-view-menu').forEach((m) => m.classList.add('hidden'))
    document.querySelectorAll('.calendar-view-chevron').forEach((c) => c.classList.remove('rotate-180'))

    if (isHidden) {
      menu.classList.remove('hidden')
      chevron.classList.add('rotate-180')
      btn.setAttribute('aria-expanded', 'true')
    } else {
      menu.classList.add('hidden')
      chevron.classList.remove('rotate-180')
      btn.setAttribute('aria-expanded', 'false')
    }
  })

  dropdownContainer.querySelectorAll('.calendar-view-option').forEach((optionBtn) => {
    optionBtn.addEventListener('click', (e) => {
      e.stopPropagation()
      const viewKey = (optionBtn as HTMLElement).dataset.viewKey
      if (viewKey) {
        currentView.value = viewKey
        const calApi = calendarRef.value?.getApi()
        if (calApi && typeof calApi.changeView === 'function') {
          calApi.changeView(viewKey)
        }
      }
      menu.classList.add('hidden')
      chevron.classList.remove('rotate-180')
      btn.setAttribute('aria-expanded', 'false')
    })
  })
}

function handleWindowClick(event: MouseEvent) {
  const target = event.target as HTMLElement
  if (!target.closest('.calendar-view-dropdown')) {
    document.querySelectorAll('.calendar-view-menu').forEach((m) => m.classList.add('hidden'))
    document.querySelectorAll('.calendar-view-chevron').forEach((c) => c.classList.remove('rotate-180'))
  }
}

onMounted(() => {
  window.addEventListener('click', handleWindowClick)
})

onUnmounted(() => {
  window.removeEventListener('click', handleWindowClick)
})

const calendarOptions: any = reactive({
  plugins: [
    themePlugin,
    dayGridPlugin,
    timeGridPlugin,
    interactionPlugin,
    multiMonthPlugin,
  ],
  initialView: 'dayGridMonth',
  direction: (isRtl.value ? 'rtl' : 'ltr') as 'rtl' | 'ltr',
  height: 'auto',

  headerToolbar: {
    start: 'prev,next addEventButton',
    center: 'title',
    end: '',
  },
  headerToolbarClass:
    'sticky top-0! flex-col gap-4 z-20! [padding-inline:24px]! pt-6 sm:flex-row',
  toolbarTitleClass: 'text-lg! font-medium! text-gray-800 dark:text-white/90',
  toolbarSectionClass: 'ta-toolbar-section',
  buttonGroupClass: 'gap-2',
  buttons: {
    prev: {
      iconContent: {
        html: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="size-6 bg-transparent text-gray-700 rtl:rotate-180 dark:text-gray-400"><path d="M15 18l-6-6 6-6" /></svg>`,
      },
      className:
        'flex size-10! p-0! items-center justify-center! rounded-lg! border! bg-transparent! border-gray-200! text-gray-700 hover:border-gray-200 hover:bg-gray-50! focus:shadow-none active:border-gray-200! active:bg-transparent! active:shadow-none! dark:border-gray-800! dark:text-gray-400 dark:hover:border-gray-800 dark:hover:bg-gray-900! dark:active:border-gray-800!',
    },
    next: {
      iconContent: {
        html: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="size-6 bg-transparent text-gray-700 rtl:rotate-180 dark:text-gray-400"><path d="M9 18l6-6-6-6" /></svg>`,
      },
      className:
        'flex size-10! p-0! items-center justify-center! rounded-lg! border! bg-transparent! border-gray-200! text-gray-700 hover:border-gray-200 hover:bg-gray-50! focus:shadow-none active:border-gray-200! active:bg-transparent! active:shadow-none! dark:border-gray-800! dark:text-gray-400 dark:hover:border-gray-800 dark:hover:bg-gray-900! dark:active:border-gray-800!',
    },
    addEventButton: {
      text: 'Add Event +',
      click: handleOpenAddModal,
      className:
        'rounded-lg! border-0! bg-brand-500! px-4! py-2.5! text-sm! font-medium! text-white hover:bg-brand-600! focus:shadow-none! w-auto!',
    },
  },

  views: {
    multiMonthYear: {
      aspectRatio: 1.2,
      contentHeight: 'auto',
      height: 'auto',
      multiMonthMaxColumns: 3,
      tableClass: 'overflow-visible! rounded-lg!',
      singleMonthMinWidth: 320,
      showNonCurrentDates: true,
      singleMonthHeaderInnerClass:
        'text-sm font-medium! text-gray-800 dark:text-white/90',
      dayHeaderClass: (data: any) =>
        data.inPopover
          ? 'relative! border-b! border-gray-200! bg-gray-50/70! px-4! py-3! text-start! dark:border-gray-800! dark:bg-gray-800/50!'
          : 'border-0! bg-gray-50 py-2! dark:bg-gray-900',
      dayHeaderInnerClass: (data: any) =>
        data.inPopover
          ? 'text-sm! font-semibold! text-gray-800! dark:text-white/90!'
          : 'py-1 text-xs font-medium text-gray-400 uppercase',
      dayCellClass: (data: any) => {
        if (data.inPopover) return 'bg-transparent! p-3!';
        let cls = 'relative! p-0.5 sm:p-1!';
        if (data.isToday) cls += ' isolate bg-gray-100! font-semibold text-brand-500';
        if (data.isOther) cls += ' bg-transparent!';
        return cls;
      },
      dayCellInnerClass: (data: any) =>
        data.inPopover
          ? 'flex custom-scrollbar max-h-60 flex-col gap-1.5 overflow-y-auto'
          : '',
      dayCellTopInnerClass: 'text-sm!',
      dayMaxEvents: 0,
      rowMoreLinkClass:
        'absolute! -top-1! -start-0.5! z-10! border-0! bg-transparent! p-0!',
      rowMoreLinkInnerClass: 'overflow-visible!',
      moreLinkContent() {
        return {
          html: `<span><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-5.5 text-brand-500"><path d="M19 3v17a1 1 0 01-1.496.868l-4.512-2.578a2 2 0 00-1.984 0l-4.512 2.578A1 1 0 015 20V3z" /></svg></span>`,
        }
      },
    },
    dayGridMonth: {
      dayMaxEvents: 2,
      dayHeaderAlign: (data: any) => (data.inPopover ? 'start' : 'center'),
      dayHeaderClass: (data: any) =>
        data.inPopover
          ? 'relative! border-b! border-gray-200! bg-gray-50/70! px-4! py-3! text-start! dark:border-gray-800! dark:bg-gray-800/50!'
          : 'border-x-0! border-t border-gray-200! bg-gray-50 dark:border-gray-800! dark:bg-gray-900',
      dayHeaderInnerClass: (data: any) =>
        data.inPopover
          ? 'text-sm! font-semibold! text-gray-800! dark:text-white/90!'
          : 'px-5! py-4! text-sm font-medium text-gray-400 uppercase',
      dayCellClass: (data: any) => {
        if (data.inPopover) return 'bg-transparent! p-3!';
        return `bg-transparent! p-2! ${
          data.isToday ? 'bg-gray-100! dark:bg-gray-800/40!' : ''
        }`
      },
      dayCellInnerClass: (data: any) => {
        if (data.inPopover)
          return 'flex custom-scrollbar max-h-60 flex-col gap-1.5 overflow-y-auto'
        return data.isToday ? 'rounded-sm!' : ''
      },
      moreLinkClass:
        'border-0! bg-transparent! p-0! hover:bg-transparent! focus:outline-none',
      moreLinkContent(args: any) {
        return {
          html: `<span class="fc-more-link-badge inline-flex items-center rounded-sm bg-brand-50 px-1.5 py-0.5 text-xs font-medium text-brand-600 transition-colors hover:bg-brand-100 dark:bg-brand-500/15 dark:text-brand-400 dark:hover:bg-brand-500/25">+${args.num} more</span>`,
        }
      },
    },
    timeGridWeek: {
      slotDuration: '01:00:00',
      slotMinHeight: 56,
      expandRows: true,
      allDaySlot: true,
      dayHeaderContent: (arg: any) => {
        const weekday = new Intl.DateTimeFormat(locale, { weekday: 'short' })
          .format(arg.date)
          .toUpperCase()
        const day = new Intl.DateTimeFormat(locale, { day: 'numeric' }).format(arg.date)
        return `${weekday} - ${day}`
      },
      dayHeaderClass: (data: any) =>
        `border-x-0! border-t! border-b! border-gray-200! bg-gray-50! dark:border-gray-800! dark:bg-gray-900! ${
          data.isToday ? 'bg-gray-100/70! dark:bg-gray-800/60!' : ''
        }`,
      dayHeaderInnerClass: (data: any) =>
        `px-3! py-3.5! text-center! text-xs! font-medium! text-gray-500! uppercase! dark:text-gray-400! ${
          data.isToday ? 'font-semibold! text-brand-500! dark:text-brand-400!' : ''
        }`,
      slotHeaderDividerClass:
        'border-e! border-s-0! border-y-0! border-gray-200! dark:border-gray-800!',
      slotHeaderClass:
        'px-3! py-2! text-start! text-xs! font-medium! text-gray-400! dark:text-gray-500!',
      slotLaneClass: 'border-gray-100! dark:border-gray-800/60!',
      dayLaneClass: (data: any) =>
        `border-gray-200! dark:border-gray-800! ${
          data.isToday ? 'bg-brand-50/15! dark:bg-brand-500/[0.03]!' : ''
        }`,
      allDayDividerClass:
        'border-b! border-t-0! border-x-0! border-gray-200! p-0! bg-transparent! dark:border-gray-800!',
      allDayHeaderClass:
        'border-0! bg-gray-50! text-xs! font-medium! text-gray-500! dark:border-0! dark:bg-gray-900! dark:text-gray-400!',
    },
    timeGridDay: {
      slotDuration: '00:30:00',
      slotMinHeight: 48,
      expandRows: true,
      allDaySlot: true,
      dayHeaderContent: (arg: any) => {
        const weekday = new Intl.DateTimeFormat(locale, { weekday: 'short' })
          .format(arg.date)
          .toUpperCase()
        const day = new Intl.DateTimeFormat(locale, { day: 'numeric' }).format(arg.date)
        return `${weekday} - ${day}`
      },
      dayHeaderClass: (data: any) =>
        `border-x-0! border-t! border-b! border-gray-200! bg-gray-50! dark:border-gray-800! dark:bg-gray-900! ${
          data.isToday ? 'bg-gray-100/70! dark:bg-gray-800/60!' : ''
        }`,
      dayHeaderInnerClass: (data: any) =>
        `px-4! py-3.5! text-center! text-xs! font-medium! text-gray-500! uppercase! dark:text-gray-400! ${
          data.isToday ? 'font-semibold! text-brand-500! dark:text-brand-400!' : ''
        }`,
      slotHeaderDividerClass:
        'border-e! border-s-0! border-y-0! border-gray-200! dark:border-gray-800!',
      slotHeaderClass:
        'px-3! py-2! text-start! text-xs! font-medium! text-gray-400! dark:text-gray-500!',
      slotLaneClass: 'border-gray-100! dark:border-gray-800/60!',
      dayLaneClass: (data: any) =>
        `border-gray-200! dark:border-gray-800! ${
          data.isToday ? 'bg-brand-50/15! dark:bg-brand-500/[0.03]!' : ''
        }`,
      allDayDividerClass:
        'border-b! border-t-0! border-x-0! border-gray-200! p-0! bg-transparent! dark:border-gray-800!',
      allDayHeaderClass:
        'border-0! bg-gray-50! text-xs! font-medium! text-gray-500! dark:border-0! dark:bg-gray-900! dark:text-gray-400!',
    },
  },

  borderless: true,
  expandRows: true,
  slotMinHeight: 56,
  slotHeaderDividerClass:
    'border-e! border-s-0! border-y-0! border-gray-200! dark:border-gray-800!',
  allDayDividerClass:
    'border-b! border-t-0! border-x-0! border-gray-200! p-0! bg-transparent! dark:border-gray-800!',
  eventClass: 'focus:shadow-none',
  nowIndicator: false,
  columnEventClass:
    'bg-transparent! border-0! p-1! shadow-none! hover:shadow-none! focus:outline-none',
  columnEventInnerClass: 'p-0! border-0! bg-transparent! h-full',
  tableHeaderSticky: true,
  tableClass: 'overflow-hidden',
  rowEventClass:
    'bg-transparent! border-0! px-1! py-0.5! shadow-none! hover:shadow-none! focus:outline-none',
  rowEventInnerClass: 'p-0! border-0! bg-transparent!',
  popoverFormat: { month: 'short', day: 'numeric', year: 'numeric' } as const,
  popoverClass:
    'z-99999! w-72 max-w-[calc(100vw-32px)] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-theme-lg dark:border-gray-800 dark:bg-gray-900',
  popoverCloseClass:
    'absolute end-3 top-2.5 flex size-7 cursor-pointer items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 focus:outline-none dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white',
  popoverCloseContent: {
    html: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4"><path d="M18 6L6 18M6 6l12 12" /></svg>`,
  },

  selectable: true,
  events: events.value,
  select: handleDateSelect,
  eventClick: handleEventClick,
  eventContent: renderEventContent,

  datesSet(arg: any) {
    currentView.value = arg.view.type
    requestAnimationFrame(() => {
      const el = calendarContainerRef.value
      if (el) {
        const chunk = el.querySelector('.ta-toolbar-section:last-child') as HTMLElement
        if (chunk) {
          renderViewSelect(chunk, currentView.value)
        }
      }
    })
  },
})

watch(
  isRtl,
  (val) => {
    calendarOptions.direction = val ? 'rtl' : 'ltr'
    const calApi = calendarRef.value?.getApi()
    if (calApi) {
      calApi.setOption('direction', val ? 'rtl' : 'ltr')
    }
  },
)

watch(
  events,
  (newEvents) => {
    calendarOptions.events = [...newEvents]
  },
  { deep: true },
)
</script>
