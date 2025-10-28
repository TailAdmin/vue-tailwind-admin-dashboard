<template>
  <aside
    :class="[
      'fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-99999 border-r border-gray-200',
      {
        'lg:w-[290px]': isExpanded || isMobileOpen || isHovered,
        'lg:w-[90px]': !isExpanded && !isHovered,
        'translate-x-0 w-[290px]': isMobileOpen,
        '-translate-x-full': !isMobileOpen,
        'lg:translate-x-0': true,
      },
    ]"
    @mouseenter="!isExpanded && (isHovered = true)"
    @mouseleave="isHovered = false"
  >
    <!-- Header with Logo -->
    <div
      :class="[
        'py-8 flex items-center gap-3',
        !isExpanded && !isHovered ? 'lg:justify-center' : 'justify-start',
      ]"
    >
      <router-link to="/" class="flex items-center gap-3">
        <!-- Logo Icon -->
        <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 shadow-lg">
          <svg class="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </div>
        
        <!-- Company Name -->
        <div v-if="isExpanded || isHovered || isMobileOpen" class="flex flex-col">
          <span class="text-xl font-bold text-gray-800 dark:text-white">عشير</span>
          <span class="text-xs text-gray-500 dark:text-gray-400">لوحة التحكم</span>
        </div>
      </router-link>
    </div>

    <!-- Navigation -->
    <div class="flex flex-1 flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
      <nav class="mb-6 flex-1">
        <div class="flex flex-col gap-4">
          <div v-for="(menuGroup, groupIndex) in menuGroups" :key="groupIndex">
            <h2
              :class="[
                'mb-4 text-xs uppercase flex leading-[20px] text-gray-400 font-semibold',
                !isExpanded && !isHovered
                  ? 'lg:justify-center'
                  : 'justify-start',
              ]"
            >
              <template v-if="isExpanded || isHovered || isMobileOpen">
                {{ menuGroup.title }}
              </template>
              <HorizontalDots v-else />
            </h2>
            <ul class="flex flex-col gap-2">
              <li v-for="(item, index) in menuGroup.items" :key="item.name">
                <!-- Menu Item with Submenu -->
                <button
                  v-if="item.subItems"
                  @click="toggleSubmenu(groupIndex, index)"
                  :class="[
                    'menu-item group w-full',
                    {
                      'menu-item-active': isSubmenuOpen(groupIndex, index),
                      'menu-item-inactive': !isSubmenuOpen(groupIndex, index),
                    },
                    !isExpanded && !isHovered
                      ? 'lg:justify-center'
                      : 'lg:justify-start',
                  ]"
                >
                  <span
                    :class="[
                      isSubmenuOpen(groupIndex, index)
                        ? 'menu-item-icon-active'
                        : 'menu-item-icon-inactive',
                    ]"
                  >
                    <component :is="item.icon" />
                  </span>
                  <span
                    v-if="isExpanded || isHovered || isMobileOpen"
                    class="menu-item-text"
                    >{{ item.name }}</span
                  >
                  <ChevronDownIcon
                    v-if="isExpanded || isHovered || isMobileOpen"
                    :class="[
                      'ml-auto w-5 h-5 transition-transform duration-200',
                      {
                        'rotate-180 text-brand-500': isSubmenuOpen(
                          groupIndex,
                          index
                        ),
                      },
                    ]"
                  />
                </button>

                <!-- Menu Item without Submenu -->
                <router-link
                  v-else-if="item.path"
                  :to="item.path"
                  :class="[
                    'menu-item group',
                    {
                      'menu-item-active': isActive(item.path),
                      'menu-item-inactive': !isActive(item.path),
                    },
                  ]"
                >
                  <span
                    :class="[
                      isActive(item.path)
                        ? 'menu-item-icon-active'
                        : 'menu-item-icon-inactive',
                    ]"
                  >
                    <component :is="item.icon" />
                  </span>
                  <span
                    v-if="isExpanded || isHovered || isMobileOpen"
                    class="menu-item-text"
                    >{{ item.name }}</span
                  >
                </router-link>

                <!-- Submenu Items -->
                <transition
                  @enter="startTransition"
                  @after-enter="endTransition"
                  @before-leave="startTransition"
                  @after-leave="endTransition"
                >
                  <div
                    v-show="
                      isSubmenuOpen(groupIndex, index) &&
                      (isExpanded || isHovered || isMobileOpen)
                    "
                  >
                    <ul class="mt-2 space-y-1 ml-9">
                      <li v-for="subItem in item.subItems" :key="subItem.name">
                        <router-link
                          :to="subItem.path"
                          :class="[
                            'menu-dropdown-item',
                            {
                              'menu-dropdown-item-active': isActive(
                                subItem.path
                              ),
                              'menu-dropdown-item-inactive': !isActive(
                                subItem.path
                              ),
                            },
                          ]"
                        >
                          {{ subItem.name }}
                          <span class="flex items-center gap-1 ml-auto">
                            <span
                              v-if="subItem.new"
                              :class="[
                                'menu-dropdown-badge',
                                {
                                  'menu-dropdown-badge-active': isActive(
                                    subItem.path
                                  ),
                                  'menu-dropdown-badge-inactive': !isActive(
                                    subItem.path
                                  ),
                                },
                              ]"
                            >
                              جديد
                            </span>
                          </span>
                        </router-link>
                      </li>
                    </ul>
                  </div>
                </transition>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <!-- Logout Button -->
      <div class="mt-auto border-t border-gray-200 pt-4 pb-6 dark:border-gray-800">
        <button
          @click="handleLogout"
          :class="[
            'menu-item group w-full hover:bg-red-50 dark:hover:bg-red-900/10',
            !isExpanded && !isHovered ? 'lg:justify-center' : 'lg:justify-start',
          ]"
        >
          <span class="menu-item-icon-inactive text-red-600 dark:text-red-400">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </span>
          <span
            v-if="isExpanded || isHovered || isMobileOpen"
            class="menu-item-text text-red-600 dark:text-red-400"
          >
            تسجيل الخروج
          </span>
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  GridIcon,
  CalenderIcon,
  UserCircleIcon,
  ChevronDownIcon,
  HorizontalDots,
  TableIcon,
  PlugInIcon,
} from "../../icons";
import BoxCubeIcon from "@/icons/BoxCubeIcon.vue";
import { useSidebar } from "@/composables/useSidebar";
import { useAuthStore } from "@/stores/auth.store";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const { isExpanded, isMobileOpen, isHovered, openSubmenu } = useSidebar();

