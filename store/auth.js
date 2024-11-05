// store/auth.js

export const state = () => ({
  token: null,
  refreshToken: null,
  user: null, // Optional: Store user information
  tasks: [], // Initialize tasks as an empty array
});

export const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
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
  },
  // Add task mutation
  ADD_TASK(state, task) {
    state.tasks.push(task);
  },
  // Update task order mutation
  UPDATE_TASK_ORDER(state, orderedTasks) {
    state.tasks = orderedTasks;
  },
};

export const actions = {
  // Login Action
  async login({ commit }, credentials) {
    try {
      const response = await this.$axios.post('/token/', credentials);
      commit('SET_TOKEN', response.data.access);
      commit('SET_REFRESH_TOKEN', response.data.refresh);

      // Optionally, store tokens in local storage
      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);
    } catch (error) {
      console.error('Login Error:', error);
      throw new Error('Invalid login credentials');
    }
  },

  // Refresh Token Action
  async refreshToken({ commit, state }) {
    try {
      const response = await this.$api.post("token/refresh/", {
        refresh: state.refreshToken,
      });
      commit("SET_TOKEN", response.data.access);
    } catch (error) {
      console.error("Refresh Token Error:", error);
      commit("CLEAR_AUTH");
      throw error;
    }
  },

  // Logout Action
  logout({ commit }) {
    commit("CLEAR_AUTH");
    // Optionally, redirect to login page
    // this.$router.push('/login');
  },

  // Optional action for testing API connection
  testApi({ commit }) {
    console.log("Testing API connection");
  },
};
