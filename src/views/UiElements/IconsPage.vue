<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />

    <div class="space-y-6">
      <!-- Introduction Card -->
      <ComponentCard
        title="Icon System"
        desc="This project uses custom SVG icons and Lucide Icons library"
      >
        <div class="space-y-4">
          <div>
            <h4 class="mb-2 text-sm font-semibold text-gray-800 dark:text-white/90">
              Custom Icons
            </h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Custom-built Vue components with inline SVG code. All icons are 24x24 and use
              <code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs dark:bg-gray-800">currentColor</code>
              for easy theming.
            </p>
          </div>

          <div>
            <h4 class="mb-2 text-sm font-semibold text-gray-800 dark:text-white/90">
              How to Use
            </h4>
            <div class="rounded-lg bg-gray-50 p-4 dark:bg-gray-900">
              <pre class="text-xs text-gray-700 dark:text-gray-300"><code>&lt;script setup&gt;
import { GridIcon, UserCircleIcon } from '@/icons'
&lt;/script&gt;

&lt;template&gt;
  &lt;GridIcon /&gt;
  &lt;UserCircleIcon class="text-brand-600" /&gt;
&lt;/template&gt;</code></pre>
            </div>
          </div>
        </div>
      </ComponentCard>

      <!-- Navigation & UI Icons -->
      <ComponentCard title="Navigation & UI Icons" desc="Icons used for navigation and general UI elements">
        <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          <div
            v-for="icon in navigationIcons"
            :key="icon.name"
            class="flex flex-col items-center gap-3 rounded-lg border border-gray-200 p-4 transition-colors hover:border-brand-500 hover:bg-brand-50 dark:border-gray-800 dark:hover:border-brand-700 dark:hover:bg-brand-950/30"
          >
            <component :is="icon.component" class="text-gray-700 dark:text-gray-300" />
            <span class="text-center text-xs text-gray-600 dark:text-gray-400">{{
              icon.name
            }}</span>
          </div>
        </div>
      </ComponentCard>

      <!-- Dashboard & Analytics Icons -->
      <ComponentCard title="Dashboard & Analytics Icons" desc="Icons for dashboards and data visualization">
        <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          <div
            v-for="icon in dashboardIcons"
            :key="icon.name"
            class="flex flex-col items-center gap-3 rounded-lg border border-gray-200 p-4 transition-colors hover:border-brand-500 hover:bg-brand-50 dark:border-gray-800 dark:hover:border-brand-700 dark:hover:bg-brand-950/30"
          >
            <component :is="icon.component" class="text-gray-700 dark:text-gray-300" />
            <span class="text-center text-xs text-gray-600 dark:text-gray-400">{{
              icon.name
            }}</span>
          </div>
        </div>
      </ComponentCard>

      <!-- User & Social Icons -->
      <ComponentCard title="User & Social Icons" desc="Icons for user profiles and communication">
        <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          <div
            v-for="icon in userSocialIcons"
            :key="icon.name"
            class="flex flex-col items-center gap-3 rounded-lg border border-gray-200 p-4 transition-colors hover:border-brand-500 hover:bg-brand-50 dark:border-gray-800 dark:hover:border-brand-700 dark:hover:bg-brand-950/30"
          >
            <component :is="icon.component" class="text-gray-700 dark:text-gray-300" />
            <span class="text-center text-xs text-gray-600 dark:text-gray-400">{{
              icon.name
            }}</span>
          </div>
        </div>
      </ComponentCard>

      <!-- Action Icons -->
      <ComponentCard title="Action Icons" desc="Icons for common actions and operations">
        <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          <div
            v-for="icon in actionIcons"
            :key="icon.name"
            class="flex flex-col items-center gap-3 rounded-lg border border-gray-200 p-4 transition-colors hover:border-brand-500 hover:bg-brand-50 dark:border-gray-800 dark:hover:border-brand-700 dark:hover:bg-brand-950/30"
          >
            <component :is="icon.component" class="text-gray-700 dark:text-gray-300" />
            <span class="text-center text-xs text-gray-600 dark:text-gray-400">{{
              icon.name
            }}</span>
          </div>
        </div>
      </ComponentCard>

      <!-- Status & Notification Icons -->
      <ComponentCard title="Status & Notification Icons" desc="Icons for alerts, notifications, and status indicators">
        <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          <div
            v-for="icon in statusIcons"
            :key="icon.name"
            class="flex flex-col items-center gap-3 rounded-lg border border-gray-200 p-4 transition-colors hover:border-brand-500 hover:bg-brand-50 dark:border-gray-800 dark:hover:border-brand-700 dark:hover:bg-brand-950/30"
          >
            <component :is="icon.component" class="text-gray-700 dark:text-gray-300" />
            <span class="text-center text-xs text-gray-600 dark:text-gray-400">{{
              icon.name
            }}</span>
          </div>
        </div>
      </ComponentCard>

      <!-- Other Icons -->
      <ComponentCard title="Other Icons" desc="Miscellaneous icons">
        <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          <div
            v-for="icon in otherIcons"
            :key="icon.name"
            class="flex flex-col items-center gap-3 rounded-lg border border-gray-200 p-4 transition-colors hover:border-brand-500 hover:bg-brand-50 dark:border-gray-800 dark:hover:border-brand-700 dark:hover:bg-brand-950/30"
          >
            <component :is="icon.component" class="text-gray-700 dark:text-gray-300" />
            <span class="text-center text-xs text-gray-600 dark:text-gray-400">{{
              icon.name
            }}</span>
          </div>
        </div>
      </ComponentCard>

      <!-- Icon Sizes & Colors -->
      <ComponentCard title="Icon Sizing & Styling" desc="Examples of different sizes and colors">
        <div class="space-y-6">
          <div>
            <h4 class="mb-3 text-sm font-semibold text-gray-800 dark:text-white/90">Sizes</h4>
            <div class="flex items-end gap-6">
              <div class="flex flex-col items-center gap-2">
                <GridIcon class="h-4 w-4 text-gray-700 dark:text-gray-300" />
                <span class="text-xs text-gray-600 dark:text-gray-400">16px</span>
              </div>
              <div class="flex flex-col items-center gap-2">
                <GridIcon class="h-5 w-5 text-gray-700 dark:text-gray-300" />
                <span class="text-xs text-gray-600 dark:text-gray-400">20px</span>
              </div>
              <div class="flex flex-col items-center gap-2">
                <GridIcon class="h-6 w-6 text-gray-700 dark:text-gray-300" />
                <span class="text-xs text-gray-600 dark:text-gray-400">24px (default)</span>
              </div>
              <div class="flex flex-col items-center gap-2">
                <GridIcon class="h-8 w-8 text-gray-700 dark:text-gray-300" />
                <span class="text-xs text-gray-600 dark:text-gray-400">32px</span>
              </div>
              <div class="flex flex-col items-center gap-2">
                <GridIcon class="h-12 w-12 text-gray-700 dark:text-gray-300" />
                <span class="text-xs text-gray-600 dark:text-gray-400">48px</span>
              </div>
            </div>
          </div>

          <div>
            <h4 class="mb-3 text-sm font-semibold text-gray-800 dark:text-white/90">Colors</h4>
            <div class="flex items-center gap-6">
              <div class="flex flex-col items-center gap-2">
                <GridIcon class="text-gray-700 dark:text-gray-300" />
                <span class="text-xs text-gray-600 dark:text-gray-400">Default</span>
              </div>
              <div class="flex flex-col items-center gap-2">
                <GridIcon class="text-brand-600 dark:text-brand-500" />
                <span class="text-xs text-gray-600 dark:text-gray-400">Brand</span>
              </div>
              <div class="flex flex-col items-center gap-2">
                <SuccessIcon class="text-green-600 dark:text-green-500" />
                <span class="text-xs text-gray-600 dark:text-gray-400">Success</span>
              </div>
              <div class="flex flex-col items-center gap-2">
                <ErrorIcon class="text-red-600 dark:text-red-500" />
                <span class="text-xs text-gray-600 dark:text-gray-400">Error</span>
              </div>
              <div class="flex flex-col items-center gap-2">
                <WarningIcon class="text-yellow-600 dark:text-yellow-500" />
                <span class="text-xs text-gray-600 dark:text-gray-400">Warning</span>
              </div>
              <div class="flex flex-col items-center gap-2">
                <InfoIcon class="text-blue-600 dark:text-blue-500" />
                <span class="text-xs text-gray-600 dark:text-gray-400">Info</span>
              </div>
            </div>
          </div>
        </div>
      </ComponentCard>

      <!-- Lucide Icons Info -->
      <ComponentCard title="Lucide Icons Library" desc="1000+ additional icons available">
        <div class="space-y-4">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            In addition to custom icons, this project includes
            <a
              href="https://lucide.dev"
              target="_blank"
              rel="noopener noreferrer"
              class="text-brand-600 hover:underline dark:text-brand-500"
            >
              Lucide Icons
            </a>
            (v0.563.0) which provides over 1000 additional icons.
          </p>

          <div class="rounded-lg bg-gray-50 p-4 dark:bg-gray-900">
            <pre class="text-xs text-gray-700 dark:text-gray-300"><code>&lt;script setup&gt;
