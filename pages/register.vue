<!-- register.vue -->
<template>
  <div>
    <form @submit.prevent="handleRegister">
      <div>
        <br>
        <h1> Register Page </h1> <br> <br> 
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>

import { ref } from 'vue'; // Import ref from Vue

export default {
  setup() {
    const username = ref('');
    const email = ref('');
    const password = ref('');

    const handleRegister = () => {
      // Here you can add the logic for handling the registration,
      // such as calling an API to register the user.
      console.log('Registration Details:', {
        username: username.value,
        email: email.value,
        password: password.value,
      });
      // You can redirect the user after successful registration, for example:
      // this.$router.push('/login');
    };

    return {
      username,
      email,
      password,
      handleRegister,
    };
  },
};
</script>

<style>
/* Add your styles here */
form {
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: 0 auto;
}

label {
  margin-bottom: 5px;
}

input {
  margin-bottom: 15px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
