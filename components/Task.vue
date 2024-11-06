<!-- components/Task.vue -->
<template>
  <div :class="`task ${task.done ? 'is-complete' : ''} draggable`">
    <!-- Drag Handle -->
    <div class="drag-handle" @pointerdown.prevent>
      <span>≡</span>
      <!-- Represent the drag handle with three lines -->
    </div>

    <!-- Task Content -->
    <div class="content" v-if="!isEditing">{{ task.content }}</div>
    <input
      v-if="isEditing"
      type="text"
      v-model="editContent"
      @keyup.enter="submitUpdate"
      @blur="submitUpdate"
      placeholder="Update task"
      class="edit-input"
    />

    <!-- Task Actions -->
    <div class="buttons">
      <input
        type="checkbox"
        :checked="task.done"
        @change="toggleDone"
        class="task-checkbox"
      />
      <button @click="removeTask" class="delete">Delete</button>
      <button @click="startEdit" class="update">Update</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["task"],
  data() {
    return {
      isEditing: false,
      editContent: this.task.content,
    };
  },
  methods: {
    // Dispatch action to toggle task completion
    toggleDone() {
      this.$store.dispatch("toggleTask", this.task.id);
    },

    // Dispatch action to remove task
    removeTask() {
      this.$store.dispatch("removeTask", this.task.id);
    },

    // Start editing the task
    startEdit() {
      this.isEditing = true;
      this.editContent = this.task.content;
    },

    // Dispatch action to update task content
    submitUpdate() {
      if (this.editContent.trim() && this.editContent !== this.task.content) {
        this.$store.dispatch("updateTask", {
          taskId: this.task.id,
          newContent: this.editContent.trim(),
        });
      }
      this.isEditing = false; // End editing mode
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
