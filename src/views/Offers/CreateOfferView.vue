<template>
  <admin-layout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Basic Information -->
      <div class="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <h3 class="mb-6 text-lg font-semibold text-gray-800 dark:text-white/90">
          المعلومات الأساسية
        </h3>

        <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <!-- Title -->
          <div class="lg:col-span-2">
            <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
              عنوان العرض <span class="text-red-500">*</span>
            </label>
            <input
              v-model="formData.title"
              type="text"
              required
              placeholder="مثال: مكتب مشترك للايجار"
              class="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-800 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
            />
          </div>

          <!-- Description -->
          <div class="lg:col-span-2">
            <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
              الوصف <span class="text-red-500">*</span>
            </label>
            <textarea
              v-model="formData.description"
              required
              rows="4"
              placeholder="وصف تفصيلي للعرض..."
              class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
            ></textarea>
          </div>

          <!-- Owner Selection with Search -->
          <div class="lg:col-span-2">
            <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
              المالك <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <input
                v-model="userSearchTerm"
                @input="searchUsers"
                type="text"
                placeholder="ابحث عن المستخدم بالاسم أو البريد الإلكتروني..."
                class="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-800 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
              />
              
              <!-- Search Results Dropdown -->
              <div
                v-if="showUserDropdown && userSearchResults.length > 0"
                class="absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
              >
                <button
                  v-for="user in userSearchResults"
                  :key="user.id"
                  type="button"
                  @click="selectUser(user)"
                  class="flex w-full items-center gap-3 px-4 py-3 text-right hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <img
                    v-if="user.profile?.profilePicturePath"
                    :src='baseUrl + "/" + user.profile?.profilePicturePath'
                    :alt="user.profile.firstName"
                    class="h-10 w-10 rounded-full object-cover"
                  />
                  <div
                    v-else
                    class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700"
                  >
                    <span class="text-sm font-medium text-gray-600 dark:text-gray-300">
                      {{ user.profile?.firstName.charAt(0) }}{{ user.profile?.lastName.charAt(0) }}
                    </span>
                  </div>
                  <div class="flex-1">
                    <p class="text-sm font-medium text-gray-800 dark:text-white/90">
                      {{ user.profile?.firstName }} {{ user.profile?.lastName }}
                    </p>
                    <p class="text-xs text-gray-600 dark:text-gray-400">
                      {{ user.email || user.phoneNumber }}
                    </p>
                  </div>
                </button>
              </div>

              <!-- Selected User -->
              <div
                v-if="selectedUser"
                class="mt-2 flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-800"
              >
                <img
                  v-if="selectedUser.profile?.profilePicturePath"
                  :src='baseUrl + "/" + selectedUser.profile?.profilePicturePath'
                  :alt="selectedUser.profile?.firstName"
                  class="h-10 w-10 rounded-full object-cover"
                />
                <div
                  v-else
                  class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700"
                >
                  <span class="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {{ selectedUser.profile?.firstName.charAt(0) }}{{ selectedUser.profile?.lastName.charAt(0) }}
                  </span>
                </div>
                <div class="flex-1">
                  <p class="text-sm font-medium text-gray-800 dark:text-white/90">
                    {{ selectedUser.profile?.firstName }} {{ selectedUser.profile?.lastName }}
                  </p>
                  <p class="text-xs text-gray-600 dark:text-gray-400">
                    {{ selectedUser.email || selectedUser.phoneNumber }}
                  </p>
                </div>
                <button
                  type="button"
                  @click="clearSelectedUser"
                  class="rounded-lg p-2 text-gray-400 hover:bg-gray-200 hover:text-gray-600 dark:hover:bg-gray-700"
                >
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Price -->
          <div>
            <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
              السعر (ريال) <span class="text-red-500">*</span>
            </label>
            <input
              v-model.number="formData.price"
              type="number"
              required
              min="0"
              step="0.01"
              placeholder="0.00"
              class="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-800 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
            />
          </div>

          <!-- Duration -->
          <div>
            <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
              المدة <span class="text-red-500">*</span>
            </label>
            <div class="flex gap-2">
              <input
                v-model.number="formData.duration"
                type="number"
                required
                min="1"
                placeholder="24"
                class="h-11 flex-1 rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-800 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
              />
              <select
                v-model="formData.timeUnitId"
                required
                class="h-11 rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-800 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
              >
                <option value="">اختر</option>
                <option
                  v-for="timeUnit in lookupDataStore.timeUnits"
                  :key="timeUnit.id"
                  :value="timeUnit.name"
                >
                  {{ timeUnit.name }}
                </option>
              </select>
            </div>
          </div>

          <!-- Offer Type -->
          <div>
            <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
              نوع العرض <span class="text-red-500">*</span>
            </label>
            <select
              v-model="formData.offerTypeId"
              required
              class="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-800 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
            >
              <option value="">اختر نوع العرض</option>
              <option
                v-for="offerType in lookupDataStore.offerTypes"
                :key="offerType.id"
                :value="offerType.name"
              >
                {{ offerType.name }}
              </option>
            </select>
          </div>

          <!-- Unit Type -->
          <div>
            <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
              نوع الوحدة <span class="text-red-500">*</span>
            </label>
            <select
              v-model="formData.unitTypeId"
              required
              class="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-800 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
            >
              <option value="">اختر نوع الوحدة</option>
              <option
                v-for="unitType in lookupDataStore.unitTypes"
                :key="unitType.id"
                :value="unitType.name"
              >
                {{ unitType.name }}
              </option>
            </select>
          </div>

          <!-- Property Type -->
          <div>
            <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
              نوع العقار <span class="text-red-500">*</span>
            </label>
            <select
              v-model="formData.propertyTypeId"
              required
              class="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-800 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
            >
              <option value="">اختر نوع العقار</option>
              <option
                v-for="propertyType in lookupDataStore.propertyTypes"
                :key="propertyType.id"
                :value="propertyType.name"
              >
                {{ propertyType.name }}
              </option>
            </select>
          </div>

          <!-- Floor -->
          <div>
            <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
              الدور <span class="text-red-500">*</span>
            </label>
            <select
              v-model="formData.floorId"
              required
              class="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-800 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
            >
              <option value="">اختر الدور</option>
              <option
                v-for="floor in lookupDataStore.floors"
                :key="floor.id"
                :value="floor.name"
              >
                {{ floor.name }}
              </option>
            </select>
          </div>

          <!-- Bill Type -->
          <div>
            <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
              نوع الإعلان <span class="text-red-500">*</span>
            </label>
            <select
              v-model.number="formData.billType"
              required
              class="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-800 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
            >
              <option :value="0">عرض</option>
              <option :value="1">طلب</option>
            </select>
          </div>

          <!-- Rental Type -->
          <div>
            <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
              نوع الإيجار <span class="text-red-500">*</span>
            </label>
            <select
              v-model.number="formData.rentalType"
              required
              class="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-800 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
            >
              <option :value="0">مشترك</option>
              <option :value="1">كامل</option>
            </select>
          </div>

          <!-- Active Status -->
          <div class="flex items-center gap-2">
            <input
              v-model="formData.isActive"
              type="checkbox"
              id="isActive"
              class="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
            />
            <label for="isActive" class="text-sm font-medium text-gray-700 dark:text-gray-400">
              نشط
            </label>
          </div>
        </div>
      </div>

      <!-- Property Details -->
      <div class="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <h3 class="mb-6 text-lg font-semibold text-gray-800 dark:text-white/90">
          تفاصيل العقار
        </h3>

        <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <!-- Area -->
          <div>
            <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
              المساحة (م²)
            </label>
            <input
              v-model.number="formData.area"
              type="number"
              min="0"
              step="0.01"
              placeholder="250"
              class="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-800 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
            />
          </div>

          <!-- Room Count -->
          <div>
            <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
              عدد الغرف
            </label>
            <input
              v-model.number="formData.roomCount"
              type="number"
              min="0"
              placeholder="4"
              class="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-800 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
            />
          </div>

          <!-- Bathroom Count -->
          <div>
            <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
              عدد دورات المياه
            </label>
            <input
              v-model.number="formData.bathroomCount"
              type="number"
              min="0"
              placeholder="2"
              class="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-800 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
            />
          </div>
        </div>
      </div>

      <!-- Features -->
      <div class="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <h3 class="mb-6 text-lg font-semibold text-gray-800 dark:text-white/90">
          المميزات
        </h3>

        <div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          <label
            v-for="feature in lookupDataStore.offerFeatures"
            :key="feature.id"
            class="flex items-center gap-2 rounded-lg border border-gray-200 p-3 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            <input
              v-model="formData.featureIds"
              type="checkbox"
              :value="feature.name"
              class="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
            />
            <span class="text-sm text-gray-700 dark:text-gray-300">
              {{ feature.name }}
            </span>
          </label>
        </div>
      </div>

      <!-- Contact Methods -->
      <div class="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <h3 class="mb-6 text-lg font-semibold text-gray-800 dark:text-white/90">
          طرق التواصل
        </h3>

        <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
          <label class="flex items-center gap-3 rounded-lg border border-gray-200 p-4 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
            <input
              v-model="formData.isPhoneAllowed"
              type="checkbox"
              class="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
            />
            <div class="flex items-center gap-2">
              <svg class="h-5 w-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                الاتصال الهاتفي
              </span>
            </div>
          </label>

          <label class="flex items-center gap-3 rounded-lg border border-gray-200 p-4 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
            <input
              v-model="formData.isWhatsappAllowed"
              type="checkbox"
              class="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
            />
            <div class="flex items-center gap-2">
              <svg class="h-5 w-5 text-gray-600 dark:text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                واتساب
              </span>
            </div>
          </label>

          <label class="flex items-center gap-3 rounded-lg border border-gray-200 p-4 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
            <input
              v-model="formData.isMessagingAllowed"
              type="checkbox"
              class="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
            />
            <div class="flex items-center gap-2">
              <svg class="h-5 w-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                المراسلة
              </span>
            </div>
          </label>
        </div>
      </div>

      <!-- Location -->
      <div class="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <h3 class="mb-6 text-lg font-semibold text-gray-800 dark:text-white/90">
          الموقع
        </h3>

        <div class="space-y-6">
          <!-- Location Description -->
          <div>
            <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
              وصف الموقع
            </label>
            <textarea
              v-model="formData.locationDescription"
              rows="3"
              placeholder="مثال: خميس مشيط بوابة الأعمال"
              class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
            ></textarea>
          </div>

          <!-- Map -->
          <div>
            <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
              تحديد الموقع على الخريطة
            </label>
            <div class="overflow-hidden rounded-lg border border-gray-300 dark:border-gray-700">
              <div id="map" class="h-96 w-full"></div>
            </div>
            <p class="mt-2 text-xs text-gray-500 dark:text-gray-400">
              انقر على الخريطة لتحديد الموقع
            </p>
          </div>

          <!-- Coordinates Display -->
          <div v-if="formData.latitude && formData.longitude" class="grid grid-cols-2 gap-4">
            <div>
              <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
                خط العرض
              </label>
              <input
                :value="formData.latitude"
                readonly
                class="h-11 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 text-sm text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-white/90"
              />
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
                خط الطول
              </label>
              <input
                :value="formData.longitude"
                readonly
                class="h-11 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 text-sm text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-white/90"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Images Upload -->
      <div class="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <h3 class="mb-6 text-lg font-semibold text-gray-800 dark:text-white/90">
          الصور
        </h3>

        <div>
          <!-- Upload Area -->
          <label
            for="images-upload"
            class="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6 hover:border-brand-400 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-brand-400 dark:hover:bg-gray-800"
          >
            <svg class="mb-3 h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p class="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              انقر لرفع الصور أو اسحبها هنا
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              PNG, JPG, JPEG حتى 10MB
            </p>
            <input
              id="images-upload"
              type="file"
              multiple
              accept="image/*"
              @change="handleImagesUpload"
              class="hidden"
            />
          </label>

          <!-- Preview Images -->
          <div v-if="imagePreviews.length > 0" class="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            <div
              v-for="(preview, index) in imagePreviews"
              :key="index"
              class="group relative overflow-hidden rounded-lg"
            >
              <img
                :src="preview"
                :alt="`صورة ${index + 1}`"
                class="h-32 w-full object-cover"
              />
              <button
                type="button"
                @click="removeImage(index)"
                class="absolute right-2 top-2 rounded-full bg-red-500 p-1.5 text-white opacity-0 transition-opacity hover:bg-red-600 group-hover:opacity-100"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Videos Upload -->
      <div class="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <h3 class="mb-6 text-lg font-semibold text-gray-800 dark:text-white/90">
          الفيديوهات
        </h3>

        <div>
          <!-- Upload Area -->
          <label
            for="videos-upload"
            class="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6 hover:border-brand-400 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-brand-400 dark:hover:bg-gray-800"
          >
            <svg class="mb-3 h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <p class="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              انقر لرفع الفيديوهات أو اسحبها هنا
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              MP4, MOV حتى 50MB
            </p>
            <input
              id="videos-upload"
              type="file"
              multiple
              accept="video/*"
              @change="handleVideosUpload"
              class="hidden"
            />
          </label>

          <!-- Preview Videos -->
          <div v-if="videoPreviews.length > 0" class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div
              v-for="(preview, index) in videoPreviews"
              :key="index"
              class="group relative overflow-hidden rounded-lg"
            >
              <video
                :src="preview"
                controls
                class="h-48 w-full rounded-lg"
              ></video>
              <button
                type="button"
                @click="removeVideo(index)"
                class="absolute right-2 top-2 rounded-full bg-red-500 p-1.5 text-white opacity-0 transition-opacity hover:bg-red-600 group-hover:opacity-100"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Form Actions -->
      <div class="flex justify-end gap-4">
        <button
          type="button"
          @click="$router.back()"
          class="rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          إلغاء
        </button>
        <button
          type="submit"
          :disabled="isSubmitting || !isFormValid"
          class="flex items-center gap-2 rounded-lg bg-brand-600 px-6 py-3 text-sm font-medium text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <svg
            v-if="isSubmitting"
            class="h-5 w-5 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ isSubmitting ? 'جاري الإنشاء...' : 'إنشاء العرض' }}
        </button>
      </div>
    </form>
  </admin-layout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useLookupDataStore } from '@/stores/lookup-data.store'
