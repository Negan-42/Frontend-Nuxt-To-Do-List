<template>
  <div :class="`task ${task.done ? 'is-complete' : ''}`">
    <!-- Drag Handle -->
    <div class="drag-handle" @mousedown.prevent>
      <span>≡</span> <!-- Represent the drag handle with three lines -->
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
    />

    <!-- Task Actions -->
    <div class="buttons">
      <input 
        type="checkbox" 
        :checked="task.done" 
        @change="toggleDone" 
        class="task-checkbox"
      />
      <button @click="removeTask" class="delete"> Delete </button>
      <button @click="startEdit" class="update"> Update </button>
    </div>
  </div>
</template>

<script>
export default {
    props: ['task'],
    data() {
        return {
            isEditing: false,
            editContent: this.task.content
        };
    },
    methods: {
        toggleDone() {
            this.$store.commit('TOGGLE_TASK', this.task);
        },
        removeTask() {
            this.$store.commit('REMOVE_TASK', this.task);
        },
        startEdit() {
            this.isEditing = true;
        },
        submitUpdate() {
            if (this.editContent !== this.task.content) {
                this.$store.commit('UPDATE_TASK', { task: this.task, newContent: this.editContent });
            }
            this.isEditing = false; // End editing mode
        },
    }
}
</script>

<style>
.task {
    display: flex;
    align-items: center; /* Align items vertically center */
}

.drag-handle {
    cursor: grab; /* Change cursor to indicate drag */
    margin-right: 10px; /* Space between handle and text */
    user-select: none; /* Prevent text selection while dragging */
}

/* Style for the drag handle */
.drag-handle span {
    font-size: 1.5rem; /* Size of the drag handle */
}

/* Style adjustments for checkbox */
.task-checkbox {
    margin-right: 0.5rem;
}
</style>
