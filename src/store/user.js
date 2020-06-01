export default {
  namespaced: true,
  state: {
    isLogin: false
  },
  mutations: {
    login(state) {
      state.isLogin = true
    },
    logout(state) {
      state.isLogin = false
    }
  },
  actions: {
    login({ commit }, username) {
      // 模拟登陆api，1s以后如果用户名是admin则登陆成功
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (username === 'admin') {
            commit('login')
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