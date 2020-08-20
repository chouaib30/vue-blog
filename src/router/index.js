import Vue from 'vue'
import VueRouter from 'vue-router'
import BlogsList from '../views/BlogsList.vue'
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
    component: () =>
      import(/* webpackChunkName : blogShow */ '../views/BlogShow.vue'),
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
    component: () =>
      import(/* webpackChunkName : blogCreate*/ '../views/BlogCreate.vue'),
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
    component: () =>
      import(
        /* webpackChunkName : favoritePost */ '../views/FavoritePosts.vue'
      ),
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
    component: () =>
      import(/* webpackChunkName : favoritePost */ '../views/LoginUser.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () =>
      import(/* webpackChunkName : register */ '../views/RegisterUser.vue')
  },
  {
    path: '/network-issue',
    name: 'network-issue',
    component: () =>
      import(/* webpackChunkName: networkIssue */ '../views/NetworkIssue.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () =>
      import(/* webpackChunkName : notFound */ '../views/NotFound.vue'),
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
