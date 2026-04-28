<template>
  <div class="overflow-x-auto">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">
            Case ID
          </th>
          <th scope="col" class="px-6 py-3">
            Case Type
          </th>
          <th scope="col" class="px-6 py-3">
            Date Reported
          </th>
          <th scope="col" class="px-6 py-3">
            Status
          </th>
          <th scope="col" class="px-6 py-3">
            Assignee
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="caseItem in recentCases" :key="caseItem.caseId" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <td class="px-6 py-4">
            {{ caseItem.caseId }}
          </td>
          <td class="px-6 py-4">
            {{ caseItem.caseType }}
          </td>
          <td class="px-6 py-4">
            {{ caseItem.dateReported }}
          </td>
          <td class="px-6 py-4">
            {{ caseItem.status }}
          </td>
          <td class="px-6 py-4">
            {{ caseItem.assignee }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const recentCases = ref([
  {
    caseId: 'CASE-001',
    caseType: 'Injury',
    dateReported: '2023-11-20',
    status: 'Investigating',
    assignee: 'John Doe',
  },
  {
    caseId: 'CASE-002',
    caseType: 'HR Violation',
    dateReported: '2023-11-18',
    status: 'Reported',
    assignee: 'Jane Smith',
  },
  {
    caseId: 'CASE-003',
    caseType: 'Legal Issue',
    dateReported: '2023-11-15',
    status: 'Pending Review',
    assignee: 'Mike Johnson',
  },
  {
    caseId: 'CASE-004',
    caseType: 'Property Damage',
    dateReported: '2023-11-12',
    status: 'Resolved',
    assignee: 'Emily Davis',
  },
  {
    caseId: 'CASE-005',
    caseType: 'Safety Hazard',
    dateReported: '2023-11-10',
    status: 'Closed',
    assignee: 'David Wilson',
  },
]);
</script>