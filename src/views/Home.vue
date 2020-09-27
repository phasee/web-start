<template>
  <div class="home">
  </div>
</template>

<script>
export default {
  name: 'Home',
  props: {
    message: {
      type: Object
    }
  },
  mounted () {
    if (this.message) {
      this.$emit('show-message', this.message)
    }
  },
  data () {
    return {
      isVisible: false
    }
  }
}
</script>
