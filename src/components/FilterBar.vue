<template>
  <section id="products" class="max-w-6xl mx-auto px-6 pt-14">
    <div class="flex items-center gap-3 mb-6">
      <div class="w-4 h-4 bg-brand border-2 border-black"></div>
      <h2 class="text-2xl font-black uppercase">Shop</h2>
    </div>

    <div class="bg-white border-4 border-black shadow-brutal p-4 flex flex-wrap items-center gap-4">
      <!-- Search Input connected to Pinia -->
      <input
        type="text"
        v-model="searchQuery"
        @input="onSearchInput"
        placeholder="Search products..."
        class="flex-1 min-w-48 border-2 border-black bg-paper px-3 py-2 font-bold focus:outline-none focus:bg-white"
      />

      <!-- CATEGORY BUTTONS -->
      <div class="flex flex-wrap gap-2">
        <button
          v-for="category in categories"
          :key="category"
          @click="setCategory(category)"
          :class="
            meta.category === category
              ? 'bg-black text-white'
              : 'bg-white text-black hover:bg-paper'
          "
          class="border-2 border-black px-3 py-2 text-sm font-extrabold uppercase cursor-pointer transition-colors"
        >
          {{ category }}
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useProductStore } from '@/stores/Stores'

export default {
  data() {
    return {
      searchQuery: '',
      categories: ['All', 'Stickers', 'Apparel', 'Desk'],
      debounceTimer: null,
    }
  },
  computed: {
    ...mapState(useProductStore, ['meta']),
  },
  methods: {
    ...mapActions(useProductStore, ['setCategory', 'setSearch']),

    onSearchInput() {
      // Optional: Add a short debounce to avoid firing an API call on every single keystroke instantly
      clearTimeout(this.debounceTimer)
      this.debounceTimer = setTimeout(() => {
        this.setSearch(this.searchQuery)
      }, 300)
    },
  },
}
</script>
