import apiServices from '@/api/apiServices.js'

export const namespaced = true

export const state = {
  posts: [],
  post: {},
  perPage: 3,
  postsTotal: 0,
  favoritePost: {},
  favoritePosts: []
}

export const mutations = {
  SET_POSTS(state, posts) {
    state.posts = posts
  },
  SET_POST(state, post) {
    state.post = post
  },
  ADD_POST(state, post) {
    state.posts.push(post)
  },
  SET_POSTS_TOTAL(state, postsTotal) {
    state.postsTotal = postsTotal
  },
  ADD_POST_FAVORITE(state, favoritePost) {
    if (state.favoritePosts.findIndex(post => post === favoritePost) === -1) {
      state.favoritePosts.push(favoritePost)
      localStorage.setItem('post', JSON.stringify(favoritePost))
    }
  }
}

export const actions = {
  fetchPosts({ commit, state, dispatch }, { page }) {
    return apiServices
      .getPosts(state.perPage, page)
      .then(response => {
        commit('SET_POSTS_TOTAL', parseInt(response.headers['x-total-count']))
        commit('SET_POSTS', response.data)
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'There is a problem fetching posts ' + error.message
        }
        //module_name/action_name
        dispatch('notification/addNotification', notification, { root: true })
      })
  },
  fetchPost({ commit, getters }, id) {
    var post = getters.getPostById(id)
    if (post) {
      commit('SET_POST', post)
      return post
    } else {
      return apiServices.getPost(id).then(response => {
        commit('SET_POST', response.data)
        return response.data
      })
    }
  },
  addPost({ commit, dispatch }, post) {
    return apiServices.createPost(post).then(() => {
      commit('ADD_POST', post)
      const notification = {
        type: 'success',
        message: ' Your post has been created successfully '
      }
      dispatch('notification/addNotification', notification, { root: true })
    })
  },
  favoritePost({ commit, dispatch }, favoritePost) {
    commit('ADD_POST_FAVORITE', favoritePost)
    const notification = {
      type: 'success',
      message: ' Your post has been added to favorite '
    }
    dispatch('notification/addNotification', notification, { root: true })
  }
}

export const getters = {
  getPostById: state => id => {
    return state.posts.find(post => post.id === id)
  }
}
