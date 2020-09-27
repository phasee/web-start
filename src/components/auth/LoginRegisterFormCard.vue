<template>
  <v-card>
    <v-card-title>{{ isLogin ? 'Login' : 'Register' }}</v-card-title>
    <v-card-text>
      <div v-if="errors.length > 0">
        <v-alert
          type="error"
          v-for="error in errors"
          :key="error"
        >
          {{ error }}
        </v-alert>
      </div>
      <v-text-field
        v-model="username"
        label="Username"
        v-if="!isLogin"
      >
      </v-text-field>
      <v-text-field
        v-model="email"
        label="E-mail"
      ></v-text-field>
      <v-text-field
        v-model="password"
        label="Password"
        :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
        :type="showPassword ? 'text' : 'password'"
        @click:append="showHidePassword"
      ></v-text-field>
      <v-text-field
        v-model="confirmPassword"
        label="Confirm Password"
        :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
        :type="showPassword ? 'text' : 'password'"
        @click:append="showHidePassword"
        v-if="!isLogin"
      ></v-text-field>
    </v-card-text>
    <v-card-actions>
      <router-link :to="isLogin
        ? { name: 'Register' }
        : { name: 'Login' }">
        {{ isLogin ? 'Don\'t have an account? Register' : 'Already have an account? Login' }}
      </router-link>
      <v-spacer></v-spacer>
      <v-btn
        color="error"
        @click.prevent="cancel"
      >Cancel</v-btn>
      <v-btn
        color="primary"
        :loading="isLoading"
        @click.prevent="handleFormSubmit"
      >{{ isLogin ? 'Login' : 'Register' }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'

import {
  validateUsername,
  validateEmail,
  validatePasswordRegister,
  validatePasswordLogin,
  handleAuthError
} from '@/utils/forms/validation'

export default {
  props: {
    isLogin: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: [],
      showPassword: false,
      isLoading: false
    }
  },
  methods: {
    ...mapActions('auth', ['signUpWithEmail', 'signInWithEmail']),
    ...mapActions('announcement', ['showMessage']),
    showHidePassword () {
      this.showPassword = !this.showPassword
    },
    resetErrors () { this.errors = [] },
    checkErrors () {
      this.resetErrors()
      this.errors.push(...validateEmail(this.email))

      if (this.isLogin) {
        this.errors.push(...validatePasswordLogin(this.password))
      } else {
        this.errors.push(...validateUsername(this.username), ...validatePasswordRegister(this.password, this.confirmPassword))
      }
    },
    async handleFormSubmit () {
      this.toggleLoading()
      this.checkErrors()

      if (this.errors.length === 0) {
        if (this.isLogin) {
          await this.signInWithEmail({ email: this.email, password: this.password }).catch(error => {
            this.errors.push(...handleAuthError(error))
            this.toggleLoading()
          })
        } else {
          await this.signUpWithEmail({ username: this.username, email: this.email, password: this.password }).catch(error => {
            this.errors.push(...handleAuthError(error))
            this.toggleLoading()
          })
        }
        this.redirect()
      } else {
        this.toggleLoading()
      }
    },
    toggleLoading () {
      this.isLoading = !this.isLoading
    },
    cancel () {
      this.resetForm()
      this.$router.push({ name: 'Home' })
    },
    redirect () {
      if (this.errors.length === 0) {
        this.resetForm()
        this.showMessage({ type: 'success', text: this.isLogin ? 'Logged in successfully' : 'Registered successfully' })
        this.$router.replace({ name: 'Home' })
      }
    },
    resetForm () {
      this.email = ''
      this.password = ''
      this.showPassword = false
      this.isLoading = false
      this.errors = []
    }
  }
}
</script>

<style>
</style>
