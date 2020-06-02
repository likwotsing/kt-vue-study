<template>
  <div id="app">
    <!-- 导航链接 -->
    <div>
      <router-link to="/">首页</router-link>
      <router-link to="/admin">管理</router-link>
    </div>
    <p v-if="isLogin">
      {{ welcome }}
      <button @click="logout">注销</button>
    </p>
    <!-- 路由出口 -->
    <!-- include里是组件名称，不是路由名称 -->
    <keep-alive include="Admin">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  name: "App",
  computed: {
    ...mapState('user', ['isLogin']),
    ...mapGetters('user', ['welcome'])
  },
  methods: {
    logout() {
      this.$router.push('/')
      this['user/logout']()
    },
    ...mapMutations(['user/logout'])
  }
};
</script>

<style scoped lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.inp {
  color: $color;
}
</style>
