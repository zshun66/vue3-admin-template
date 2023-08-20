import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoutes } from './routes.js'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_APP_BASE_URL),
  routes: constantRoutes,
  scrollBehavior() {
    return {
      top: 0,
      left: 0,
    }
  }
})

export default router