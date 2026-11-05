<template>
  <section class="max-w-3xl mx-auto px-6 pt-14 pb-20">
    <h1 class="text-4xl font-black uppercase mb-8">My orders</h1>

    <p v-if="loading" class="font-bold uppercase">Loading...</p>

    <p
      v-else-if="error"
      role="alert"
      class="border-2 border-black bg-brand text-white px-3 py-2 font-bold"
    >
      {{ error }}
    </p>

    <p
      v-else-if="orders.length === 0"
      class="border-2 border-black bg-paper p-4 font-extrabold uppercase"
    >
      You have no orders yet.
    </p>

    <template v-else>
      <button
        v-if="isAdmin"
        type="button"
        class="mb-6 border-2 border-black bg-brand text-white px-4 py-2 font-extrabold uppercase"
        @click="clearOrders"
      >
        Clear saved orders
      </button>

      <ul class="space-y-4">
        <li
          v-for="order in orders"
          :key="order.id"
          class="bg-white border-4 border-black shadow-brutal p-5"
        >
          <div class="flex flex-wrap justify-between gap-2 mb-3">
            <h2 class="text-lg font-black uppercase">Order #{{ order.id }}</h2>
            <p class="font-black">${{ Number(order.total).toFixed(2) }}</p>
          </div>
          <ul class="text-sm font-medium space-y-1">
            <li v-for="line in order.items" :key="line.productId">
              {{ line.name }} × {{ line.quantity }} (${{ Number(line.price).toFixed(2) }} each)
            </li>
          </ul>
          <p class="text-xs font-medium mt-3">{{ new Date(order.createdAt).toLocaleString() }}</p>
        </li>
      </ul>
    </template>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { getMyOrders } from '@/services/api.js'
import { useAuthStore } from '@/stores/auth.js'
import { saveJSON, removeJSON } from '@/utils/storage.js'

const ORDERS_KEY = 'brutal-orders'

const { isAdmin } = storeToRefs(useAuthStore())

const orders = ref([])
const loading = ref(true)
const error = ref('')

async function loadOrders() {
  try {
    // The API wraps lists as { data, meta }; accept a bare array too
    const response = await getMyOrders()
    orders.value = response.data ?? response
    // Keep a local copy so the admin can clear it later
    saveJSON(ORDERS_KEY, orders.value)
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

// Admin only: remove the saved orders from localStorage and clear the list on screen
function clearOrders() {
  if (!isAdmin.value) return
  removeJSON(ORDERS_KEY)
  orders.value = []
}

loadOrders()
</script>
