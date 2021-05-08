import axios from 'axios'

const API_URL = process.env.API_URL || 'http://localhost:8000/api'

const axiosInstance = axios.create({
  baseURL: API_URL
})

const axiosClient = (options) => axiosInstance({
  ...options
})

export default axiosClient