import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import IconSvg from 'comps/IconSvg.vue'
import '@/icons'

Vue.config.productionTip = false

// 全局注册svg-icon
Vue.component('icon-svg', IconSvg)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
