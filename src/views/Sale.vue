<template>
  <div class="min-h-screen bg-gradient-to-br from-white to-gray-100 p-6">
    <div class="max-w-2xl mx-auto bg-white p-6 shadow-md rounded-xl">
      <h1 class="text-2xl font-bold mb-4 text-gray-800">💸 Make a Sale</h1>

      <form @submit.prevent="submitSale" class="grid grid-cols-1 gap-4">
        <div>
          <label class="block mb-1 font-semibold text-gray-700">Select Product</label>
          <select v-model="productId" required class="w-full border px-3 py-2 rounded-xl">
            <option value="">-- Choose Product --</option>
            <option v-for="product in products" :key="product.productId" :value="product.productId">
              {{ product.productName }} (Stock: {{ product.stockQuantity }})
            </option>
          </select>
        </div>

        <div>
          <label class="block mb-1 font-semibold text-gray-700">Quantity</label>
          <input type="number" v-model.number="qty" min="1" class="w-full border px-3 py-2 rounded-xl" required />
        </div>

        <div class="text-right">
          <button type="submit" class="bg-green-600 text-white px-5 py-2 rounded-xl hover:bg-green-700">
            ✅ Complete Sale
          </button>
        </div>
      </form>

      <div v-if="message" class="mt-4 text-green-700 bg-green-100 px-4 py-2 rounded shadow-sm">
        {{ message }}
      </div>
      <div v-if="error" class="mt-4 text-red-600 bg-red-100 px-4 py-2 rounded shadow-sm">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const baseApi = 'https://mobileapi-fbpw.onrender.com/api/Inventory'

const products = ref([])
const productId = ref('')
const qty = ref(1)
const message = ref('')
const error = ref('')

const fetchProducts = async () => {
  try {
    const res = await fetch(`${baseApi}/list-products`)
    if (!res.ok) throw new Error('Failed to fetch products')
    products.value = await res.json()
  } catch (err) {
    error.value = err.message
  }
}

const submitSale = async () => {
  error.value = ''
  message.value = ''

  const url = new URL(`${baseApi}/complete-sale`)
  url.searchParams.append('productId', productId.value)
  url.searchParams.append('qty', qty.value)

  try {
    const res = await fetch(url, {
      method: 'POST'
    })
    if (!res.ok) throw new Error('Sale failed')

    message.value = '✅ Sale completed successfully!'
    productId.value = ''
    qty.value = 1
    await fetchProducts()
  } catch (err) {
    error.value = '❌ ' + err.message
  }
}

onMounted(() => {
  fetchProducts()
})
</script>

<style scoped>
select:focus,
input:focus {
  outline: none;
  border-color: #4ade80;
}
</style>
