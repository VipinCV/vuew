<template>
  <div class="p-6 max-w-3xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">Inventory Management</h1>

    <!-- Add Product Form -->
    <form @submit.prevent="submitProduct" class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div>
        <label class="block mb-1 font-medium">Product Name</label>
        <input v-model="name" type="text" class="w-full border rounded px-3 py-2" required />
      </div>
      <div>
        <label class="block mb-1 font-medium">Price</label>
        <input v-model.number="price" type="number" class="w-full border rounded px-3 py-2" required />
      </div>
      <div>
        <label class="block mb-1 font-medium">Stock</label>
        <input v-model.number="stock" type="number" class="w-full border rounded px-3 py-2" required />
      </div>
      <div class="md:col-span-3">
        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Product
        </button>
      </div>
    </form>

    <!-- Feedback -->
    <div v-if="message" class="text-green-700 font-medium mb-4">{{ message }}</div>
    <div v-if="error" class="text-red-600 mb-4">{{ error }}</div>

    <!-- Product Table -->
    <div v-if="products.length > 0" class="overflow-x-auto">
      <table class="min-w-full border border-gray-300 text-sm text-left">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-4 py-2 border">ID</th>
            <th class="px-4 py-2 border">Name</th>
            <th class="px-4 py-2 border">Purchased</th>
            <th class="px-4 py-2 border">Sold</th>
            <th class="px-4 py-2 border">Stock</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in products" :key="p.productId">
            <td class="px-4 py-2 border">{{ p.productId }}</td>
            <td class="px-4 py-2 border">{{ p.productName }}</td>
            <td class="px-4 py-2 border">{{ p.totalPurchased }}</td>
            <td class="px-4 py-2 border">{{ p.totalSold }}</td>
            <td class="px-4 py-2 border">{{ p.currentStock }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="text-gray-500">No products yet.</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// form values
const name = ref('')
const price = ref(0)
const stock = ref(0)

// feedback
const message = ref('')
const error = ref('')

// product list
const products = ref([])

const baseApi = 'https://mobileapi-fbpw.onrender.com/api/Inventory'

// Add product
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

    message.value = 'Product added successfully.'
    name.value = ''
    price.value = 0
    stock.value = 0

    await fetchProducts()
  } catch (err) {
    error.value = 'Failed to add product: ' + err.message
  }
}

// Fetch product table
const fetchProducts = async () => {
  try {
    const res = await fetch(`${baseApi}/vw-stock`)
    if (!res.ok) throw new Error('Error loading stock view.')
    products.value = await res.json()
  } catch (err) {
    error.value = err.message
  }
}

// Load on page mount
onMounted(() => {
  fetchProducts()
})
</script>

<style scoped>
input {
  outline: none;
}
</style>
