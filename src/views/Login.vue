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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useAuthStore } from './store/auth'

const router = useRouter()
const authStore = useAuthStore()

const username = ref('')
const password = ref('')

const login = async () => {
  try {
    const response = await axios.post('https://mobileapi-fbpw.onrender.com/Auth/login', {
      username: username.value,
      password: password.value
    })
    authStore.setTokens(response.data.token, response.data.refreshToken)
    router.push('/home')
  } catch (error) {
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

<!-- auth store using Pinia -->
<script>
// store/auth.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token'),
    refreshToken: localStorage.getItem('refreshToken'),
    refreshTimeout: null,
  }),
  actions: {
    setTokens(token, refreshToken) {
      this.token = token
      this.refreshToken = refreshToken
      localStorage.setItem('token', token)
      localStorage.setItem('refreshToken', refreshToken)
      this.scheduleTokenRefresh()
    },
    logout() {
      this.token = null
      this.refreshToken = null
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
      clearTimeout(this.refreshTimeout)
    },
    async refreshTokens() {
      try {
        const response = await axios.post('https://mobileapi-fbpw.onrender.com/Auth/refresh', {
          token: this.token,
          refreshToken: this.refreshToken
        })
        this.setTokens(response.data.token, response.data.refreshToken)
      } catch (e) {
        this.logout()
      }
    },
    scheduleTokenRefresh() {
      const payload = JSON.parse(atob(this.token.split('.')[1]))
      const expiresIn = payload.exp * 1000 - Date.now() - 60000 // 1 min before expiry
      this.refreshTimeout = setTimeout(this.refreshTokens, expiresIn)
    }
  }
})

// axios interceptor
axios.interceptors.request.use(config => {
  const authStore = useAuthStore()
  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`
  }
  return config
})
</script>
