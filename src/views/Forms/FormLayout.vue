<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <!-- Contact Form -->
      <ComponentCard title="Contact Form" desc="Fill in the form below to send us a message">
        <form @submit.prevent="handleContactSubmit">
          <div class="space-y-5">
            <div>
              <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Full Name
              </label>
              <input
                type="text"
                v-model="contactForm.fullName"
                placeholder="Enter your full name"
                class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              />
            </div>

            <div>
              <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Email
              </label>
              <input
                type="email"
                v-model="contactForm.email"
                placeholder="Enter your email address"
                class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              />
            </div>

            <div>
              <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Subject
              </label>
              <input
                type="text"
                v-model="contactForm.subject"
                placeholder="Enter subject"
                class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              />
            </div>

            <div>
              <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Message
              </label>
              <textarea
                v-model="contactForm.message"
                rows="5"
                placeholder="Type your message"
                class="dark:bg-dark-900 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              ></textarea>
            </div>

            <button
              type="submit"
              class="inline-flex h-11 items-center justify-center rounded-lg bg-brand-600 px-6 py-2.5 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-700 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:bg-brand-700 dark:hover:bg-brand-800"
            >
              Send Message
            </button>
          </div>
        </form>
      </ComponentCard>

      <!-- Sign In Form -->
      <ComponentCard title="Sign In Form" desc="Enter your credentials to sign in">
        <form @submit.prevent="handleSignInSubmit">
          <div class="space-y-5">
            <div>
              <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Email
              </label>
              <input
                type="email"
                v-model="signInForm.email"
                placeholder="Enter your email"
                class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              />
            </div>

            <div>
              <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Password
              </label>
              <input
                type="password"
                v-model="signInForm.password"
                placeholder="Enter your password"
                class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              />
            </div>

            <div class="flex items-center justify-between">
              <label class="flex items-center text-sm font-medium text-gray-700 cursor-pointer select-none dark:text-gray-400">
                <div class="relative">
                  <input type="checkbox" v-model="signInForm.rememberMe" class="sr-only" />
                  <div
                    :class="
                      signInForm.rememberMe
                        ? 'border-brand-500 bg-brand-500'
                        : 'bg-transparent border-gray-300 dark:border-gray-700'
                    "
                    class="mr-3 flex h-5 w-5 items-center justify-center rounded-md border-[1.25px] hover:border-brand-500 dark:hover:border-brand-500"
                  >
                    <span :class="signInForm.rememberMe ? '' : 'opacity-0'">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
                          stroke="white"
                          stroke-width="1.94437"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
                Remember me
              </label>

              <a href="#" class="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              class="inline-flex h-11 w-full items-center justify-center rounded-lg bg-brand-600 px-6 py-2.5 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-700 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:bg-brand-700 dark:hover:bg-brand-800"
            >
              Sign In
            </button>
          </div>
        </form>
      </ComponentCard>

      <!-- Sign Up Form -->
      <ComponentCard title="Sign Up Form" desc="Create a new account">
        <form @submit.prevent="handleSignUpSubmit">
          <div class="space-y-5">
            <div>
              <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Name
              </label>
              <input
                type="text"
                v-model="signUpForm.name"
                placeholder="Enter your name"
                class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              />
            </div>

            <div>
              <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Email
              </label>
              <input
                type="email"
                v-model="signUpForm.email"
                placeholder="Enter your email"
                class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              />
            </div>

            <div>
              <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Password
              </label>
              <input
                type="password"
                v-model="signUpForm.password"
                placeholder="Enter your password"
                class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              />
            </div>

            <div>
              <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Confirm Password
              </label>
              <input
                type="password"
                v-model="signUpForm.confirmPassword"
                placeholder="Re-enter your password"
                class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              />
            </div>

            <button
              type="submit"
              class="inline-flex h-11 w-full items-center justify-center rounded-lg bg-brand-600 px-6 py-2.5 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-700 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:bg-brand-700 dark:hover:bg-brand-800"
            >
              Create Account
            </button>
          </div>
        </form>
      </ComponentCard>

      <!-- Horizontal Form -->
      <ComponentCard title="Horizontal Form" desc="Form with labels and inputs on the same row">
        <form @submit.prevent="handleHorizontalSubmit">
          <div class="space-y-5">
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:items-center">
              <label class="text-sm font-medium text-gray-700 dark:text-gray-400">
                First Name
              </label>
              <div class="sm:col-span-2">
                <input
                  type="text"
                  v-model="horizontalForm.firstName"
                  placeholder="Enter first name"
                  class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:items-center">
              <label class="text-sm font-medium text-gray-700 dark:text-gray-400">
                Last Name
              </label>
              <div class="sm:col-span-2">
                <input
                  type="text"
                  v-model="horizontalForm.lastName"
                  placeholder="Enter last name"
                  class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:items-center">
              <label class="text-sm font-medium text-gray-700 dark:text-gray-400">
                Email Address
              </label>
              <div class="sm:col-span-2">
                <input
                  type="email"
                  v-model="horizontalForm.email"
                  placeholder="Enter email address"
                  class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:items-start">
              <label class="text-sm font-medium text-gray-700 dark:text-gray-400 sm:pt-3">
                Bio
              </label>
              <div class="sm:col-span-2">
                <textarea
                  v-model="horizontalForm.bio"
                  rows="4"
                  placeholder="Write a short bio"
                  class="dark:bg-dark-900 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                ></textarea>
              </div>
            </div>

            <div class="flex justify-end gap-3">
              <button
                type="button"
                class="inline-flex h-11 items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="inline-flex h-11 items-center justify-center rounded-lg bg-brand-600 px-6 py-2.5 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-700 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:bg-brand-700 dark:hover:bg-brand-800"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </ComponentCard>

      <!-- Vertical Form with Action Buttons -->
      <ComponentCard title="Vertical Form" desc="Traditional vertical form layout with action buttons">
        <form @submit.prevent="handleVerticalSubmit">
          <div class="space-y-5">
            <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  First Name
                </label>
                <input
                  type="text"
                  v-model="verticalForm.firstName"
                  placeholder="Enter first name"
                  class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
              </div>

              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Last Name
                </label>
                <input
                  type="text"
                  v-model="verticalForm.lastName"
                  placeholder="Enter last name"
                  class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
              </div>
            </div>

            <div>
              <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Email Address
              </label>
              <input
                type="email"
                v-model="verticalForm.email"
                placeholder="Enter your email address"
                class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              />
            </div>

            <div>
              <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Country
              </label>
              <div class="relative">
                <select
                  v-model="verticalForm.country"
                  class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  :class="{ 'text-gray-400': !verticalForm.country }"
                >
                  <option value="" disabled>Select country</option>
                  <option value="usa">United States</option>
                  <option value="uk">United Kingdom</option>
                  <option value="canada">Canada</option>
                  <option value="australia">Australia</option>
                  <option value="germany">Germany</option>
                  <option value="france">France</option>
                </select>
                <span
                  class="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-4 top-1/2 dark:text-gray-400"
                >
                  <svg
                    class="stroke-current"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.79175 7.396L10.0001 12.6043L15.2084 7.396"
                      stroke=""
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div>
              <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Phone Number
              </label>
              <input
                type="tel"
                v-model="verticalForm.phone"
                placeholder="+1 (555) 000-0000"
                class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              />
            </div>

            <div class="border-t border-gray-200 pt-5 dark:border-gray-800">
              <div class="flex justify-end gap-3">
                <button
                  type="button"
                  class="inline-flex h-11 items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  class="inline-flex h-11 items-center justify-center rounded-lg bg-brand-600 px-6 py-2.5 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-700 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:bg-brand-700 dark:hover:bg-brand-800"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </ComponentCard>

      <!-- Newsletter Subscription Form -->
      <ComponentCard title="Newsletter Form" desc="Subscribe to our newsletter">
        <form @submit.prevent="handleNewsletterSubmit">
          <div class="space-y-5">
            <div>
              <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Email Address
              </label>
              <input
                type="email"
                v-model="newsletterForm.email"
                placeholder="Enter your email"
                class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              />
            </div>

            <div class="space-y-3">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-400">
                Subscription Preferences
              </label>
              <div class="space-y-2">
                <label class="flex items-center text-sm font-medium text-gray-700 cursor-pointer select-none dark:text-gray-400">
                  <div class="relative">
                    <input type="checkbox" v-model="newsletterForm.weeklyNewsletter" class="sr-only" />
                    <div
                      :class="
                        newsletterForm.weeklyNewsletter
                          ? 'border-brand-500 bg-brand-500'
                          : 'bg-transparent border-gray-300 dark:border-gray-700'
                      "
                      class="mr-3 flex h-5 w-5 items-center justify-center rounded-md border-[1.25px] hover:border-brand-500 dark:hover:border-brand-500"
                    >
                      <span :class="newsletterForm.weeklyNewsletter ? '' : 'opacity-0'">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
                            stroke="white"
                            stroke-width="1.94437"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                  Weekly Newsletter
                </label>
                <label class="flex items-center text-sm font-medium text-gray-700 cursor-pointer select-none dark:text-gray-400">
                  <div class="relative">
                    <input type="checkbox" v-model="newsletterForm.productUpdates" class="sr-only" />
                    <div
                      :class="
                        newsletterForm.productUpdates
                          ? 'border-brand-500 bg-brand-500'
                          : 'bg-transparent border-gray-300 dark:border-gray-700'
                      "
                      class="mr-3 flex h-5 w-5 items-center justify-center rounded-md border-[1.25px] hover:border-brand-500 dark:hover:border-brand-500"
                    >
                      <span :class="newsletterForm.productUpdates ? '' : 'opacity-0'">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
                            stroke="white"
                            stroke-width="1.94437"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                  Product Updates
                </label>
                <label class="flex items-center text-sm font-medium text-gray-700 cursor-pointer select-none dark:text-gray-400">
                  <div class="relative">
                    <input type="checkbox" v-model="newsletterForm.promotions" class="sr-only" />
                    <div
                      :class="
                        newsletterForm.promotions
                          ? 'border-brand-500 bg-brand-500'
                          : 'bg-transparent border-gray-300 dark:border-gray-700'
                      "
                      class="mr-3 flex h-5 w-5 items-center justify-center rounded-md border-[1.25px] hover:border-brand-500 dark:hover:border-brand-500"
                    >
                      <span :class="newsletterForm.promotions ? '' : 'opacity-0'">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
                            stroke="white"
                            stroke-width="1.94437"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                  Special Promotions
                </label>
              </div>
            </div>

            <button
              type="submit"
              class="inline-flex h-11 w-full items-center justify-center rounded-lg bg-brand-600 px-6 py-2.5 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-700 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:bg-brand-700 dark:hover:bg-brand-800"
            >
              Subscribe
            </button>
          </div>
        </form>
      </ComponentCard>

      <!-- Profile Settings Form -->
      <ComponentCard title="Profile Settings" desc="Update your personal information">
        <form @submit.prevent="handleProfileSubmit">
          <div class="space-y-5">
            <div>
              <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Username
              </label>
              <input
                type="text"
                v-model="profileForm.username"
                placeholder="Enter username"
                class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              />
            </div>

            <div>
              <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Display Name
              </label>
              <input
                type="text"
                v-model="profileForm.displayName"
                placeholder="Enter display name"
                class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              />
            </div>

            <div>
              <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Website
              </label>
              <input
                type="url"
                v-model="profileForm.website"
                placeholder="https://example.com"
                class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              />
            </div>

            <div>
              <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                About
              </label>
              <textarea
                v-model="profileForm.about"
                rows="4"
                placeholder="Tell us about yourself"
                class="dark:bg-dark-900 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              ></textarea>
            </div>

            <label class="flex items-center text-sm font-medium text-gray-700 cursor-pointer select-none dark:text-gray-400">
              <div class="relative">
                <input type="checkbox" v-model="profileForm.publicProfile" class="sr-only" />
                <div
                  :class="
                    profileForm.publicProfile
                      ? 'border-brand-500 bg-brand-500'
                      : 'bg-transparent border-gray-300 dark:border-gray-700'
                  "
                  class="mr-3 flex h-5 w-5 items-center justify-center rounded-md border-[1.25px] hover:border-brand-500 dark:hover:border-brand-500"
                >
                  <span :class="profileForm.publicProfile ? '' : 'opacity-0'">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
                        stroke="white"
                        stroke-width="1.94437"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </div>
              Make profile public
            </label>

            <div class="flex justify-end gap-3">
              <button
                type="button"
                class="inline-flex h-11 items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="inline-flex h-11 items-center justify-center rounded-lg bg-brand-600 px-6 py-2.5 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-700 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:bg-brand-700 dark:hover:bg-brand-800"
              >
                Update Profile
              </button>
            </div>
          </div>
        </form>
      </ComponentCard>
    </div>
  </AdminLayout>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'

