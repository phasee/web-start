import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { date, time, currency } from '@/utils/filters'
import { auth } from '@/services/auth'

Vue.config.productionTip = false

Vue.filter('formatDate', date)
Vue.filter('formatTime', time)
Vue.filter('currency', currency)

router.beforeEach((to, from, next) => {
  const currentUser = !!auth.currentUser

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth) {
    if (currentUser) {
      next()
    } else {
      next({ name: 'Login' })
    }
  } else {
    next()
  }
})

let app

auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  }
})
