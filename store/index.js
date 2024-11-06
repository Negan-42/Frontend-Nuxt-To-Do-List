// store/index.js

export const state = () => ({
  tasks: [],
});

export const mutations = {
  SET_TASKS(state, tasks) {
    state.tasks = tasks;
  },
  ADD_TASK(state, task) {
    state.tasks.push(task);
  },
  REMOVE_TASK(state, taskId) {
    state.tasks = state.tasks.filter((task) => task.id !== taskId);
  },
  TOGGLE_TASK(state, taskId) {
    const task = state.tasks.find((t) => t.id === taskId);
    if (task) {
      task.done = !task.done;
    }
  },
  UPDATE_TASK(state, updatedTask) {
    const index = state.tasks.findIndex((t) => t.id === updatedTask.id);
    if (index !== -1) {
      this.$set(state.tasks, index, updatedTask);
    }
  },
  UPDATE_TASK_ORDER(state, newTasks) {
    state.tasks = newTasks;
  },
};

export const actions = {
  // Load all tasks from the backend
  async loadTasks({ commit }) {
    try {
      const response = await this.$api.get("tasks/get/");
      commit("SET_TASKS", response.data);
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  },

  // Add a new task
  async addTask({ commit }, taskData) {
    try {
      const response = await this.$api.post("tasks/save/", taskData);
      commit("ADD_TASK", response.data);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  },

  // Remove a task by ID
  async removeTask({ commit }, taskId) {
    try {
      await this.$api.delete(`tasks/delete/${taskId}/`);
      commit("REMOVE_TASK", taskId);
    } catch (error) {
      console.error("Error removing task:", error);
    }
  },

  // Toggle task completion status
  async toggleTask({ commit }, taskId) {
    try {
      const currentTask = this.state.tasks.find((t) => t.id === taskId);
      if (!currentTask) throw new Error("Task not found");

      const updatedTask = { ...currentTask, done: !currentTask.done };
      await this.$api.put(`tasks/update/${taskId}/`, updatedTask);
      commit("TOGGLE_TASK", taskId);
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  },

  // Update task content
  async updateTask({ commit }, { taskId, newContent }) {
    try {
      const updatedTask = { content: newContent };
      const response = await this.$api.put(
        `tasks/update/${taskId}/`,
        updatedTask
      );
      commit("UPDATE_TASK", response.data);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  },

  // Update the order of tasks (if supported by backend)
  async updateTaskOrder({ commit }, newTasks) {
    try {
      await this.$api.put("tasks/update-order/", { tasks: newTasks });
      commit("UPDATE_TASK_ORDER", newTasks);
    } catch (error) {
      console.error("Error updating task order:", error);
    }
  },
};