// Menu Configuration
const menuGroups = [
  {
    title: "القائمة الرئيسية",
    items: [
      {
        icon: GridIcon,
        name: "لوحة التحكم",
        path: "/",
      },
      {
        icon: CalenderIcon,
        name: "التقويم",
        path: "/calendar",
      },
      {
        icon: BoxCubeIcon,
        name: "العروض",
        subItems: [
          { name: "جميع العروض", path: "/offers" },
          { name: "إنشاء عرض", path: "/offers/create", new: true },
          { name: "إعدادات البيانات", path: "/lookup-data" },
        ],
      },
      {
        icon: UserCircleIcon,
        name: "المستخدمين",
        subItems: [
          { name: "جميع المستخدمين", path: "/users" },
          { name: "مستخدمي التطبيق", path: "/AppUsers" },
        ],
      },
    ],
  },
  {
    title: "الإعدادات",
    items: [
      {
        icon: TableIcon,
        name: "الجداول",
        subItems: [
          { name: "الجداول الأساسية", path: "/basic-tables" }
        ],
      },
      {
        icon: PlugInIcon,
        name: "الملف الشخصي",
        path: "/profile",
      },
    ],
  },
];

const isActive = (path: string) => route.path === path;

const toggleSubmenu = (groupIndex: number, itemIndex: number) => {
  const key = `${groupIndex}-${itemIndex}`;
  openSubmenu.value = openSubmenu.value === key ? null : key;
};

const isAnySubmenuRouteActive = computed(() => {
  return menuGroups.some((group) =>
    group.items.some(
      (item) =>
        item.subItems && item.subItems.some((subItem) => isActive(subItem.path))
    )
  );
});

const isSubmenuOpen = (groupIndex: number, itemIndex: number) => {
  const key = `${groupIndex}-${itemIndex}`;
  return (
    openSubmenu.value === key ||
    (isAnySubmenuRouteActive.value &&
      menuGroups[groupIndex].items[itemIndex].subItems?.some((subItem) =>
        isActive(subItem.path)
      ))
  );
};

const startTransition = (el: Element) => {
  const element = el as HTMLElement;
  element.style.height = "auto";
  const height = element.scrollHeight;
  element.style.height = "0px";
  void element.offsetHeight; // force reflow
  element.style.height = `${height}px`;
};

const endTransition = (el: Element) => {
  const element = el as HTMLElement;
  element.style.height = "";
};

const handleLogout = async () => {
  if (confirm("هل أنت متأكد من تسجيل الخروج؟")) {
    try {
      await authStore.logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  }
};
</script>

<style scoped>
/* Custom transitions for submenu */
.v-enter-active,
.v-leave-active {
  transition: height 0.3s ease;
  overflow: hidden;
}
</style>