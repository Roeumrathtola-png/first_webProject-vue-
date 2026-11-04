<template>
  <section class="max-w-6xl mx-auto px-6 pt-14 pb-20">
    <h1 class="text-4xl font-black uppercase mb-8">Admin: products</h1>

    <form
      class="bg-white border-4 border-black shadow-brutal p-6 grid gap-4 sm:grid-cols-2 mb-10"
      @submit.prevent="save"
    >
      <label class="flex flex-col gap-1 text-sm font-extrabold uppercase">
        Name
        <input v-model="form.name" class="border-2 border-black px-3 py-2 font-medium normal-case" />
      </label>
      <label class="flex flex-col gap-1 text-sm font-extrabold uppercase">
        Category
        <input
          v-model="form.category"
          class="border-2 border-black px-3 py-2 font-medium normal-case"
        />
      </label>
      <label class="flex flex-col gap-1 text-sm font-extrabold uppercase">
        Price
        <input
          v-model.number="form.price"
          type="number"
          min="0"
          step="0.01"
          class="border-2 border-black px-3 py-2 font-medium"
        />
      </label>
      <label class="flex flex-col gap-1 text-sm font-extrabold uppercase">
        Old price (optional)
        <input
          v-model.number="form.oldPrice"
          type="number"
          min="0"
          step="0.01"
          class="border-2 border-black px-3 py-2 font-medium"
        />
      </label>

      <p
        v-if="error"
        role="alert"
        class="sm:col-span-2 border-2 border-black bg-brand text-white px-3 py-2 font-bold"
      >
        {{ error }}
      </p>

      <div class="sm:col-span-2 flex flex-wrap gap-3">
        <button
          type="submit"
          :disabled="saving"
          class="border-2 border-black bg-brand text-white shadow-brutal-sm px-4 py-2 text-sm font-extrabold uppercase cursor-pointer disabled:opacity-50"
        >
          {{ editingId ? 'Save changes' : 'Create product' }}
        </button>
        <button
          v-if="editingId"
          type="button"
          @click="resetForm"
          class="border-2 border-black bg-white px-4 py-2 text-sm font-extrabold uppercase cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </form>

    <p v-if="loading" class="font-extrabold uppercase">Loading...</p>
    <ul v-else class="grid gap-4">
      <li
        v-for="product in products"
        :key="product.id"
        class="bg-white border-4 border-black p-4 flex flex-wrap items-center justify-between gap-4"
      >
        <div>
          <h2 class="text-lg font-black uppercase">{{ product.name }}</h2>
          <p class="text-sm font-medium">
            {{ product.category }} · ${{ product.price }}
            <span v-if="product.oldPrice" class="line-through text-black/50">
              ${{ product.oldPrice }}
            </span>
          </p>
        </div>
        <div class="flex gap-2">
          <button
            @click="startEdit(product)"
            class="border-2 border-black bg-white px-3 py-2 text-xs font-extrabold uppercase cursor-pointer"
          >
            Edit
          </button>
          <button
            @click="remove(product)"
            class="border-2 border-black bg-white px-3 py-2 text-xs font-extrabold uppercase cursor-pointer hover:bg-brand hover:text-white"
          >
            Delete
          </button>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import { createProduct, deleteProduct, getProducts, updateProduct } from '@/services/api.js'

const emptyForm = () => ({ name: '', category: '', price: null, oldPrice: null })

export default {
  data() {
    return {
      products: [],
      form: emptyForm(),
      editingId: null,
      loading: false,
      saving: false,
      error: '',
    }
  },
  async created() {
    await this.loadProducts()
  },
  methods: {
    async loadProducts() {
      this.loading = true
      try {
        const response = await getProducts()
        this.products = response.data ?? response
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },
    startEdit(product) {
      this.editingId = product.id
      this.form = {
        name: product.name,
        category: product.category,
        price: product.price,
        oldPrice: product.oldPrice ?? null,
      }
      this.error = ''
    },
    resetForm() {
      this.editingId = null
      this.form = emptyForm()
      this.error = ''
    },
    async save() {
      this.error = ''
      this.saving = true
      // An empty old price means "no sale", so send null rather than 0 or ''
      const payload = {
        ...this.form,
        oldPrice: this.form.oldPrice === '' || this.form.oldPrice == null ? null : this.form.oldPrice,
      }
      try {
        if (this.editingId) {
          await updateProduct(this.editingId, payload)
        } else {
          await createProduct(payload)
        }
        this.resetForm()
        await this.loadProducts()
      } catch (err) {
        // The server's message (for example "name is required") is shown here
        this.error = err.message
      } finally {
        this.saving = false
      }
    },
    async remove(product) {
      if (!window.confirm(`Delete "${product.name}"?`)) return
      this.error = ''
      try {
        await deleteProduct(product.id)
        if (this.editingId === product.id) this.resetForm()
        await this.loadProducts()
      } catch (err) {
        this.error = err.message
      }
    },
  },
}
</script>
