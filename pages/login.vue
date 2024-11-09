<template>
  <div class="login-page">
    <div class="login-container">
      <h1>Login</h1>
      <form @submit.prevent="handleLogin">
        <input v-model="username" placeholder="Username" required />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

      <!-- Add link to registration page -->
      <p class="register-link">
        Don’t have an account?
        <router-link to="/register">Register here</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      username: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    ...mapActions("auth", ["login"]), // Map the login action from the auth module

    async handleLogin() {
      try {
        await this.login({ username: this.username, password: this.password });
        this.$router.push("/"); // Redirect after successful login
      } catch (error) {
        this.errorMessage = "Invalid login credentials";
      }
    },
  },
};
</script>

<style scoped>
html, body {
  height: 100%;
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #1e3c72, #2a5298);
}
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

/* New parent container to center the form */
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Full viewport height */
}

html{
  background-color: #1a1b26;

}

.login-container h1 {
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1rem;
}

form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

input {
  width: 95%;
  padding: 0.6rem; 
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  transition: border 0.1s ease;
}

input:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
}

button {
  padding: 0.8rem;
  background-color: #007bff;
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.1s ease;
}

button:hover {
  background-color: #0056b3;
}

button:active {
  transform: scale(0.98);
}

.error {
  color: #e74c3c;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

/* Style for register link */
.register-link {
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #333;
}

.register-link a {
  color: #007bff;
  text-decoration: none;
}

.register-link a:hover {
  text-decoration: underline;
}
@media (max-width: 600px) {
  .login-container {
    padding: 1rem;
  }

  .login-container h1 {
    font-size: 1.5rem;
  }
}
</style>
