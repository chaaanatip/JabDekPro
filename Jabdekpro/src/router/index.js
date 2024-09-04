import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/Home.vue'
import LoginView from '@/components/Login.vue'
import RegisterView from '@/components/Register.vue'
import ProductManager from '@/components/ProductManager.vue'

// const routes = []

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/products',
      name: 'ProductManager',
      component: ProductManager
    }
  ]
})

export default router
