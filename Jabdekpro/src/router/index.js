import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import FeedbackView from "../views/FeedbackView.vue"
import TermsView from "../views/TermsView.vue"

const routes = [
  { path: "/", component: HomeView },
  { path: "/feedback", component: FeedbackView },
  { path: "/terms", component: TermsView },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
