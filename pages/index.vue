<template>
  <div class="task-page">
    <div class="task-container">
      <h1>Task List</h1>
      <form @submit.prevent="addNewTask">
        <input v-model="newTaskContent" placeholder="Add a new task" required />
        <button type="submit">Add Task</button>
      </form>
      <ul class="task-list">
        <li v-for="task in tasks" :key="task.id" class="task-item">
          <input type="checkbox" v-model="task.done" @change="toggleTask(task.id)" />
          <span :class="{ completed: task.done }">{{ task.title }}</span>
          <div class="task-actions">
            <button @click="editTask(task)" class="edit-btn">Edit</button>
            <button @click="removeTask(task.id)" class="delete-btn">Delete</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTaskContent: '',
    };
  },
  computed: {
    tasks() {
      return this.$store.state.tasks;
    },
  },
  methods:{
    async addNewTask() {
      if (this.newTaskContent.trim()) {
        await this.$store.dispatch('addTask', { title: this.newTaskContent });
        this.newTaskContent = '';  // Clear the input field after adding the task
      }
    },
    async toggleTask(taskId) {
      await this.$store.dispatch('toggleTask', taskId);
    },
    async removeTask(taskId) {
      await this.$store.dispatch('removeTask', taskId);
    },
    async editTask(task) {
  // Prompt for new task title instead of content
  const newTitle = prompt('Edit task title:', task.title);
  if (newTitle !== null && newTitle.trim() !== '') {
    // Dispatch update with new title
    await this.$store.dispatch('updateTask', { taskId: task.id, newTitle });
   }
   }
  },
  async mounted() {
    await this.$store.dispatch('loadTasks');
  },
};
</script>

<style scoped>
.task-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #1a1b26;
}

.task-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 500px;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #2a2b38;
}

h1 {
  font-size: 1.8rem;
  font-weight: bold;
  color: #fff;
  margin-bottom: 1rem;
}

form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
}

input {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  background-color: #333;
  color: #fff;
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

.task-list {
  width: 100%;
  list-style: none;
  padding: 0;
  margin: 0;
}

.task-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #3a3b4f;
  padding: 0.8rem;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  transition: background-color 0.3s ease;
}

.task-item input[type="checkbox"] {
  margin-right: 1rem;
}

.task-item span {
  flex-grow: 1;
  color: #fff;
}

.task-item .completed {
  text-decoration: line-through;
  color: #9a9a9a;
}

.task-actions {
  display: flex;
  gap: 0.5rem;
}

.edit-btn, .delete-btn {
  background-color: #444;
  color: #fff;
  border: none;
  padding: 0.5rem;
  border-radius: 5px;
  cursor: pointer;
}

.edit-btn:hover {
  background-color: #0066cc;
}

.delete-btn:hover {
  background-color: #cc0000;
}
</style>