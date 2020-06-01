<template>
  <div class="admin">
    <message ref="msg" class="success">
      <template v-slot:title>恭喜</template>
      <template>新增课程成功！</template>
    </message>
    <!-- <img alt="Vue logo" src="@/assets/logo.png" /> -->
    <img alt="Vue logo" :src="`${publicPath}assets/logo.png`" />
    <!-- <img alt="Vue logo" src="@/assets/logo.png" /> -->
    <p>
      <input class="inp" type="text" v-model="price" />
      <button @click="batchUpdate">批量更新价格</button>
    </p>
    <CourseAdd v-model="course.name" @add-course="addCourse" />
    <CourseList :courses="courses" />

    <!-- 嵌套路由出口 -->
    <router-view></router-view>
  </div>
</template>

<script>
import { getCourses } from "@/api/course.js";
import CourseList from "@/components/CourseList.vue";
import CourseAdd from "@/components/CourseAdd.vue";
import Message from "@/components/Message.vue";

export default {
  name: 'Admin',
  components: {
    CourseList,
    CourseAdd,
    Message
  },
  data() {
    return {
      title: "购物车案例",
      // courses: ['web全栈', 'web高级'],
      courses: [],
      totalCount: 0,
      price: 100,
      course: {
        name: ""
      },
      publicPath: process.env.BASE_URL
    };
  },
  async created() {
    const courses = await getCourses();
    console.log(courses);
    this.courses = courses;

    // 初始化价格
    this.batchUpdate();
  },
  watch: {
    // 下面这种不能生效，因为初始化时不会触发
    // courses(newValue, oldValue) {
    //   this.totalCount = newValue.length + '门'
    // }
    courses: {
      immediate: true,
      // deep: true,
      handler(newValue) {
        this.totalCount = newValue.length + "门";
      }
    }
  },
  methods: {
    addCourse() {
      // 增加输入校验
      if (this.course.name) {
        this.courses.push(this.course);
        this.course = {
          name: ""
        };
        // 更新提示框状态
        // this.show = true
        // 使用$refs.msg访问自定义组件
        this.$refs.msg.toggle();
      } else {
        // 提示警告信息
        this.showWarn = true;
      }
    },
    batchUpdate() {
      this.courses.forEach(c => {
        if (!c) {
          // 如果输入的课程名称为空
          return;
        }
        // c.price = this.price // 不会生效
        this.$set(c, "price", this.price); // 生效
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    // 组件内守卫
      if (window.isLogin) {
        next()
      } else {
        next('/login?redirect=' + to.fullPath)
      }
  }
}
</script>