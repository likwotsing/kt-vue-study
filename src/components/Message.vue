<template>
  <transition
    :css="false"
    @before-enter="beforeEnter"
    @enter="enter"
    @before-leave="beforeLeave"
    @leave="leave"
  >
    <div class="message-box" v-if="show">
      <strong>
        <slot name="title"></slot>
      </strong>
      <slot></slot>
      <!-- toggle内部修改显示状态 -->
      <span class="message-box-close" @click="toggle">x</span>
    </div>
  </transition>
</template>

<script>
import Velocity from "velocity-animate";
export default {
  data() {
    return {
      show: false
    };
  },
  methods: {
    // 增加toggle方法维护toggle状态
    toggle() {
      this.show = !this.show;
    },
    beforeEnter(el) {
      el.style.opacity = 0; // 设置初始状态
    },
    enter(el, done) {
      Velocity(el, { opacity: 1 }, { duration: 500, complete: done });
    },
    beforeLeave(el) {
      el.style.opacity = 1;
    },
    leave(el, done) {
      Velocity(el, { opacity: 0 }, { duration: 500, complete: done });
    }
  },
  mounted() {
    // 监听关闭事件
    // this.$bus.$on('message-close', () => {
    //   this.$emit('update:show', false)
    // })
    // 修改message-close回调为toggle
    this.$bus.$on("message-close", this.toggle);
  }
};
</script>

<style scoped>
/* 重构样式：提取出.success, 并添加.warning */
.message-box {
  padding: 10px 20px;
}
.success {
  background: #4fc08d;
  border: 1px solid #42b983;
}
.warning {
  background: #f66;
  border: 1px solid #d63200;
}
.message-box-close {
  float: right;
}
/* 定义过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>