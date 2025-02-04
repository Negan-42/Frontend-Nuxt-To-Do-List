<template>
    <div>
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
        const reorderedTasks = Array.from(this.tasks);
        const [movedItem] = reorderedTasks.splice(event.oldIndex, 1);
        reorderedTasks.splice(event.newIndex, 0, movedItem);
  
        this.$store.dispatch("updateTaskOrder", reorderedTasks);
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