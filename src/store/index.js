import Vue from 'vue'
import Vuex from 'vuex'
import * as post from '@/store/modules/post.js'
import * as notification from '@/store/modules/notification.js'
import * as authentication from '@/store/modules/authentication.js'
import * as favorite from '@/store/modules/favorite.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    post,
    notification,
    authentication,
    favorite
  }
})
