<template>
  <div>
    <AnnounBar />
    <NavBar :items-count="itemsCount" />
    <main id="top">
      <RouterView />
    </main>
    <FooterSection />
  </div>
</template>
<script setup>
import AnnounBar from '@/components/AnnounBar.vue'
import NavBar from '@/components/NavBar.vue'
import FooterSection from './components/FooterSection.vue'
import { useCartStore } from '@/stores/Cart'
import { storeToRefs } from 'pinia'

const { count: itemsCount } = storeToRefs(useCartStore())
</script>
