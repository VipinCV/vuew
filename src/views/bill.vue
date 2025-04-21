<template>
  <div class="bill">
    <h1 class="text-xl font-bold">Bill No: {{ billNo }}</h1>
    <div v-if="billDetails">
      <p><strong>Product:</strong> {{ billDetails.productName }}</p>
      <p><strong>Price:</strong> ${{ billDetails.price }}</p>
      <p><strong>Quantity:</strong> {{ billDetails.qty }}</p>
      <p><strong>Total:</strong> ${{ billDetails.total }}</p>
    </div>
    <div v-else>
      <p>Loading bill details...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const billNo = ref(route.params.billNo)
const billDetails = ref(null)

// Mocked data for testing
const mockBillDetails = {
  productName: "Sample Product",
  price: 20.5,
  qty: 3,
  total: 61.5 // price * qty
}

// Fetch Bill Details - using mock data instead of actual API
const fetchBillDetails = () => {
  // Simulate a delay like fetching from an API
  setTimeout(() => {
    billDetails.value = mockBillDetails
  }, 1000) // 1 second delay to simulate loading
}

onMounted(() => {
  fetchBillDetails()
})
</script>

<style scoped>
.bill {
  padding: 16px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
