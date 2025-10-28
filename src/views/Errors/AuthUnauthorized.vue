<template>
  <div class="relative flex min-h-screen flex-col items-center justify-center overflow-hidden p-6">
    <CommonGridShape />
    
    <!-- Content -->
    <div class="mx-auto w-full max-w-[500px] text-center">
      <div class="mb-8">
        <svg
          class="mx-auto h-32 w-32 text-yellow-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>

      <h1 class="mb-4 text-4xl font-bold text-gray-800 dark:text-white/90">
        403 - غير مصرح
      </h1>

      <p class="mb-8 text-lg text-gray-600 dark:text-gray-400">
        عذراً، ليس لديك صلاحية للوصول إلى هذه الصفحة.
      </p>

      <div class="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <button
          @click="goBack"
          class="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
        >
          <svg
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          العودة للخلف
        </button>

        <router-link
          to="/"
          class="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-500 px-5 py-3 text-sm font-medium text-white hover:bg-brand-600"
        >
          <svg
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          الصفحة الرئيسية
        </router-link>
      </div>

      <!-- Additional Info -->
      <div class="mt-12 rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-900/10">
        <div class="flex items-start gap-3">
          <svg
            class="h-5 w-5 flex-shrink-0 text-yellow-600 dark:text-yellow-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div class="text-left text-sm text-yellow-800 dark:text-yellow-400">
            <p class="font-medium">لماذا أرى هذه الصفحة؟</p>
            <p class="mt-1">
              هذه الصفحة تتطلب صلاحيات خاصة للوصول إليها. إذا كنت تعتقد أن هذا خطأ، يرجى الاتصال بالمسؤول.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <p class="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-gray-500 dark:text-gray-400">
      &copy; {{ currentYear }} - Ashir Dashboard
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import CommonGridShape from '@/components/common/CommonGridShape.vue';

const router = useRouter();
const currentYear = ref(new Date().getFullYear());

const goBack = () => {
  router.back();
};
</script>