import { offersService } from '@/services/offers.service'
import { userProfilesService } from '@/services/user-profiles.service'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import type { CreateOfferCommand } from '@/types/offers.types'
import type { SearchUsersParams } from '@/types/user-profile.types';
import type { AppUser } from '@/types/user-profile.types'
import { SERVICES } from '@/config/api.config'

const authService = SERVICES.auth;
const baseUrl = authService.baseUrl;


const currentPageTitle = ref('إنشاء عرض جديد')
const router = useRouter()
const lookupDataStore = useLookupDataStore()

// Form Data
const formData = ref<CreateOfferCommand>({
  title: '',
  description: '',
  price: 0,
  isActive: true,
  duration: 1,
  floorId: '',
  propertyTypeId: '',
  timeUnitId: '',
  offerTypeId: '',
  unitTypeId: '',
  billType: 0,
  rentalType: 0,
  featureIds: [],
  images: undefined,
  videos: undefined,
  neighborhoodId: '3288B44C-EF5A-476B-93F7-11D7F824C2E0',
  cityId: 'E283DA39-D205-4650-BF02-8F1A3F1B4A0D',
  countryId: '10FC4681-205F-4508-D5E8-08DDB9FFD445',
  area: undefined,
  roomCount: undefined,
  bathroomCount: undefined,
  isPhoneAllowed: true,
  isWhatsappAllowed: true,
  isMessagingAllowed: true,
  locationDescription: undefined,
  latitude: undefined,
  longitude: undefined,
  ownerId: ''
})

