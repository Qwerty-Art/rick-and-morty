import { createStore } from 'vuex'

export default createStore({
  state: {
    titlePage: {
      title: '',
      info: ''
    }
  },
  mutations: {
    setTitlePage(state, payload) {
      state.titlePage.title = payload.title
      state.titlePage.info = payload.info
    }
  },
  actions: {
    setTitlePage(context, payload) {
      context.commit('setTitlePage', payload)
    }
  },
  getters: {
    getTitlePage(state) {
      return state.titlePage;
    }
  },

  modules: {
  }
})
