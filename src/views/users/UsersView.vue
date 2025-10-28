<!-- ========================================
     UsersView - views/users/UsersView.vue
     صفحة قائمة المستخدمين
     ======================================== -->
<template>
  <AdminLayout>
    <PageBreadcrumb :page-title="currentPageTitle" />

    <div class="space-y-5 sm:space-y-6">
      <!-- Header Card -->
      <div
        class="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:flex-row lg:items-center lg:justify-between lg:p-6"
      >
        <div>
          <h3 class="mb-1 text-lg font-semibold text-gray-800 dark:text-white/90">
            إدارة المستخدمين
          </h3>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            عرض وإدارة جميع المستخدمين في النظام
          </p>
        </div>

        <button
          @click="handleCreate"
          class="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 lg:w-auto"
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
              d="M12 4v16m8-8H4"
            />
          </svg>
          إضافة مستخدم
        </button>
      </div>

      <!-- Filters & Search -->
      <div
        class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6"
      >
        <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
          <!-- Search -->
          <FormInputAny
            v-model="usersStore.searchTerm"
            type="text"
            placeholder="بحث بالاسم أو البريد..."
            @input="handleSearch"
          >
            <template #iconLeft>
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </template>
          </FormInputAny>

          <!-- Role Filter -->
          <FormSelect
            v-model="usersStore.selectedRoleFilter"
            :options="roleFilterOptions"
            placeholder="جميع الأدوار"
            @change="handleSearch"
          />

          <!-- Status Filter -->
          <FormSelect
            v-model="statusFilterValue"
            :options="statusOptions"
            placeholder="جميع الحالات"
            @change="handleStatusFilter"
          />
        </div>

        <!-- Clear Filters -->
        <div v-if="hasActiveFilters" class="mt-4">
          <button
            @click="handleClearFilters"
            class="text-sm text-brand-500 hover:text-brand-600"
          >
            مسح الفلاتر
          </button>
        </div>
      </div>

      <!-- Bulk Actions -->
      <div
        v-if="usersStore.hasSelection"
        class="rounded-2xl border border-brand-200 bg-brand-50 p-4 dark:border-brand-800 dark:bg-brand-900/10"
      >
        <div class="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <p class="text-sm font-medium text-gray-800 dark:text-white/90">
            تم تحديد {{ usersStore.selectedCount }} مستخدم
          </p>
          <div class="flex flex-wrap gap-2">
            <button
              @click="handleBulkActivate"
              class="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]"
            >
              تفعيل
            </button>
            <button
              @click="handleBulkDeactivate"
              class="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]"
            >
              إلغاء التفعيل
            </button>
            <button
              @click="handleBulkDelete"
              class="rounded-lg bg-red-500 px-3 py-2 text-sm font-medium text-white hover:bg-red-600"
            >
              حذف
            </button>
          </div>
        </div>
      </div>

      <!-- Data Table -->
      <DataTable
        :columns="columns"
        :data="usersStore.users"
        :loading="usersStore.isLoading"
        :selectable="true"
        :selected-rows="selectedUsers"
        row-key="id"
        empty-message="لا يوجد مستخدمون"
        @select="handleSelect"
        @sort="handleSort"
      >
        <!-- Custom Cells -->
        <template #cell-fullName="slotProps">
          <div class="flex items-center gap-3">
            <div
              class="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-600 dark:bg-brand-900/20 dark:text-brand-400"
            >
              {{ getInitials((slotProps.row as UserInfo).fullName)}}
            </div>
            <div>
              <p class="font-medium text-gray-800 dark:text-white/90">
                {{ (slotProps.row as UserInfo).fullName }}
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                {{ (slotProps.row as UserInfo).email }}
              </p>
            </div>
          </div>
        </template>

        <template #cell-roleName="{ value }">
          <span
            class="inline-flex rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
          >
            {{ value }}
          </span>
        </template>

        <template #cell-isActive="{ value }">
          <span
            class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
            :class="
              value
                ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
            "
          >
            <span class="h-1.5 w-1.5 rounded-full" :class="value ? 'bg-green-600' : 'bg-gray-400'"></span>
            {{ value ? 'نشط' : 'غير نشط' }}
          </span>
        </template>

        <template #cell-createdAt="{ value }">
          <span class="text-sm text-gray-500 dark:text-gray-400">
            {{ formatDate(value as string) }}
          </span>
        </template>

        <!-- Actions -->
        <template #actions="{ row }">
          <div class="flex items-center justify-end gap-2">
            <button
              @click="handleEdit(row as AdminUser)"
              class="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/[0.05] dark:hover:text-gray-300"
              title="تعديل"
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
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
            <button
              @click="handleDelete(row as AdminUser)"
              class="rounded-lg p-2 text-red-500 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20"
              title="حذف"
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
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </template>
      </DataTable>

      <!-- Pagination -->
      <div
        v-if="usersStore.totalPages > 1"
        class="flex flex-col items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] sm:flex-row"
      >
        <p class="text-sm text-gray-700 dark:text-gray-400">
          عرض {{ usersStore.pagedResult?.items.length || 0 }} من {{ usersStore.totalUsers }}
        </p>

        <div class="flex items-center gap-2">
          <button
            @click="usersStore.previousPage()"
            :disabled="!usersStore.hasPreviousPage"
            class="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]"
          >
            السابق
          </button>

          <span class="text-sm text-gray-700 dark:text-gray-400">
            صفحة {{ usersStore.currentPage }} من {{ usersStore.totalPages }}
          </span>

          <button
            @click="usersStore.nextPage()"
            :disabled="!usersStore.hasNextPage"
            class="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]"
          >
            التالي
          </button>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <UserModal
      :is-open="userModal.isOpen"
      :mode="userModal.mode"
      :user="userModal.user"
      @close="userModal.isOpen = false"
      @success="handleUserSaved"
    />

    <ConfirmDialog
      :is-open="confirmDialog.isOpen"
      :options="confirmDialog.options"
      @confirm="confirmDialog.onConfirm"
      @cancel="confirmDialog.isOpen = false"
    />

    <!-- Toast Notifications -->
    <ToastContainer :toasts="toast.toasts.value" @remove="toast.removeToast" />
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useUsersStore } from '@/stores/users.store';
import { useRolesStore } from '@/stores/roles.store';
import { useAppToast } from '@/composables/useToast';
import AdminLayout from '@/components/layout/AdminLayout.vue';
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue';
import FormInput from '@/components/forms/FormElements/FormInput.vue';
import FormSelect from '@/components/forms/FormElements/FormSelect.vue';
import DataTable from '@/components/tables/basic-tables/DataTable.vue';
import UserModal from '@/modals/UserModal.vue';

