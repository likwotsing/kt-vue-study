import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// 自定义指令
Vue.directive('focus', {
  inserted(el) {
    el.focus()
  }
})

// 添加事件总线
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
