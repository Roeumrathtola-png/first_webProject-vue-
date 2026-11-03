<template>
  <section class="max-w-6xl mx-auto px-6 pt-14">
    <select
      v-model="currentOption"
      class="border-2 border-black bg-white px-3 py-2 mb-6 text-sm font-extrabold uppercase cursor-pointer"
    >
      <option v-for="(item, index) in pageOptions" :key="index" :value="item">{{ item }}</option>
    </select>
    <label for="limit-select" class="font-extrabold uppercase text-sm">Items per page:</label>
    <select
      id="limit-select"
      @change="changeLimit($event.target.value)"
      class="border-2 border-black bg-white px-3 py-1 font-bold cursor-pointer"
    >
      <option value="5">5</option>
      <option value="10" selected>10</option>
      <option value="20">20</option>
      <option value="50">50</option>
    </select>

    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <ProductCard
        @add="addToCart"
        v-for="product in products"
        :key="product.number"
        :product="product"
      />
    </div>
    <nav
      v-if="meta.totalPages > 1"
      aria-label="Pagination"
      class="flex flex-wrap items-center gap-2 mt-8"
    >
      <button
        @click="previousPage"
        :disabled="!hasPreviousPage"
        :class="hasPreviousPage ? enabledClass : disabledClass"
        class="border-2 border-black px-3 py-2 text-sm font-extrabold uppercase"
      >
        Previous
      </button>

      <template v-for="(item, index) in pageItems" :key="index">
        <span v-if="item === '...'" class="px-1 font-extrabold">...</span>
        <button
          v-else
          @click="goToPage(item)"
          :aria-current="item === meta.page ? 'page' : undefined"
          :class="
            item === meta.page ? 'bg-black text-white' : 'bg-white hover:bg-paper cursor-pointer'
          "
          class="border-2 border-black px-3 py-2 text-sm font-extrabold"
        >
          {{ item }}
        </button>
      </template>

      <button
        @click="nextPage"
        :disabled="!hasNextPage"
        :class="hasNextPage ? enabledClass : disabledClass"
        class="border-2 border-black px-3 py-2 text-sm font-extrabold uppercase"
      >
        Next
      </button>
    </nav>

    <!-- EMPTY STATE (hidden now — show it when a search finds nothing) -->
    <p
      class="hidden mt-6 bg-white border-4 border-black shadow-brutal p-6 text-center font-extrabold uppercase"
    >
      No products match your search.
    </p>
  </section>
</template>
<script>
import { mapActions, mapState } from 'pinia'
import { useProductStore } from '@/stores/Stores'
import ProductCard from '@/components/productcard/ProductCard.vue'

export default {
  components: {
    ProductCard,
  },
  data() {
    return {
      currentOption: 'All',
      pageOptions: ['All', 'Stickers', 'Apparel', 'Desk'],
      enabledClass: 'bg-white hover:bg-paper cursor-pointer',
      disabledClass: 'bg-paper text-black/40 cursor-not-allowed',
    }
  },
  async created() {
    await this.fetchProduct()
  },
  computed: {
    ...mapState(useProductStore, ['products', 'meta', 'hasPreviousPage', 'hasNextPage']),
    // 1 ... (current - 1) current (current + 1) ... last
    pageItems() {
      const { page, totalPages } = this.meta
      const pages = new Set([1, totalPages, page - 1, page, page + 1])
      const sorted = [...pages].filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b)
      const items = []
      sorted.forEach((p, i) => {
        if (i > 0) {
          const gap = p - sorted[i - 1]
          if (gap === 2) items.push(p - 1)
          else if (gap > 2) items.push('...')
        }
        items.push(p)
      })
      return items
    },
  },
  watch: {
    currentOption(newOption) {
      this.fetchProduct(newOption)
    },
  },
  emits: ['add'],

  methods: {
    ...mapActions(useProductStore, [
      'fetchProduct',
      'goToPage',
      'nextPage',
      'previousPage',
      'fetchUpdateOption',
    ]),
  },
  changeLimit(eventValue) {
    // Passes the selected number (e.g., 5, 10, 20) to your store action
    this.fetchUpdateOption(Number(eventValue))
  },
}
</script>
