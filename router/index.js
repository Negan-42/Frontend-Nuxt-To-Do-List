import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store'; // Import your Vuex store
import Login from '@/components/Login.vue';
import TaskBoard from '@/components/TaskBoard.vue';
import Register from '@/components/Register.vue'; // Import the Register component

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
            name: 'loginPage', // Renamed for clarity
            component: Login,
        },
        {
            path: '/register', // New route for the registration page
            name: 'register',
            component: Register,
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
        // Other routes can go here...
    ],
    // mode: 'history', // Optional, to remove the hash from URLs
});

export default router;
