<script setup lang="ts">
import { ref } from 'vue'

import ProductOne from '@/assets/images/product/product-01.png';
import ProductTwo from '@/assets/images/product/product-02.png';
import ProductThree from '@/assets/images/product/product-03.png';
import ProductFour from '@/assets/images/product/product-04.png';

const products = ref([
  {
    id: 1,
    name: 'Apple Watch Series 7',
    category: 'Electronics',
    price: 269,
    sold: 22,
    profit: 45,
    imageSrc: ProductOne
  },
  {
    id: 2,
    name: 'Macbook Pro M1',
    category: 'Electronics',
    price: 546,
    sold: 34,
    profit: 125,
    imageSrc: ProductTwo
  },
  {
    id: 3,
    name: 'Dell Inspiron 15',
    category: 'Electronics',
    price: 443,
    sold: 64,
    profit: 247,
    imageSrc: ProductThree
  },
  {
    id: 4,
    name: 'HP Probook 450',
    category: 'Electronics',
    price: 499,
    sold: 72,
    profit: 103,
    imageSrc: ProductFour
  }
])
</script>

<template>
  <div
    class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
  >
    <div class="py-6 px-4 md:px-6 xl:px-7.5">
      <h4 class="text-xl font-bold text-black dark:text-white">Top Products</h4>
    </div>

    <!-- Table Header -->
    <div
      class="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
    >
      <div class="col-span-3 flex items-center">
        <p class="font-medium">Product Name</p>
      </div>
      <div class="col-span-2 hidden items-center sm:flex">
        <p class="font-medium">Category</p>
      </div>
      <div class="col-span-1 flex items-center">
        <p class="font-medium">Price</p>
      </div>
      <div class="col-span-1 flex items-center">
        <p class="font-medium">Sold</p>
      </div>
      <div class="col-span-1 flex items-center">
        <p class="font-medium">Profit</p>
      </div>
    </div>

    <!-- Table Rows -->
    <div
      v-for="product in products"
      :key="product.id"
      class="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
    >
      <div class="col-span-3 flex items-center">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div class="h-12.5 w-15 rounded-md">
            <img :src="product.imageSrc" :alt="`Product: ${product.name}`" />
          </div>
          <p class="text-sm font-medium text-black dark:text-white">{{ product.name }}</p>
        </div>
      </div>
      <div class="col-span-2 hidden items-center sm:flex">
        <p class="text-sm font-medium text-black dark:text-white">{{ product.category }}</p>
      </div>
      <div class="col-span-1 flex items-center">
        <p class="text-sm font-medium text-black dark:text-white">${{ product.price }}</p>
      </div>
      <div class="col-span-1 flex items-center">
        <p class="text-sm font-medium text-black dark:text-white">{{ product.sold }}</p>
      </div>
      <div class="col-span-1 flex items-center">
        <p class="text-sm font-medium text-meta-3">${{ product.profit }}</p>
      </div>
    </div>
  </div>
</template>
