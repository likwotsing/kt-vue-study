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
          @click="onClick(c)"
        >
          <!-- <router-link :to="`/course/${c.name}`"> -->
          <!-- <router-link :to="`/admin/course/${c.name}`"> -->
            {{ c.name }} - ￥ {{ c.price | currentcy('RMB') }}
          <!-- </router-link> -->
        </li>
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
  },
  methods: {
    onClick(c) {
      this.selectedCourse = c
      // this.$router.push(`/admin/course/${c.name}`)
      // 命名的路由
      this.$router.push({
        name: 'Detail',
        params: {
          name: c.name
        }
      })
    }
  },
};
</script>

<style scoped>
.active {
  background-color: #ddd;
}
</style>