import { Menu, User, Settings, Download } from 'lucide-vue-next'
&lt;/script&gt;

&lt;template&gt;
  &lt;Menu :size="24" /&gt;
  &lt;User :size="20" class="text-brand-600" /&gt;
  &lt;Settings :size="16" :stroke-width="2" /&gt;
&lt;/template&gt;</code></pre>
          </div>

          <a
            href="https://lucide.dev/icons"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex h-11 items-center justify-center rounded-lg bg-brand-600 px-6 py-2.5 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-700 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:bg-brand-700 dark:hover:bg-brand-800"
          >
            Browse All Lucide Icons
          </a>
        </div>
      </ComponentCard>
    </div>
  </AdminLayout>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import {
  GridIcon,
  ListIcon,
  TableIcon,
  PageIcon,
  CalenderIcon,
  MenuIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  HorizontalDots,
  PlusIcon,
  CheckIcon,
  PieChartIcon,
  BarChartIcon,
  LayoutDashboardIcon,
  BoxCubeIcon,
  BoxIcon,
  UserCircleIcon,
  UserGroupIcon,
  ChatIcon,
  MailIcon,
  MailBox,
  Message2Line,
  TrashIcon,
  TrashIconLg,
  ArchiveIcon,
  SendIcon,
  DraftIcon,
  FlagIcon,
  StaredIcon,
  RefreshIcon,
  LogoutIcon,
  SettingsIcon,
  PlugInIcon,
  SuccessIcon,
  ErrorIcon,
  ErrorHexaIcon,
  WarningIcon,
  InfoIcon,
  InfoCircleIcon,
  BellIcon,
  SupportIcon,
  DocsIcon,
  TaskIcon,
  HomeIcon,
  FolderIcon,
  PaperclipIcon,
  Calendar2Line,
} from '@/icons'

