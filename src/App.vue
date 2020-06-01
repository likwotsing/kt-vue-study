<template>
  <div id="app">
    <!-- 导航链接 -->
    <div>
      <router-link to="/">首页</router-link>
      <router-link to="/admin">管理</router-link>
    </div>
    <!-- 路由出口 -->
    <!-- include里是组件名称，不是路由名称 -->
    <keep-alive include="Admin">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>

export default {
  name: "App"
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
