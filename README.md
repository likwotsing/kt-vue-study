# vue-study

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## 路由

### 动态路由匹配

我们经常需要把某种模式匹配到的所有路由，全都映射到同个组件。例如，我们有一个`User`组件，对于所有ID各不相同的用户，都要使用这个组件来渲染。那么，我们可以在`vue-router`的路由路径中使用“动态路径参数”(dynamic segment)来达到这个效果：

```js
{ path: '/user/:id', component: User }
```

范例：查看课程详情，views/Detail.vue

```vue
<template>
  <div>
    <h2>detail page</h2>
    <p>{{ $route.params.name }}</p>
  </div>
</template>
```

router/index.js

```js
  {
    path: '/course/:name',
    component: () => import('@/views/Detail.vue')
  }
```

列表中的导航，components/CourseList.vue

```vue
<router-link :to="`/admin/course/${c.name}`">
	{{ c.name }} - ￥ {{ c.price | currentcy('RMB') }}
</router-link>
```

#### 通配符

适合做404页面路由

```js
  {
    path: '*',
    component: () => import('@/views/404.vue')
  }
```

### 嵌套路由

实际生活中的应用界面，通常由多层嵌套的组件组合而成。同样地，URL中各段动态路径也按某种结构对应嵌套的各层组件，例如：

```txt
/user/foo/profile                     /user/foo/posts
+------------------+                  +-----------------+
| User             |                  | User            |
| +--------------+ |                  | +-------------+ |
| | Profile      | |  +------------>  | | Posts       | |
| |              | |                  | |             | |
| +--------------+ |                  | +-------------+ |
+------------------+                  +-----------------+
```

范例：嵌套方式显示课程详情

路由配置

```vue
// router/index.js
{
    path: '/admin',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "admin" */ '../views/Admin.vue'),
    children: [
        {
            // path: '/admin/course/:name', // 写全路由
            path: 'course/:name', // 使用相对路径
            name: 'Detail',
            component: () => import('@/views/Detail.vue')
        }
	]
}
```

components/CourseList.vue

```vue
<router-link :to="`/admin/course/${c.name}`">
{{ c.name }} - {{ c.price | currency('￥') }}
</router-link>
```

views/Admin.vue

```vue
<!-- 嵌套路由出口 -->
<router-view></router-view>
```

### 组件复用时的注意事项

Detail.vue

```js
watch: {
    $route: {
        handler: () => {
            console.log("$route change");
        },
        immediate: true
    }
}
```

### 编程导航

借助router的实例方法，可编写代码来实现编程式导航

```js
router.push(location, onComplete?, onAbort?)
```

```js
// 字符串
router.push('home')
// 对象
router.push({ path: 'home' })
// 命名的路由
router.push({ name: 'user', params: { userId: '123' }})
// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})
```

范例：修改课程详情跳转为编程导航

```vue
<li
	@click="onClick(c)"
>
    {{ c.name }} - ￥ {{ c.price | currentcy('RMB') }}
</li>
<script>
export default {
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
  }
}
</script>
```

### 命名路由

通过一个名称来标识一个路由显得更方便一些，特别是在链接一个路由，或者是执行一些跳转的时候，可以在创建Router实例的时候，在`routes`配置中给路由设置名称。

```js
const router = new VueRouter({
    routes: [
        {
            path: '/user/:id',
            name: 'user',
            component: User
        }
    ]
})
```

要链接到一个命名路由，可以给`router-link`的`to`属性传一个对象：

```vue
<router-link :to="{ name: 'user', params: {id: 123 }}" >User</router-link>
```

调用`router.push()`时：

```js
router.push({ name: 'user', params: { id: 123 }})
```

### 路由守卫

`vue-router`提供的导航守卫主要用来通过跳转或取消的方式守卫导航。有多种机会植入路由导航过程：全局的，单个路由独享的，或者组件级的。

#### 全局守卫

