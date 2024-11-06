<!-- pages/index.vue -->
<template>
  <div class="task-board">
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

    <!-- Flex container for layout -->
    <div class="content-container">
      <!-- Left column for bar chart -->
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
          <Task v-for="task in localTasks" :key="task.id" :task="task" />
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
// import { mapState } from "vuex";
import TaskChart from "@/components/Task_Chart.vue";
import { mapState } from "vuex";
import Task from "@/components/Task.vue";

export default {
  middleware: "auth",
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
      return this.tasks
        ? this.tasks.filter((task) => task.completed).length
        : 0;
    },
    remainingTasks() {
      return this.tasks ? this.tasks.filter((task) => !task.done).length : 0;
    },
  },
  methods: {
    addTask() {
      if (this.newTask) {
        const taskId = Date.now();
        this.$store.commit("ADD_TASK", {
          id: taskId,
          content: this.newTask,
          done: false,
        });
        this.newTask = "";
      }
    },
    testApiConnection() {
      this.$store.dispatch("testApi");
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
.task-board {
  font-family: "Roboto", sans-serif;
  max-width: 1000px;
  margin: 0 auto;
  background-color: #f8f9fa; /* Light background */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Soft shadow */
}

h1 {
  font-size: 1.8em;
  font-weight: 600;
  color: #343a40;
  margin-bottom: 5px;
}

p {
  color: #6c757d;
  margin-bottom: 20px;
}

.create-new {
  display: flex;
  margin-bottom: 20px;
  gap: 10px;
}

.create-new input {
  flex: 1;
  padding: 12px;
  font-size: 1em;
  border: 1px solid #ced4da;
  border-radius: 6px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s;
}

.create-new input:focus {
  border-color: #5c7cfa; /* Primary blue */
}

.create-new button {
  padding: 12px 20px;
  background-color: #5c7cfa; /* Primary button color */
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s;
}

.create-new button:hover {
  background-color: #4b6cd6; /* Darker blue on hover */
}

/* Flex container for two-column layout */
.content-container {
  display: flex;
  gap: 20px;
}

/* Chart container for left side */
.chart-container {
  flex: 1;
  max-width: 320px;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 6px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Tasks container for right side */
.tasks-container {
  flex: 2;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 6px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
