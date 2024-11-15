// plugins/axios.js

import axios from 'axios'

export default function (context, inject) {
  const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/', // Replace with your backend URL
  })

  // Add a request interceptor to include JWT token
  api.interceptors.request.use(
    config => {
      // Check if the auth module and token exist before adding the Authorization header
      const token = context.store.state.auth ? context.store.state.auth.token : null;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  // Optionally, handle responses (e.g., token refresh on 401)
  api.interceptors.response.use(
    response => response,
    error => {
      if (error.response && error.response.status === 401) {
        console.warn('Unauthorized access - redirecting to login.');

        // Check if the auth module has a logout action
        if (context.store._actions['auth/logout']) {
          context.store.dispatch('auth/logout');
        } else {
          console.error('[vuex] unknown action type: auth/logout');
        }

        context.redirect('/login');
      }
      // Log the full error for debugging
      console.error('Axios error response:', error.message, error.response?.data);
      return Promise.reject(error);
    }
  );

  // Inject the Axios instance as $api
  inject('api', api);
}
