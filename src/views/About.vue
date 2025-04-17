<template>
  <div class="p-6 max-w-2xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">Purchase Product</h1>

    <!-- Purchase Form -->
    <form @submit.prevent="submitPurchase" class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div>
        <label class="block mb-1 font-medium">Select Product</label>
        <select v-model="selectedProductId" class="w-full border rounded px-3 py-2" required>
          <option value="" disabled>Select a product</option>
          <option v-for="product in products" :key="product.productId" :value="product.productId">
            {{ product.productName }} - Rs:{{ product.price }}
          </option>
        </select>
      </div>
      <div>
        <label class="block mb-1 font-medium">Quantity</label>
        <input v-model.number="qty" type="number" min="1" class="w-full border rounded px-3 py-2" required />
      </div>
      <div class="md:col-span-2">
        <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Complete Purchase
        </button>
      </div>
    </form>

    <!-- Feedback -->
    <div v-if="message" class="text-green-700 font-medium mb-4">{{ message }}</div>
    <div v-if="error" class="text-red-600 mb-4">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const products = ref([])
const selectedProductId = ref('')
const qty = ref(1)

const message = ref('')
const error = ref('')

const baseApi = 'https://mobileapi-fbpw.onrender.com/api/Inventory'

// Fetch products for dropdown
const fetchProducts = async () => {
  try {
    const res = await fetch(`${baseApi}/list-products`)
    if (!res.ok) throw new Error('Failed to load products.')
    products.value = await res.json()
  } catch (err) {
    error.value = err.message
  }
}

// Submit purchase
const submitPurchase = async () => {
  message.value = ''
  error.value = ''

  if (!selectedProductId.value || qty.value <= 0) {
    error.value = 'Please select a product and enter a valid quantity.'
    return
  }

  const url = new URL(`${baseApi}/complete-purchase`)
  url.searchParams.append('productId', selectedProductId.value)
  url.searchParams.append('qty', qty.value)

  try {
    const res = await fetch(url, { method: 'POST' })
    if (!res.ok) throw new Error('Purchase failed.')

    message.value = 'Purchase completed successfully.'
    selectedProductId.value = ''
    qty.value = 1
  } catch (err) {
    error.value = 'Error: ' + err.message
  }
}

// Load products on mount
onMounted(() => {
  fetchProducts()
})
</script>

<style scoped>
input,
select {
  outline: none;
}
</style>
