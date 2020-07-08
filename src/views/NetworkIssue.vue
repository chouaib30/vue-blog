<template>
  <div>
    <section class="hero">
      <div class="inner-container">
        <h1>Ooops !</h1>
        <h4>You have some networking issues, Please Click Back button and try again :)</h4>
      </div>
    </section>
    <router-link class="breadcrumb" :to="{name:'blog-list'}">Back to the Homepage</router-link>
  </div>
</template>

<script>
export default {}
</script>
