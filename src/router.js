import { createRouter, createWebHashHistory } from "vue-router";

import HomePage from './pages/HomePage.vue';
import SingleApartment from './pages/SingleApartment.vue'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'homepage',
            component: HomePage
        },
        {
            path: '/apartment/:slug',
            name: 'single-apartment',
            component : SingleApartment
        }
    ]
});

export { router }