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
            Web Start
          </router-link>
        </v-toolbar-title>
      </div>

      <v-spacer></v-spacer>
      <div v-if="isLoggedIn">
        <v-btn
          @click.prevent="logout"
          class="white--text app-bar-link`"
          tag="a"
        >Logout</v-btn>
      </div>
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

export default {
  name: 'App',
  components: { MessageDialog },
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
