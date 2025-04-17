<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-white p-8">
    <div class="max-w-5xl mx-auto">
      <div class="bg-white shadow-2xl rounded-2xl p-8">
        <h1 class="text-3xl font-extrabold text-gray-800 mb-8">📦 Product Inventory</h1>

        <!-- Product Form -->
        <form @submit.prevent="submitProduct" class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-1">Product Name</label>
            <input v-model="name" type="text" class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-1">Price ($)</label>
            <input v-model.number="price" type="number" class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-1">Stock Qty</label>
            <input v-model.number="stock" type="number" class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" required />
          </div>
          <div class="md:col-span-3 text-right">
            <button type="submit" class="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-2 rounded-xl shadow-lg hover:scale-105 transform transition">
              ➕ Add Product
            </button>
          </div>
        </form>

        <!-- Feedback -->
        <div v-if="message" class="mb-4 bg-green-100 text-green-700 px-4 py-2 rounded-lg shadow-sm">
          {{ message }}
        </div>
        <div v-if="error" class="mb-4 bg-red-100 text-red-600 px-4 py-2 rounded-lg shadow-sm">
          {{ error }}
        </div>

        <!-- Product Grid -->
        <div v-if="products.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="p in products"
            :key="p.productId"
            class="bg-white border border-gray-200 rounded-2xl p-6 shadow hover:shadow-xl transition-all"
          >
            <h3 class="text-lg font-semibold text-gray-800">{{ p.productName }}</h3>
            <p class="text-gray-600 mt-1">Price: <span class="text-blue-700 font-semibold">${{ p.price }}</span></p>
            <div class="mt-3 space-y-1">
              <p class="text-green-700 text-sm">🛒 Purchased: <strong>{{ p.totalPurchased }}</strong></p>
              <p class="text-red-600 text-sm">📤 Sold: <strong>{{ p.totalSold }}</strong></p>
              <p class="text-gray-800 text-sm font-bold">📦 In Stock: {{ p.currentStock }}</p>
            </div>
          </div>
        </div>

        <div v-else class="text-center text-gray-500 mt-6">No products found. Add one to begin!</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const name = ref('')
const price = ref(0)
const stock = ref(0)

const message = ref('')
const error = ref('')
const products = ref([])

const baseApi = 'https://mobileapi-fbpw.onrender.com/api/Inventory'

const submitProduct = async () => {
  message.value = ''
  error.value = ''

  const url = new URL(`${baseApi}/add-product`)
  url.searchParams.append('name', name.value)
  url.searchParams.append('price', price.value)
  url.searchParams.append('stock', stock.value)

  try {
    const response = await fetch(url, { method: 'POST' })
    if (!response.ok) throw new Error('Server returned ' + response.status)

    message.value = '✅ Product added successfully!'
    name.value = ''
    price.value = 0
    stock.value = 0

    await fetchProducts()
  } catch (err) {
    error.value = '❌ Failed to add product: ' + err.message
  }
}

const fetchProducts = async () => {
  try {
    const res = await fetch(`${baseApi}/vw-stock`)
    if (!res.ok) throw new Error('Error loading stock view.')
    products.value = await res.json()
  } catch (err) {
    error.value = err.message
  }
}

onMounted(() => {
  fetchProducts()
})
</script>

<style scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
