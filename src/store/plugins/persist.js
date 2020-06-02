export default store => {
  // 初始化时从localStorage获取数据
  if (localStorage) {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      store.commit('user/login')
      store.commit('user/setUsername', user.username)
    }
  }
  // 用户状态发生变化时缓存之
  store.subscribe((mutation, state) => {
    if (mutation.type === ('user/login')) {
      localStorage.setItem('user', JSON.stringify(state.user))
    } else if (mutation.type === 'user/logout') {
      localStorage.removeItem('user')
    }
  })
}