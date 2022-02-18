import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/home/Home'
import AdminPages from '../components/admin/AdminPages'
import ArticlesByCategory from '../components/article/ArticlesByCategory'
import ArticleById from '../components/article/ArticleById'
import Auth from '../components/auth/Auth'

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
    },
    {
        name:'ArticlesByCategory',
        path:'/categories/:id/article',
        components: {
            default: ArticlesByCategory
        }
    },
    {
        name:'ArticleById',
        path:'/articles/:id',
        components: {
            default: ArticleById
        }
    },
    {
        name:'Auth',
        path:'/auth',
        components: {
            default: Auth
        }
    }
]

export default new VueRouter({
    mode: 'history',
    routes
})