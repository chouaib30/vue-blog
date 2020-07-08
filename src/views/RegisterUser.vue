<template>
  <div>
    <section class="hero">
      <div class="inner-container">
        <h1>Sign Up</h1>
      </div>
    </section>

    <form @submit.prevent="submit">
      <p
        v-if="status === 400"
        :class="{ 'error-status': status === 400 }"
      >Email is already exist, Please enter different email.</p>
      <p class="typo__p" v-if="submitStatus === 'OK'">Thanks for your submission!</p>
      <p class="typo__p" v-if="submitStatus === 'ERROR'">Please fill the form correctly.</p>
      <p class="typo__p" v-if="submitStatus === 'PENDING'">Pending...</p>

      <div class="input-group">
        <label for="name">Name</label>
        <input
          @blur="$v.name.$touch()"
          type="text"
          id="name"
          placeholder="Your Name"
          v-model="name"
          :class="{ 'form-error': $v.name.$error }"
        />
        <div v-if="$v.name.$error">
          <p v-if="!$v.name.required" class="error-message">Name is required</p>
        </div>
      </div>

      <div class="input-group">
        <label for="email">Email</label>
        <input
          @blur="$v.email.$touch()"
          type="email"
          id="email"
          placeholder="Your Email"
          v-model="email"
          :class="{ 'form-error': $v.email.$error }"
        />
        <div v-if="$v.email.$error">
          <p v-if="!$v.email.required" class="error-message">Email is required</p>
          <p v-if="!$v.email.email" class="error-message">Please enter a valid email</p>
        </div>
      </div>
      <div class="input-group">
        <label for="password">Password</label>
        <input
          @blur="$v.password.$touch()"
          type="password"
          id="password"
          placeholder="Your Password"
          v-model="password"
          :class="{ 'form-error': $v.password.$error }"
        />
        <div v-if="$v.password.$error">
          <p v-if="!$v.password.required" class="error-message">Password is required</p>
          <p v-if="!$v.password.minLength" class="error-message">
            Password must have at least
            {{ $v.password.$params.minLength.min }} letters. characters
          </p>
        </div>
      </div>
      <button type="submit" :class="{ disabled: $v.$invalid }" :disabled="$v.$invalid">Sign up</button>

      <router-link :to="{ name: 'login' }">Already have an account? Login</router-link>
    </form>
  </div>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators'
export default {
  name: 'RegisterUser',
  data() {
    return {
      name: null,
      email: null,
      password: null,
      submitStatus: null,
      status: null
    }
  },
  validations: {
    name: {
      required
    },
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(7)
    }
  },
  methods: {
    submit() {
      //Set $dirty flag to true on every single field
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'
        this.$store
          .dispatch('authentication/register', {
            name: this.name,
            email: this.email,
            password: this.password
          })
          .then(() => {
            setTimeout(() => {
              this.submitStatus = 'OK'
            }, 500)
          })
          .then(() => {
            this.$router.push({ name: 'blog-list' })
          })
          .catch(error => {
            this.status = error.response.status
          })
      }
    }
  }
}
</script>
