<template>
  <div class="task-page">
    <div class="centered-content">
      <Task_Chart
        :completedTasks="completedTasks"
        :remainingTasks="remainingTasks"
      />
      <div class="task-container">
        <h1>Task List</h1>
        <div class="add-task-button-container">
          <button @click="showAddModal = true" class="small-button">
            Add Task
          </button>
        </div>

        <!-- Modal for adding task -->
        <div
          v-if="showAddModal"
          class="modal-overlay"
          @click.self="closeModals"
        >
          <div class="modal">
            <h2>Add New Task</h2>
            <form @submit.prevent="addNewTask">
              <input
                v-model="newTaskContent"
                placeholder="Enter task"
                required
              />
              <button type="submit" class="modal-button">Submit</button>
              <button
                type="button"
                class="modal-button cancel"
                @click="closeModals"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>

        <!-- Modal for editing task -->
        <div
          v-if="showEditModal"
          class="modal-overlay"
          @click.self="closeModals"
        >
          <div class="modal">
            <h2>Edit Task</h2>
            <form @submit.prevent="updateTask">
              <input
                v-model="editTaskContent"
                placeholder="Edit task"
                required
              />
              <button type="submit" class="modal-button">Update</button>
              <button
                type="button"
                class="modal-button cancel"
                @click="closeModals"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>

        <ul class="task-list" v-sortable="{ onEnd: onDragEnd }">
          <li
            v-for="task in tasks"
            :key="task.id"
            class="task-item"
            draggable="true"
          >
            <div class="task-item-row">
              <span class="drag-handle">&#x2630;</span>
              <input
                type="checkbox"
                :checked="task.complete"
                @change="toggleTask(task)"
              />
              <span :class="{ completed: task.complete }" class="task-title">{{
                task.title
              }}</span>
              <div class="task-actions">
                <button
                  @click="openEditModal(task)"
                  class="edit-btn small-button"
                >
                  Edit
                </button>
                <button
                  @click="removeTask(task.id)"
                  class="delete-btn small-button"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Task_Chart from "@/components/Task_Chart.vue";
import Sortable from "sortablejs";

export default {
  components: {
    Task_Chart,
  },
  directives: {
    sortable: {
      inserted(el, binding) {
        new Sortable(el, binding.value || {});
      },
    },
  },
  data() {
    return {
      newTaskContent: "",
      editTaskContent: "",
      showAddModal: false,
      showEditModal: false,
      taskToEdit: null,
    };
  },
  computed: {
    tasks() {
      return this.$store.state.tasks;
    },
    completedTasks() {
      return this.tasks.filter((task) => task.complete).length;
    },
    remainingTasks() {
      return this.tasks.length - this.completedTasks;
    },
  },
  methods: {
    addNewTask() {
      if (this.newTaskContent.trim()) {
        this.$store.dispatch("addTask", { title: this.newTaskContent });
        this.newTaskContent = "";
        this.showAddModal = false;
      }
    },
    toggleTask(task) {
      this.$store.dispatch("toggleTask", task.id);
    },
    removeTask(taskId) {
      this.$store.dispatch("removeTask", taskId);
    },
    openEditModal(task) {
      this.taskToEdit = task;
      this.editTaskContent = task.title;
      this.showEditModal = true;
    },
    updateTask() {
      if (this.editTaskContent.trim() && this.taskToEdit) {
        this.$store.dispatch("updateTask", {
          taskId: this.taskToEdit.id,
          newTitle: this.editTaskContent,
        });
        this.showEditModal = false;
        this.taskToEdit = null;
      }
    },
    closeModals() {
      this.showAddModal = false;
      this.showEditModal = false;
    },
    onDragEnd(event) {
      const reorderedTasks = Array.from(this.tasks); // Create a copy of the tasks array
      const [movedItem] = reorderedTasks.splice(event.oldIndex, 1); // Remove the item from the old position
      reorderedTasks.splice(event.newIndex, 0, movedItem); // Insert it at the new position

      // Dispatch the Vuex action to update the task order
      this.$store.dispatch("updateTaskOrder", reorderedTasks);
    },
  },
  async mounted() {
    await this.$store.dispatch("loadTasks");
  },
};
</script>

<style scoped>
.task-page {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background-color: #1a1b26;
  min-height: 100vh;
}

.centered-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  max-width: 1200px;
}

.task-container {
  width: 60%;
  background-color: #2a2b38;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.add-task-button-container {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

h1 {
  font-size: 1.8rem;
  font-weight: bold;
  color: #fff;
  margin-bottom: 1rem;
  text-align: center;
}

.task-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.task-item {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  background-color: #333;
  padding: 0.5rem 1rem;
  border-radius: 5px;
}

.task-item-row {
  display: flex;
  align-items: center;
  width: 100%;
}

.drag-handle {
  cursor: move;
  margin-right: 1rem;
  color: #888;
}

.task-title {
  flex-grow: 1;
  color: #fff;
  margin-left: 1rem;
}

.task-actions {
  display: flex;
  gap: 0.5rem;
}

button {
  width: auto;
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.small-button {
  padding: 0.3rem 0.8rem;
  font-size: 0.8rem;
}

button:hover {
  background-color: #0056b3;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background-color: #1f1f2b;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  width: 100%;
  max-width: 400px;
}

.modal-button {
  padding: 0.8rem;
  margin-top: 1rem;
  width: 100%;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
}
/* Media query for smaller devices */
@media (max-width: 768px) {
  .centered-content {
    flex-direction: column;
    padding: 1rem;
  }

  .task-container {
    width: 100%;
  }

  .task-item-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .task-title {
    margin: 0.5rem 0;
  }

  .task-actions {
    justify-content: space-between;
    width: 100%;
  }
}
</style>
