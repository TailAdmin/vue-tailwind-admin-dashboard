<script setup lang="ts">
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import DefaultCard from '@/components/Forms/DefaultCard.vue'
import InputGroup from '@/components/Forms/InputGroup.vue'
import { ref } from 'vue'

const pageTitle = ref('Form Layout')
</script>

<template>
  <BreadcrumbDefault :pageTitle="pageTitle" />

  <!-- ====== Form Layout Section Start -->
  <div class="grid grid-cols-1 gap-9 sm:grid-cols-2">
    <div class="flex flex-col gap-9">
      <!-- Contact Form Start -->
      <DefaultCard cardTitle="Contact Form">
        <form action="#">
          <div class="p-6.5">
            <div class="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <InputGroup
                label="First name"
                type="text"
                placeholder="Enter your first name"
                customClasses="w-full xl:w-1/2"
              />

              <InputGroup
                label="Last name"
                type="text"
                placeholder="Enter your last name"
                customClasses="w-full xl:w-1/2"
              />
            </div>

            <InputGroup
              label="Email"
              type="email"
              placeholder="Enter your email address"
              customClasses="mb-4.5"
              required
            />

            <InputGroup
              label="Subject"
              type="text"
              placeholder="Enter your subject"
              customClasses="mb-4.5"
            />

            <div class="mb-4.5">
              <label class="mb-2.5 block text-black dark:text-white"> Subject </label>
              <div class="relative z-20 bg-transparent dark:bg-form-input">
                <select
                  class="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                >
                  <option value="">Type your subject</option>
                  <option value="">USA</option>
                  <option value="">UK</option>
                  <option value="">Canada</option>
                </select>
                <span class="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                  <svg
                    class="fill-current"
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
                        fill=""
                      ></path>
                    </g>
                  </svg>
                </span>
              </div>
            </div>

            <div class="mb-6">
              <label class="mb-2.5 block text-black dark:text-white"> Message </label>
              <textarea
                rows="6"
                placeholder="Type your message"
                class="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              ></textarea>
            </div>

            <button class="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
              Send Message
            </button>
          </div>
        </form>
      </DefaultCard>
      <!-- Contact Form End -->
    </div>

    <div class="flex flex-col gap-9">
      <!-- Sign In Start -->
      <DefaultCard cardTitle="Sign In Form">
        <form action="#">
          <div class="p-6.5">
            <InputGroup
              label="Email"
              type="email"
              placeholder="Enter your email address"
              customClasses="mb-4.5"
            />

            <InputGroup label="Password" type="password" placeholder="Enter your password" />

            <div class="mt-5 mb-5.5 flex items-center justify-between">
              <label for="formCheckbox" class="flex cursor-pointer">
                <div class="relative pt-0.5">
                  <input type="checkbox" id="formCheckbox" class="taskCheckbox sr-only" />
                  <div
                    class="box mr-3 flex h-5 w-5 items-center justify-center rounded border border-stroke dark:border-form-strokedark dark:bg-form-input"
                  >
                    <span class="text-white opacity-0">
                      <svg
                        class="fill-current"
                        width="10"
                        height="7"
                        viewBox="0 0 10 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M9.70685 0.292804C9.89455 0.480344 10 0.734667 10 0.999847C10 1.26503 9.89455 1.51935 9.70685 1.70689L4.70059 6.7072C4.51283 6.89468 4.2582 7 3.9927 7C3.72721 7 3.47258 6.89468 3.28482 6.7072L0.281063 3.70701C0.0986771 3.5184 -0.00224342 3.26578 3.785e-05 3.00357C0.00231912 2.74136 0.10762 2.49053 0.29326 2.30511C0.4789 2.11969 0.730026 2.01451 0.992551 2.01224C1.25508 2.00996 1.50799 2.11076 1.69683 2.29293L3.9927 4.58607L8.29108 0.292804C8.47884 0.105322 8.73347 0 8.99896 0C9.26446 0 9.51908 0.105322 9.70685 0.292804Z"
                          fill=""
                        />
                      </svg>
                    </span>
                  </div>
                </div>
                <p>Remember me</p>
              </label>

              <router-link to="/#" class="text-sm text-primary">Forget password?</router-link>
            </div>

            <button class="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
              Sign In
            </button>
          </div>
        </form>
      </DefaultCard>
      <!-- Sign In End -->

      <!-- Sign Up Start -->
      <DefaultCard cardTitle="Sign Up Form">
        <form action="#">
          <div class="p-6.5">
            <InputGroup
              label="Name"
              type="text"
              placeholder="Enter full name"
              customClasses="mb-4.5"
            />

            <InputGroup
              label="Email"
              type="email"
              placeholder="Enter email address"
              customClasses="mb-4.5"
            />

            <InputGroup
              label="Password"
              type="password"
              placeholder="Enter password"
              customClasses="mb-4.5"
            />

            <InputGroup
              label="Re-type Password"
              type="password"
              placeholder="Re-enter"
              customClasses="mb-5.5"
            />

            <button class="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
              Sign Up
            </button>
          </div>
        </form>
      </DefaultCard>
      <!-- Sign Up End -->
    </div>
  </div>
  <!-- ====== Form Layout Section End -->
</template>
