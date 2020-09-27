<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
        <v-toolbar-title>
          <router-link
            :to="{ name: 'Home'}"
            class="white--text site-title"
          >
            Giggity
          </router-link>
        </v-toolbar-title>
      </div>

      <v-spacer></v-spacer>
      <v-row v-if="isLoggedIn">
        <v-spacer></v-spacer>
        <v-col cols="auto">
          <Cart />
        </v-col>
        <v-col cols="auto">
          <v-btn
            tag="a"
            text
            @click.prevent="logout"
          >Logout</v-btn>
        </v-col>
      </v-row>
      <div v-else>
        <router-link
          :to="{ name: 'Login' }"
          class="white--text app-bar-link`"
        >Login / Register</router-link>
      </div>
    </v-app-bar>

    <v-main>
      <v-container>
        <MessageDialog />
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'

import MessageDialog from '@/components/framework/MessageDialog'
import Cart from '@/components/cart/Cart'

export default {
  name: 'App',
  components: { MessageDialog, Cart },
  data: () => ({
    ...mapState('auth', ['currentUser'])
  }),
  computed: {
    ...mapGetters('auth', ['isLoggedIn'])
  },
  created () {
  },
  mounted () {
    this.checkUserState()
  },
  methods: {
    ...mapActions('auth', ['checkUserState', 'logout'])
  }
}
</script>

<style lang="scss">
.site-title {
  text-decoration: none;
}

.app-bar-link {
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}
</style>
