import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'nprogress/nprogress.css'
Vue.config.productionTip = false
import NProgress from 'nprogress'
import Vuelidate from 'vuelidate'
import axios from 'axios'
import InputTag from 'vue-input-tag'

Vue.component('input-tag', InputTag)
Vue.use(Vuelidate)

router.beforeEach((routerTo, routerFrom, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

new Vue({
  router,
  store,
  //when we refresh the page, the user data still exist, until we logout
  created() {
    const userString = localStorage.getItem('user')
    if (userString) {
      const userData = JSON.parse(userString)
      this.$store.commit('authentication/SET_USER_DATA', userData)
    }
    axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response.status === 401) {
          this.$store.dispatch('authentication/logout')
        }
        return Promise.reject(error)
      }
    )
  },
  render: h => h(App)
}).$mount('#app')
