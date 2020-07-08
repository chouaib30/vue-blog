<template>
  <div class="blogs-list">
    <section class="hero">
      <div class="inner-container">
        <h1>Vue Blog</h1>
        <h4>A place to share your knowledge.</h4>
        <router-link
          v-if="authentication.user"
          tag="button"
          class="btn"
          :to="{ name: 'favorite-posts' }"
          >Favorite Posts</router-link
        >
      </div>
    </section>

    <div v-for="post in post.posts" :key="post.id">
      <PostCard :post="post" />
    </div>
    <nav class="pagination">
      <template v-if="page != 1">
        <router-link
          :to="{ name: 'blog-list', query: { page: page - 1 } }"
          rel="prev"
          >Prev Page</router-link
        >
        <template v-if="hasNextPage">|</template>
      </template>
      <router-link
        v-if="hasNextPage"
        :to="{ name: 'blog-list', query: { page: page + 1 } }"
        rel="next"
        >Next Page</router-link
      >
    </nav>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PostCard from '@/components/PostCard.vue'

export default {
  name: 'BlogsList',
  components: {
    PostCard
  },

  created() {
    this.perPage = 3
    //"post" is namespace
    this.$store.dispatch('post/fetchPosts', {
      perPage: this.perPage,
      page: this.page
    })
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1
    },
    hasNextPage() {
      return this.post.postsTotal > this.page * this.perPage
    },
    //"post" refer to a module
    ...mapState(['post', 'authentication'])
  }
}
</script>
