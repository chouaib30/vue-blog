<template>
  <div>
    <section class="hero">
      <div class="inner-container">
        <h1>Ooops !</h1>
        <h4>The {{ resource }} you're looking for is not exist :)</h4>
      </div>
    </section>
    <router-link
      class="link-to--home"
      style="text-align:center"
      :to="{name:'blog-list'}"
    >Back to the Homepage</router-link>
  </div>
</template>

<script>
export default {
  name: "NotFound",
  props: {
    resource: {
      type: String,
      required: true
    }
  }
}
</script>
 