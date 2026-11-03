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
<script>
import AnnounBar from '@/components/AnnounBar.vue'
import NavBar from '@/components/NavBar.vue'
import FooterSection from './components/FooterSection.vue'
import { useCartStore } from '@/stores/Cart'
import { mapState } from 'pinia'

export default {
  components: {
    NavBar,
    FooterSection,
    AnnounBar,
  },
  computed: {
    ...mapState(useCartStore,{itemsCount: 'count'}),
  },



}
</script>
