<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ChevronLeftIcon } from '@/icons/layout'
import AuthDivider from '../Divider.vue'
import SignInFormFields from './Form.vue'
import SignInHeader from './Header.vue'
import SocialButtons from './SocialButton.vue'
</script>

<template>
  <div class="flex w-full flex-1 flex-col lg:w-1/2">
    <div class="mx-auto mb-5 w-full max-w-md sm:pt-10">
      <RouterLink
        to="/"
        class="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
      >
        <ChevronLeftIcon class="rtl:rotate-180" />
        Back to dashboard
      </RouterLink>
    </div>

    <div class="mx-auto flex w-full max-w-md flex-1 flex-col justify-center">
      <div>
        <SignInHeader />

        <div>
          <SocialButtons />
          <AuthDivider />
          <SignInFormFields />

          <div class="mt-5">
            <p
              class="text-center text-sm font-normal text-gray-700 sm:text-start dark:text-gray-400"
            >
              Don't have an account?
              <RouterLink
                to="/signup"
                class="text-brand-500 hover:text-brand-600 dark:text-brand-400"
              >
                Sign Up
              </RouterLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
