<template>
  <section class="max-w-md mx-auto px-6 pt-14 pb-20">
    <h1 class="text-4xl font-black uppercase mb-8">Log in</h1>

    <form
      class="bg-white border-4 border-black shadow-brutal p-6 grid gap-4"
      @submit.prevent="submit"
    >
      <label class="flex flex-col gap-1 text-sm font-extrabold uppercase">
        Email
        <input
          v-model="email"
          type="email"
          required
          class="border-2 border-black px-3 py-2 font-medium normal-case"
        />
      </label>
      <label class="flex flex-col gap-1 text-sm font-extrabold uppercase">
        Password
        <input v-model="password" type="password" required class="border-2 border-black px-3 py-2" />
      </label>

      <p
        v-if="error"
        role="alert"
        class="border-2 border-black bg-brand text-white px-3 py-2 font-bold"
      >
        {{ error }}
      </p>

      <button
        type="submit"
        :disabled="submitting"
        class="border-2 border-black bg-brand text-white shadow-brutal-sm px-4 py-2 text-sm font-extrabold uppercase cursor-pointer disabled:opacity-50"
      >
        {{ submitting ? 'Logging in...' : 'Log in' }}
      </button>
    </form>
  </section>
</template>

<script>
import { mapActions } from 'pinia'
import { useAuthStore } from '@/stores/auth.js'

export default {
  data() {
    return {
      email: '',
      password: '',
      submitting: false,
      error: '',
    }
  },
  methods: {
    ...mapActions(useAuthStore, ['login']),
    async submit() {
      this.error = ''
      this.submitting = true
      try {
        await this.login(this.email, this.password)
        this.$router.push(this.$route.query.redirect || '/')
      } catch (err) {
        this.error = err.message
      } finally {
        this.submitting = false
      }
    },
  },
}
</script>
