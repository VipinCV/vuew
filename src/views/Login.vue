<template>
  <div class="login-container">
    <form @submit.prevent="login">
      <input v-model="username" placeholder="Username" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
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

const login = async () => {
  const success = await authStore.login(username.value, password.value)
  if (success) {
    router.push('/home')
  } else {
    alert('Login failed')
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
