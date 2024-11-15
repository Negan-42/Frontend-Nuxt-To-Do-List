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
  COMPLETE_TASK(state, taskId) {
    const task = state.tasks.find((t) => t.id === taskId);
    if (task) {
      task.complete = true;
    }
  },
  TOGGLE_TASK(state, updatedTask) {
    console.log('Updated Task:', updatedTask);
    const index = state.tasks.findIndex((task) => task.id === updatedTask.id);
    if (index !== -1) {
      this._vm.$set(state.tasks, index, updatedTask);
    }
  },

  
  
  UPDATE_TASK(state, { taskId, newTitle }) {
    const task = state.tasks.find(t => t.id === taskId);
    if (task) {
      task.title = newTitle;
    }
  },
   UPDATE_TASK_ORDER(state, newTasks) {
    state.tasks = [...newTasks]; // Replace state.tasks with the new ordered list
  },
  CLEAR_TASKS(state) {
    state.tasks = [];
  },
};

export const actions = {
  async loadTasks({ commit }) {
    try {
      const response = await this.$api.get('api/tasks/get/');
      commit('SET_TASKS', response.data);
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  },
  
  async loadCompletedTasks({ commit }) {
    try {
      const response = await this.$api.get('api/tasks/get?complete=true');
      commit('SET_TASKS', response.data);
    } catch (error) {
      console.error('Error loading completed tasks:', error);
    }
  },
  
  async addTask({ commit }, taskData) {
    try {
      const response = await this.$api.post('api/tasks/save/', taskData);
      commit('ADD_TASK', response.data);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  },
  
  async removeTask({ commit }, taskId) {
    try {
      await this.$api.delete(`api/tasks/delete/${taskId}/`);
      commit('REMOVE_TASK', taskId);
    } catch (error) {
      console.error('Error removing task:', error);
    }
  },
  
  async toggleTask({ commit }, taskId) {
    try {
      const currentTask = this.state.tasks.find((t) => t.id === taskId);
      if (!currentTask) throw new Error('Task not found');
      
      // Ensure the correct property is toggled
      const updatedTask = { complete: !currentTask.complete };
      const response = await this.$api.put(`api/tasks/update/${taskId}/`, updatedTask);
      commit('TOGGLE_TASK', response.data);
    } catch (error) {
      console.error('Error toggling task:', error);
    }
  },
  
  
  async updateTask({ commit }, { taskId, newTitle }) {
    try {
      const response = await this.$api.put(`api/tasks/update/${taskId}/`, { title: newTitle });
      if (response.data) {
        commit('UPDATE_TASK', { taskId, newTitle });
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  },
  
  async completeTask({ commit }, taskId) {
    try {
      const response = await this.$api.put(`api/tasks/complete/${taskId}/`);
      if (response.data && response.data.complete !== undefined) {
        commit('COMPLETE_TASK', taskId);
      }
    } catch (error) {
      console.error('Error completing task:', error);
    }
  },
  
  async updateTaskOrder({ commit }, newTasks) {
    try {
      // Make sure the request matches your backend API format
      await this.$api.put('api/tasks/update-order/', { tasks: newTasks });
      commit('UPDATE_TASK_ORDER', newTasks);
    } catch (error) {
      console.error('Error updating task order:', error);
    }
  },
  
  async clearTasks({ commit }) {
    commit('CLEAR_TASKS');
  },
};
