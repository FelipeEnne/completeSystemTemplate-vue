import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/home/Home'
import AdminPages from '../components/admin/AdminPages'

Vue.use(VueRouter)


const routes = [
    {
        name:'home',
        path:'/',
        components: {
            default: Home
        }
    },
    {
        name:'adminPages',
        path:'/admin',
        components: {
            default: AdminPages
        }
    }
]

export default new VueRouter({
    mode: 'history',
    routes
})