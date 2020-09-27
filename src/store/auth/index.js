import { auth } from '@/services/auth'

const state = () => ({
  currentUser: null
})

const getters = {
  isLoggedIn: (state) => !!state.currentUser
}

const mutations = {
  SET_CURRENT_USER: (state, user) => {
    state.currentUser = user
  }
}

const actions = {
  signUpWithEmail: (context, { username, email, password }) => {
    return new Promise((resolve, reject) => {
      auth.createUserWithEmailAndPassword(email, password)
        .then((credentials) => {
          credentials.user.updateProfile({
            displayName: username
          }).then(() => resolve(credentials.user))
            .catch((error) => reject(error))
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          console.log('error creating user with email/password', { errorCode, errorMessage })
          reject(error)
        })
    })
  },
  signInWithEmail: (context, { email, password }) => {
    return new Promise((resolve, reject) => {
      auth.signInWithEmailAndPassword(email, password)
        .then((user) => {
          resolve(user)
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          console.log('error signing in with email/password', { errorCode, errorMessage })
          reject(error)
        })
    })
  },
  logout: ({ commit, state }) => {
    return new Promise((resolve, reject) => {
      auth.signOut().then(() => {
        commit('SET_CURRENT_USER', null)
        resolve()
      }).catch((error) => reject(error))
    })
  },
  checkUserState: ({ commit, state }) => {
    return new Promise((resolve, reject) => {
      try {
        auth.onAuthStateChanged((user) => {
          if (user) {
            commit('SET_CURRENT_USER', user)
            resolve(user)
          } else {
            reject(new Error('User not logged in'))
          }
        })
      } catch (error) { reject(error) }
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