```js
router.beforeEach((to, from, next) => {
// ...
// to: Route: 即将要进入的目标 路由对象
// from: Route: 当前导航正要离开的路由
// next: Function: 一定要调用该方法来 resolve 这个钩子。
})
```

范例：守卫Admin.vue

```js
{
    path: '/admin',
    name: 'Admin',
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
    }
```

```js
router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    if (window.isLogin) {
      next()
    } else {
      console.log('to', to)
      next('/login?redirect=' + to.fullPath)
    }
  } else {
    next()
  }
})
```

views/Login.vue

```vue
<template>
    <div>
        <button @click="login" v-if="!isLogin">登录</button>
        <button @click="logout" v-else>登出</button>
    </div>
</template>
<script>
export default {
    methods: {
        login() {
            window.isLogin = true
            this.$router.push(this.$route.query.redirect)
        },
        logout() {
        	window.isLogin = false
        }
    },
    computed: {
        isLogin() {
        	return window.isLogin
        }
    },
}
</script>
```

#### 路由独享守卫

可以在路由上直接定义`beforeEnter`守卫：

```js
{
    path: '/about',
    name: 'about',
    // ...
    beforeEnter(to, from, next) {
        if (to.meta.auth) {
            if (window.isLogin) {
            	next()
        	} else {
            	next('/login?redirect=' + to.fullPath)
            }
        } else {
            next()
        }
    }
}
```

#### 组件内守卫

可以在路由组件内直接定义以下路由导航守卫：

- beforeRouteEnter
- beforeRouteUpdate
- beforeRouteLeave

```js
// Admin.vue
beforeRouteEnter(to, from, next) {
    if (window.isLogin) {
    	next();
    } else {
    	next("/login?redirect=" + to.fullPath);
    }
}
```

### 数据获取

路由激活时，[获取数据]([https://router.vuejs.org/zh/guide/advanced/data-fetching.html#%E5%AF%BC%E8%88%AA%E5%AE%8C%E6%88%90%E5%90%8E%E8%8E%B7%E5%8F%96%E6%95%B0%E6%8D%AE](https://router.vuejs.org/zh/guide/advanced/data-fetching.html#导航完成后获取数据))的时机有两个

#### 路由导航前

```js
// 组件未渲染，通过给next传递回调访问组件实例
beforeRouteEnter (to, from, next) {
    getPost(to.params.id, post => {
    	next(vm => vm.setData(post))
    })
},
// 组件已渲染，可以访问this直接赋值
beforeRouteUpdate (to, from, next) {
	this.post = null
    getPost(to.params.id, post => {
    	this.setData(post)
    	next()
    })
},
```

#### 路由导航后

```js
created () {
	this.fetchData()
},
watch: {
	'$route': 'fetchData'
}
```

### 动态添加路由

通过router.addRoutes(routes)方式动态添加路由

```js
// 全局守卫修改为：要求用户必须登录，否则只能去登录页
router.beforeEach((to, from, next) => {
    if (window.isLogin) {
        if (to.path === '/login') {
        	next('/')
        } else {
        	next()
        }
    } else {
        if (to.path === '/login') {
        	next()
        } else {
        	next('/login?redirect=' + to.fullPath)
        }
    }
})
```

```js
// Login.vue 用户登录成功后动态添加/admin
login() {
    window.isLogin = true;
    this.$router.addRoutes([
        {
        	path: "/admin", //...
        }
    ]);
    const redirect = this.$route.query.redirect || "/";
    this.$router.push(redirect);
}
```

### 路由组件缓存

利用keep-alive做组件缓存，保留组件状态，提高执行效率

范例：缓存admin组件

```vue
<keep-alive include="admin">
	<router-view></router-view>
</keep-alive>
```

> include/exclude的name是组件名称，不是路由name
>
> 两个特别的生命周期：activated、deactivated

### 路由懒加载

路由组件的懒加载能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了

```js
component: () => import('../views/Admin.vue')
```

把组件按组分块：

```js
component: () => import(/* webpackChunkName 'admin' */ '../views/Admin.vue')
```

