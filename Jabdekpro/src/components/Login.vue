<!-- src/components/Login.vue -->

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

// สร้างตัวแปรสำหรับฟอร์ม
const email = ref('')
const password = ref('')
const message = ref('')
const router = useRouter()

// ฟังก์ชันสำหรับการเข้าสู่ระบบ
const handleLogin = async () => {
  try {
    const response = await axios.post('http://localhost:3000/api/users/login', {
      email: email.value,
      password: password.value
    })
    message.value = response.data.message

    // บันทึก token ลงใน localStorage
    localStorage.setItem('token', response.data.token)

    // เปลี่ยนเส้นทางไปยังหน้าอื่นหลังจากเข้าสู่ระบบสำเร็จ
    router.push('/dashboard') // เปลี่ยนเส้นทางไปยังหน้าที่ต้องการ
  } catch (error) {
    message.value = 'Login failed'
  }
}
</script>

<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            Sign in to your account
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="handleLogin">
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Your email</label
              >
              <input
                v-model="email"
                type="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required
              />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Password</label
              >
              <input
                v-model="password"
                type="password"
                id="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  />
                </div>
                <div class="ml-3 text-sm">
                  <label for="remember" class="text-gray-500 dark:text-gray-300"
                    >Remember me</label
                  >
                </div>
              </div>
              <a
                href="#"
                class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >Forgot password?</a
              >
            </div>
            <button
              type="submit"
              class="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Sign in
            </button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet?
              <a
                href="/register"
                class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >Sign up</a
              >
            </p>
            <p v-if="message" class="text-red-500">{{ message }}</p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* เพิ่มสไตล์ที่จำเป็นที่นี่ */
</style>
