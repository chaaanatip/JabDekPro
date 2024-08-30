import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/Home.vue'
const routes = [{ path: '/', component: HomeView }]
// const routes = []

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
