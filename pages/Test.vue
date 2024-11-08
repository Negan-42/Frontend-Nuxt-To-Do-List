<template>
  <div class="task-page">
    <div class="task-container">
      <h1>Task Board</h1>
      <p>Create Tasks</p>

      <div class="create-new">
        <input
          type="text"
          v-model="newTask"
          placeholder="Add new tasks"
          @keypress.enter="addTask"
        />
        <button @click="addTask">Add</button>
      </div>

      <!-- Flex container for side-by-side layout -->
      <div class="content-container">
        <!-- Left column for chart -->
        <div class="chart-container">
          <TaskChart
            :completedTasks="completedTasks"
            :remainingTasks="remainingTasks"
          />
        </div>
        <!-- Right column for tasks -->
        <div class="tasks-container">
          <draggable
            v-model="localTasks"
            @end="updateTasksOrder"
            :move="checkMove"
            :animation="200"
            handle=".drag-handle"
            :force-fallback="true"
          >
            <Task v-for="task in tasks" :key="task.id" :task="task" />
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import TaskChart from "@/components/Task_Chart.vue";
import { mapState } from "vuex";
import Task from "@/components/Task.vue";

export default {
  // middleware: "auth",
  components: {
    draggable,
    TaskChart,
    Task,
  },
  data() {
    return {
      newTask: "",
    };
  },
  computed: {
    ...mapState(["tasks"]),
    localTasks() {
      return this.tasks;
    },
    completedTasks() {
      return this.tasks ? this.tasks.filter((task) => task.done).length : 0;
    },
    remainingTasks() {
      return this.tasks ? this.tasks.filter((task) => !task.done).length : 0;
    },
    tasks() {
      return this.$store.state.tasks;
    },
  },
  mounted() {
    this.$store.dispatch("loadTasks").catch((error) => {
      console.error("Error while loading tasks on page load:", error);
    });
  },
  methods: {
    addTask() {
      if (this.newTask.trim()) {
        const taskId = Date.now();
        this.$store.commit("ADD_TASK", {
          id: taskId,
          content: this.newTask,
          done: false,
        });
        this.newTask = "";
      }
    },
    updateTasksOrder(event) {
      const orderedTasks = [...this.localTasks];
      const movedTask = orderedTasks.splice(event.oldIndex, 1)[0];
      orderedTasks.splice(event.newIndex, 0, movedTask);
      this.$store.commit(
        "UPDATE_TASK_ORDER",
        orderedTasks.map((task) => ({
          id: task.id,
          content: task.content,
          done: task.done,
        }))
      );
    },
    checkMove(evt) {
      return true;
    },
  },
};
</script>

<style scoped>
.task-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Full viewport height */
  background-color: #1a1b26; /* Match background color of login */
}

.task-container {
  width: 100%;
  max-width: 800px; /* Adjust width as needed */
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #1f202b; /* Dark container background */
}

h1 {
  font-size: 1.8rem;
  font-weight: bold;
  color: #f0f0f0; /* Light text color */
  margin-bottom: 1rem;
}

p {
  color: #b0b0b0; /* Muted text color */
  margin-bottom: 20px;
}

.create-new {
  display: flex;
  margin-bottom: 20px;
  gap: 10px;
}

.create-new input {
  flex: 1;
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #333;
  border-radius: 8px;
  background-color: #2a2c38;
  color: #f0f0f0;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3);
}

.create-new input:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
}

.create-new button {
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

.create-new button:hover {
  background-color: #0056b3;
}

.content-container {
  display: flex;
  flex-direction: row; /* Side-by-side layout */
  gap: 20px;
}

.chart-container {
  flex: 1;
  background-color: #2a2c38;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.tasks-container {
  flex: 2;
  background-color: #2a2c38;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