const currentPageTitle = ref('Icons')

const navigationIcons = [
  { name: 'GridIcon', component: GridIcon },
  { name: 'ListIcon', component: ListIcon },
  { name: 'TableIcon', component: TableIcon },
  { name: 'PageIcon', component: PageIcon },
  { name: 'CalenderIcon', component: CalenderIcon },
  { name: 'MenuIcon', component: MenuIcon },
  { name: 'ChevronDownIcon', component: ChevronDownIcon },
  { name: 'ChevronRightIcon', component: ChevronRightIcon },
  { name: 'HorizontalDots', component: HorizontalDots },
  { name: 'PlusIcon', component: PlusIcon },
  { name: 'CheckIcon', component: CheckIcon },
]

const dashboardIcons = [
  { name: 'PieChartIcon', component: PieChartIcon },
  { name: 'BarChartIcon', component: BarChartIcon },
  { name: 'LayoutDashboardIcon', component: LayoutDashboardIcon },
  { name: 'BoxCubeIcon', component: BoxCubeIcon },
  { name: 'BoxIcon', component: BoxIcon },
]

const userSocialIcons = [
  { name: 'UserCircleIcon', component: UserCircleIcon },
  { name: 'UserGroupIcon', component: UserGroupIcon },
  { name: 'ChatIcon', component: ChatIcon },
  { name: 'MailIcon', component: MailIcon },
  { name: 'MailBox', component: MailBox },
  { name: 'Message2Line', component: Message2Line },
]

const actionIcons = [
  { name: 'TrashIcon', component: TrashIcon },
  { name: 'TrashIconLg', component: TrashIconLg },
  { name: 'ArchiveIcon', component: ArchiveIcon },
  { name: 'SendIcon', component: SendIcon },
  { name: 'DraftIcon', component: DraftIcon },
  { name: 'FlagIcon', component: FlagIcon },
  { name: 'StaredIcon', component: StaredIcon },
  { name: 'RefreshIcon', component: RefreshIcon },
  { name: 'LogoutIcon', component: LogoutIcon },
  { name: 'SettingsIcon', component: SettingsIcon },
  { name: 'PlugInIcon', component: PlugInIcon },
]

const statusIcons = [
  { name: 'SuccessIcon', component: SuccessIcon },
  { name: 'ErrorIcon', component: ErrorIcon },
  { name: 'ErrorHexaIcon', component: ErrorHexaIcon },
  { name: 'WarningIcon', component: WarningIcon },
  { name: 'InfoIcon', component: InfoIcon },
  { name: 'InfoCircleIcon', component: InfoCircleIcon },
  { name: 'BellIcon', component: BellIcon },
  { name: 'SupportIcon', component: SupportIcon },
]

const otherIcons = [
  { name: 'DocsIcon', component: DocsIcon },
  { name: 'TaskIcon', component: TaskIcon },
  { name: 'HomeIcon', component: HomeIcon },
  { name: 'FolderIcon', component: FolderIcon },
  { name: 'PaperclipIcon', component: PaperclipIcon },
  { name: 'Calendar2Line', component: Calendar2Line },
]
</script>