// Treat FormInput as any to avoid strict template slot type checking for the iconLeft slot
const FormInputAny = FormInput;
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import ToastContainer from '@/components/ToastContainer.vue';
import type { AdminUser, UserInfo } from '@/types/identity.types';
import type { TableColumn } from '@/components/tables/basic-tables/DataTable.vue';

const currentPageTitle = ref('المستخدمون');
const usersStore = useUsersStore();
const rolesStore = useRolesStore();
const toast = useAppToast();

// Selected Users
const selectedUsers = computed(() => 
  usersStore.users.filter(user => 
    usersStore.selectedUserIds.includes(user.id)
  )
);

// Table Columns
const columns: TableColumn[] = [
  { key: 'fullName', label: 'المستخدم', sortable: true },
  { key: 'roleName', label: 'الدور', sortable: true },
  { key: 'isActive', label: 'الحالة', sortable: true },
  { key: 'createdAt', label: 'تاريخ الإنشاء', sortable: true }
];

// Filters
const statusFilterValue = ref('');
const roleFilterOptions = computed(() => [
  { label: 'جميع الأدوار', value: '' },
  ...rolesStore.roles.map(role => ({
    label: role.name,
    value: role.id
  }))
]);

const statusOptions = [
  { label: 'جميع الحالات', value: '' },
  { label: 'نشط', value: 'true' },
  { label: 'غير نشط', value: 'false' }
];

