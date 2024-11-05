<template>
  <main>
    <h1> Task Board </h1>
    <p> Create Tasks </p>

    <div class="create-new">
      <input 
        type="text"
        v-model="newTask"
        placeholder="Add new tasks"
        @keypress.enter="addTask" />
      <button @click="addTask"> Add </button>
    </div>

    <div class="tasks">
      <draggable 
        v-model="localTasks" 
        @end="updateTasksOrder" 
        :move="checkMove"
        :animation="200" 
        handle=".drag-handle"> <!-- Specify the drag handle -->
        <template v-for="task in localTasks">
          <Task
            :key="task.id" 
            :task="task" />
        </template>
      </draggable>
    </div>

    <TaskChart 
      :completedTasks="completedTasks" 
      :remainingTasks="remainingTasks" />
  </main>
</template>

<script>
import draggable from 'vuedraggable';
import { mapState } from 'vuex';
import TaskChart from '@/components/Task_Chart.vue';

export default {
  components: {
    draggable,
    TaskChart,
  },
  data() {
    return {
      newTask: ''
    }
  },
  computed: {
    ...mapState(['tasks']),
    localTasks() {
      return this.tasks;
    },
    completedTasks() {
      return this.tasks.filter(task => task.done).length; // Count completed tasks
    },
    remainingTasks() {
      return this.tasks.filter(task => !task.done).length; // Count remaining tasks
    }
  },
  methods: {
    addTask() {
      if (this.newTask) {
        const taskId = Date.now(); // Use a unique ID for the task
        this.$store.commit('ADD_TASK', { id: taskId, content: this.newTask, done: false });
        this.newTask = ''; // Clear input field after adding
      }
    },
     
    updateTasksOrder(event) {
        // Create a copy of the tasks array
        const orderedTasks = [...this.localTasks]; 

        // Remove the dragged task from its old position
        const movedTask = orderedTasks.splice(event.oldIndex, 1)[0]; 

        // Insert it at the new position
        orderedTasks.splice(event.newIndex, 0, movedTask); 

        // Commit the new order to Vuex
        this.$store.commit('UPDATE_TASK_ORDER', orderedTasks.map(task => ({
            id: task.id,
            title: task.title, // Use the appropriate property names
            complete: task.complete, // Adjust if using a different field name
        })));
    },
    checkMove(evt) {
      return true; // Allow all moves
    }
  }
}
</script>

<style>
/* Add your styles here */
</style>
