<template>
  <div id="app">
    <AppNav />
    <NotificationContainer />
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
import AppNav from '@/components/AppNav.vue'
import NotificationContainer from '@/components/NotificationContainer.vue'
export default {
  components: {
    AppNav,
    NotificationContainer
  }
}
</script>


<style lang="scss">
@import '@/style/global.scss';
</style>
