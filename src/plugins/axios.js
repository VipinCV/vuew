import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const api = axios.create({
  baseURL: 'https://mobileapi-fbpw.onrender.com',
})

// Add Authorization header
api.interceptors.request.use(config => {
  const authStore = useAuthStore()
  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`
  }
  return config
})

// Handle 401 globally
api.interceptors.response.use(
  response => response,
  error => {
    const authStore = useAuthStore()
    if (error.response && error.response.status === 401) {
      console.warn('⚠️ Token expired or invalid. Logging out...')
      authStore.logout()
    }
    return Promise.reject(error)
  }
)

export default api
