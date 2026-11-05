<template>
  <section class="max-w-3xl mx-auto px-6 pt-14 pb-20">
    <h1 class="text-4xl font-black uppercase mb-8">Cart</h1>
    <CartContainer />
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import CartContainer from '@/components/CartContainer.vue'
import { useCartStore } from '@/stores/Cart.js'

const cart = useCartStore()

// Show the latest name and price from the API, not the ones saved when the item was added
onMounted(() => {
  cart.syncProducts()
})
</script>
