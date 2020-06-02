export default {
  namespaced: true,
  state: {
    isLogin: false,
    username: ''
  },
  mutations: {
    login(state, username) {
      state.isLogin = true
      state.username = username
    },
    logout(state) {
      state.isLogin = false
      state.username = ''
      return 'haha'
    },
    setUsername(state, username) {
      state.username = username
    }
  },
  getters: {
    welcome: state => {
      return state.username + ', 欢迎回来'
    }
  },
  actions: {
    login({ commit }, username) {
      // 模拟登陆api，1s以后如果用户名是admin则登陆成功
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (username === 'admin') {
            commit('login', username)
            resolve()
          } else {
            reject()
          }
        }, 1000)
      })
    }
  },
  modules: {
  }
}