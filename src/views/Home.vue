<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-100 to-white p-6">
    <div class="max-w-4xl mx-auto">
      <div class="bg-white shadow-xl rounded-xl p-6">
        <h1 class="text-3xl font-bold text-gray-800 mb-6">🧾 Inventory Management</h1>

        <!-- Add Product Form -->
        <form @submit.prevent="submitProduct" class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">Product Name</label>
            <input v-model="name" type="text" class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring focus:ring-blue-200" required />
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">Price</label>
            <input v-model.number="price" type="number" class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring focus:ring-blue-200" required />
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">Stock</label>
            <input v-model.number="stock" type="number" class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring focus:ring-blue-200" required />
          </div>
          <div class="md:col-span-3 flex justify-end">
            <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded-xl shadow hover:bg-blue-700 transition-all duration-200">
              ➕ Add Product
            </button>
          </div>
        </form>

        <!-- Feedback Messages -->
        <div v-if="message" class="mb-4 text-green-600 font-medium bg-green-100 rounded px-4 py-2 shadow-sm">
          {{ message }}
        </div>
        <div v-if="error" class="mb-4 text-red-600 font-medium bg-red-100 rounded px-4 py-2 shadow-sm">
          {{ error }}
        </div>

        <!-- Product Table -->
        <div v-if="products.length > 0" class="overflow-x-auto">
          <table class="w-full table-auto border-collapse rounded-lg overflow-hidden text-sm shadow-sm">
            <thead class="bg-blue-100 text-blue-900 uppercase text-xs">
              <tr>
                <th class="px-4 py-3 text-left">ID</th>
                <th class="px-4 py-3 text-left">Name</th>
                <th class="px-4 py-3 text-left">Purchased</th>
                <th class="px-4 py-3 text-left">Sold</th>
                <th class="px-4 py-3 text-left">Stock</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="p in products" :key="p.productId" class="hover:bg-gray-50">
                <td class="px-4 py-3 font-mono text-gray-600">{{ p.productId }}</td>
                <td class="px-4 py-3">{{ p.productName }}</td>
                <td class="px-4 py-3 text-blue-700 font-semibold">{{ p.totalPurchased }}</td>
                <td class="px-4 py-3 text-red-600 font-semibold">{{ p.totalSold }}</td>
                <td class="px-4 py-3 font-bold text-green-700">{{ p.currentStock }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-else class="text-gray-500 mt-4">No products yet. Add one above!</div>
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
input:focus {
  border-color: #60a5fa;
}
</style>
