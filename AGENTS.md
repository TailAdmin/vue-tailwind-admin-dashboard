# AGENTS.md — TailAdmin Vue Free

> Vue 3 administrative dashboard template · Composition API · Tailwind CSS v4 · ApexCharts · FullCalendar · Swiper · Flatpickr · Leaflet · vuedraggable · RTL Support

## Repo Map

```
src/
├── assets/
│   └── main.css                  # Tailwind CSS v4 theme (@theme), global utility classes & 3rd party overrides
├── components/
│   ├── charts/                   # ApexChart subcomponents (BarChart, LineChart)
│   ├── common/                   # Shared wrappers (ComponentCard, PageBreadcrumb, ThemeToggler)
│   ├── forms/                    # Form controls and layouts (FormElements)
│   ├── layout/                   # Admin shell (AdminLayout, AppHeader, AppSidebar, Backdrop, FullScreenLayout, header/)
│   ├── profile/                  # User profile widgets (ProfileCard, AddressCard, PersonalInfoCard, Security, DangerZone, Modal)
│   ├── tables/                   # Table variations (BasicTableOne)
│   └── ui/                       # UI primitives (Alert, Avatar, Badge, Button, Modal, etc.)
├── composables/
│   ├── useRTL.ts                 # RTL state management synced with localStorage and DOM dir attribute
│   └── useSidebar.ts             # Sidebar expand/collapse, mobile drawer, hover state
├── icons/                        # SVG icons as Vue SFCs (PascalCase, e.g. BellIcon.vue, BoxIcon.vue)
├── router/
│   └── index.ts                  # Vue Router 4 route definitions
└── views/
    ├── Dashboard/                # Ecommerce dashboard page (Ecommerce.vue)
    ├── Auth/                     # Sign in, Sign up pages
    ├── Chart/                    # Chart preview pages (BarChart, LineChart)
    ├── Forms/                    # Form elements page
    ├── Others/                   # Other feature pages (Calendar.vue, UserProfile.vue)
    ├── Pages/                    # Extra pages (BlankPage, Error404)
    ├── Tables/                   # Basic table page
    └── UiElements/               # UI showcase pages (Alerts, Avatars, Badges, Buttons, Images, Videos)
```

## Stack

- **Vue 3** with **Composition API** (`<script setup lang="ts">`) and **Vue Router 4**.
- **TypeScript ~5.7**: Strict type safety throughout components, composables, and router.
- **Tailwind CSS v4**: Configured with `@tailwindcss/postcss` and `@theme` tokens in `src/assets/main.css`. No `tailwind.config.js`.
- Path alias: `@/*` → `src/*` (configured in `vite.config.ts`).
- **Vite 6** with `@vitejs/plugin-vue` and `@vitejs/plugin-vue-jsx`.
- **State Management via Composables**:
  - `useSidebar`: Manages sidebar expand/collapse, mobile drawer visibility, and hover state.
  - `useRTL`: Manages RTL direction (`dir="rtl"` / `dir="ltr"`, `.rtl` class, synced with `localStorage`).
- **Third-Party Libraries**:
  - **vue3-apexcharts & apexcharts**: Interactive charts and data visualizations.
  - **@fullcalendar/vue3 & fullcalendar**: Event calendar with DayGrid, TimeGrid, MultiMonth, and Interaction plugins.
  - **jsvectormap & vuevectormap**: Vector maps.
  - **swiper**: Touch sliders and carousels.
  - **vue-flatpickr-component & flatpickr**: Advanced date and time pickers.
  - **vuedraggable**: Drag-and-drop interactions.
  - **dropzone**: File upload dropzone.
- **Scripts**:
  - `npm run dev` — starts the development server.
  - `npm run build` — runs type-check then builds the production bundle into `dist/`.
  - `npm run type-check` — runs `vue-tsc --build` for TypeScript validation.
  - `npm run lint` — runs ESLint with auto-fix.
  - `npm run format` — runs Prettier on `src/`.

## Conventions

- **New Page**:
  - Add the route to `src/router/index.ts` with a descriptive `meta.title`.
  - Create the view in `src/views/<Category>/<PageName>.vue`.
  - Use `AdminLayout` wrapper for dashboard pages, `FullScreenLayout` for auth/error pages.
  - Wrap page sections in `<ComponentCard :title="'...'">` and add `<PageBreadcrumb :pageTitle="'...'" />` at the top.
- **New Reusable Component**:
  - Domain-specific: `src/components/<feature>/<ComponentName>.vue`.
  - UI primitives: `src/components/ui/<ComponentName>.vue`.
  - Shared wrappers: `src/components/common/<ComponentName>.vue`.
