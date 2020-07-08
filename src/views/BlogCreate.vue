<template>
  <div>
    <section class="hero">
      <div class="inner-container">
        <h1>Create New Post</h1>
      </div>
    </section>

    <form class="w-50" @submit.prevent="createPost">
      <p v-if="status === 400" :class="{ 'error-status': status === 400 }">
        Please fill all fields.
      </p>

      <!-- SELECT AVATAR -->
      <div class="input-group">
        <label for="avatar">Avatar</label>
        <select id="avatar" v-model="selectedAvatar">
          <option
            v-for="(avatar, index) in avatars"
            :key="index"
            :value="avatar.img"
            >{{ avatar.name }}</option
          >
        </select>
      </div>

      <!-- TITLE -->
      <div class="input-group">
        <label for="title">Title</label>
        <input
          @blur="$v.title.$touch()"
          type="text"
          id="title"
          placeholder="Post title"
          v-model="title"
          :class="{ 'form-error': $v.title.$error }"
        />
        <div v-if="$v.title.$error">
          <p v-if="!$v.title.required" class="error-message">
            Title is required
          </p>
        </div>
      </div>

      <!-- DESCRIPTION -->
      <div class="input-group">
        <label for="description">Description</label>
        <textarea
          @blur="$v.description.$touch()"
          id="description"
          cols="30"
          rows="10"
          placeholder="Description here"
          v-model="description"
          :class="{ 'form-error': $v.description.$error }"
        ></textarea>
        <div v-if="$v.description.$error">
          <p v-if="!$v.description.required" class="error-message">
            Description is required
          </p>
        </div>
      </div>

      <!-- TAGS -->
      <div class="input-group">
        <label>Tags</label>
        <input-tag v-model="tags"></input-tag>
      </div>
      <button type="submit">Post</button>
    </form>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'BlogCreate',
  data() {
    return {
      selectedAvatar: 'avatar01.jpg',
      title: '',
      description: '',
      tags: [],
      avatars: [
        {
          name: 'avatar 01',
          img: 'avatar01.jpg'
        },
        {
          name: 'avatar 02',
          img: 'avatar02.jpg'
        },
        {
          name: 'avatar 03',
          img: 'avatar03.jpg'
        },
        {
          name: 'avatar 04',
          img: 'avatar04.jpg'
        },
        {
          name: 'avatar 05',
          img: 'avatar05.jpg'
        },
        {
          name: 'avatar 06',
          img: 'avatar06.jpg'
        },
        {
          name: 'avatar 07',
          img: 'avatar07.jpg'
        }
      ],
      status: null
    }
  },
  validations: {
    title: {
      required
    },
    description: {
      required
    }
  },
  methods: {
    createPost() {
      const writer = this.$store.state.authentication.user.name
      const id = Math.floor(Math.random() * 10000)
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.$store
          .dispatch('post/addPost', {
            id: id,
            date: 'May 5, 2018',
            writer: writer,
            title: this.title,
            description: this.description,
            avatar: this.selectedAvatar,
            tags: this.tags
          })
          .then(() => {
            this.$router.push({
              name: 'post-show',
              params: { id: id }
            })
          })
          .catch(error => {
            this.status = error.response.status
          })
      }
    }
  }
}
</script>
