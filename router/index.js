import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store'; // Import your Vuex store
import Login from '@/components/Login.vue';
import TaskBoard from '@/components/TaskBoard.vue';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/', // Set root path to load Login component
            name: 'login',
            component: Login,
        },
        {
            path: '/login',
            name: 'loginPage', // Consider renaming for clarity
            component: Login,
        },
        {
            path: '/tasks',
            name: 'tasks',
            component: TaskBoard,
            beforeEnter: (to, from, next) => {
                if (store.state.accessToken) {
                    next(); // Allow navigation if logged in
                } else {
                    next('/login'); // Redirect to login if not
                }
            },
        },
        // Other routes...
    ],
});

export default router;