- **Component Files**:
  - Use **PascalCase** filenames (`MonthlySalesChart.vue`) with a `<script setup lang="ts">` block.
  - Use `defineProps<{...}>()` and `defineEmits<{...}>()` with explicit TypeScript types.
- **Icons**:
  - Icons live in `src/icons/` as Vue SFCs (e.g., `BellIcon.vue`, `BoxIcon.vue`).
  - Import directly: `import BellIcon from '@/icons/BellIcon.vue'` or `from '@/icons'`.
  - Use `fill-current` / `stroke-current` and `w-*` / `h-*` tokens inside icon components for adaptive theming.
- **Charts**:
  - Import `vue3-apexcharts` as a component; guard chart rendering with `v-if="isMounted"` (set via `onMounted`) to avoid SSR issues.
  - Declare options as `ref<ApexCharts.ApexOptions>({...})` and pass to `<VueApexCharts :options="..." :series="..." />`.
- **Calendar & Maps**:
  - `@fullcalendar/vue3` and map libraries are browser-only — always initialize inside `onMounted`. Never call them at the module level.

## Layouts & Structure

- **`AdminLayout`** (`src/components/layout/AdminLayout.vue`): Standard admin shell with `AppSidebar`, `AppHeader`, `Backdrop`, and `<RouterView>`.
- **`FullScreenLayout`** (`src/components/layout/FullScreenLayout.vue`): Full-width layout without sidebar/header — used for auth and error pages.

## Styling Rules & Dark Mode

- **Tailwind CSS v4**: Configured via `src/assets/main.css` using `@theme`. There is **no** `tailwind.config.js`.
- **Theme Tokens**: Always use predefined theme tokens:
  - **Colors**: `brand` (`25`–`950`), `gray` (`25`–`950`), `blue-light` (`25`–`950`), `orange` (`25`–`950`), `success`, `error`, `warning`.
  - **Typography**: `font-outfit`, `text-theme-xs/sm/xl`, `text-title-sm/md/lg/xl/2xl`.
  - **Shadows**: `shadow-theme-xs/sm/md/lg/xl`.
  - **Breakpoints**: `2xsm` (375px), `xsm` (425px), `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px), `2xl` (1536px).
- **Dark Mode**:
  - Dark mode is class-driven (`@custom-variant dark (&:is(.dark *))` in `main.css`, `.dark` toggled on `<html>`).
  - Every styled element must include corresponding `dark:` variants (e.g. `bg-white dark:bg-gray-800 text-gray-800 dark:text-white/90 border-gray-200 dark:border-gray-800`).

## RTL & Logical Spacing Rules

- **CSS Logical Properties**:
  - Never use physical directional utilities when logical equivalents exist:
    - **Margins**: Use `ms-*` / `me-*` instead of `ml-*` / `mr-*`.
    - **Padding**: Use `ps-*` / `pe-*` instead of `pl-*` / `pr-*`.
    - **Positioning / Insets**: Use `start-*` / `end-*` instead of `left-*` / `right-*`.
    - **Borders**: Use `border-s-*` / `border-e-*` instead of `border-l-*` / `border-r-*`.
    - **Border Radius**: Use `rounded-s-*` / `rounded-e-*` instead of `rounded-l-*` / `rounded-r-*`.
    - **Text Alignment**: Use `text-start` / `text-end` instead of `text-left` / `text-right`.
  - Use `ltr:*` and `rtl:*` modifiers when explicit directional overrides are required (e.g. `ltr:border-r rtl:border-l`, `ltr:-left-px rtl:-right-px`).
- **Directional Glyphs & Transforms**:
  - Flip directional arrows, breadcrumb chevrons, and navigation icons in RTL using `rtl:rotate-180` or `rtl:-scale-x-100`.
  - Off-canvas drawers must mirror their translation (e.g. `-translate-x-full max-xl:rtl:translate-x-full`).

## Don'ts

- Don't install new NPM packages without asking the user.
- Don't create `tailwind.config.js` — Tailwind v4 configuration belongs in `src/assets/main.css`.
- Don't use Options API or `defineComponent` boilerplate — always use `<script setup lang="ts">`.
- Don't hardcode physical directional utilities (`ml-*`, `mr-*`, `pl-*`, `pr-*`, `left-*`, `right-*`, `border-l-*`, `border-r-*`, `rounded-l-*`, `rounded-r-*`, `text-left`, `text-right`) without providing RTL support (`ltr:` / `rtl:` or CSS logical equivalents).
- Don't hardcode hex colors in `class=""` attributes — use `@theme` tokens.
- Don't write inline `style="..."` attributes when Tailwind theme tokens and utility classes are available.
- Don't initialize map, calendar, or other browser-only libraries outside `onMounted`.
