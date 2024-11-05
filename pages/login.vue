<template>
  <div>
    <h1>Login</h1>
    <input v-model="username" placeholder="Username" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="login">Login</button>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
import { login } from '@/services/auth';

export default {
  data() {
    return {
      username: '',
      password: '',
      error: null,
    };
  },
  methods: {
    async login() {
      this.error = null;
      try {
        // Send login request with credentials
        const { access, refresh } = await login({ 
          username: this.username, 
          password: this.password 
        });

        // Store tokens in local storage or Vuex store
        localStorage.setItem('accessToken', access);
        localStorage.setItem('refreshToken', refresh);

        // Redirect to the main page (e.g., task board)
        this.$router.push('/');
      } catch (error) {
        this.error = 'Invalid username or password';
      }
    }
  }
};
</script>

<style>
.error {
  color: red;
}
</style>
