<template>
  <!-- ================= 4. FILTER BAR ================= -->
  <section id="products" class="max-w-6xl mx-auto px-6 pt-14">
    <div class="flex items-center gap-3 mb-6">
      <div class="w-4 h-4 bg-brand border-2 border-black"></div>
      <h2 class="text-2xl font-black uppercase">Shop</h2>
    </div>

    <div class="bg-white border-4 border-black shadow-brutal p-4 flex flex-wrap items-center gap-4">
      <input
        type="text"
        placeholder="Search products..."
        class="flex-1 min-w-48 border-2 border-black bg-paper px-3 py-2 font-bold focus:outline-none focus:bg-white"
      />

      <!-- 4b. CATEGORY BUTTONS (4 copies, one is "active") -->
      <div class="flex flex-wrap gap-2">
        <button
          class="border-2 border-black bg-black text-white px-3 py-2 text-sm font-extrabold uppercase cursor-pointer"
        >
          All
        </button>
        <button
          class="border-2 border-black bg-white px-3 py-2 text-sm font-extrabold uppercase cursor-pointer hover:bg-paper"
        >
          Stickers
        </button>
        <button
          class="border-2 border-black bg-white px-3 py-2 text-sm font-extrabold uppercase cursor-pointer hover:bg-paper"
        >
          Apparel
        </button>
        <button
          class="border-2 border-black bg-white px-3 py-2 text-sm font-extrabold uppercase cursor-pointer hover:bg-paper"
        >
          Desk
        </button>
      </div>
    </div>

    <p class="mt-4 text-sm font-bold uppercase">Showing {{ itemcount }} of {{ total }} products</p>
    <CourseSection @update-count="updateCount" />
  </section>
</template>
<script>
import CourseSection from '@/components/CourseSection.vue'
export default {
  components: {
    CourseSection,
  },
  data() {
    return {
      itemcount: 0,
      total: 0,
    }
  },

  methods: {
    updateCount(count) {
      this.itemcount = count
      this.total = count // Update the total as well if needed
    },
  },
}
</script>
