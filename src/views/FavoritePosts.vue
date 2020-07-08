<template>
  <div>
    <section class="hero">
      <div class="inner-container">
        <h1>Favorite Posts</h1>
      </div>
    </section>
    <div
      style="display:flex; justify-content:flex-start; align-items:center; width:60%; margin:0 auto;"
    >
      <router-link class="breadcrumb" :to="{ name: 'blog-list' }">Back to the Homepage</router-link>
    </div>
    <div v-for="post in favoritePosts" :key="post.id">
      <PostCard :post="post" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PostCard from '@/components/PostCard.vue'
export default {
  components: {
    PostCard
  },
  computed: {
    ...mapState('favorite', ['favoritePosts'])
  }
}
</script>
