import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/views/HomePage.vue'
import ShopPage from '@/views/ShopPage.vue'
import AboutPage from '@/views/AboutPage.vue'
import UnfoundPage from '@/views/UnfoundPage.vue'
import LoginView from '@/views/LoginView.vue'
import AdminView from '@/views/AdminView.vue'
import CheckoutView from '@/views/CheckoutView.vue'
import OrdersView from '@/views/OrdersView.vue'
import { useAuthStore } from '@/stores/auth.js'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // Public pages: anyone can open these
    { path: '/', component: HomePage, meta: { public: true } },
    { path: '/about', component: AboutPage, meta: { public: true } },
    { path: '/shop', component: ShopPage, meta: { public: true } },
    { path: '/login', name: 'login', component: LoginView, meta: { public: true } },
    // Every other route needs a login by default (see beforeEach)
    { path: '/checkout', name: 'checkout', component: CheckoutView },
    { path: '/orders', name: 'orders', component: OrdersView },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    { path: '/:pathMatch(.*)*', component: UnfoundPage, meta: { public: true } },
  ],
  linkActiveClass: 'border-black bg-black text-white',
  linkExactActiveClass: 'border-black bg-black text-white',
})

// Runs on every navigation. Default-deny: a route is only open to guests if it is marked meta.public.
// The server still checks each request; this only controls what the page shows.
router.beforeEach((to) => {
  const auth = useAuthStore()
  if ((to.meta.requiresAuth || !to.meta.public) && !auth.isLoggedIn) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
  if (to.meta.requiresAdmin && !auth.isAdmin) {
    return { path: '/' }
  }
})

export default router
