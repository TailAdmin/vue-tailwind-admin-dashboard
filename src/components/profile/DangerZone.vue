<template>
  <div class="mb-6 rounded-2xl border border-gray-200 p-5 lg:p-6 dark:border-gray-800">
    <h4 class="text-lg font-semibold text-gray-800 mb-3 lg:mb-6 dark:text-white/90">Danger Zone</h4>
    <div>
      <div
        class="flex flex-col justify-between gap-4 border-b border-gray-200 py-4 first:pt-0 last:border-b-0 last:pb-0 sm:flex-row sm:items-end dark:border-gray-800"
      >
        <div>
          <span class="block text-base mb-1 font-medium text-gray-800 dark:text-white/90"
            >Logout all devices</span
          >
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Sign out from every active session.
          </p>
        </div>
        <div>
          <button
            class="shadow-theme-xs flex h-10 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white py-2.5 pr-4 pl-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/3 dark:hover:text-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M3.33325 10.0003L9.79159 10.0003M6.66599 6.66699L3.33488 10.0002L6.66599 13.3337M8.12492 4.16374V3.54199C8.12492 2.85164 8.68456 2.29199 9.37492 2.29199H14.3749C15.0653 2.29199 15.6249 2.85164 15.6249 3.54199V16.4587C15.6249 17.149 15.0653 17.7087 14.3749 17.7087H9.37492C8.68456 17.7087 8.12492 17.149 8.12492 16.4587V15.8337"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Change Password
          </button>
        </div>
      </div>
      <div
        class="flex flex-col justify-between gap-4 border-b border-gray-200 py-4 first:pt-0 last:border-b-0 last:pb-0 sm:flex-row sm:items-end dark:border-gray-800"
      >
        <div>
          <span class="block text-base mb-1 font-medium text-gray-800 dark:text-white/90"
            >Logout all devices</span
          >
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Sign out from every active session.
          </p>
        </div>
        <div>
          <button
            class="border-error-500 text-error-500 hover:bg-error-100 dark:border-error-500/15 inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg border px-3.5 py-2.5 pr-4 pl-3.5 text-sm font-medium transition-all dark:hover:bg-red-500/15"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M4.37492 4.79199V16.4587C4.37492 17.149 4.93456 17.7087 5.62492 17.7087H14.3749C15.0653 17.7087 15.6249 17.149 15.6249 16.4587V4.79199M3.33325 4.79199H16.6658M4.37492 13.2466V8.24658M15.6249 13.2466V8.24658M8.33325 13.7503V8.75033M11.6666 13.7503V8.75033M12.7078 4.79199V3.54199C12.7078 2.85164 12.1482 2.29199 11.4578 2.29199H8.54118C7.85082 2.29199 7.29118 2.85164 7.29118 3.54199V4.79199H12.7078Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Delete account
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
