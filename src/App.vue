<template>
  <div>
    <AnnounBar />
    <NavBar :itemsCount="totalItems" />
    <HeroSection />
    <FilterBar />
    <ProduceGrid @add-to-cart="addToCard" />
    <CartContainer :items="items" @removeitem="removeItem" @clearitem="clearItems" />
    <PerkBox />
    <NewLatter />
    <FooterSection />
  </div>
</template>
<script>
import AnnounBar from '@/components/AnnounBar.vue'
import NavBar from '@/components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import FilterBar from './components/FilterBar.vue'
import ProduceGrid from './components/ProduceGrid.vue'
import CartContainer from './components/CartContainer.vue'
import PerkBox from './components/PerkBox.vue'
import NewLatter from './components/NewLatter.vue'
import FooterSection from './components/FooterSection.vue'

export default {
  components: {
    NavBar,
    HeroSection,
    FilterBar,
    ProduceGrid,
    CartContainer,
    PerkBox,
    NewLatter,
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