// User Search
const userSearchTerm = ref('')
const userSearchResults = ref<AppUser[]>([])
const selectedUser = ref<AppUser | null>(null)
const showUserDropdown = ref(false)
const searchDebounceTimer = ref<ReturnType<typeof setTimeout> | null>(null)

// Files
const imagePreviews = ref<string[]>([])
const videoPreviews = ref<string[]>([])

// Map
let map: google.maps.Map | null = null
let marker: google.maps.Marker | null = null

// State
const isSubmitting = ref(false)

// Computed
const isFormValid = computed(() => {
  return (
    formData.value.title &&
    formData.value.description &&
    formData.value.price > 0 &&
    formData.value.duration > 0 &&
    formData.value.floorId &&
    formData.value.propertyTypeId &&
    formData.value.timeUnitId &&
    formData.value.offerTypeId &&
    formData.value.unitTypeId &&
    formData.value.ownerId
  )
})

// Methods
const searchUsers = () => {
  if (searchDebounceTimer.value) {
    clearTimeout(searchDebounceTimer.value)
  }

  searchDebounceTimer.value = setTimeout(async () => {
    if (userSearchTerm.value.length < 2) {
      userSearchResults.value = []
      showUserDropdown.value = false
      return
    }

    try {
        const params: SearchUsersParams = {
          searchTerm: userSearchTerm.value,
        }
      userSearchResults.value = (await userProfilesService.getAll(params)).data
      showUserDropdown.value = true
    } catch (error) {
      console.error('Failed to search users:', error)
      userSearchResults.value = []
    }
  }, 300)
}

