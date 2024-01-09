<script setup lang="ts">
import { computed, ref } from 'vue'

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const currentDate = ref(new Date(2024, 12, 1))

const getDaysInMonth = (year: number, month: number): Date[] => {
  const date = new Date(year, month, 1)
  const days: Date[] = []
  while (date.getMonth() === month) {
    days.push(new Date(date))
    date.setDate(date.getDate() + 1)
  }
  return days
}

const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const daysInMonth = getDaysInMonth(year, month)
  const firstDayIndex = daysInMonth[0].getDay()

  const prevMonthDays = getDaysInMonth(year, month - 1)
    .slice(-firstDayIndex)
    .map((day) => ({
      date: day.getDate(),
      prevMonth: true,
      nextMonth: false,
      isToday: isToday(day)
    }))

  const currentMonthDays = daysInMonth.map((day) => ({
    date: day.getDate(),
    prevMonth: false,
    nextMonth: false,
    isToday: isToday(day)
  }))

  const nextMonthDays = getDaysInMonth(year, month + 1)
    .slice(0, 42 - currentMonthDays.length - prevMonthDays.length)
    .map((day) => ({
      date: day.getDate(),
      prevMonth: false,
      nextMonth: true,
      isToday: isToday(day)
    }))

  return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays]
    .filter(day => !day.prevMonth && !day.nextMonth);
})

const isToday = (date: Date): boolean => {
  const today = new Date()
  return date.toDateString() === today.toDateString()
}

const isDateSelected = (day: any): boolean => {
   return day.date === 1 && !day.prevMonth && !day.nextMonth;
};
</script>

<template>
  <div
    class="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
  >
    <div class="grid grid-cols-7 rounded-t-sm bg-primary text-white">
      <template v-for="day in days" :key="day">
        <div
          class="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5 first:rounded-tl-sm last:rounded-tr-sm"
        >
          <span class="w-full h-full flex items-center justify-center">
            {{ day }}<span class="hidden lg:block"> day </span>
          </span>
        </div>
      </template>
    </div>

    <div class="grid grid-cols-7">
      <div
        v-for="(day, index) in calendarDays"
        :key="index"
        class="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31"
      >
        <div
          class="mx-auto flex h-24 w-10 flex-col overflow-hidden sm:w-full md:h-40 md:w-20 lg:w-28 2xl:w-40"
        >
          <span class="font-medium text-black dark:text-white">{{ day.date }}</span>

          <div v-if="isDateSelected(day)" class="group h-16 w-full flex-grow cursor-pointer py-1 md:h-30">
            <span class="group-hover:text-primary md:hidden"> More </span>
            <div
              class="event invisible absolute left-2 z-99 mb-1 flex w-[200%] flex-col rounded-sm border-l-[3px] border-primary bg-gray px-3 py-1 text-left opacity-0 group-hover:visible group-hover:opacity-100 dark:bg-meta-4 md:visible md:w-[190%] md:opacity-100"
            >
              <span class="event-name text-sm font-semibold text-black dark:text-white">
                Redesign Website
              </span>
              <span class="time text-sm font-medium text-black dark:text-white">
                1 Dec - 2 Dec
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
