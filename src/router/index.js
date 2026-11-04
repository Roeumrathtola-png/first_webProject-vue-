import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/views/HomePage.vue'
import ShopPage from '@/views/ShopPage.vue'
import AboutPage from '@/views/AboutPage.vue'
import UnfoundPage from '@/views/UnfoundPage.vue'
import LoginView from '@/views/LoginView.vue'
import AdminView from '@/views/AdminView.vue'
import { useAuthStore } from '@/stores/auth.js'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomePage },
    { path: '/about', component: AboutPage },
    { path: '/shop', component: ShopPage },
    { path: '/login', name: 'login', component: LoginView },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    { path: '/:pathMatch(.*)*', component: UnfoundPage },
  ],
  linkActiveClass: 'border-black bg-black text-white',
  linkExactActiveClass: 'border-black bg-black text-white',
})

// Runs on every navigation. The server still checks each request; this only controls what the page shows.
router.beforeEach((to) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
  if (to.meta.requiresAdmin && !auth.isAdmin) {
    return { path: '/' }
  }
})

export default router
