import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import Admin from '../views/Admin.vue'
import store from '../store'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/course/:name',
    component: () => import('@/views/Detail.vue')
  },
  {
    path: '*',
    component: () => import('@/views/404.vue')
  }
]

const router = new VueRouter({
  routes
})

// 全局守卫
// router.beforeEach((to, from, next) => {
//   if (to.meta.auth) {
//     if (window.isLogin) {
//       next()
//     } else {
//       console.log('to', to)
//       next('/login?redirect=' + to.fullPath)
//     }
//   } else {
//     next()
//   }
// })
// 全局守卫修改为：要求用户必须登录，否则只能去登录页
router.beforeEach((to, from, next) => {
  // if (window.isLogin) {
  if (store.state.user.isLogin) {
    if (to.path === '/login') {
      next('/') // 如果已经是登录页，就去首页
    } else {
      next()
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login?redirect=' + to.fullPath)
    }
  }
})
export default router
