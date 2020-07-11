<template>
  <div class="navbar">
    <div class="inner-container">
      <nav class="nav-left">
        <router-link :to="{ name: 'blog-list' }">Home</router-link>
      </nav>
      <nav class="nav-right">
        <router-link
          v-if="!checkUser"
          :to="{ name: 'login' }"
          tag="button"
          class="btn"
          >Login</router-link
        >
        <template v-else>
          <p style="color: #fff">
            Welcome:
            <b>{{ getUsername }}</b>
          </p>
          <button class="btn" @click="logout">Logout</button>
        </template>
        <router-link tag="button" :to="{ name: 'post-create' }" class="btn"
          >Create post</router-link
        >
      </nav>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  methods: {
    logout() {
      this.$store.dispatch('authentication/logout').then(() => {
        this.$router.push({ name: 'login' })
      })
    }
  },
  computed: mapGetters('authentication', ['checkUser', 'getUsername'])
}
</script>
