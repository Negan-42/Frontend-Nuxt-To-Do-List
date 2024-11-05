<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input v-model="username" placeholder="Username" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async login() {
      this.errorMessage = '';
      try {
        await this.$store.dispatch('login', { username: this.username, password: this.password });
        this.$router.push('/tasks'); // Redirect after login
      } catch (error) {
        this.errorMessage = 'Invalid username or password';
      }
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.error {
  color: red;
}
</style>
