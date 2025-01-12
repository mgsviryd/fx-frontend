import {createRouter, createWebHistory} from 'vue-router'
import HelloWorld from '../view/HelloWorld.vue'

const routes = [
    {path: '/', name: 'main', component: HelloWorld, meta: {title: 'mainTitle', requiresAuth: false,}},
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
})

export default router