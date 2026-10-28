<template>
  <!-- ================= 6. CART ================= -->
  <section id="cart" class="max-w-3xl mx-auto px-6 py-14">
    <div class="flex items-center gap-3 mb-6">
      <div class="w-4 h-4 bg-brand border-2 border-black"></div>
      <h2 class="text-2xl font-black uppercase">Your cart ({{ itemcount }} item)</h2>
    </div>

    <div class="bg-white border-4 border-black shadow-brutal p-5">
      <!-- 1. Single unified v-for loop with the remove event attached -->
      <ul class="space-y-3" v-if="items.length > 0">
        <SemiCard v-for="item in items" :key="item.name" :item="item" @remove="removeItem" />
      </ul>

      <!-- 2. Dynamic empty cart message using v-if / v-else -->
      <p v-else class="border-2 border-black bg-paper p-4 text-center font-extrabold uppercase">
        Your cart is empty.
      </p>

      <div
        class="mt-5 pt-5 border-t-4 border-black flex flex-wrap items-center justify-between gap-4"
      >
        <p class="text-2xl font-black uppercase">Total: ${{ total }}</p>
        <div class="flex gap-3">
          <button
            @click="clearItems"
            class="border-2 border-black bg-white px-4 py-2 text-sm font-extrabold uppercase cursor-pointer"
          >
            Clear
          </button>
          <button
            class="border-2 border-black bg-brand text-white shadow-brutal-sm px-4 py-2 text-sm font-extrabold uppercase cursor-pointer hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import SemiCard from '@/components/Semicard/SemiCard.vue'
import { useCartStore } from '@/stores/Cart'
import { mapState, mapActions } from 'pinia'

export default {
  components: {
    SemiCard,
  },
  props: ['items'],
  emits: ['remove', 'clear'],
  methods: {
    ...mapActions(useCartStore, ['remove', 'clear']),
  },
  computed: {
    ...mapState(useCartStore, ['total', 'itemcount']),
  },
}
</script>
