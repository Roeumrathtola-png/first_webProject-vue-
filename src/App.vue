<template>
  <div>
    <AnnounBar />
    <NavBar />
    <main id="top">
      <RouterView />
    </main>
    <FooterSection />
  </div>
</template>
<script>
import AnnounBar from '@/components/AnnounBar.vue'
import NavBar from '@/components/NavBar.vue'
import FooterSection from './components/FooterSection.vue'

export default {
  components: {
    NavBar,
    FooterSection,
    AnnounBar,
  },

  data() {
    return {
      message: 'Hello, Vite!',
      items: [
        { name: 'Semicolon Sticker Pack', unitPrice: 4.0, quantity: 2 },
        { name: 'Git Push Mug', unitPrice: 12.0, quantity: 1 },
        { name: 'Dark Mode Tee', unitPrice: 22.0, quantity: 1 },
      ],
    }
  },
  computed: {
    totalItems() {
      return this.items.reduce((sum, item) => sum + item.quantity, 0)
    },
  },

  methods: {
    increaseItemsCount() {
      this.itemsCount++
    },
    addToCard(product) {
      const existingItem = this.items.find((item) => item.name === product.name)
      if (existingItem) {
        existingItem.quantity++
      } else {
        this.items.push({ name: product.name, unitPrice: product.price, quantity: 1 })
      }
    },
    removeItem(item) {
      const index = this.items.indexOf(item)
      this.items.splice(index, 1)
    },
    clearItems() {
      this.items = []
    },
  },
}
</script>