const currentPageTitle = ref('Form Layout')

const contactForm = reactive({
  fullName: '',
  email: '',
  subject: '',
  message: '',
})

const signInForm = reactive({
  email: '',
  password: '',
  rememberMe: false,
})

const signUpForm = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const horizontalForm = reactive({
  firstName: '',
  lastName: '',
  email: '',
  bio: '',
})

const verticalForm = reactive({
  firstName: '',
  lastName: '',
  email: '',
  country: '',
  phone: '',
})

const newsletterForm = reactive({
  email: '',
  weeklyNewsletter: false,
  productUpdates: false,
  promotions: false,
})

const profileForm = reactive({
  username: '',
  displayName: '',
  website: '',
  about: '',
  publicProfile: false,
})

const handleContactSubmit = () => {
  console.log('Contact form submitted:', contactForm)
}

const handleSignInSubmit = () => {
  console.log('Sign in form submitted:', signInForm)
}

const handleSignUpSubmit = () => {
  console.log('Sign up form submitted:', signUpForm)
}

const handleHorizontalSubmit = () => {
  console.log('Horizontal form submitted:', horizontalForm)
}

const handleVerticalSubmit = () => {
  console.log('Vertical form submitted:', verticalForm)
}

const handleNewsletterSubmit = () => {
  console.log('Newsletter form submitted:', newsletterForm)
}

const handleProfileSubmit = () => {
  console.log('Profile form submitted:', profileForm)
}
</script>
