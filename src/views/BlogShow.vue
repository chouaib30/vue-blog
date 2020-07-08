<template>
  <div>
    <section class="hero is-success">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">{{ post.title }}</h1>
        </div>
      </div>
    </section>
    <div
      style="display:flex; justify-content:flex-start; align-items:center; width:60%; margin:0 auto;"
    >
      <router-link class="breadcrumb" :to="{ name: 'blog-list' }">Back to the Homepage</router-link>
      <span>/</span>
      <router-link class="breadcrumb" :to="{ name: 'favorite-posts' }">Go to favorite posts</router-link>
    </div>

    <div class="post no-bg">
      <div class="post-content">
        <figure class="avatar is-72x72">
          <img :src="loadImg(post.avatar)" alt="Placeholder image" />
        </figure>
        <div class="content">
          <p class="username">
            <strong>By : {{ post.writer }}</strong>
          </p>
          <p class="date">{{ post.date }}</p>
          <p class="text">{{ post.description }}</p>
          <ul class="tags">
            <li class="tag" v-for="(tag, index) in post.tags" :key="index">{{ tag }}</li>
          </ul>
        </div>
      </div>
      <button
        class="add-to-favorite"
        v-if="!isPostExist"
        @click="addToFavoritePosts"
      >Add To Favorite</button>
      <button
        class="remove-from-favorite"
        @click="removeFromFavoritePosts"
        v-else
      >Remove From Favorite</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
const images = require.context('@/assets/images', false, /\.png$|\.jpg$/)
export default {
  name: 'BlogsShow',
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  methods: {
    loadImg(imgPath) {
      return images('./' + imgPath)
    },
    addToFavoritePosts() {
      if (!this.authentication.user) {
        this.$router.push({ path: '/login' })
      } else {
        this.$store.dispatch('favorite/addPostToFavorite', this.post)
      }
    },
    removeFromFavoritePosts() {
      this.$store.dispatch('favorite/removePostFromFavorite', this.post)
    }
  },
  computed: {
    isPostExist() {
      return (
        this.favorite.favoritePosts.findIndex(
          favoritePost => favoritePost.id === this.post.id
        ) > -1
      )
    },
    ...mapState(['authentication', 'favorite'])
  }
}
</script>
