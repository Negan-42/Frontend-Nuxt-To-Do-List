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
  // Login Action
  async login({ commit }, credentials) {
    // Log credentials to ensure they're correctly received here

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
    } catch (error) {
      console.error('Login Error:', error);
      throw new Error('Invalid login credentials');
    }
  },
  // Fetch user data
  async getUserData({ commit, state }) {
    try {
      if (state.token) {
        const response = await this.$axios.get("/user/", {
          headers: { Authorization: `Bearer ${state.token}` },
        });
        commit("SET_USER", response.data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  },

  // Refresh Token Action
  async refreshToken({ commit, state }) {
    try {
      const response = await this.$axios.post("/token/refresh/", {
        refresh: state.refreshToken,
      });
      commit("SET_TOKEN", response.data.access);

      // Update access token in local storage
      localStorage.setItem("accessToken", response.data.access);
    } catch (error) {
      console.error("Refresh Token Error:", error);
      commit("CLEAR_AUTH");
      throw error;
    }
  },

  // Auto-login Action (useful on page reload)
  autoLogin({ commit }) {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    if (accessToken && refreshToken) {
      commit("SET_TOKEN", accessToken);
      commit("SET_REFRESH_TOKEN", refreshToken);
    }
  },

  // Logout Action
  logout({ commit }) {
    commit("CLEAR_AUTH");

    // Remove tokens from local storage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    // Optionally, redirect to login page
    // this.$router.push('/login');
  },
};
