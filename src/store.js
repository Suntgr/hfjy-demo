import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    info: {
      phone: '',
      name: ''
    }
  },
  getters: {
    info: state => state.info
  },
  mutations: {
    setInfo (state, info) {
      state.info.phone = info.phone
      state.info.name = info.name
    }
  },
  actions: {
    setInfo ({ commit }, info) {
      setTimeout(() => {
        commit('setInfo', info)
      }, 1000)
    }
  }
})
