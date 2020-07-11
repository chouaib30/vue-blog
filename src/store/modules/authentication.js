import axios from 'axios'
import apiAuthServices from '@/api/apiAuthServices.js'

export const namespaced = true

export const state = {
  user: null
}

export const mutations = {
  SET_USER_DATA(state, userData) {
    state.user = userData
    localStorage.setItem('user', JSON.stringify(userData))
    axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`
  },
  CLEAR_USER_DATA() {
    localStorage.removeItem('user'), location.reload()
  }
}

export const actions = {
  register({ commit }, formData) {
    return apiAuthServices.userRegister(formData).then(({ data }) => {
      commit('SET_USER_DATA', data)
      console.log(data)
    })
  },

  login({ commit }, formData) {
    return apiAuthServices.userLogin(formData).then(({ data }) => {
      commit('SET_USER_DATA', data)
    })
  },

  logout({ commit }) {
    commit('CLEAR_USER_DATA')
  }
}

export const getters = {
  checkUser: state => {
    return state.user
  },
  getUsername: state => {
    return state.user.name
  }
}
