import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from 'vuex-persist'
import auth from './auth'
import user from './user'
import planner from './planner'
import frytter from './frytter'

const vuexPersist = new VuexPersist({
  key: 'my-app',
  storage: window.localStorage
})

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    theme: 'dark',
    error: null,
  },
  mutations: {
    changeTheme(state, themeName) {
      state.theme = themeName
    },
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    }
  },
  modules: {
    frytter,
    auth,
    user,
    planner
  },
  getters: {
    getTheme: state => state.theme,
    getError: state => state.error
  },
  plugins: [vuexPersist.plugin]
});