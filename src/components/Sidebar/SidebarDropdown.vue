<script setup lang="ts">
import { useSidebarStore } from '@/stores/sidebar'
import { computed, ref } from 'vue'

const sidebarStore = useSidebarStore()

const props = defineProps(['items', 'page'])
const items = ref(props.items)

const handleItemClick = (index: number) => {
  const isSelected = computed(() => sidebarStore.page === props.items[index].label)

  if (!isSelected.value) {
    sidebarStore.navigateToDashboard(props.page, props.items[index].label)
  }
  sidebarStore.toggleSidebar()
}
</script>

<template>
  <div
    class="translate transform overflow-hidden"
    :class="{ hidden: sidebarStore.page !== props.page }"
  >
    <ul class="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
      <template v-for="(childItem, index) in items" :key="index">
        <li>
          <router-link
            :to="childItem.route"
            @click="handleItemClick(index)"
            class="group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white"
            :class="{
              '!text-white': childItem.label === sidebarStore.selected
            }"
          >
            {{ childItem.label }}
          </router-link>
        </li>
      </template>
    </ul>
  </div>
</template>
