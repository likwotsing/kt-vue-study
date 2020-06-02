import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import myPlugin from './plugins/persist'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true, // 严格模式
  modules: {
    user
  },
  plugins: [myPlugin]
})
