<!-- pages/register.vue -->
<template>
  <div class="register-page">
    <div class="register-container">
      <h1>Register</h1>
      <form @submit.prevent="handleRegister">
        <input type="text" id="username" v-model="username" placeholder="Username" required />
        <input type="email" id="email" v-model="email" placeholder="Email" required />
        <input type="password" id="password" v-model="password" placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
      <p v-if="successMessage" class="success">{{ successMessage }}</p>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

      <p class="login-link">
        Already have an account?
        <router-link to="/login">Login here</router-link>
      </p>
      
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup () {
    const username = ref('');
    const email = ref('');
    const password = ref('');
    const successMessage = ref('');
    const errorMessage = ref('');

    const handleRegister = async () => {
      try {
        const response = await fetch('http://to-do-backend-46nr.onrender.com/api/tasks/register/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username.value,
            email: email.value,
            password: password.value,
          }),
        });

        if (response.ok) {
          successMessage.value = 'Registration successful! You can now log in.';
          errorMessage.value = '';
        } else {
          const data = await response.json();
          errorMessage.value = data.error || 'Registration failed. Please try again.';
        }
      } catch (error) {
        errorMessage.value = 'An error occurred. Please try again later.';
      }
    };

    return {
      username,
      email,
      password,
      handleRegister,
      successMessage,
      errorMessage,
    };
  },
};
</script>


<style scoped>
.register-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Full viewport height */
  background-color: #1a1b26; /* Background color similar to login */
}

.register-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  transition: all 0.3s ease;
}

.register-container h1 {
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
/* S  tyles for success and error messages */
.success {
  color: #28a745;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.error {
  color: #e74c3c;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}
</style>
