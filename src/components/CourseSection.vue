<template>
  <section class="max-w-6xl mx-auto px-6 py-6">
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <CourseCard v-for="(item, index) in courses" :key="index" :course="item" />
    </div>

    <!-- EMPTY STATE (hidden now — show it when a search finds nothing) -->
    <p
      class="hidden mt-6 bg-white border-4 border-black shadow-brutal p-6 text-center font-extrabold uppercase"
    >
      No products match your search.
    </p>

    <div class="flex justify-center mt-6" gap-3>
      <button
        @click="backPage"
        :disabled="!backPage"
        class="border-2 border-black bg-brand text-white shadow-brutal-sm px-4 py-2 text-sm font-extrabold uppercase cursor-pointer hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
      >
        back
      </button>
      <button
        @click="nextPage"
        class="border-2 border-black bg-brand text-white shadow-brutal-sm px-4 py-2 text-sm font-extrabold uppercase cursor-pointer hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
      >
        next
      </button>
    </div>
  </section>
</template>
<script>
import CourseCard from '@/components/cource/CourseCard.vue'
export default {
  components: {
    CourseCard,
  },
  async created() {
    await this.fetchCourse()
  },
  data() {
    return {
      courses: [],
      error: '',
      loading: false,
      page: 1,
      items: 10,
    }
  },
  methods: {
    async fetchCourse() {
      const api = `https://api.github.com/users/tfd-ed/repos?per_page=${this.items}&page=${this.page}`

      this.loading = true
      try {
        const response = await fetch(api)
        this.courses = await response.json()
      } catch (err) {
        this.error = err.messages
      } finally {
        this.loading = false
      }
      this.$emit('update-count', this.courses.length)
    },

    async nextPage() {
      this.page++
      await this.fetchCourse()
    },

    async backPage() {
      if (this.page > 1) {
        this.page--
        await this.fetchCourse()
      }
    },
  },
}
</script>
