<template>
  <section class="max-w-6xl mx-auto px-6 pt-14 pb-20">
    <h1 class="text-4xl font-black uppercase mb-8">Admin: products</h1>

    <BrutalCard class="mb-10">
      <form class="grid gap-4 sm:grid-cols-2" @submit.prevent="save">
        <label class="flex flex-col gap-1 text-sm font-extrabold uppercase">
          Name
          <input
            v-model="form.name"
            class="border-2 border-black px-3 py-2 font-medium normal-case"
          />
        </label>
        <label class="flex flex-col gap-1 text-sm font-extrabold uppercase">
          Category
          <select
            v-model="form.category"
            required
            class="border-2 border-black bg-white px-3 py-2 font-medium normal-case"
          >
            <option value="" disabled>Choose a category</option>
            <option v-for="category in categoryOptions" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
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
        <label class="sm:col-span-2 flex flex-col gap-1 text-sm font-extrabold uppercase">
          Description (optional)
          <textarea
            v-model="form.description"
            rows="3"
            class="border-2 border-black px-3 py-2 font-medium normal-case"
          />
        </label>
        <label class="flex items-center gap-2 text-sm font-extrabold uppercase">
          <input v-model="form.soldOut" type="checkbox" class="size-4 accent-black" />
          Sold out
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
    </BrutalCard>

    <div class="flex flex-wrap items-center gap-2 mb-6">
      <label for="admin-limit" class="font-extrabold uppercase text-sm mr-2">Items per page:</label>
      <select
        id="admin-limit"
        v-model.number="limit"
        class="border-2 border-black bg-white px-3 py-2 text-sm font-extrabold uppercase cursor-pointer"
      >
        <option v-for="option in limitOptions" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </div>

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

    <nav
      v-if="totalPages > 1"
      aria-label="Admin pagination"
      class="flex flex-wrap items-center gap-2 mt-8"
    >
      <button
        type="button"
        :disabled="page <= 1"
        @click="goToPage(page - 1)"
        class="border-2 border-black px-3 py-2 text-sm font-extrabold uppercase disabled:bg-paper disabled:text-black/40 disabled:cursor-not-allowed"
        :class="page > 1 ? 'bg-white hover:bg-paper cursor-pointer' : ''"
      >
        Previous
      </button>
      <span class="px-2 text-sm font-extrabold uppercase">Page {{ page }} of {{ totalPages }}</span>
      <button
        type="button"
        :disabled="page >= totalPages"
        @click="goToPage(page + 1)"
        class="border-2 border-black px-3 py-2 text-sm font-extrabold uppercase disabled:bg-paper disabled:text-black/40 disabled:cursor-not-allowed"
        :class="page < totalPages ? 'bg-white hover:bg-paper cursor-pointer' : ''"
      >
        Next
      </button>
    </nav>
  </section>
</template>

<script setup>
import { ref, watch } from 'vue'
import BrutalCard from '@/components/BrutalCard.vue'
import { createProduct, deleteProduct, getProducts, updateProduct } from '@/services/api.js'

// The categories the API accepts (anything else gets a 400 from the server)
const categoryOptions = ['Stickers', 'Apparel', 'Desk']
const emptyForm = () => ({
  name: '',
  category: '',
  price: null,
  oldPrice: null,
  description: '',
  soldOut: false,
})

const products = ref([])
const form = ref(emptyForm())
const editingId = ref(null)
const loading = ref(false)
const saving = ref(false)
const error = ref('')
const page = ref(1)
const limit = ref(8)
const limitOptions = [4, 8, 16, 48]
const totalPages = ref(1)

// A new page size starts again from page 1
watch(limit, () => {
  page.value = 1
  loadProducts()
})

async function loadProducts() {
  loading.value = true
  try {
    const response = await getProducts({ page: page.value, limit: limit.value })
    products.value = response.data ?? response
    totalPages.value = response.meta?.totalPages ?? 1
    // The last product on this page was deleted: step back to the previous page
    if (products.value.length === 0 && page.value > 1) {
      page.value--
      await loadProducts()
    }
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

async function goToPage(target) {
  if (target < 1 || target > totalPages.value) return
  page.value = target
  await loadProducts()
}

function startEdit(product) {
  editingId.value = product.id
  form.value = {
    name: product.name,
    category: product.category,
    price: product.price,
    oldPrice: product.oldPrice ?? null,
    description: product.description ?? '',
    soldOut: Boolean(product.soldOut),
  }
  error.value = ''
}

function resetForm() {
  editingId.value = null
  form.value = emptyForm()
  error.value = ''
}

async function save() {
  error.value = ''
  saving.value = true
  // An empty old price means "no sale", so send null rather than 0 or ''
  // An empty description is left out, so the server stores no description
  const payload = {
    name: form.value.name.trim(),
    category: form.value.category,
    price: form.value.price,
    oldPrice:
      form.value.oldPrice === '' || form.value.oldPrice == null ? null : form.value.oldPrice,
    soldOut: form.value.soldOut,
    ...(form.value.description.trim() ? { description: form.value.description.trim() } : {}),
  }
  try {
    if (editingId.value) {
      await updateProduct(editingId.value, payload)
    } else {
      await createProduct(payload)
    }
    resetForm()
    await loadProducts()
  } catch (err) {
    // The server's message (for example "name is required") is shown here
    error.value = err.message
  } finally {
    saving.value = false
  }
}

async function remove(product) {
  if (!window.confirm(`Delete "${product.name}"?`)) return
  error.value = ''
  try {
    await deleteProduct(product.id)
    if (editingId.value === product.id) resetForm()
    await loadProducts()
  } catch (err) {
    error.value = err.message
  }
}

loadProducts()
</script>
