// plugins/axios.js

import axios from 'axios'

export default function (context, inject) {
  const api = axios.create({
    baseURL: 'http://localhost:8000/api', // Replace with your backend URL
  })

  // Add a request interceptor to include JWT token
  api.interceptors.request.use(
    config => {
      const token = context.store.state.auth.token
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )

  // Optionally, handle responses (e.g., token refresh on 401)
  api.interceptors.response.use(
    response => response,
    error => {
      if (error.response && error.response.status === 401) {
        // Handle token refresh or redirect to login
        context.store.dispatch('auth/logout')
        context.redirect('/login')
      }
      return Promise.reject(error)
    }
  )

  // Inject the Axios instance as $api
  inject('api', api)
}
