<template>
  <div class="min-h-screen bg-gradient-to-br from-white to-gray-100 p-6">
    <div class="max-w-4xl mx-auto bg-white p-6 shadow-lg rounded-xl">
      <h1 class="text-3xl font-bold mb-6 text-gray-800">🛒 Make Multiple Product Sale</h1>

      <form @submit.prevent="submitSale" class="space-y-4">
        <!-- Bill Number -->
        <div>
          <label class="block font-semibold text-gray-700 mb-1">🧾 Bill No</label>
          <input type="text" v-model="billNo" readonly class="w-full border px-3 py-2 rounded-xl bg-gray-100 text-gray-600 font-mono" />
        </div>

        <!-- Sale Items -->
        <div v-for="(item, index) in saleItems" :key="index" class="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          <div class="col-span-2">
            <label class="block font-semibold text-gray-700 mb-1">Select Product</label>
            <select v-model="item.productId" required class="w-full border px-3 py-2 rounded-xl">
              <option value="">-- Choose Product --</option>
              <option v-for="product in products" :key="product.productId" :value="product.productId">
                {{ product.productName }} (Stock: {{ product.stockQuantity }})
              </option>
            </select>
          </div>
          <div>
            <label class="block font-semibold text-gray-700 mb-1">Qty</label>
            <input type="number" v-model.number="item.qty" min="1" required class="w-full border px-3 py-2 rounded-xl" />
          </div>
          <button
            v-if="saleItems.length > 1"
            @click.prevent="removeItem(index)"
            class="text-red-600 font-semibold hover:underline"
          >
            🗑 Remove
          </button>
        </div>

        <!-- Controls -->
        <div class="flex justify-between mt-4">
          <button @click.prevent="addItem" class="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600">
            ➕ Add More
          </button>
          <button type="submit" class="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700">
            ✅ Submit Sale
          </button>
        </div>
      </form>

      <!-- Feedback -->
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

const billNo = ref('')
const products = ref([])
const saleItems = ref([{ productId: '', qty: 1 }])
const message = ref('')
const error = ref('')

// 🧾 Generate unique bill number
const generateBillNo = () => {
  const now = new Date()
  const random = Math.floor(Math.random() * 1000)
  billNo.value = `BILL-${now.getFullYear()}${now.getMonth() + 1}${now.getDate()}-${now.getHours()}${now.getMinutes()}${now.getSeconds()}-${random}`
}

const fetchProducts = async () => {
  try {
    const res = await fetch(`${baseApi}/list-products`)
    if (!res.ok) throw new Error('Failed to load products')
    products.value = await res.json()
  } catch (err) {
    error.value = err.message
  }
}

const addItem = () => {
  saleItems.value.push({ productId: '', qty: 1 })
}

const removeItem = (index) => {
  saleItems.value.splice(index, 1)
}

const submitSale = async () => {
  message.value = ''
  error.value = ''

  const payload = {
    billNo: billNo.value,
    items: saleItems.value.map(item => ({
      productId: item.productId,
      qty: item.qty
    }))
  }

  try {
    const res = await fetch(`${baseApi}/complete-sale`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    if (!res.ok) throw new Error('Sale failed')
    message.value = `✅ Products sold successfully under Bill No: ${billNo.value}`
    resetForm()
    await fetchProducts()
  } catch (err) {
    error.value = '❌ ' + err.message
  }
}

const resetForm = () => {
  saleItems.value = [{ productId: '', qty: 1 }]
  generateBillNo()
}

onMounted(() => {
  generateBillNo()
  fetchProducts()
})
</script>

<style scoped>
select:focus,
input:focus {
  border-color: #4ade80;
}
</style>
