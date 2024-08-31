<template>
  <nav
    class="sticky top-0 z-50 flex justify-between items-center bg-[#0b1125] p-1 shadow-lg"
  >
    <div class="flex items-center space-x-4 ml-40">
      <button
        class="flex items-center bg-transparent text-white font-bold text-xl"
      >
        <img src="@/assets/logo/logo.png" alt="Logo" class="w-16 h-18" />
        <router-link to="/" class="border-r border-gray-700 pr-5">
          JabDekPro
        </router-link>
      </button>
    </div>

    <!-- กลุ่มปุ่มด้านซ้าย -->
    <div
      class="flex-grow flex justify-start text-gray-300 space-x-5 ml-5 text-lg"
    >
      <router-link to="/" class="block py-2 hover:text-gray-100 rounded">
        Home
      </router-link>
      <router-link
        to="/feedback"
        class="block py-2 hover:text-gray-100 rounded"
      >
        Feedback
      </router-link>
      <router-link to="/terms" class="block py-2 hover:text-gray-100 rounded">
        Term of Service
      </router-link>
    </div>

    <!-- ปุ่ม Products ขวาสุด -->
    <div class="ml-auto mr-20">
      <button
        class="bg-transparent py-2 px-4 border border-blue-900 rounded-xl hover:bg-blue-900 font-bold text-blue-900 hover:text-white"
      >
        Products
      </button>
    </div>
  </nav>
</template>

<style scoped>
nav {
  backdrop-filter: blur(5px);
}
</style>

<style scoped></style>
