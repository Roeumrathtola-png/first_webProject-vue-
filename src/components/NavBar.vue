<template>
  <header class="bg-white border-b-4 border-black">
    <nav class="max-w-6xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
      <RouterLink
        active-class=""
        exact-active-class=""
        to="/"
        class="text-2xl font-black uppercase tracking-tight"
      >
        Brutal<span class="bg-brand text-white px-2 ml-1 border-2 border-black">Merch</span>
      </RouterLink>
      <ul class="flex flex-wrap items-center gap-3 text-sm font-extrabold uppercase">
        <li>
          <!-- Removed hardcoded bg-black text-white -->
          <RouterLink to="/" class="px-3 py-2 border-2 border-transparent hover:border-black">
            Home
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/shop" class="px-3 py-2 border-2 border-transparent hover:border-black">
            Shop
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/about" class="px-3 py-2 border-2 border-transparent hover:border-black">
            About
          </RouterLink>
        </li>
        <li v-if="isAdmin">
          <RouterLink to="/admin" class="px-3 py-2 border-2 border-transparent hover:border-black">
            Admin
          </RouterLink>
        </li>
        <li v-if="isLoggedIn">
          <RouterLink to="/orders" class="px-3 py-2 border-2 border-transparent hover:border-black">
            Orders
          </RouterLink>
        </li>
        <li v-if="!isLoggedIn">
          <RouterLink to="/login" class="px-3 py-2 border-2 border-transparent hover:border-black">
            Login
          </RouterLink>
        </li>
        <li v-else class="flex items-center gap-2">
          <span class="px-3 py-2 border-2 border-black bg-white">{{
            user.name ?? user.email
          }}</span>
          <button
            type="button"
            class="px-3 py-2 border-2 border-transparent hover:border-black uppercase cursor-pointer"
            @click="logout"
          >
            Logout
          </button>
        </li>
        <li>
          <RouterLink
            to="/cart"
            class="px-3 py-2 border-2 border-black bg-brand text-white shadow-brutal-sm flex items-center gap-2"
          >
            Cart
            <span class="bg-white text-black px-2 border-2 border-black">{{ itemsCount }}</span>
          </RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useAuthStore } from '@/stores/auth.js'

export default {
  computed: {
    ...mapState(useAuthStore, ['user', 'isAdmin', 'isLoggedIn']),
  },
  methods: {
    ...mapActions(useAuthStore, ['logout']),
  },
  props: {
    itemsCount: {
      type: Number,
      default: 0,
    },
  },
}
</script>
