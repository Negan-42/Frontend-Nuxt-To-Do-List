// store/auth.js

export const state = () => ({
  token: null,
  refreshToken: null,
  user: null, // Store user information
  isLoggedIn: false,
});

export const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
    state.isLoggedIn = !!token;
  },
  SET_REFRESH_TOKEN(state, refreshToken) {
    state.refreshToken = refreshToken;
  },
  SET_USER(state, user) {
    state.user = user;
  },
  CLEAR_AUTH(state) {
    state.token = null;
    state.refreshToken = null;
    state.user = null;
    state.isLoggedIn = false;
  },
};


export const actions = {
  // Add this helper method
  setAuthHeader({ state }) {
    if (state.token) {
      this.$api.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
    } else {
      delete this.$api.defaults.headers.common['Authorization'];
    }
  },

  async login({ commit, dispatch }, credentials) {
    try {
      const response = await this.$api.post('/token/', {
        username: credentials.username,
        password: credentials.password,
      });
      commit('SET_TOKEN', response.data.access);
      commit('SET_REFRESH_TOKEN', response.data.refresh);

      // Store tokens in local storage
      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);

      // Set the authorization header
      dispatch('setAuthHeader');
    } catch (error) {
      console.error('Login Error:', error);
      throw new Error('Invalid login credentials');
    }
  },

  autoLogin({ commit, dispatch }) {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (accessToken && refreshToken) {
      commit('SET_TOKEN', accessToken);
      commit('SET_REFRESH_TOKEN', refreshToken);

      // Set the authorization header
      dispatch('setAuthHeader');
    }
  },

  async refreshToken({ commit, state, dispatch }) {
    try {
      const response = await this.$axios.post('/token/refresh/', {
        refresh: state.refreshToken,
      });
      commit('SET_TOKEN', response.data.access);

      // Update access token in local storage
      localStorage.setItem('accessToken', response.data.access);

      // Set the authorization header
      dispatch('setAuthHeader');
    } catch (error) {
      console.error('Refresh Token Error:', error);
      commit('CLEAR_AUTH');
      throw error;
    }
  },
};
