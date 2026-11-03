<template>
  <div>
    <HeroSection />
    <FilterBar />
    <!-- <CourseSection /> -->
    <ProduceGrid @add-to-cart="addToCard" />
    <CartContainer :items="items" @remove="removeItem" @clear="clearItems" />
    <PerkBox />
    <NewLatter />
  </div>
</template>
<script>
import HeroSection from '@/components/HeroSection.vue'
import FilterBar from '@/components/FilterBar.vue'
import ProduceGrid from '@/components/ProduceGrid.vue'
import CartContainer from '@/components/CartContainer.vue'
import PerkBox from '@/components/PerkBox.vue'
import NewLatter from '@/components/NewLatter.vue'
import { useCartStore } from '@/stores/Cart'
import { mapState, mapActions } from 'pinia'

export default {
  components: {
    HeroSection,
    FilterBar,
    ProduceGrid,
    CartContainer,
    PerkBox,
    NewLatter,
  },
  data() {
    return {
      // No local data needed for cart items, as we will use Pinia store
    }
  },
  methods: {
    ...mapActions(useCartStore, {
      addToCard: 'add',
      removeItem: 'remove',
      clearItems: 'clear',
    }),
  },
  computed: {
    ...mapState(useCartStore, ['items']),
  },
}
</script>
