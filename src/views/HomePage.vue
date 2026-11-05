<template>
  <div>
    <HeroSection />
    <FilterBar />
    <!-- <CourseSection /> -->
    <ProduceGrid @add-to-cart="addToCard" />
    <CartContainer />
    <PerkBox />
    <NewLatter />
  </div>
</template>
<script setup>
import HeroSection from '@/components/HeroSection.vue'
import FilterBar from '@/components/FilterBar.vue'
import ProduceGrid from '@/components/ProduceGrid.vue'
import CartContainer from '@/components/CartContainer.vue'
import PerkBox from '@/components/PerkBox.vue'
import NewLatter from '@/components/NewLatter.vue'
import { useCartStore } from '@/stores/Cart'

const { add: addToCard } = useCartStore()
</script>
