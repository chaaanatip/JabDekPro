<script setup>
import { ref, onMounted } from 'vue'
import IconSearch from '@/components/icons/IconSearch.vue'
import valorant from '@/assets/logo/valorant.jpg'

import Modal from '@/components/modals/ModalProduct.vue'

const isOpen = ref(false)

function closeModal() {
  isOpen.value = false
}
function openModal() {
  isOpen.value = true
}

const userCount = ref(0)

const fetchUserCount = async () => {
  try {
    // เรียก API URL แบบเต็มที่คุณระบุ
    const response = await fetch('http://localhost:3000/api/users/countuser')
    const data = await response.json()
    userCount.value = data.count // อัปเดตค่า userCount จาก API response
  } catch (error) {
    console.error('Error fetching user count:', error)
  }
}

// เรียกฟังก์ชันเมื่อ component ถูก mount
onMounted(() => {
  fetchUserCount()
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

      <div class="grid grid-cols-4 gap-4 pb-20">
        <button
          @click="openModal"
          class="max-w-sm rounded overflow-hidden shadow-lg"
        >
          <img
            class="w-full h-50"
            src="@/assets/logo/valorant.jpg"
            alt="Sunset in the mountains"
            type="button"
          />

          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
            <p class="text-gray-700 text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus quia, nulla! Maiores et perferendis eaque,
              exercitationem praesentium nihil.
            </p>
          </div>
        </button>

        <button
          class="bg-blue-500 h-44 flex items-center justify-center"
        ></button>
        <button class="bg-blue-500 h-44 flex items-center justify-center">
          hello
        </button>
        <button class="bg-blue-500 h-44 flex items-center justify-center">
          hello
        </button>
        <button class="bg-blue-500 h-44 flex items-center justify-center">
          hello
        </button>
        <button class="bg-blue-500 h-44 flex items-center justify-center">
          hello
        </button>
      </div>
    </div>
  </section>

  <!-- <div class="fixed inset-0 flex items-center justify-center">
    <button
      type="button"
      @click="openModal"
      class="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
    >
      Open dialog
    </button>
  </div> -->
</template>

<style scoped>
/* Custom styles (if needed) can be added here */
</style>
