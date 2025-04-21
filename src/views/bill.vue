<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-3xl mx-auto bg-white shadow-lg p-6 rounded-xl">
      <h1 class="text-2xl font-bold text-gray-800 mb-4">🧾 Bill Details</h1>

      <div v-if="loading" class="text-gray-500">Loading...</div>
      <div v-else-if="error" class="text-red-600">{{ error }}</div>
      <div v-else class="bill-content">
        <div class="mb-4">
          <p><strong>Bill No:</strong> {{ bill.billNo }}</p>
          <p><strong>Date:</strong> {{ new Date(bill.date).toLocaleString() }}</p>
        </div>

        <table class="w-full border-collapse mt-4 text-sm">
          <thead>
            <tr class="bg-gray-100 text-left">
              <th class="border p-2">Product</th>
              <th class="border p-2">Qty</th>
              <th class="border p-2">Price</th>
              <th class="border p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in bill.items" :key="item.productId">
              <td class="border p-2">{{ item.productName }}</td>
              <td class="border p-2">{{ item.qty }}</td>
              <td class="border p-2">₹{{ item.price }}</td>
              <td class="border p-2">₹{{ item.qty * item.price }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr class="font-semibold bg-gray-50">
              <td colspan="3" class="border p-2 text-right">Grand Total</td>
              <td class="border p-2">₹{{ total }}</td>
            </tr>
          </tfoot>
        </table>

        <div class="flex gap-4 mt-6">
          <button @click="printBill" class="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600">
            🖨️ Print
          </button>
          <router-link to="/" class="text-green-600 font-semibold hover:underline mt-2">
            ← Back to Sale
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const baseApi = 'https://mobileapi-fbpw.onrender.com/api/Inventory'
const route = useRoute()
const billNo = route.params.billNo

const bill = ref(null)
const loading = ref(true)
const error = ref('')

const total = ref(0)

const fetchBill = async () => {
  try {
    const res = await fetch(`${baseApi}/view-bill/${billNo}`)
    if (!res.ok) throw new Error('Bill not found')

    const data = await res.json()
    bill.value = data
    total.value = data.items.reduce((sum, item) => sum + item.qty * item.price, 0)
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const printBill = () => {
  window.print()
}

onMounted(fetchBill)
</script>

<style scoped>
@media print {
  .bill-content {
    margin: 0;
    padding: 0;
    font-size: 12px;
    color: #000;
  }

  button,
  a {
    display: none;
  }

  body {
    background: #fff !important;
  }
}
</style>
