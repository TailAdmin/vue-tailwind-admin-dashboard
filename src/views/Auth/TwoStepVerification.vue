<template>
  <FullScreenLayout>
    <div class="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div
        class="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900"
      >
        <div class="flex flex-col flex-1 w-full lg:w-1/2">
          <div class="w-full max-w-md pt-10 mx-auto">
            <router-link
              to="/signin"
              class="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <svg
                class="stroke-current"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M12.7083 5L7.5 10.2083L12.7083 15.4167"
                  stroke=""
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Back to sign in
            </router-link>
          </div>
          <div class="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
            <div>
              <div class="mb-5 sm:mb-8">
                <h1
                  class="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md"
                >
                  Two-Step Verification
                </h1>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Enter the verification code we sent to your email address.
                </p>
              </div>
              <form @submit.prevent="handleSubmit">
                <div class="mb-6">
                  <label class="block mb-4 text-sm font-medium text-gray-900 dark:text-white">
                    Enter Verification Code
                  </label>
                  <div class="flex gap-3">
                    <input
                      v-for="(_digit, index) in verificationCode"
                      :key="index"
                      type="text"
                      maxlength="1"
                      v-model="verificationCode[index]"
                      @input="handleInput(index, $event)"
                      @keydown="handleKeyDown(index, $event)"
                      :ref="(el) => (inputs[index] = el as HTMLInputElement | null)"
                      class="w-full h-14 text-center text-2xl font-semibold text-gray-900 bg-transparent border border-gray-300 rounded-lg outline-none dark:border-gray-600 dark:bg-white/5 dark:text-white focus:border-brand-500 dark:focus:border-brand-500"
                    />
                  </div>
                </div>

                <div class="mb-5">
                  <button
                    type="submit"
                    class="w-full py-3 text-sm font-medium text-white transition-colors border rounded-lg cursor-pointer bg-brand-500 border-brand-500 hover:bg-brand-600 disabled:cursor-not-allowed disabled:bg-brand-400"
                  >
                    Verify Code
                  </button>
                </div>

                <div class="text-center">
                  <p class="mb-3 text-sm text-gray-500 dark:text-gray-400">
                    Didn't receive the code?
                    <button
                      type="button"
                      @click="resendCode"
                      class="font-medium text-brand-500 hover:text-brand-600"
                    >
                      Resend
                    </button>
                  </p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    Code expires in:
                    <span class="font-semibold text-gray-700 dark:text-white">{{ timer }}s</span>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>

        <!-- Right Side -->
        <div
          class="relative items-center hidden w-full h-full lg:w-1/2 bg-brand-950 dark:bg-white/5 lg:grid"
        >
          <div class="flex items-center justify-center z-1">
            <common-grid-shape />
            <div class="flex flex-col items-center max-w-xs">
              <router-link to="/" class="block mb-4">
                <img width="{231}" height="{48}" src="/images/logo/auth-logo.svg" alt="Logo" />
              </router-link>
              <p class="text-center text-gray-400 dark:text-white/60">
                Free and Open-Source Tailwind CSS Admin Dashboard Template
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </FullScreenLayout>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import CommonGridShape from '@/components/common/CommonGridShape.vue'
import FullScreenLayout from '@/components/layout/FullScreenLayout.vue'

const verificationCode = ref(['', '', '', '', '', ''])
const inputs = ref<(HTMLInputElement | null)[]>([])
const timer = ref(120) // 2 minutes

let interval: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  // Focus first input on mount
  const firstInput = inputs.value[0]
  if (firstInput) {
    firstInput.focus()
  }

  // Start countdown timer
  interval = setInterval(() => {
    if (timer.value > 0) {
      timer.value--
    }
  }, 1000)
})

onUnmounted(() => {
  if (interval) {
    clearInterval(interval)
  }
})

const handleInput = (index: number, event: Event): void => {
  const value = (event.target as HTMLInputElement).value

  // Only allow numbers
  if (!/^\d*$/.test(value)) {
    verificationCode.value[index] = ''
    return
  }

  // Move to next input if value is entered
  if (value && index < 5) {
    const nextInput = inputs.value[index + 1]
    if (nextInput) {
      nextInput.focus()
    }
  }
}

const handleKeyDown = (index: number, event: KeyboardEvent): void => {
  // Move to previous input on backspace if current input is empty
  if (event.key === 'Backspace' && !verificationCode.value[index] && index > 0) {
    const prevInput = inputs.value[index - 1]
    if (prevInput) {
      prevInput.focus()
    }
  }
}

const handleSubmit = () => {
  const code = verificationCode.value.join('')
  console.log('Verification code:', code)
  // Add your verification logic here
}

const resendCode = () => {
  console.log('Resending verification code...')
  timer.value = 120 // Reset timer
  verificationCode.value = ['', '', '', '', '', '']
  const firstInput = inputs.value[0]
  if (firstInput) {
    firstInput.focus()
  }
}
</script>
