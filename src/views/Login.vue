<template>
  <div>
    <!-- <button @click="login" v-if="!isLogin">登录</button> -->
    <!-- <button @click="login" v-if="!$store.state.isLogin">登录</button> -->
    <button @click="login" v-if="!isLogin">登录</button>
    <button @click="logout" v-else>注销</button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
  export default {
    methods: {
      login() {
        // window.isLogin = true
        // this.$store.commit('user/login')
        // this.$store.dispatch('user/login', 'admin').then(() => {
        this['user/login']('admin').then(() => {
          // 动态添加之前不存在的路由
          this.$router.addRoutes([
            {
              path: '/admin',
              name: 'Admin',
              // route level code-splitting
              // this generates a separate chunk (about.[hash].js) for this route
              // which is lazy-loaded when the route is visited.
              component: () => import(/* webpackChunkName: "admin" */ '../views/Admin.vue'),
              // component: Admin
              children: [
                {
                  // path: '/admin/course/:name',
                  path: 'course/:name',
                  name: 'Detail',
                  component: () => import('@/views/Detail.vue')
                }
              ],
              meta: {
                auth: true
              },
              // beforeEnter(to, from, next) {
              //   // 路由独享守卫
              //   if (window.isLogin) {
              //     next()
              //   } else {
              //     console.log('to', to)
              //     next('/login?redirect=' + to.fullPath)
              //   }
              // }
            }
          ])
          this.$router.push(this.$route.query.redirect)
        }).catch(() => {
          alert('用户名或密码错误')
        })
      },
      logout() {
        // window.isLogin = false
        // this.$store.commit('user/logout')
        this['user/logout']()
        this.$router.push('/')
      },
      ...mapActions(['user/login', 'user/logout'])
    },
    computed: {
      // isLogin() {
      //   // return window.isLogin
      //   return this.$store.state.user.isLogin
      // },
      // 使用对象展开运算符将此对象混入到外部对象中
      ...mapState('user', ['isLogin'])
    },
  }
</script>

<style lang="scss" scoped>

</style>