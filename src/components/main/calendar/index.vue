<script setup lang="ts">
import type {
  DateSelectInfo,
  DayCellInfo,
  DayHeaderInfo,
  DayLaneInfo,
  EventClickInfo,
  MoreLinkInfo,
  ToolbarSectionInfo,
} from '@fullcalendar/vue3'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/vue3/daygrid'
import interactionPlugin from '@fullcalendar/vue3/interaction'
import multiMonthPlugin from '@fullcalendar/vue3/multimonth'
import themePlugin from '@fullcalendar/vue3/themes/classic'
import timeGridPlugin from '@fullcalendar/vue3/timegrid'
import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue'

import { useRTL } from '@/composables/useRTL'
import { useTheme } from '@/composables/useTheme'
import CalendarEventItem from './event-item.vue'
import CalendarEventModal from './event-modal.vue'
import { bookmarkSvg, chevronLeftSvg, chevronRightSvg, closeSvg } from './icons'
import type { CalendarEvent, EventFormData } from './types'
import CalendarViewSelect from './view-selector.vue'

const { theme } = useTheme()
const { isRtl } = useRTL()
const locale = computed(() => (isRtl.value ? 'ar' : 'en'))

const INITIAL_EVENTS: CalendarEvent[] = [
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
]

const events = ref<CalendarEvent[]>(INITIAL_EVENTS)
const selectedEvent = ref<CalendarEvent | null>(null)
const selectedStartDate = ref('')
const selectedEndDate = ref('')
const currentView = ref('dayGridMonth')
const portalNode = ref<Element | null>(null)
const isMobile = ref(typeof window !== 'undefined' ? window.innerWidth < 640 : false)

const calendarRef = ref<any>(null)
const calendarContainerRef = ref<HTMLDivElement | null>(null)
const isOpen = ref(false)

const openModal = () => {
  isOpen.value = true
}

const closeModal = () => {
  isOpen.value = false
}

const handleViewChange = (viewKey: string) => {
  currentView.value = viewKey
  const calApi = calendarRef.value?.getApi()
  if (calApi && typeof calApi.changeView === 'function') {
    calApi.changeView(viewKey)
  }
}

const handleOpenAddModal = () => {
  const currentDate = new Date()
  const yyyy = currentDate.getFullYear()
  const mm = String(currentDate.getMonth() + 1).padStart(2, '0')
  const dd = String(currentDate.getDate()).padStart(2, '0')
  const combineDate = `${yyyy}-${mm}-${dd}`

  selectedEvent.value = null
  selectedStartDate.value = combineDate
  selectedEndDate.value = combineDate
  openModal()
}

const handleDateSelect = (selectInfo: DateSelectInfo) => {
  const startStr = selectInfo.startStr ? selectInfo.startStr.split('T')[0] : ''
  const endStr = selectInfo.endStr ? selectInfo.endStr.split('T')[0] : startStr

  selectedEvent.value = null
  selectedStartDate.value = startStr
  selectedEndDate.value = endStr
  openModal()
}

const handleEventClick = (clickInfo: EventClickInfo) => {
  const event = clickInfo.event
  if (event.url) {
    window.open(event.url)
    clickInfo.jsEvent?.preventDefault()
    return
  }

  const startStr = event.startStr ? event.startStr.split('T')[0] : ''
  const endStr = event.endStr ? event.endStr.split('T')[0] : startStr

  selectedEvent.value = {
    id: event.id,
    title: event.title,
    start: event.startStr,
    end: event.endStr,
    extendedProps: { calendar: event.extendedProps?.calendar || 'Primary' },
  }
  selectedStartDate.value = startStr
  selectedEndDate.value = endStr
  openModal()
}

const handleSaveEvent = (formData: EventFormData) => {
  const titleVal = formData.title.trim() || (selectedEvent.value ? 'Event' : 'New Event')
  const startDateVal = formData.start
  const endDateVal = formData.end || startDateVal
  const levelVal = formData.level || 'Primary'

  if (selectedEvent.value) {
    events.value = events.value.map((ev) =>
      String(ev.id) === String(selectedEvent.value?.id)
        ? {
            ...ev,
            title: titleVal,
            start: startDateVal,
            end: endDateVal || startDateVal,
            extendedProps: { calendar: levelVal },
          }
        : ev,
    )
  } else {
    const newEvent: CalendarEvent = {
      id: Date.now().toString(),
      title: titleVal,
      start: startDateVal,
      end: endDateVal || startDateVal,
      allDay: true,
      extendedProps: { calendar: levelVal },
    }
    events.value = [...events.value, newEvent]
  }

  const calApi = calendarRef.value?.getApi()
  if (calApi) {
    calApi.removeAllEvents()
    events.value.forEach((ev) => calApi.addEvent(ev))
  }

  closeModal()
}