const selectUser = (user: AppUser) => {
  selectedUser.value = user
  formData.value.ownerId = user.id
  console.log(baseUrl + "/" + user.profile?.profilePicturePath);
  userSearchTerm.value = `${user.profile?.firstName} ${user.profile?.lastName}`
  showUserDropdown.value = false
}

const clearSelectedUser = () => {
  selectedUser.value = null
  formData.value.ownerId = ''
  userSearchTerm.value = ''
}

const handleImagesUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = target.files

  if (files) {
    const fileArray = Array.from(files)
    formData.value.images = [...(formData.value.images || []), ...fileArray]

    fileArray.forEach(file => {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          imagePreviews.value.push(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    })
  }
}

const removeImage = (index: number) => {
  imagePreviews.value.splice(index, 1)
  if (formData.value.images) {
    formData.value.images.splice(index, 1)
  }
}

const handleVideosUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = target.files

  if (files) {
    const fileArray = Array.from(files)
    formData.value.videos = [...(formData.value.videos || []), ...fileArray]

    fileArray.forEach(file => {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          videoPreviews.value.push(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    })
  }
}

const removeVideo = (index: number) => {
  videoPreviews.value.splice(index, 1)
  if (formData.value.videos) {
    formData.value.videos.splice(index, 1)
  }
}

