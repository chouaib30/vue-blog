<template>
  <div class="post">
    <div class="post-content">
      <figure class="avatar">
        <img :src="loadImg(post.avatar)" alt="Placeholder image" />
      </figure>
      <div class="content">
        <h3 class="title">
          <router-link :to="{ name: 'post-show', params: { id: post.id } }">{{
            post.title
          }}</router-link>
        </h3>
        <p class="username">
          <strong>By : {{ post.writer }}</strong>
        </p>
        <p class="date">{{ post.date }}</p>
        <p class="text">{{ post.description }}</p>
        <ul class="tags">
          <li class="tag" v-for="(tag, index) in post.tags" :key="index">
            {{ tag }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
const images = require.context('@/assets/images', false, /\.png$|\.jpg$/)
export default {
  name: 'PostCard',
  props: {
    post: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      likes: 0
    }
  },
  methods: {
    loadImg(imgPath) {
      return images('./' + imgPath)
    }
  }
}
</script>
