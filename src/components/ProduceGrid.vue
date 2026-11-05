<template>
  <section class="max-w-6xl mx-auto px-6 pt-14">
    <div class="flex items-center gap-3 mb-6">
      <div class="w-4 h-4 bg-brand border-2 border-black"></div>
      <h2 class="text-2xl font-black uppercase">Shop</h2>
    </div>

    <div class="bg-white border-4 border-black shadow-brutal p-4 flex flex-wrap items-center gap-4 mb-6">
      <label for="limit-select" class="font-extrabold uppercase text-sm">Items per page:</label>
      <select
        id="limit-select"
        v-model.number="currentOption"
        class="border-2 border-black bg-paper px-3 py-2 text-sm font-extrabold uppercase cursor-pointer focus:outline-none focus:bg-white"
      >
        <option v-for="currentoption in pageOptions" :key="currentoption" :value="currentoption">
          {{ currentoption }}
        </option>
      </select>
    </div>

    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <ProductCard
        @add="addToCart"
        v-for="product in products"
        :key="product.number"
        :product="product"
      />
    </div>

    <p class="mt-4 text-sm font-bold uppercase">
      Showing {{ products.length }} of {{ meta.total }} products
    </p>

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
<script setup>
import { ref, computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useProductStore } from '@/stores/Stores'
import ProductCard from '@/components/productcard/ProductCard.vue'

defineEmits(['add'])

const productStore = useProductStore()
const { products, meta, hasPreviousPage, hasNextPage } = storeToRefs(productStore)
const { goToPage, nextPage, previousPage, fetchUpdateOption } = productStore

const currentOption = ref(4)
const pageOptions = [4, 8, 16, 48]
const enabledClass = 'bg-white hover:bg-paper cursor-pointer'
const disabledClass = 'bg-paper text-black/40 cursor-not-allowed'

// 1 ... (current - 1) current (current + 1) ... last
const pageItems = computed(() => {
  const { page, totalPages } = meta.value
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
})

watch(currentOption, (pageOption) => {
  fetchUpdateOption(pageOption)
})

// Sync the store's limit with the selected option before the first fetch
fetchUpdateOption(currentOption.value)
</script>
