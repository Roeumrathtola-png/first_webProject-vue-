<template>
  <section class="max-w-3xl mx-auto px-6 pt-14 pb-20">
    <h1 class="text-4xl font-black uppercase mb-2">Checkout</h1>
    <p class="font-bold uppercase text-sm mb-8">Ordering as {{ user?.name ?? user?.email }}</p>

    <div class="bg-white border-4 border-black shadow-brutal p-6 grid gap-4">
      <ul v-if="items.length > 0" class="space-y-3">
        <li
          v-for="item in items"
          :key="item.id"
          class="flex items-center justify-between gap-3 border-2 border-black bg-paper p-3"
        >
          <span class="text-sm font-extrabold uppercase"
            >{{ item.name }} × {{ item.quantity }}</span
          >
          <span class="font-black">${{ (Number(item.price) * item.quantity).toFixed(2) }}</span>
        </li>
      </ul>
      <p v-else class="border-2 border-black bg-paper p-4 text-center font-extrabold uppercase">
        Your cart is empty.
      </p>

      <p class="text-2xl font-black uppercase">Total: ${{ total.toFixed(2) }}</p>

      <p
        v-if="orderError"
        role="alert"
        class="border-2 border-black bg-brand text-white px-3 py-2 font-bold"
      >
        {{ orderError }}
      </p>

      <button
        type="button"
        :disabled="placing || items.length === 0"
        class="border-2 border-black bg-brand text-white shadow-brutal-sm px-4 py-2 text-sm font-extrabold uppercase cursor-pointer disabled:opacity-50"
        @click="placeOrder"
      >
        {{ placing ? 'Placing order...' : 'Place order' }}
      </button>
    </div>

    <div v-if="lastOrder" class="mt-8 bg-white border-4 border-black shadow-brutal p-6">
      <h2 class="text-2xl font-black uppercase mb-2">Order #{{ lastOrder.id }} placed</h2>
      <p class="font-bold">Total: ${{ Number(lastOrder.total).toFixed(2) }}</p>
      <RouterLink to="/orders" class="inline-block mt-4 underline font-extrabold uppercase">
        View my orders
      </RouterLink>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useAuthStore } from '@/stores/auth.js'
import { useCartStore } from '@/stores/Cart.js'
import { createOrder } from '@/services/api.js'

export default {
  data() {
    return {
      placing: false,
      orderError: '',
      lastOrder: null,
    }
  },
  computed: {
    ...mapState(useAuthStore, ['user']),
    ...mapState(useCartStore, ['items', 'total']),
  },
  methods: {
    ...mapActions(useCartStore, ['clear']),
    async placeOrder() {
      this.orderError = ''
      this.placing = true
      try {
        // The server works out prices and totals, so we only send what the user picked
        const items = this.items.map((item) => ({ productId: item.id, quantity: item.quantity }))
        this.lastOrder = await createOrder(items)
        this.clear()
      } catch (err) {
        this.orderError = err.message
      } finally {
        this.placing = false
      }
    },
  },
}
</script>