const checkMobile = () => {
  const mobile = window.innerWidth < 640
  if (isMobile.value !== mobile) {
    isMobile.value = mobile
    const calApi = calendarRef.value?.getApi()
    if (calApi) {
      calApi.setOption('views', {
        dayGridMonth: {
          dayMaxEvents: isMobile.value ? 0 : 2,
        },
        timeGridWeek: {
          dayMaxEvents: isMobile.value ? 0 : undefined,
        },
        timeGridDay: {
          dayMaxEvents: isMobile.value ? 0 : undefined,
        },
      })
    }
  }
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)

  requestAnimationFrame(() => {
    const el = calendarContainerRef.value?.querySelector('.ta-toolbar-section:last-child')
    if (el) {
      portalNode.value = el
    }
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

const calendarOptions = reactive<any>({
  plugins: [themePlugin, dayGridPlugin, timeGridPlugin, interactionPlugin, multiMonthPlugin],
  initialView: 'dayGridMonth',
  direction: (isRtl.value ? 'rtl' : 'ltr') as 'rtl' | 'ltr',
  height: 'auto',
  borderless: true,

  headerToolbar: {
    start: 'prev,next addEventButton',
    center: 'title',
    end: '',
  },
  headerToolbarClass:
    'sticky top-0! z-20! bg-white dark:bg-gray-900 flex-wrap! flex-row! items-center justify-between gap-3 sm:gap-4 [padding-inline:16px]! sm:[padding-inline:24px]! pt-4 sm:pt-6 pb-3 sm:pb-4',
  toolbarTitleClass: 'text-base! sm:text-lg! font-semibold! text-gray-800 dark:text-white/90',
  toolbarSectionClass: (info: ToolbarSectionInfo) => {
    if (info.name === 'start') {
      return 'ta-toolbar-section ta-toolbar-start order-2 flex w-full items-center justify-between sm:order-1 sm:w-auto sm:justify-start gap-2'
    }
    if (info.name === 'center') {
      return 'ta-toolbar-section ta-toolbar-center order-1 flex items-center justify-start sm:order-2 sm:justify-center'
    }
    if (info.name === 'end') {
      return 'ta-toolbar-section ta-toolbar-end order-1 flex items-center justify-end sm:order-3 sm:justify-end'
    }
    return 'ta-toolbar-section'
  },
  buttonGroupClass: 'gap-2',
  buttons: {
    prev: {
      iconContent: {
        html: chevronLeftSvg,
      },
      className:
        'flex size-9! sm:size-10! p-0! items-center justify-center! rounded-lg! border! bg-transparent! border-gray-200! text-gray-700 hover:border-gray-200 hover:bg-gray-50! focus:shadow-none active:border-gray-200! active:bg-transparent! active:shadow-none! dark:border-gray-800! dark:text-gray-400 dark:hover:border-gray-800 dark:hover:bg-gray-900! dark:active:border-gray-800!',
    },
    next: {
      iconContent: {
        html: chevronRightSvg,
      },
      className:
        'flex size-9! sm:size-10! p-0! items-center justify-center! rounded-lg! border! bg-transparent! border-gray-200! text-gray-700 hover:border-gray-200 hover:bg-gray-50! focus:shadow-none active:border-gray-200! active:bg-transparent! active:shadow-none! dark:border-gray-800! dark:text-gray-400 dark:hover:border-gray-800 dark:hover:bg-gray-900! dark:active:border-gray-800!',
    },
    addEventButton: {
      text: 'Add Event +',
      click: () => handleOpenAddModal(),
      className:
        'rounded-lg! border-0! bg-brand-500! px-3! sm:px-4! py-2! sm:py-2.5! text-xs! sm:text-sm! font-medium! text-white hover:bg-brand-600! focus:shadow-none! w-auto!',
    },
  },

  views: {
    multiMonthYear: {
      multiMonthMaxColumns: 3,
      singleMonthClass: 'fc-multimonth',
      tableClass:
        'overflow-visible! border-0! sm:border! sm:border-gray-200! dark:sm:border-gray-800! rounded-none! sm:rounded-lg! mt-0! bg-transparent!',
      singleMonthHeaderClass: 'mb-0! bg-white dark:bg-gray-900 sm:bg-transparent! ',
      tableHeaderClass: 'mb-0! rounded-none! sm:rounded-t-lg! bg-gray-50 dark:bg-gray-900!',
      tableBodyClass: 'mt-0!',
      singleMonthMinWidth: 280,
      showNonCurrentDates: true,
      singleMonthHeaderInnerClass: 'text-sm font-medium! text-gray-800 dark:text-white/90',
      dayHeaderRowClass: 'fc-multimonth-day-header-row',
      dayHeaderClass: (data: DayHeaderInfo) =>
        data.inPopover
          ? 'relative! border-b! border-gray-200! bg-gray-50/70! px-4! py-3! text-start! dark:border-gray-800! dark:bg-gray-800/50!'
          : 'border-0! bg-gray-50 py-2! dark:bg-gray-900 dark:sm:bg-transparent! first:rounded-none! first:sm:rounded-ss-lg! last:rounded-none! last:sm:rounded-se-lg!',
      dayHeaderInnerClass: (data: DayHeaderInfo) =>
        data.inPopover
          ? 'text-sm! font-semibold! text-gray-800! dark:text-white/90!'
          : 'py-1 text-[11px] sm:text-xs font-medium text-gray-400 uppercase',
      dayCellClass: (data: DayCellInfo) => {
        if (data.inPopover) return 'bg-transparent! p-3!'
        let cls = 'relative! p-0.5 sm:p-1!'
        if (data.isToday)
          cls +=
            ' isolate rounded-sm! bg-gray-100! dark:bg-gray-800/40! font-semibold text-brand-500 dark:text-brand-400'
        if (data.isOther) cls += ' bg-transparent!'
        return cls
      },
      dayCellInnerClass: (data: DayCellInfo) =>
        data.inPopover
          ? 'flex custom-scrollbar max-h-60 flex-col gap-1.5 overflow-y-auto'
          : 'h-0 max-h-0 overflow-hidden invisible',
      dayCellTopInnerClass: 'text-xs! sm:text-sm! text-gray-700 dark:text-gray-300',
      dayMaxEvents: 0,
      moreLinkClass: 'border-0! bg-transparent! p-0! hover:bg-transparent! focus:outline-none',
      rowMoreLinkClass:
        'absolute! -top-0.5! sm:-top-1! start-0.5! z-10! border-0! bg-transparent! p-0!',
      rowMoreLinkInnerClass: 'overflow-visible!',
      // Only show the bookmark when events are actually hidden in the row
      moreLinkContent(args: MoreLinkInfo) {
        return {
          html: args.num > 0 ? bookmarkSvg : '',
        }
      },
    },
    dayGridMonth: {
      dayMaxEvents: isMobile.value ? 0 : 2,
      dayHeaderAlign: (data: { inPopover: boolean }) => (data.inPopover ? 'start' : 'center'),
      dayHeaderClass: (data: DayHeaderInfo) =>
        data.inPopover
          ? 'relative! border-b! border-gray-200! bg-gray-50/70! px-4! py-3! text-start! dark:border-gray-800! dark:bg-gray-800/50!'
          : 'border-x-0! border-t border-gray-200! bg-gray-50 dark:border-gray-800! dark:bg-gray-900',
      dayHeaderInnerClass: (data: DayHeaderInfo) =>
        data.inPopover
          ? 'text-sm! font-semibold! text-gray-800! dark:text-white/90!'
          : 'px-1! py-2! sm:px-3! sm:py-3! md:px-5! md:py-4! text-xs! sm:text-sm! font-medium! text-gray-400 uppercase',
      dayCellClass: (data: DayCellInfo) => {
        if (data.inPopover) return 'bg-transparent! p-3!'
        return `bg-transparent! p-1! sm:p-2! ${
          data.isToday ? 'bg-gray-100! dark:bg-gray-800/40!' : ''
        }`
      },
      dayCellTopInnerClass: 'text-xs! sm:text-sm! text-gray-700 dark:text-gray-300',
      dayCellInnerClass: (data: DayCellInfo) => {
        if (data.inPopover) return 'flex custom-scrollbar max-h-60 flex-col gap-1.5 overflow-y-auto'
        if (isMobile.value) return 'h-0 max-h-0 overflow-hidden invisible'
        return `${data.isToday ? 'rounded-sm!' : ''} -mx-1! sm:-mx-2!`
      },
      rowMoreLinkClass: isMobile.value
        ? 'absolute! -top-1! -start-0.5! z-10! border-0! bg-transparent! p-0!'
        : '',
      rowMoreLinkInnerClass: isMobile.value ? 'overflow-visible!' : '',
      moreLinkClass: 'border-0! bg-transparent! p-0! hover:bg-transparent! focus:outline-none',
      moreLinkContent(args: MoreLinkInfo) {
        if (isMobile.value) {
          return {
            html: bookmarkSvg,
          }
        }
        return {
          html: `<span class="fc-more-link-badge inline-flex items-center rounded-sm bg-brand-50 px-1 py-0.5 text-[10px] font-medium text-brand-600 transition-colors hover:bg-brand-100 sm:px-1.5 sm:text-xs dark:bg-brand-500/15 dark:text-brand-400 dark:hover:bg-brand-500/25">+${args.num} more</span>`,
        }
      },
    },
    timeGridWeek: {
      slotDuration: '01:00:00',
      slotMinHeight: 56,
      allDaySlot: true,
      dayMaxEvents: isMobile.value ? 0 : undefined,
      moreLinkClass: 'border-0! bg-transparent! p-0! hover:bg-transparent! focus:outline-none',
      rowMoreLinkClass: isMobile.value
        ? 'absolute! -top-1! -start-0.5! z-10! border-0! bg-transparent! p-0!'
        : '',
      rowMoreLinkInnerClass: isMobile.value ? 'overflow-visible!' : '',
      moreLinkContent: isMobile.value
        ? () => ({
            html: bookmarkSvg,
          })
        : undefined,
      dayHeaderContent: (arg: DayHeaderInfo) => {
        const weekday = new Intl.DateTimeFormat(locale.value, {
          weekday: 'short',
        })
          .format(arg.date)
          .toUpperCase()
        const day = new Intl.DateTimeFormat(locale.value, {
          day: 'numeric',
        }).format(arg.date)
        return `${weekday} - ${day}`
      },
      dayHeaderClass: (data: DayHeaderInfo) =>
        `border-0! bg-gray-50! dark:bg-gray-900! ${
          data.isToday ? 'bg-gray-100/70! dark:bg-gray-800/60!' : ''
        }`,
      dayHeaderInnerClass: (data: DayHeaderInfo) =>
        `px-1.5! sm:px-3! py-2.5! sm:py-3.5! text-center! text-[11px]! sm:text-xs! font-medium! text-gray-500! uppercase! dark:text-gray-400! ${
          data.isToday ? 'font-semibold! text-brand-500! dark:text-brand-400!' : ''
        }`,
      slotHeaderDividerClass:
        'border-e! border-s-0! border-y-0! border-gray-200! dark:border-gray-800!',
      slotHeaderClass:
        'px-1.5! sm:px-3! py-1.5! sm:py-2! text-start! text-[11px]! sm:text-xs! font-medium! text-gray-400! dark:text-gray-500!',
      slotLaneClass: 'border-gray-100! dark:border-gray-800/60!',
      dayLaneClass: (data: DayLaneInfo) =>
        `border-gray-200! dark:border-gray-800! ${
          data.isToday ? 'bg-brand-50/15! dark:bg-brand-500/[0.03]!' : ''
        }`,
      allDayDividerClass:
        'border-b! border-t-0! border-x-0! border-gray-200! p-0! bg-transparent! dark:border-gray-800!',
      allDayHeaderClass:
        'border-0! bg-gray-50! text-[11px]! sm:text-xs! font-medium! text-gray-500! dark:border-0! dark:bg-gray-900! dark:text-gray-400!',
    },
    timeGridDay: {
      slotDuration: '00:30:00',
      slotMinHeight: 48,
      allDaySlot: true,
      dayMaxEvents: isMobile.value ? 0 : undefined,
      moreLinkClass: 'border-0! bg-transparent! p-0! hover:bg-transparent! focus:outline-none',
      rowMoreLinkClass: isMobile.value
        ? 'absolute! -top-1! -start-0.5! z-10! border-0! bg-transparent! p-0!'
        : '',
      rowMoreLinkInnerClass: isMobile.value ? 'overflow-visible!' : '',
      moreLinkContent: isMobile.value
        ? () => ({
            html: bookmarkSvg,
          })
        : undefined,
      dayHeaderContent: (arg: DayHeaderInfo) => {
        const weekday = new Intl.DateTimeFormat(locale.value, {
          weekday: 'short',
        })
          .format(arg.date)
          .toUpperCase()
        const day = new Intl.DateTimeFormat(locale.value, {
          day: 'numeric',
        }).format(arg.date)
        return `${weekday} - ${day}`
      },
      dayHeaderClass: (data: DayHeaderInfo) =>
        `border-0! bg-gray-50! dark:bg-gray-900! ${
          data.isToday ? 'bg-gray-100/70! dark:bg-gray-800/60!' : ''
        }`,
      dayHeaderInnerClass: (data: DayHeaderInfo) =>
        `px-2! sm:px-4! py-2.5! sm:py-3.5! text-center! text-xs! font-medium! text-gray-500! uppercase! dark:text-gray-400! ${
          data.isToday ? 'font-semibold! text-brand-500! dark:text-brand-400!' : ''
        }`,
      slotHeaderDividerClass:
        'border-e! border-s-0! border-y-0! border-gray-200! dark:border-gray-800!',
      slotHeaderClass:
        'px-2! sm:px-3! py-1.5! sm:py-2! text-start! text-[11px]! sm:text-xs! font-medium! text-gray-400! dark:text-gray-500!',
      slotLaneClass: 'border-gray-100! dark:border-gray-800/60!',
      dayLaneClass: (data: DayLaneInfo) =>
        `border-gray-200! dark:border-gray-800! ${
          data.isToday ? 'bg-brand-50/15! dark:bg-brand-500/[0.03]!' : ''
        }`,
      allDayDividerClass:
        'border-b! border-t-0! border-x-0! border-gray-200! p-0! bg-transparent! dark:border-gray-800!',
      allDayHeaderClass:
        'border-0! bg-gray-50! text-xs! font-medium! text-gray-500! dark:border-0! dark:bg-gray-900! dark:text-gray-400!',
    },
  },

  viewClass:
    'border-t! border-b-0! border-x-0! border-gray-200! bg-transparent! dark:border-gray-800! dark:bg-transparent!',
  tableHeaderClass: 'border-0! bg-gray-50! dark:bg-gray-900!',
  dayHeaderDividerClass:
    'border-b! border-t-0! border-x-0! border-gray-200! p-0! bg-transparent! dark:border-gray-800!',
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
  tableClass: 'overflow-hidden bg-transparent!',
  rowEventClass:
    'bg-transparent! border-0! px-1! py-0.5! shadow-none! hover:shadow-none! focus:outline-none',
  rowEventInnerClass: 'p-0! border-0! bg-transparent!',
  popoverFormat: { month: 'short', day: 'numeric', year: 'numeric' },
  popoverClass:
    'z-99999! w-72 max-w-[calc(100vw-32px)] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-theme-lg dark:border-gray-800 dark:bg-gray-900',
  popoverCloseClass:
    'absolute end-3 top-2.5 flex size-7 cursor-pointer items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 focus:outline-none dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white',
  popoverCloseContent: {
    html: closeSvg,
  },

  selectable: true,
  events: events.value,
  select: handleDateSelect,
  eventClick: handleEventClick,

  datesSet(arg: any) {
    currentView.value = arg.view.type
    requestAnimationFrame(() => {
      const chunk = calendarContainerRef.value?.querySelector('.ta-toolbar-section:last-child')
      if (chunk) {
        portalNode.value = chunk
      }
    })
  },
})

watch(
  events,
  (newEvents) => {
    calendarOptions.events = [...newEvents]
  },
  { deep: true },
)

watch(isRtl, (val) => {
  calendarOptions.direction = val ? 'rtl' : 'ltr'
})
</script>

<template>
  <div
    class="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3"
    :data-color-scheme="theme"
  >
    <div
      ref="calendarContainerRef"
      :class="`custom-calendar relative ${currentView === 'multiMonthYear' ? 'fc-multimonth' : ''}`"
      :data-color-scheme="theme"
    >
      <FullCalendar
        :key="isRtl ? 'rtl' : 'ltr'"
        ref="calendarRef"
        class="gap-0!"
        :options="calendarOptions"
      >
        <template #eventContent="eventInfo">
          <CalendarEventItem :event-info="eventInfo" />
        </template>
      </FullCalendar>

      <CalendarViewSelect
        :current-view="currentView"
        :portal-node="portalNode"
        @view-change="handleViewChange"
      />
    </div>

    <CalendarEventModal
      :is-open="isOpen"
      :selected-event="selectedEvent"
      :initial-start-date="selectedStartDate"
      :initial-end-date="selectedEndDate"
      @close="closeModal"
      @save="handleSaveEvent"
    />
  </div>
</template>
