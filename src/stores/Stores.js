import { defineStore } from 'pinia'

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [],
    meta: {
      page: 1,
      limit: 8,
      total: 0,
      totalPages: 1,
      category: 'All', // 🔥 Ensure category is defined in initial state
      search: '', // 🔥 Ensure search is defined in initial state
    },
    error: '',
    loading: false,
  }),
  getters: {
    hasPreviousPage: (state) => state.meta.page > 1,
    hasNextPage: (state) => state.meta.page < state.meta.totalPages,
  },
  actions: {
    async fetchProduct() {
      try {
        this.loading = true
        this.error = ''

        // 🔥 Fix: Read category from meta.category instead of products[0]
        const categoryParam =
          this.meta.category && this.meta.category !== 'All'
            ? `&category=${encodeURIComponent(this.meta.category)}`
            : ''
        const searchParam = this.meta.search
          ? `&search=${encodeURIComponent(this.meta.search)}`
          : ''

        let response = await fetch(
          `${import.meta.env.VITE_API_URL}/products?limit=${this.meta.limit}&page=${this.meta.page}${categoryParam}${searchParam}`,
        )
        response = await response.json()
        if (response.error) throw new Error(response.error)

        this.products = response.data

        // Preserve category & limit when assigning meta from response
        this.meta = {
          ...this.meta,
          ...response.meta,
        }
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },
    async setCategory(category) {
      this.meta.category = category
      this.meta.page = 1 // Reset to page 1 whenever category changes
      await this.fetchProduct()
    },
    async setSearch(query) {
      this.meta.search = query
      this.meta.page = 1 // Reset to page 1 on new search
      await this.fetchProduct()
    },
    async goToPage(page) {
      const target = Math.floor(Number(page))
      if (!Number.isFinite(target) || target < 1) return
      if (this.meta.totalPages && target > this.meta.totalPages) return
      if (target === this.meta.page) return
      this.meta.page = target
      await this.fetchProduct()
    },
    async nextPage() {
      await this.goToPage(this.meta.page + 1)
    },
    async previousPage() {
      await this.goToPage(this.meta.page - 1)
    },
    async fetchUpdateOption(option) {
      this.meta.limit = option
      this.meta.page = 1
      await this.fetchProduct()
    },
  },
})
