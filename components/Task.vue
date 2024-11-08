<template>
    <div class="content-container">
    <draggable
      v-model="tasks"
      @end="updateTasksOrder"
      :animation="200"
      handle=".drag-handle"
      :force-fallback="true"
    >
      <div v-for="task in tasks" :key="task.id" :class="`task ${task.done ? 'is-complete' : ''} draggable`">
        <div class="drag-handle" @pointerdown.prevent>
          <span>≡</span>
        </div>
        <div class="content" v-if="!isEditing || editingTaskId !== task.id">{{ task.content }}</div>
        <input
          v-if="isEditing && editingTaskId === task.id"
          type="text"
          v-model="editContent"
          @keyup.enter="submitUpdate(task.id)"
          @blur="submitUpdate(task.id)"
          placeholder="Update task"
          class="edit-input"
        />
        <div class="buttons">
          <input
            type="checkbox"
            :checked="task.done"
            @change="toggleDone(task.id)"
            class="task-checkbox"
          />
          <button @click="removeTask(task.id)" class="delete">Delete</button>
          <button @click="startEdit(task.id, task.content)" class="update">Update</button>
        </div>
      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  components: {
    draggable,
  },
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isEditing: false,
      editingTaskId: null,
      editContent: "",
    };
  },
  methods: {
    removeTask(taskId) {
      this.$store.dispatch("removeTask", taskId);
    },
    toggleDone(taskId) {
      this.$store.dispatch("toggleTask", taskId);
    },
    startEdit(taskId, content) {
      this.isEditing = true;
      this.editingTaskId = taskId;
      this.editContent = content;
    },
    submitUpdate(taskId) {
      if (this.editContent.trim()) {
        this.$store.dispatch("updateTask", { taskId, newContent: this.editContent.trim() });
      }
      this.isEditing = false;
      this.editingTaskId = null;
      this.editContent = "";
    },
    updateTasksOrder(event) {
      const orderedTasks = [...this.tasks];
      const movedTask = orderedTasks.splice(event.oldIndex, 1)[0];
      orderedTasks.splice(event.newIndex, 0, movedTask);
      this.$store.dispatch("updateTaskOrder", orderedTasks);
    },
  },
};
</script>
<style scoped>
/* Your existing styles */
.task {
  display: flex;
  align-items: center;
  padding: 12px;
  margin-bottom: 12px;
  background-color: #f8f9fa;
  color: #343a40;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s;
}

.task.is-complete {
  background-color: #e9ecef;
}

.task.is-complete .content {
  text-decoration: line-through; /* Strike-through for completed tasks */
  color: #6c757d; /* Dim the text color */
}

.draggable {
  cursor: grab; /* Cross-device grab cursor */
}

.drag-handle {
  cursor: grab;
  color: #adb5bd;
  margin-right: 10px;
}

.drag-handle:active {
  cursor: grabbing; /* Add visual feedback when dragging */
}

.content {
  flex: 1;
  font-size: 1em;
}

.edit-input {
  flex: 1;
  padding: 8px;
  font-size: 1em;
  border: 1px solid #ced4da;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.3s;
}

.edit-input:focus {
  border-color: #5c7cfa;
}

.buttons {
  display: flex;
  gap: 0.5rem;
  margin-left: auto;
}

.delete,
.update {
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 0.9em;
  font-weight: 500;
}

.delete:hover {
  color: #dc3545; /* Red color for delete on hover */
}

.update:hover {
  color: #28a745; /* Green color for update on hover */
}

.task-checkbox {
  margin-right: 10px;
  cursor: pointer;
}
</style>
