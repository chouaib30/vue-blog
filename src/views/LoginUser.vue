<template>
  <div>
    <section class="hero">
      <div class="inner-container">
        <h1>Sign In</h1>
      </div>
    </section>

    <form @submit.prevent="submit">
      <p v-if="status === 400" :class="{ 'error-status': status === 400 }">
        Email or Password is incorrect, Please check again
      </p>
      <p class="typo__p" v-if="submitStatus === 'OK'">Welcome Back !!</p>
      <p class="typo__p" v-if="submitStatus === 'ERROR'">
        Please fill the form correctly.
      </p>
      <p class="typo__p" v-if="submitStatus === 'PENDING'">Sending...</p>
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
          <p v-if="!$v.email.required" class="error-message">
            Email is required
          </p>
          <p v-if="!$v.email.email" class="error-message">
            Please enter a valid email
          </p>
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
          <p v-if="!$v.password.required" class="error-message">
            Password is required
          </p>
        </div>
      </div>
      <button
        type="submit"
        :class="{ disabled: $v.$invalid }"
        :disabled="$v.$invalid"
      >
        Login
      </button>
      <router-link :to="{ name: 'register' }"
        >Don't have an account? Sign up</router-link
      >
    </form>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
export default {
  name: 'LoginUser',
  data() {
    return {
      email: null,
      password: null,
      submitStatus: null,
      status: null
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required
    }
  },
  methods: {
    submit() {
      //Set $dirty flag to true on every single field
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.$store
          .dispatch('authentication/login', {
            email: this.email,
            password: this.password
          })
          .then(() => {
            setTimeout(() => {
              this.submitStatus = 'OK'
            }, 2000)
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
