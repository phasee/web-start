const state = () => ({
  message: {
    type: 'success',
    text: ''
  },
  showMessage: false,
  timeout: 3000
})

const mutations = {
  UPDATE_MESSAGE: (state, { type, text }) => {
    state.message = { type, text }
  },
  SHOW_MESSAGE: (state) => {
    state.showMessage = true
  },
  RESET_VISIBILITY: (state) => {
    state.showMessage = false
  }
}

const actions = {
  showMessage: ({ state, commit, dispatch }, { type, text }) => {
    commit('RESET_VISIBILITY')
    commit('UPDATE_MESSAGE', { type, text })
    commit('SHOW_MESSAGE')
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
