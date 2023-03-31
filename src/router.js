import { createRouter, createWebHashHistory } from "vue-router";

import HomePage from './pages/HomePage.vue';
import SingleApartment from './pages/SingleApartment.vue'
import AdvancedSearch from './pages/AdvancedSearch.vue'

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
            component: SingleApartment
        },
        {
            path: '/advanced-search/:search',
            name: 'advanced-search',
            component: AdvancedSearch
        }
    ]
});

export { router }