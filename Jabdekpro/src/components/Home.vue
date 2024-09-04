<script setup>
import { ref, onMounted } from 'vue'
import IconSearch from '@/components/icons/IconSearch.vue'
import defaultImage from '@/assets/logo/valorant.jpg' // รูปภาพที่จะแสดงถ้า image_url ว่าง

import Modal from '@/components/modals/ModalProduct.vue'

const isOpen = ref(false)
const products = ref([]) // เก็บข้อมูลสินค้า

function closeModal() {
  isOpen.value = false
}
function openModal() {
  isOpen.value = true
}

const userCount = ref(0)

const fetchUserCount = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/users/countuser')
    const data = await response.json()
    userCount.value = data.count
  } catch (error) {
    console.error('Error fetching user count:', error)
  }
}

const fetchProducts = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/products')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    products.value = data
  } catch (error) {
    console.error('Error fetching products:', error)
  }
}

onMounted(() => {
  fetchUserCount()
  fetchProducts()
})
</script>

<template>
  <section
    class="relative min-h-[60vh] w-auto bg-[url('@/assets/logo/homemain.jpg')] bg-cover bg-top text-gray-300"
  >
    <!-- Background overlays -->
    <div class="inset-0 bg-black opacity-30"></div>
    <div
      class="inset-0 bg-gradient-radial from-transparent to-black opacity-70"
    ></div>

    <!-- Heading at the top -->
    <h1 class="flex justify-center pt-20 font-bold text-5xl text-gray-300">
      JabDekPro on top!
    </h1>

    <!-- Search bar in the center -->
    <div class="flex items-center justify-center py-2 mt-10">
      <label class="relative block w-full max-w-3xl">
        <span class="sr-only">Search</span>
        <span class="absolute inset-y-0 left-0 flex items-center pl-3">
          <IconSearch />
        </span>
        <input
          class="placeholder:italic placeholder:text-slate-400 block bg-[#0d1633] w-full border border-gray-800 rounded-md py-5 pl-10 pr-3 shadow-sm focus:outline-none focus:border-white focus:ring-blue-800 focus:ring-2 sm:text-sm"
          placeholder="Search for anything..."
          type="text"
          name="search"
        />
      </label>
    </div>

    <!-- Stats section at the bottom -->
    <div class="mt-5">
      <div
        class="stats shadow flex justify-center space-x-2 bg-opacity-50 backdrop-blur-md px-2 py-1 rounded-lg w-1/4 mx-auto bg-[#13214d]"
      >
        <div class="stat place-items-center">
          <div class="stat-value text-base">31K</div>
          <div class="stat-title text-xs">Download</div>
        </div>
        <div class="stat place-items-center">
          <div class="stat-value text-secondary text-base">4,200</div>
          <div class="stat-title text-secondary text-xs">Users</div>
        </div>
        <div class="stat place-items-center">
          <div class="stat-value text-base text-white">{{ userCount }}</div>
          <div class="stat-title text-xs text-white">Registers</div>
        </div>
      </div>
    </div>
  </section>

  <Modal :isOpen="isOpen" @update:isOpen="isOpen = $event" />
  <section class="bg-[#0b1125]">
    <div class="max-w-7xl mx-auto px-10">
      <div class="text-2xl font-bold py-10 text-white" id="title">
        <h1>Shop</h1>
      </div>

      <!-- แสดงข้อมูลสินค้าด้วย v-for -->
      <div class="grid grid-cols-4 gap-4 pb-20">
        <button
          v-for="product in products"
          :key="product.id"
          @click="openModal"
          class="max-w-sm rounded overflow-hidden shadow-lg"
        >
          <img
            class="w-full h-64 object-cover"
            :src="product.image_url || defaultImage"
            alt="Product image"
          />
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2 text-white">
              {{ product.name }}
            </div>
            <p class="text-gray-400 text-base">
              {{ product.description }}
            </p>
            <p class="text-green-400">Price: {{ product.price }}</p>
            <p class="text-cyan-400">Stock: {{ product.stock }}</p>
          </div>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Custom styles (if needed) can be added here */
</style>
