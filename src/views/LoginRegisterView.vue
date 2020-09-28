<template>
  <LoginRegisterFormCard :isLogin="isLogin" />
</template>

<script>
import LoginRegisterFormCard from '@/components/auth/LoginRegisterFormCard'

export default {
  components: { LoginRegisterFormCard },
  props: {
    isLogin: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style>
</style>
