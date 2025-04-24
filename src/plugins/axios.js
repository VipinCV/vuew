import axios from 'axios'

const api = axios.create({
  baseURL: 'https://mobileapi-fbpw.onrender.com', // ✅ Your API base URL
})

export default api
