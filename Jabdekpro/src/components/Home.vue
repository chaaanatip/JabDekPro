<script>
import IconSearch from '@/components/icons/IconSearch.vue'
</script>

<template>
  <div
    class="relative h-96 bg-[url('@/assets/logo/homemain.jpg')] bg-cover bg-top text-black"
  >
    <div class="absolute inset-0 bg-black opacity-30"></div>
    <div
      class="absolute inset-0 bg-gradient-radial from-transparent to-black opacity-70"
    ></div>
    <h1
      class="relative flex justify-center pt-20 font-bold text-3xl text-gray-300"
    >
      JabDekPro on top!
    </h1>
    <div class="absolute inset-0 flex items-center justify-center p-4">
      <label class="relative block w-full max-w-md">
        <span class="sr-only">Search</span>
        <span class="absolute inset-y-0 left-0 flex items-center pl-3">
          <IconSearch class="h-5 w-5 text-slate-300" />
        </span>
        <input
          class="placeholder:italic placeholder:text-slate-400 block bg-[#0e152e] w-full border border-gray-800 rounded-md py-2 pl-10 pr-3 shadow-sm focus:outline-none focus:border-white focus:ring-blue-800 focus:ring-2 sm:text-sm"
          placeholder="Search for anything..."
          type="text"
          name="search"
        />
      </label>
    </div>
  </div>
</template>

<style scoped>
/* Add custom styles here if needed */
</style>