const hasActiveFilters = computed(() => 
  usersStore.searchTerm || 
  usersStore.selectedRoleFilter || 
  usersStore.statusFilter !== null
);

// User Modal
const userModal = ref<{
  isOpen: boolean;
  mode: 'create' | 'edit';
  user: AdminUser | null;
}>({
  isOpen: false,
  mode: 'create',
  user: null
});

// Confirm Dialog
const confirmDialog = ref<{
  isOpen: boolean;
  options: {
    title: string;
    message: string;
    confirmText: string;
    cancelText: string;
    type: 'danger' | 'warning';
  };
  onConfirm: () => void;
}>({
  isOpen: false,
  options: {
    title: '',
    message: '',
    confirmText: 'تأكيد',
    cancelText: 'إلغاء',
    type: 'warning'
  },
  onConfirm: () => {}
});

// Load Data
onMounted(async () => {
  await Promise.all([
    usersStore.loadUsers(),
    rolesStore.loadRoles()
  ]);
});

// Handlers
const handleCreate = () => {
  userModal.value = {
    isOpen: true,
    mode: 'create',
    user: null
  };
};

const handleEdit = (user: AdminUser) => {
  userModal.value = {
    isOpen: true,
    mode: 'edit',
    user
  };
};

const handleDelete = (user: AdminUser) => {
  confirmDialog.value = {
    isOpen: true,
    options: {
      title: 'تأكيد الحذف',
      message: `هل أنت متأكد من حذف المستخدم "${user.fullName}"؟ لا يمكن التراجع عن هذا الإجراء.`,
      confirmText: 'حذف',
      cancelText: 'إلغاء',
      type: 'danger'
    },
    onConfirm: async () => {
      try {
        await usersStore.deleteUser(user.id);
        toast.userDeleted();
        confirmDialog.value.isOpen = false;
      } catch /*(error)*/ {
        toast.userError();
      }
    }
  };
};

const handleBulkActivate = async () => {
  try {
    await usersStore.bulkActivate();
    toast.bulkActivated(usersStore.selectedCount);
  } catch /*(error)*/ {
    toast.operationError();
  }
};

const handleBulkDeactivate = async () => {
  try {
    await usersStore.bulkDeactivate();
    toast.bulkDeactivated(usersStore.selectedCount);
  } catch /*(error)*/ {
    toast.operationError();
  }
};

const handleBulkDelete = () => {
  const count = usersStore.selectedCount;
  confirmDialog.value = {
    isOpen: true,
    options: {
      title: 'تأكيد الحذف الجماعي',
      message: `هل أنت متأكد من حذف ${count} مستخدم؟ لا يمكن التراجع عن هذا الإجراء.`,
      confirmText: 'حذف الكل',
      cancelText: 'إلغاء',
      type: 'danger'
    },
    onConfirm: async () => {
      try {
        await usersStore.bulkDelete();
        toast.bulkDeleted(count);
        confirmDialog.value.isOpen = false;
      } catch /*(error)*/ {
        toast.operationError();
      }
    }
  };
};

const handleSearch = async () => {
  await usersStore.searchUsers();
};

const handleStatusFilter = () => {
  if (statusFilterValue.value === '') {
    usersStore.setStatusFilter(null);
  } else {
    usersStore.setStatusFilter(statusFilterValue.value === 'true');
  }
  handleSearch();
};

const handleClearFilters = () => {
  usersStore.clearFilters();
  statusFilterValue.value = '';
  handleSearch();
};

const handleSelect = (rows: unknown[]) => {
  usersStore.selectedUserIds = (rows as AdminUser[]).map(r => r.id);
};

const handleSort = (column: string, order: 'asc' | 'desc') => {
  console.log('Sort:', column, order);
  // Implement sorting logic
};

const handleUserSaved = () => {
  usersStore.loadUsers();
};

// Utilities
const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};
</script>
