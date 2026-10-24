<template>
  <div>
    <AnnounBar />
    <NavBar :itemsCount="itemsCount" />
    <HeroSection />
    <FilterBar />
    <ProduceGrid @add-to-cart="increaseItemsCount" />
    <CartContainer />
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
import { loadJSON } from './utils/Storage.js'
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
      itemsCount: 0,
    }
  },
  created() {
    this.cart = loadJSON('brutal-cart', [])
  },
  methods: {
    increaseItemsCount() {
      this.itemsCount++
    },
  },
}
</script>
