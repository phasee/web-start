<template>
  <v-snackbar
    :value="showMessage"
    :color="message.type"
    :timeout="timeout"
    top
  >{{ message.text }}</v-snackbar>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      showMessage: (state) => state.announcement.showMessage,
      message: (state) => state.announcement.message,
      timeout: (state) => state.announcement.timeout
    })
  }
}
</script>

<style>
</style>
