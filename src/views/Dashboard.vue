<template>
  <CommonGridShape>
    <ComponentCard title="Total Cases">
      <div class="text-2xl font-bold">150</div>
    </ComponentCard>
    <ComponentCard title="Open Cases">
      <div class="text-2xl font-bold">35</div>
    </ComponentCard>
    <ComponentCard title="Average Resolution Time">
      <div class="text-2xl font-bold">7 Days</div>
    </ComponentCard>
    <ComponentCard title="Cases By Type">
      <div>TODO</div>
    </ComponentCard>
  </CommonGridShape>
  <ComponentCard title="Cases over time">
    <LineChartOne />
  </ComponentCard>
  <ComponentCard>
    <RecentCases />
  </ComponentCard>
  <ComponentCard title="Cases by status">
    <BarChartOne />
  </ComponentCard>
</template>

<script setup>
import ComponentCard from '@/components/common/ComponentCard.vue';
import CommonGridShape from '@/components/common/CommonGridShape.vue';
import LineChartOne from '@/components/charts/LineChart/LineChartOne.vue';
import RecentCases from '@/components/cases/RecentCases.vue';
import BarChartOne from '@/components/charts/BarChart/BarChartOne.vue';
</script>

<style scoped>
.text-2xl {
    font-size: 1.5rem;
}
</style>