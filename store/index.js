// store/index.js

export const state = () => ({
    tasks: []
});

export const mutations = {
    LOAD_TASKS(state) {
        const tasks = localStorage.getItem('tasks');
        if (tasks) {
            state.tasks = JSON.parse(tasks);
        }
    },
    ADD_TASK(state, task) {
        state.tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    REMOVE_TASK(state, task) {
        state.tasks.splice(state.tasks.indexOf(task), 1);
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    TOGGLE_TASK(state, task) {
        task.done = !task.done;
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    UPDATE_TASK(state, { task, newContent }) {
        const index = state.tasks.indexOf(task);
        if (index !== -1) {
            state.tasks[index].content = newContent;
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        }
    },
    UPDATE_TASK_ORDER(state, newTasks) {
        state.tasks = newTasks;
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
    }
};
