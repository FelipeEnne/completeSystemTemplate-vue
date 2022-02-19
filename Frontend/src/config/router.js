import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/home/Home'
import AdminPages from '../components/admin/AdminPages'
import ArticlesByCategory from '../components/article/ArticlesByCategory'
import ArticleById from '../components/article/ArticleById'
import Auth from '../components/auth/Auth'

import { userKey } from '@/global'

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
        },
        meta: {requiresAdmin: true}
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

 const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    const json = localStorage.getItem(userKey)

    if(to.matched.some(record => record.meta.requiresAdmin)) {
        const user = JSON.parse(json)
        user && user.admin === 'true' ? next() : next({path: '/'});
    } else {
        next()
    }
})

export default router