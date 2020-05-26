<template>
  <div>
    <!-- 条件渲染 -->
    <p v-if="courses.length === 0">没有任何课程信息</p>

    <!-- 列表渲染 -->
    <ul v-else>
      <!-- class绑定 -->
      <!-- <li
              v-for="c in courses"
              :class="{active: (selectedCourse === c)}"
              @click="selectedCourse = c"
      >{{c}}</li>-->

      <!-- style绑定 -->
      <transition-group name="fade">
        <li
          v-for="c in courses"
          :key="c.name"
          :style="{backgroundColor: (selectedCourse === c) ? '#ddd' : 'transparent'}"
          @click="selectedCourse = c"
        >{{ c.name }} - ￥ {{ c.price | currentcy('RMB') }}</li>
      </transition-group>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    // 新增课程时也要方位courses，因此作为属性传递
    courses: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      // 改状态属于course-list内部状态，因此作为数据
      selectedCourse: "" // 保存选中项
    };
  },
  filters: {
    currentcy(value, symbol = "￥") {
      return symbol + value;
    }
  }
};
</script>

<style scoped>
.active {
  background-color: #ddd;
}
</style>