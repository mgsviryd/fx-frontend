import {createRouter, createWebHistory} from 'vue-router'
import Chart from '../views/Chart.vue'
import HelloWorld from '../views/HelloWorld.vue'
import Nbrb from '../views/Nbrb.vue'

const routes = [
    {path: '/', name: 'main', component: HelloWorld, meta: {title: 'mainTitle', requiresAuth: false,}},
    {path: '/chart', name: 'chart', component: Chart, meta: {title: 'chartTitle', requiresAuth: false}},
    {path: '/nbrb', name: 'nbrb', component: Nbrb, meta: {title: 'nbrbTitle', requiresAuth: false}},
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
})

export default router