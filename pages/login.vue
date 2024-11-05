<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="login">
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
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      username: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    async login() {
      this.errorMessage = "";
      try {
        const response = await this.$api.post("/token/", {
          username: this.username,
          password: this.password,
        });

        if (response.data.access) {
          // Store the token (either in localStorage or Vuex)
          this.$store.commit("auth/setToken", response.data.access); // or localStorage.setItem("token", response.data.access);
          this.$router.push("/tasks"); // Redirect to the tasks page or another page after login
        }
      } catch (error) {
        this.errorMessage = "Invalid username or password";
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 400px;
  margin-top: 100px;
  margin-left: 200px;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  transition: all 0.3s ease;
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
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  transition: border 0.3s ease;
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

@media (max-width: 600px) {
  .login-container {
    padding: 1.5rem;
  }

  h1 {
    font-size: 1.6rem;
  }

  button {
    font-size: 0.9rem;
  }
}
</style>
