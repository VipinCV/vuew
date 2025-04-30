import { defineStore } from 'pinia'
import api from '@/plugins/axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    tokenExpiry: localStorage.getItem('tokenExpiry') || null,
    refreshTimeout: null,
  }),
 getters: {
    // Computed property to check if the user is authenticated
    isAuthenticated(state) {
      return !!state.token && state.tokenExpiry > Date.now()
    },
  },

  actions: {
    setTokens(token, refreshToken) {
      const payload = JSON.parse(atob(token.split('.')[1]))
      this.token = token
      this.refreshToken = refreshToken
      this.tokenExpiry = payload.exp * 1000

      localStorage.setItem('token', token)
      localStorage.setItem('refreshToken', refreshToken)
      localStorage.setItem('tokenExpiry', this.tokenExpiry)

      this.scheduleTokenRefresh()
    },

    async login(username, password) {
      try {
        const response = await api.post('/Auth/login', { username, password })
        const { token, refreshToken } = response.data
        this.setTokens(token, refreshToken)
        return true
      } catch (error) {
        console.error('Login failed:', error)
        return false
      }
    },

    async logout() {
      try {
         const refreshToken= localStorage.getItem('refreshToken') || null;
           const response = await api.post('/Auth/logout', refreshToken, {
          headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
          },
        });
         const   resp   = response.data 
          this.token = null
          this.refreshToken = null
          this.tokenExpiry = null 
         localStorage.removeItem('token')
         localStorage.removeItem('refreshToken')
         localStorage.removeItem('tokenExpiry')
         clearTimeout(this.refreshTimeout)
          return true
      } catch (error) {
        console.error('Login failed:', error)
        return false
      }
     
     
    },

    scheduleTokenRefresh() {
      const expiresIn = this.tokenExpiry - Date.now() - 60000
      if (expiresIn > 0) {
        this.refreshTimeout = setTimeout(() => this.refreshTokens(), expiresIn)
      }
    },

    async refreshTokens() {
      try {
        const response = await api.post('/Auth/refresh', {
          refreshToken: this.refreshToken,
        })
        const { token, refreshToken } = response.data
        this.setTokens(token, refreshToken)
      } catch (error) {
        console.error('Token refresh failed:', error)
        this.logout()
      }
    },

    getHeaders() {
      return {
           Authorization: `Bearer ${this.token}`,
      }
    },

    async get(url, config = {}) {
      return api.get(url, {
        ...config,
        headers: {
          ...this.getHeaders(),
          ...config.headers,
        },
      })
    },

    async post(url, data, config = {}) {
      return api.post(url, data, {
        ...config,
        headers: {
          ...this.getHeaders(),
          ...config.headers,
        },
      })
    },

    async put(url, data, config = {}) {
      return api.put(url, data, {
        ...config,
        headers: {
          ...this.getHeaders(),
          ...config.headers,
        },
      })
    },
  },
})
