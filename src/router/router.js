import {createRouter, createWebHistory} from 'vue-router'
import HelloWorld from '../view/HelloWorld.vue'
import Nbrb from '../view/Nbrb.vue'
import Chart from '../view/Chart.vue'

const routes = [
    {path: '/', name: 'main', component: HelloWorld, meta: {title: 'mainTitle', requiresAuth: false,}},
    {path: '/nbrb', name: 'nbrb', component: Nbrb, meta: {title: 'nbrbTitle', requiresAuth: false,}},
    {path: '/chart', name: 'chart', component: Chart, meta: {title: 'chartTitle', requiresAuth: false,}},
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
})

export default router