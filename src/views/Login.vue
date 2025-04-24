<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200">
    <div class="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md">
      <h2 class="text-3xl font-bold text-blue-600 text-center mb-8">🔐 Welcome Back</h2>

      <form @submit.prevent="login" class="space-y-6">
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1">Username</label>
          <input
            v-model="username"
            type="text"
            placeholder="Enter your username"
            class="w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1">Password</label>
          <input
            v-model="password"
            type="password"
            placeholder="Enter your password"
            class="w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
        </div>

        <div v-if="error" class="text-red-600 text-sm bg-red-100 p-2 rounded-lg">
          {{ error }}
        </div>

        <button
          type="submit"
          class="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 rounded-xl font-semibold hover:scale-105 transform transition"
        >
          🚀 Login
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const username = ref('')
const password = ref('')
const error = ref('')

const login = async () => {
  error.value = ''
  const success = await authStore.login(username.value, password.value)
  if (success) {
    router.push('/home')
  } else {
    error.value = '❌ Login failed. Please check your credentials.'
  }
}
</script>
