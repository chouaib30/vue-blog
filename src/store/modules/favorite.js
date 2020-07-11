export const namespaced = true

export const state = {
  favoritePost: {},
  favoritePosts: []
}

export const mutations = {
  ADD_FAVORITE_POST(state, favoritePost) {
    if (state.favoritePosts.findIndex(post => post === favoritePost) === -1) {
      state.favoritePosts.push(favoritePost)
      state.favoritePost = favoritePost
    }
  },
  REMOVE_FAVORITE_POST(state, postToRemove) {
    state.favoritePosts = state.favoritePosts.filter(
      post => post.id !== postToRemove.id
    )
  }
}

export const actions = {
  addPostToFavorite({ commit, dispatch }, favoritePost) {
    commit('ADD_FAVORITE_POST', favoritePost)
    const notification = {
      type: 'success',
      message: ' Your post has been added to favorite '
    }
    dispatch('notification/addNotification', notification, { root: true })
  },
  removePostFromFavorite({ commit, dispatch }, favoritePost) {
    commit('REMOVE_FAVORITE_POST', favoritePost)
    const notification = {
      type: 'success',
      message: ' Your post has been removed from favorite '
    }
    dispatch('notification/addNotification', notification, { root: true })
  }
}
