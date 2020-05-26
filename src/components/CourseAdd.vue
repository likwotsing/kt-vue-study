<template>
  <div>
    <!-- 表单输入绑定 -->
    <!-- 需要实现input的:value和@input -->
    <!-- <input type="text" v-model="course" v-on:keydown.enter="addCourse"> -->
    <input v-focus :value="value" @input="onInput" @keydown.enter="addCourse" />

    <!-- 事件处理 -->
    <button v-on:click="addCourse">新增课程</button>
  </div>
</template>

<script>
export default {
  props: ["value"],
  data() {
    return {};
  },
  methods: {
    addCourse() {
      // 发送自定义事件通知父组件
      // 注意事件名称定义时不要有大写字母出现
      // this.$emit('add-course', this.course)
      // 派发事件不再需要传递数据
      this.$emit("add-course");
      // this.course = ''
    },
    onInput(e) {
      this.$emit("input", e.target.value);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>