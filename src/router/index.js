import Home from '../views/home.vue'
import Login from '../views/login.vue'
import Register from '../views/register.vue'
import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/', 
        name: 'home',
        component: Home,
        children: []
    },
    {path: '/login', component: Login,children: []},
    {path: '/register/:d*', component: Register, children: []}
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;