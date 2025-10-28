<!-- ========================================
     DataTable Component - components/DataTable.vue
     ======================================== -->
<template>
  <div class="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800">
    <!-- Table Container -->
    <div class="overflow-x-auto">
      <table class="w-full">
        <!-- Table Header -->
        <thead class="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-white/[0.03]">
          <tr>
            <!-- Selection Column -->
            <th v-if="selectable" class="p-4 text-left">
              <input
                type="checkbox"
                :checked="isAllSelected"
                @change="handleSelectAll"
                class="h-5 w-5 rounded border-gray-300 text-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900"
              />
            </th>

            <!-- Data Columns -->
            <th
              v-for="column in columns"
              :key="column.key"
              class="p-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-400"
              :class="column.headerClass"
            >
              <div class="flex items-center gap-2">
                {{ column.label }}
                <!-- Sort Icon -->
                <button
                  v-if="column.sortable"
                  @click="handleSort(column.key)"
                  class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <svg
                    class="h-4 w-4"
                    :class="{
                      'text-brand-500': sortBy === column.key
                    }"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      v-if="sortBy === column.key && sortOrder === 'asc'"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 15l7-7 7 7"
                    />
                    <path
                      v-else-if="sortBy === column.key && sortOrder === 'desc'"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                    <path
                      v-else
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                    />
                  </svg>
                </button>
              </div>
            </th>

            <!-- Actions Column -->
            <th v-if="$slots.actions" class="p-4 text-right text-sm font-semibold text-gray-700 dark:text-gray-400">
              الإجراءات
            </th>
          </tr>
        </thead>

        <!-- Table Body -->
        <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
          <!-- Loading State -->
          <tr v-if="loading">
            <td :colspan="columnsCount" class="p-8 text-center">
              <div class="flex items-center justify-center">
                <svg
                  class="h-8 w-8 animate-spin text-brand-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            </td>
          </tr>

          <!-- Empty State -->
          <tr v-else-if="!data || data.length === 0">
            <td :colspan="columnsCount" class="p-8 text-center">
              <div class="text-gray-500 dark:text-gray-400">
                <svg
                  class="mx-auto mb-3 h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
                <p class="text-sm">{{ emptyMessage }}</p>
              </div>
            </td>
          </tr>

          <!-- Data Rows -->
          <tr
            v-else
            v-for="(row, index) in data"
            :key="getRowKey(row, index)"
            class="hover:bg-gray-50 dark:hover:bg-white/[0.02]"
          >
            <!-- Selection Cell -->
            <td v-if="selectable" class="p-4">
              <input
                type="checkbox"
                :checked="isRowSelected(row)"
                @change="handleSelectRow(row)"
                class="h-5 w-5 rounded border-gray-300 text-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900"
              />
            </td>

            <!-- Data Cells -->
            <td
              v-for="column in columns"
              :key="column.key"
              class="p-4 text-sm text-gray-800 dark:text-white/90"
              :class="column.cellClass"
            >
              <slot
                v-if="$slots[`cell-${column.key}`]"
                :name="`cell-${column.key}`"
                :row="row"
                :value="getCellValue(row, column.key)"
              >
              </slot>
              <span v-else>{{ getCellValue(row, column.key) }}</span>
            </td>

            <!-- Actions Cell -->
            <td v-if="$slots.actions" class="p-4 text-right">
              <slot name="actions" :row="row"></slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  headerClass?: string;
  cellClass?: string;
}

interface Props {
  columns: TableColumn[];
  data: unknown[];
  loading?: boolean;
  selectable?: boolean;
  selectedRows?: unknown[];
  rowKey?: string;
  emptyMessage?: string;
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  selectable: false,
  selectedRows: () => [],
  rowKey: 'id',
  emptyMessage: 'لا توجد بيانات'
});

const emit = defineEmits<{
  'select': [rows: unknown[]];
  'select-all': [];
  'sort': [column: string, order: 'asc' | 'desc'];
}>();

const sortBy = ref<string>('');
const sortOrder = ref<'asc' | 'desc'>('asc');

const columnsCount = computed(() => {
  let count = props.columns.length;
  if (props.selectable) count++;
  if (useSlots().actions) count++;
  return count;
});

const isAllSelected = computed(() => {
  return props.data.length > 0 && props.selectedRows.length === props.data.length;
});

const isRowSelected = (row: unknown) => {
  const rowKeyValue = getRowKey(row, 0);
  return props.selectedRows.some(
    (selectedRow: unknown) => getRowKey(selectedRow, 0) === rowKeyValue
  );
};

const getRowKey = (row: unknown, index: number): PropertyKey => {
  if (props.rowKey && typeof row === 'object' && row !== null) {
    const value = (row as Record<string, unknown>)[props.rowKey];
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'symbol') {
      return value as PropertyKey;
    }
    return index;
  }
  return index;
};

const getCellValue = (row: unknown, key: string) => {
  if (typeof row === 'object' && row !== null) {
    return (row as Record<string, unknown>)[key];
  }
  return '';
};

const handleSelectAll = () => {
  if (isAllSelected.value) {
    emit('select', []);
  } else {
    emit('select', [...props.data]);
  }
};

const handleSelectRow = (row: unknown) => {
  const rowKeyValue = getRowKey(row, 0);
  const selectedIndex = props.selectedRows.findIndex(
    (selectedRow: unknown) => getRowKey(selectedRow, 0) === rowKeyValue
  );

  let newSelection: unknown[];
  if (selectedIndex > -1) {
    newSelection = props.selectedRows.filter(
      (_, index) => index !== selectedIndex
    );
  } else {
    newSelection = [...props.selectedRows, row];
  }

  emit('select', newSelection);
};

const handleSort = (column: string) => {
  if (sortBy.value === column) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortBy.value = column;
    sortOrder.value = 'asc';
  }
  emit('sort', column, sortOrder.value);
};

// Import useSlots
import { useSlots } from 'vue';
</script>
