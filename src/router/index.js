import Vue from 'vue'
import VueRouter from 'vue-router'
import BlogsList from '../views/BlogsList.vue'
import BlogShow from '../views/BlogShow.vue'
import BlogCreate from '../views/BlogCreate.vue'
import FavoritePosts from '../views/FavoritePosts.vue'
import LoginUser from '../views/LoginUser.vue'
import RegisterUser from '../views/RegisterUser.vue'
import NotFound from '../views/NotFound.vue'
import NetworkIssue from '../views/NetworkIssue.vue'
import store from '@/store/index.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'blog-list',
    component: BlogsList
  },
  {
    path: '/post/:id',
    name: 'post-show',
    component: BlogShow,
    props: true,
    beforeEnter(routeTo, routeFrom, next) {
      store
        .dispatch('post/fetchPost', routeTo.params.id)
        .then(post => {
          routeTo.params.post = post
          next()
        })
        .catch(error => {
          if (error.response && error.response.status == 404) {
            next({ name: '404', params: { resource: 'Post' } })
          } else {
            next({ name: 'network-issue' })
          }
        })
    }
  },
  {
    path: '/create',
    name: 'post-create',
    component: BlogCreate,
    beforeEnter: (routeTo, routeFrom, next) => {
      const userData = localStorage.getItem('user')
      if (!userData) {
        next({ path: '/login' })
      } else {
        next()
      }
    }
  },
  {
    path: '/favorite',
    name: 'favorite-posts',
    component: FavoritePosts,
    beforeEnter: (routeTo, routeFrom, next) => {
      const userData = localStorage.getItem('user')
      if (!userData) {
        next({ path: '/login' })
      } else {
        next()
      }
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginUser
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterUser
  },
  {
    path: '/network-issue',
    name: 'network-issue',
    component: NetworkIssue
  },
  {
    path: '/404',
    name: '404',
    component: NotFound,
    props: true
  },
  {
    path: '*',
    redirect: { name: '404', params: { resource: 'Page' } }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
