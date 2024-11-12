<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Navigation Bar using QAppBar -->
    <q-header elevated>
      <q-app-bar>
        <q-toolbar-title class="nav-title">Task Manager</q-toolbar-title>
        <q-btn flat label="Logout" @click="handleLogout" color="primary" />
      </q-app-bar>
    </q-header>

    <q-page-container>
      <div class="centered-content">
        <!-- Task Chart with Centered Title -->
        <div class="chart-container">
          <Task_Chart :completedTasks="completedTasks" :remainingTasks="remainingTasks" />
          <div class="chart-title">Task Statistics</div>
        </div>

        <!-- Task List Section -->
        <div class="task-container">
          <div class="task-list-header">
            <h4>Task List</h4>
          </div>
          <div class="add-task-button-container">
            <q-btn
              label="Add Task"
              @click="showAddModal = true"
              color="primary"
              class="add-task-button"
            />
          </div>

          <ul class="task-list" v-sortable="{ onEnd: onDragEnd }">
            <li
              v-for="task in tasks"
              :key="task.id"
              class="task-item"
              draggable="true"
            >
              <div class="tasklistview">
                <div class="left">
                  <span class="drag-handle">&#x2630;</span>
                  <input type="checkbox" :checked="task.complete" @change="toggleTask(task)" />
                  <span :class="{ completed: task.complete }" class="task-title">
                    {{ task.title }}
                  </span>
                </div>

                <div class="right">
                  <q-btn label="Edit" flat @click="openEditModal(task)" color="primary" class="small-button" />
                  <q-btn label="Delete" flat @click="removeTask(task.id)" color="negative" class="small-button" />
                </div>
              </div>
            </li>
          </ul>

          <!-- Add Task Modal using Quasar -->
          <q-dialog v-model="showAddModal" persistent>
            <q-card class="modal" style="background-color: #333;">
              <q-card-section>
                <div class="text-h6">Add New Task</div>
              </q-card-section>
              <q-card-section>
                <q-form @submit="addNewTask">
                  <q-input
                    v-model="newTaskContent"
                    placeholder="Enter task"
                    filled
                    dense
                    hide-clearable
                    style="background-color: #fff; color: white;"
                  />
                  <div class="modal-buttons">
                    <q-btn
                      label="Submit"
                      type="submit"
                      color="primary"
                      class="modal-button"
                    />
                    <q-btn
                      label="Cancel"
                      flat
                      @click="showAddModal = false"
                      color="negative"
                      class="modal-button"
                    />
                  </div>
                </q-form>
              </q-card-section>
            </q-card>
          </q-dialog>

          <!-- Edit Task Modal using Quasar -->
          <q-dialog v-model="showEditModal" persistent>
            <q-card class="modal" style="background-color: #333;">
              <q-card-section>
                <div class="text-h6">Edit Task</div>
              </q-card-section>
              <q-card-section>
                <q-form @submit="updateTask">
                  <q-input
                    v-model="editTaskContent"
                    placeholder="Edit task"
                    filled
                    dense
                    hide-clearable
                    style="background-color: #fff; color: white;"
                  />
                  <div class="modal-buttons">
                    <q-btn
                      label="Update"
                      type="submit"
                      color="primary"
                      class="modal-button"
                    />
                    <q-btn
                      label="Cancel"
                      flat
                      @click="showEditModal = false"
                      color="negative"
                      class="modal-button"
                    />
                  </div>
                </q-form>
              </q-card-section>
            </q-card>
          </q-dialog>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import Task_Chart from "@/components/Task_Chart.vue";
import Sortable from "sortablejs";
import {
  QLayout,
  QHeader,
  QPageContainer,
  QAppBar,
  QBtn,
  QToolbarTitle,
  QDialog,
  QCard,
  QCardSection,
  QForm,
  QInput,
} from "quasar";

export default {
  middleware: "auth",
  components: {
    Task_Chart,
    QLayout,
    QHeader,
    QPageContainer,
    QBtn,
    QToolbarTitle,
    QDialog,
    QCard,
    QCardSection,
    QForm,
    QInput,
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
    handleLogout() {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      this.$store.commit("auth/clearAuthState");
      this.$router.push("/login");
    },
  },
  async mounted() {
    await this.$store.dispatch("loadTasks");
  },
};
</script>

<style scoped>
</style>
