import { defineStore } from 'pinia'
import { getProduct } from '@/services/api.js'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
  }),
  getters: {
    count: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
    total: (state) =>
      state.items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0),
  },
  actions: {
    add(product) {
      const line = this.items.find((item) => item.id === product.id)
      if (line) {
        line.quantity++
      } else {
        this.items.push({ id: product.id, name: product.name, price: product.price, quantity: 1 })
      }
    },
    remove(id) {
      this.items = this.items.filter((item) => item.id !== id)
    },
    clear() {
      this.items = []
    },
    // Refresh name and price of each cart line from GET /products/:id.
    // A product that fails to load keeps its saved details.
    async syncProducts() {
      await Promise.all(
        this.items.map(async (item) => {
          try {
            const product = await getProduct(item.id)
            item.name = product.name
            item.price = product.price
          } catch {
            // product missing or server unreachable: keep the saved line
          }
        }),
      )
    },
  },
})