const initMap = () => {
  const center = { lat: 24.7136, lng: 46.6753 } // الرياض

  map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
    center,
    zoom: 12,
    mapTypeControl: true,
    streetViewControl: false,
    fullscreenControl: true
  })

  // Add click listener to map
  map.addListener('click', (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      placeMarker(event.latLng)
      formData.value.latitude = event.latLng.lat()
      formData.value.longitude = event.latLng.lng()
    }
  })
}

const placeMarker = (location: google.maps.LatLng) => {
  if (marker) {
    marker.setPosition(location)
  } else {
    marker = new google.maps.Marker({
      position: location,
      map: map,
      draggable: true
    })

    marker.addListener('dragend', () => {
      const position = marker?.getPosition()
      if (position) {
        formData.value.latitude = position.lat()
        formData.value.longitude = position.lng()
      }
    })
  }
}

const loadGoogleMapsScript = () => {
  return new Promise<void>((resolve, reject) => {
    if (typeof google !== 'undefined' && google.maps) {
      resolve()
      return
    }

    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA08GXgSjQL9-wBLcjtu924GQyO_UPqKrk&libraries=places&language=ar`
    script.async = true
    script.defer = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Failed to load Google Maps'))
    document.head.appendChild(script)
  })
}

const handleSubmit = async () => {
  if (!isFormValid.value) {
    alert('يرجى ملء جميع الحقول المطلوبة')
    return
  }

  isSubmitting.value = true

  try {
    await offersService.create(formData.value)
    alert('تم إنشاء العرض بنجاح')
    router.push('/offers')
  } catch (error) {
    console.error('Failed to create offer:', error)
    alert('فشل إنشاء العرض')
  } finally {
    isSubmitting.value = false
  }
}

// Lifecycle
onMounted(async () => {
  // Load lookup data
  await lookupDataStore.loadAll()

  // Load Google Maps
  try {
    await loadGoogleMapsScript()
    initMap()
  } catch (error) {
    console.error('Failed to load Google Maps:', error)
  }
})

onBeforeUnmount(() => {
  if (searchDebounceTimer.value) {
    clearTimeout(searchDebounceTimer.value)
  }
})
</script>