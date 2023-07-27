import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import DocumentationPage from '@/pages/DocumentationPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/doc',
    name: 'documentation',
    component: DocumentationPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
