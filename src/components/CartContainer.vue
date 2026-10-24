<template>
  <!-- ================= 6. CART ================= -->
  <section id="cart" class="max-w-3xl mx-auto px-6 py-14">
    <div class="flex items-center gap-3 mb-6">
      <div class="w-4 h-4 bg-brand border-2 border-black"></div>
      <h2 class="text-2xl font-black uppercase">Your cart({{ itemcount }}item)</h2>
    </div>

    <div class="bg-white border-4 border-black shadow-brutal p-5">
      <ul class="space-y-3">
        <SemiCard v-for="item in items" :key="item.name" :item="item" />
        <SemiCard @remove="removeItem" v-for="item in items" :key="item.name" :item="item" />
      </ul>

      <!-- 6b. EMPTY CART (hidden now — show it when the cart has no rows) -->
      <p class="hidden border-2 border-black bg-paper p-4 text-center font-extrabold uppercase">
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
export default {
  components: {
    SemiCard,
  },
  props: ['items'],
  emits: ['removeitem', 'clearitem'],
  methods: {
    removeItem(item) {
      this.$emit('removeitem', item)
    },
    clearItems() {
      this.$emit('clearitem')
    },
  },
  computed: {
    total() {
      return this.items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0).toFixed(2)
    },
    itemcount() {
      return this.items.reduce((sum, item) => sum + item.quantity, 0)
    },
  },
}
</script>
