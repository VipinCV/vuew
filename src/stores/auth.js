import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    tokenExpiry: localStorage.getItem('tokenExpiry') || null,
    user: null,
  }),

  actions: {
    async login(username, password) {
      try {
        const response = await axios.post('https://mobileapi-fbpw.onrender.com/Auth/login', {
          username,
          password,
        })

        const { token, refreshToken } = response.data
        const payload = JSON.parse(atob(token.split('.')[1]))

        this.token = token
        this.refreshToken = refreshToken
        this.tokenExpiry = payload.exp * 1000

        localStorage.setItem('token', token)
        localStorage.setItem('refreshToken', refreshToken)
        localStorage.setItem('tokenExpiry', this.tokenExpiry)

        this.scheduleTokenRefresh()

        return true
      } catch (error) {
        console.error('Login failed:', error)
        return false
      }
    },

    logout() {
      this.token = null
      this.refreshToken = null
      this.tokenExpiry = null
      this.user = null

      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('tokenExpiry')

      clearTimeout(this._refreshTimeout)
    },

    scheduleTokenRefresh() {
      const delay = this.tokenExpiry - Date.now() - 60000 // 1 minute before expiry
      if (delay > 0) {
        this._refreshTimeout = setTimeout(() => this.refreshAccessToken(), delay)
      }
    },

    async refreshAccessToken() {
      try {
        const response = await axios.post('https://mobileapi-fbpw.onrender.com/Auth/refresh', {
          refreshToken: this.refreshToken,
        })

        const { token, refreshToken } = response.data
        const payload = JSON.parse(atob(token.split('.')[1]))

        this.token = token
        this.refreshToken = refreshToken
        this.tokenExpiry = payload.exp * 1000

        localStorage.setItem('token', token)
        localStorage.setItem('refreshToken', refreshToken)
        localStorage.setItem('tokenExpiry', this.tokenExpiry)

        this.scheduleTokenRefresh()
      } catch (error) {
        console.error('Token refresh failed:', error)
        this.logout()
      }
    },
  },
})
