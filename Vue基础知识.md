> Vue.js的版本是2.6.10

https://github.com/57code/vue-study/tree/web17

# Vue基础知识

## Vue模板语法

Vue.js使用了基于HTML的[模板语法](https://cn.vuejs.org/v2/guide/syntax.html)，允许开发者声明式地将DOM绑定至底层Vue实例的数据。所有Vue.js的模板都是合法的HTML，所以能被遵循规范的浏览器和HTML解析器解析。

### 插值文本

数据绑定最常见的形式就是使用Mustache语法（双大括号）的文本插值

```html
<div id="app">
    <h2>
        <!-- 插值文本 -->
        {{ title }}
    </h2>
</div>
<script src="vue.js"></script>
<script>
	const app = new Vue({
        el: '#app',
        data: {
            title: 'kt购物车'
        }
    })
</script>
```

### 特性

HTML特性不能用Mustache语法，应该使用v-bind指令

```html
<div id="app">
    <!-- 特性、属性值绑定使用v-bind指令 -->
    <h2 v-bind:title="title">...</h2>
</div>
```

### 列表渲染

可以用`v-for`指令基于一个数组来渲染一个列表。`v-for`指令需要使用`item in items`形式的特殊语法，其中`items`是源数据数组，而`item`则是被迭代的数组元素的**别名**。

```html
<div id="app">
    <!-- 条件渲染 -->
    <p v-if="courses.length === 0">没有任何课程信息</p>
    <!-- 列表渲染 -->
    <ul>
        <li v-for="c in courses">{{c}}</li>
    </ul>
</div>
<script src="vue.js"></script>
<script>
	const app = new Vue({
        el: '#app',
        data: {
            courses: ['web全栈', 'web高级']
        }
    })
</script>
```

### 表单输入绑定

可以用`v-model`指令在表单`<input>`、`<textarea>`及`<select>`元素上创建双向数据绑定。**它会根据控件类型自动选取正确的方法来更新元素**。`v-model`本质上是语法糖。它将转换为输入事件以更新数据，并对一些极端场景进行一些特殊处理。

```html
<!-- 表单输入绑定 -->
<input v-model="course" type="text" v-on:keydown.enter="addCourse">
```

### 事件处理

可以用`v-on`指令监听DOM事件，并在触发时运行一些JavaScript代码

```html
<!-- 事件处理 -->
<button v-on:click="addCourse">新增课程</button>
<script>
	const app = new Vue({
        methods: {
            addCourse() {
                this.courses.push(this.course)
            }
        }
    })
</script>
```

### class与style绑定

操作元素的class列表和内联样式是数据绑定的一个常见需求。因为它们都是属性，所以可以用`v-bind`处理它们：只需要通过表达式计算出字符串结果即可。不过，字符串拼接麻烦且易错。因此，在将`v-bind`用于`class`和`style`时，Vue.js做了专门的增强。**表达式结果的类型除了字符串之外，还可以是对象或数组**。

```html
<style>
    .active {
        background-color: #ddd;
    }
</style>
<ul>
    <!-- class绑定 -->
    <!-- <li
v-for="c in courses"
:class="{active: (selectedCourse === c)}"
@click="selectedCourse = c"
>{{c}}</li> -->
    <!-- style绑定 -->
    <li
        v-for="c in courses"
        :style="{backgroundColor: (selectedCourse === c) ? '#ddd' : 'transparent'}"
        @click="selectedCourse = c"
        >{{ c }}</li>
</ul>
```

### 计算属性和监听器

模板内的表达式非常便利，但是设计它们的初衷是用于简单运算的。在模板中放入太多的逻辑会让模板过重且难以维护，此时就可以考虑计算属性和监听器。

```html
<p>
    <!-- 绑定表达式 -->
    <!-- 课程总数：{{ courses.length + '门'}} -->
    <!-- 计算属性 -->
    <!-- 课程总数：{{ total }} -->
    <!-- 监听器 -->
    课程总数： {{ totalCount }}
</p>
<script>
    const app = new Vue({
      computed: {
        total() {
          return this.courses.length + '门'
        }
      },
        watch: {
            // 下面这种不能生效，因为初始化时不会触发
            // courses(newValue, oldValue) {
            //   this.totalCount = newValue.length + '门'
            // }
            courses: {
                immediate: true,
                    // deep: true,
                    handler(newValue, oldValue) {
                    this.totalCount = newValue.length + '门'
                }
            }
        }
    })
</script>
```

计算属性 vs 监听器

- **监听器更通用**，理论上计算属性能实现的监听器也能实现
- 处理数据的场景不同，监听器适合**一个数据影响多个数据**，计算属性适合**一个数据受多个数据影响**
- **计算属性有缓存性**，计算所得的值如果没有变化不会重复执行
- 监听器适合**执行异步操作或较大开销操作**的情况

## 神奇的模板语法是如何实现的

在底层的实现上，Vue将模板编译成虚拟DOM渲染函数。结合响应系统，Vue能够智能地计算出最少需要重新渲染多少组件，并把DOM操作次数减到最少。

```js
// 输出Vue生成的渲染函数
console.log(app.$options.render)
```

```js
(function anonymous(
) {
with(this){return _c('div',{attrs:{"id":"app"}},[_c('h2',[_v(_s(title))]),_v(" "),_c('h2',{attrs:{"title":title}}),_v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(course),expression:"course"}],attrs:{"type":"text"},domProps:{"value":(course)},on:{"keydown":function($event){if(!$event.type.indexOf('key')&&_k($event.keyCode,"enter",13,$event.key,"Enter"))return null;return addCourse($event)},"input":function($event){if($event.target.composing)return;course=$event.target.value}}}),_v(" "),_c('button',{on:{"click":addCourse}},[_v("新增课程")]),_v(" "),(courses.length === 0)?_c('p',[_v("没有任何课程信息")]):_e(),_v(" "),_c('ul',_l((courses),function(c){return _c('li',{style:({backgroundColor: (selectedCourse === c) ? '#ddd' : 'transparent'}),on:{"click":function($event){selectedCourse = c}}},[_v(_s(c))])}),0),_v(" "),_c('p',[_v("\n      课程总数： "+_s(totalCount)+"\n    ")])])}
})
```

改为渲染函数

```html
<!-- 宿主元素，不需要html模板语法 -->
<div id="app"></div>
<script>
const app = new Vue({
    // 引入render函数
    render() {
        width(this){...}
    }
})
</script>
```

Vue通过它的**编译器**将模板编译成**渲染函数**，在数据发生变化的时候再次执行**渲染函数**，通过对比两次执行结果得出要做的DOM操作，模板中的神奇魔法得以实现。

## 生命周期

每个Vue实例在被创建时都要经过一系列的初始化过程——例如，需要设置数据监听、编译模板、将实例挂载到DOM并在数据变化时更新DOM等，称为Vue实例的[生命周期]([https://cn.vuejs.org/v2/guide/instance.html#%E5%AE%9E%E4%BE%8B%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E9%92%A9%E5%AD%90](https://cn.vuejs.org/v2/guide/instance.html#实例生命周期钩子))

### 使用生命周期钩子

在Vue实例的生命周期过程中会运行一些叫做**生命周期钩子**的函数，这给用户在不同阶段添加自己代码的机会。

```js
// 模拟异步数据调用接口
function getCourses() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(['web全栈', 'web高级'])
        }, 2000)
    })
}
const app = new Vue({
    // created钩子中调用接口
    async created() {
        // 组件实例已创建，由于未挂载，dom还不存在
        const courses = await getCourses()
        this.courses = courses
    },
    mounted() {
        // 可以访问DOM元素
    }
})
```

```js
关于Vue的生命周期，下列哪项是不正确的？()
A、Vue实例从创建到销毁的过程，就是生命周期
B、页面首次加载会触发beforeCreate，created，beforeMount，mounted，beforeUpdate，updated
C、created表示完成数据观测，属性和方法的运算，初始化事件，$el属性还没有显示出来
D、DOM渲染在mounted中就已经完成了
```

### 生命周期

[生命周期图示]([https://cn.vuejs.org/v2/guide/instance.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%BE%E7%A4%BA](https://cn.vuejs.org/v2/guide/instance.html#生命周期图示))、[生命周期列表]([https://cn.vuejs.org/v2/api/#%E9%80%89%E9%A1%B9-%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E9%92%A9%E5%AD%90](https://cn.vuejs.org/v2/api/#选项-生命周期钩子))

结论：

- 三个阶段：初始化、更新、销毁
- 初始化：beforeCreate、created、beforeMount、mounted
- 更新：beforeUpdate、updated
- 销毁：beforeDestroy、destroyed

使用场景：

```js
beforeCreate(){} // 执行时组件实例还未创建，通常用于插件开发中执行一些初始化任务
created(){} // 组件初始化完毕，各种数据可以使用，常用于异步数据获取
beforeMount(){} // 未执行渲染、更新，DOM未创建
mounted(){} // 初始化结束，DOM已创建，可用于获取访问数据和DOM元素
beforeUpdate(){} // 更新前，可用于获取更新前各种状态
updated(){} // 更新后，所有状态已是最新
beforeDestroy(){} // 销毁前，可用于一些定时器或订阅的取消
destroyed(){} // 组件已销毁，作用同上
```

actived：被keep-alive缓存的组件激活时调用

deactivated：被keep-alive缓存的组件停用时调用

errorCaptured：捕获一个来自子孙组件的错误时被调用

## 组件化

[组件](https://cn.vuejs.org/v2/guide/components.html)是可服用的Vue实例，带有一个名字，我们可以在一个通过`new Vue`创建的Vue根实例中，把这个组件作为自定义元素来使用。

### 组件注册、使用及数据传递

Vue.component(name, options)可用于注册组件。

例子：提取课程新增组件和课程列表组件, 04-cart-component.html

```html
<!-- 自定义课程列表组件 -->
<course-list :courses="courses"></course-list>
<script>
    // 注册course-list组件
    Vue.component('course-list', {
      props: {
        // 新增课程时也要方位courses，因此作为属性传递
        courses: {
          type: Array,
          default: []
        }
      },
      data() {
        return {
          // 改状态属于course-list内部状态，因此作为数据
          selectedCourse: '', // 保存选中项
        }
      },
      template: `
        <div>
          <!-- 条件渲染 -->
          <p v-if="courses.length === 0">没有任何课程信息</p>

          <!-- 列表渲染 -->
          <ul>
            <!-- class绑定 -->
            <!-- <li
              v-for="c in courses"
              :class="{active: (selectedCourse === c)}"
              @click="selectedCourse = c"
            >{{c}}</li> -->

            <!-- style绑定 -->
              <li
                v-for="c in courses"
                :style="{backgroundColor: (selectedCourse === c) ? '#ddd' : 'transparent'}"
                @click="selectedCourse = c"
              >{{ c }}</li>
          </ul>
        </div>
      `
    })
 const app = new Vue({
     el: '#app',
     data: {
         title: 'kt购物车'
     }
 })
</script>
```

### 自定义事件及其监听

当子组件需要和父组件进行通信，可以派发并监听自定义事件

范例：新增课程组件派发新事件, 04-cart-component.html

```html
<!-- 自定义课程添加组件 -->
<course-add @add-course="addCourse"></course-add>
<script>
    // 注册course-add组件
    Vue.component('course-add', {
      props: {
        courses: {
          type: Array,
          default: []
        }
      },
      data() {
        return {
          course: ''  // 将course从父组件提取到course-add维护
        }
      },
      methods: {
        addCourse() {
          // 发送自定义事件通知父组件
          // 注意事件名称定义时不要有大写字母出现
          this.$emit('add-course', this.course)
          this.course = ''
        }
      },
      template: `
        <div>
          <!-- 表单输入绑定 -->
          <input type="text" v-model="course" v-on:keydown.enter="addCourse">

          <!-- 事件处理 -->
          <button v-on:click="addCourse">新增课程</button>  
        </div>
      `
    })
const app = new Vue({
    methods: {
        // 回调函数接收事件参数
        addCourse(val) {
          this.courses.push(val)
        }
    }
})
</script>
```

### 在组件上使用v-model

[组件实现v-model]([https://cn.vuejs.org/v2/guide/components-custom-events.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BB%84%E4%BB%B6%E7%9A%84-v-model](https://cn.vuejs.org/v2/guide/components-custom-events.html#自定义组件的-v-model))

范例：改造cours-add为支持v-model的版本,05-cart-com-v-model.html

```html
<!-- 组件使用v-model，需要实现内部input的:value和@input -->
<course-add v-model="course" @add-course="addCourse"></course-add>
<script>
// 注册course-add组件
    Vue.component('course-add', {
      // 接收父组件传递的value，不需要额外维护course
      props: ['value'],
      data() {
        return {
        }
      },
      methods: {
        addCourse() {
          // 派发事件不再需要传递数据
          this.$emit('add-course')
          // this.course = ''
        },
        onInput(e) {
          this.$emit('input', e.target.value)
        }
      },
      template: `
        <div>
          <!-- 表单输入绑定 -->
          <!-- 需要实现input的:value和@input -->
          <!-- <input type="text" v-model="course" v-on:keydown.enter="addCourse"> -->
          <input :value="value" @input="onInput" @keydown.enter="addCourse">

          <!-- 事件处理 -->
          <button v-on:click="addCourse">新增课程</button>  
        </div>
      `
    })
const app = new Vue({
    methods: {
        addCourse() {
          this.courses.push(this.course)
          this.course = ''
        } 
    }
})
</script>
```

>v-model默认转换是:value和@input，如果想要修改这个行为(checkbox等),可以通过model选项
>
>```js
>Vue.component('course-add', {
>    model: {
>        prop: 'value',
>        event: 'change'
>    }
>})
>```

### 通过插槽分发内容

通过使用Vue提供的`<slot>`元素可以给组件传递内容

范例：弹窗组件,06-cart-com-slot.html

```html
<message .show.sync="show">新增课程成功</message>
<!-- .sync的用法是下面的缩写 -->
<message v-bind:show="show" v-on:update:show="show = $event">新增课程成功</message>
<script>
    // slot作为占位符
    Vue.component('message', {
      props: ['show'],
      template: `
        <div class="message-box" v-if="show">
          <slot></slot>
          <span class="message-box-close" @click="$emit('update:show', false)">x</span>
        </div>
      `
    })
const app = new Vue({
    data: {
        show: false // 提示框状态
    },
    methods: {
        addCourse() {
            // 提示信息状态改变
            this.show = true
        }
    }
})
</script>
```

```js
// 当在父组件监听事件时，可以通过$event访问到被抛出的值
v-on:click="handle('ok', $event)"
```

如果存在多个独立内容要分发，可以使用具名插槽v-slot:name

范例：添加一个title部分， 06-cart-com-slot.html

```html
    <!-- 插槽实现内容分发 -->
    <message :show.sync="show">
      <!-- template没有内容时，默认会使用子组件里的slot的内容 -->
      <!-- <template v-slot:title></template> -->
      <!-- template有固定内容时 -->
      <!-- <template v-slot:title>恭喜</template> -->
      <!-- template默认使用父组件的数据 -->
      <!-- <template v-slot:title>{{ title }}</template> -->
      <!-- 作用域插槽：插槽访问子组件的数据 -->
      <template v-slot:title="slotProps">{{ slotProps.title }}</template>
      <template>新增课程成功！</template>
    </message>
<script>
    Vue.component('message', {
      props: ['show'],
      template: `
        <div class="message-box" v-if="show">
          <strong>
            <slot name="title" title="来自message的title"></slot>
          </strong>
          <slot></slot>
          <span class="message-box-close" @click="$emit('update:show', false)">x</span>
        </div>
      `
    })
</script>
```

### Vue组件化的理解

组件化是Vue的精髓，Vue应用就是由一个个组件构成的。Vue的组件化涉及到的内容非常多，当面试时被问到：谈一下你对Vue组件化的理解。这时候可能无从下手，可以从以下几点进行阐述：

**定义**：组件是**可复用的Vue实例**，准确讲它们是VueComponent的实例，继承自Vue

**优点**：可以增加代码的**复用性**、**可维护性**和**可测试性**

**使用场景**：什么时候使用组件？以下分类可作为参考：

- 通用组件：实现最基本的功能，具有通用性、复用性，例如按钮组件、输入框组件、布局组件等
- 业务组件：它们完成具体业务，具有一定的复用性，例如登录组件、轮播图组件
- 页面组件：组织应用各部分独立内容，需要时在不同页面组件间切换，例如列表页、详情页组件

**如何使用组件**

- 定义：Vue.component(), components选项，sfc(单文件组件)
- 分类：有状态组件，functional，abstract
- 通信：props，$emit()/$on(), provide/inject, $children/$parent/$root/$attr/$listeners
- 内容分发：\<slot>, \<template>, v-slot
- 使用及优化：is, keep-alive, 异步组件

functional：组件无状态（没有`data`）和无实例(没有`this`上下文)，用一个简单的`render`函数返回虚拟节点使它们渲染的代价更小

abstract:抽象组件，实现一些逻辑功能，但没有视图，如keep-alive, transition， 自己封装的防抖组件

**组件的本质**：

vue中的组件经历如下过程：

组件配置 => VueComponent实例 => render() => VirtualDOM => DOM

**组件的本质是产生虚拟DOM**

## Vue必会API

### 数据相关API

#### Vue.set

向响应式对象中添加一个属性，并确保这个新属性同样是响应式的，且触发视图更新。

使用方法：`Vue.set(target, propertyName/index, value)`

范例：批量设置商品价格, 07-cart-API.html

```html
<!-- 批量更新价格 -->
<p>
    <input type="text" v-model="price">
    <button @click="batchUpdate">批量更新价格</button>
</p>
<!-- couse-list组件里更新模板选项-->
<li
    v-for="c in courses"
    :style="{backgroundColor: (selectedCourse === c) ? '#ddd' : 'transparent'}"
    @click="selectedCourse = c"
    >
    {{ c.name }} - ￥ {{ c.price }}
</li>
<script>
    function getCourses() {
      return new Promise(resolve => {
        setTimeout(() => {
          // 修改返回数据结构为对象
          // resolve(['web全栈', 'web高级'])
          resolve([{ name: 'web全栈' }, { name: 'web高级' }])
        }, 2000)
      })
    }
const app = new Vue({
    data() {
        return {
            price: 0 // 添加价格
        }
    },
    async created() {
        // 源数据里没有价格，批量添加价格
        this.batchUpdate()
    },
    methods: {
        batchUpdate() {
          this.courses.forEach(c => {
            // c.price = this.price // 不会生效
            Vue.set(c, 'price', this.price) // 生效
          })
        } 
    }
})
</script>
```

#### Vue.delete

删除对象的属性，如果对象是响应式的，确保删除后能触发视图更新

使用方法：`Vue.delete(target, propertyName/index)`

### 事件相关API

#### vm.$on

监听当前实例上的自定义事件。事件可以由`vm.$emit`触发。回调函数会接收所有传入事件触发函数的额外参数。

```js
vm.$on('test', function(msg) {
    console.log(msg)
})
```

#### vm.$emit

触发当前实例上的事件。附件参数都会传给监听器回调。

```js
vm.$emit('test', 'hi')
```

#### 典型应用：事件总线

通过在Vue原型上添加一个Vue实例作为事件总线，实现组件间相互通信，而且不受组件间关系的影响。

```js
Vue.prototype.$bus = new Vue()
```

> 这样做可以在任意组件中使用`this.$bus`访问到该Vue实例

范例：批量清除多个消息窗口，08-cart-bus.html

```html
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
    <!-- 给之前新增成功消息添加.success -->
    <message :show.sync="show" class="success">
      <template v-slot:title>恭喜</template>
      <template>新增课程成功！</template>
    </message>
    <!-- 新增警告提示窗 -->
    <message :show.sync="showWarn" class="warning">
      <template v-slot:title>
        <strong>警告</strong>
      </template>
      <template v-slot:default>
        请输入课程名称！
      </template>
    </message>
    <!-- 派发关闭事件 -->
    <div class="toolbar">
      <button @click="$bus.$emit('message-close')">清空提示框</button>
    </div>
    <!-- course为对象，需要绑定到name上 -->
    <course-add v-model="course.name" @add-course="addCourse"></course-add>
<script>
    // 弹窗组件
    Vue.component('message', {
      props: ['show'],
      template: `
        <div class="message-box" v-if="show">
          <strong>
            <slot name="title"></slot>
          </strong>
          <slot></slot>
          <span class="message-box-close" @click="$emit('update:show', false)">x</span>
        </div>
      `,
      mounted() {
        // 监听关闭事件
        this.$bus.$on('message-close', () => {
          this.$emit('update:show', false)
        })
      }
    })
const app = new Vue({
    data() {
        return {
            course: { // 更改course为对象
                name: ''
            },
            showWarn: false // 控制警告信息显示状态
        }
    },
    methods: {
        addCourse() {
          // 增加输入校验
          if (this.course.name) {
            this.courses.push(this.course)
            this.course = { // 此处需要修改为对象
                name: ''
            }
            // 更新提示框状态
            this.show = true
          } else {
            // 提示警告信息
            this.showWarn = true
          }
        },
        batchUpdate() {
          this.courses.forEach(c => {
            if (!c) { // 如果输入的课程名称为空
              return
            }
            // c.price = this.price // 不会生效
            Vue.set(c, 'price', this.price) // 生效
          })
        }
    }
})
</script>
```

#### vm.$once

监听一个自定义事件，但是只触发一次。一旦触发之后，监听器就会被移除。

```js
vm.$once('test', function(msg) {
    console.log(msg)
})
```

#### vm.$off

移除自定义事件监听器

- 如果没有提供参数，则移除所有的事件监听器
- 如果只提供了事件，则移除该事件所有的监听器
- 如果同时提供了事件与回调，则只移除这个回调的监听器

```js
vm.$off() // 移除所有的事件监听器
vm.$off('test') // 移除该事件所有的监听器
vm.$off('test', callback) // 只移除这个回调的监听器
```

### 组件或元素引用

#### ref和vm.$refs

`ref`被用来给元素或子组件注册引用信息。引用信息将会注册在父组件的`$refs`对象上。如果**在普通的DOM元素上使用，引用指向的就是DOM元素**；如果**用在子组件上，引用就指向组件**。

范例：设置输入框焦点，09-cart-ref.html

```html
    <!-- ref设置输入框焦点 -->
    <input type="text" ref="inp" >
<script>
const app = new Vue({
      mounted() {
        // mounted之后才能访问到inp
        this.$refs.inp.focus()
      }
})
</script>
```

范例：改造message组件用打开、关闭方法控制显示，09-cart-ref.html

```html
    <!-- 自定义组件引用 -->
    <message ref="msg" class="success">
      <template v-slot:title>恭喜</template>
      <template>新增课程成功！</template>
    </message>
<!-- 因为不使用:show.sync，所以先注释掉警告弹窗 -->
    <!-- 新增警告提示窗 -->
    <!-- <message :show.sync="showWarn" class="warning">
      <template v-slot:title>
        <strong>警告</strong>
      </template>
      <template v-slot:default>
        请输入课程名称！
      </template>
    </message> -->
<script>
    // 弹窗组件
    Vue.component('message', {
      // props: ['show'], // 不需要props
      data() {
        return {
          show: false // 添加组件内部的show
        }
      },
      template: `
        <div class="message-box" v-if="show">
          <strong>
            <slot name="title"></slot>
          </strong>
          <slot></slot>
          <!-- toggle内部修改显示状态 -->
          <span class="message-box-close" @click="toggle">x</span>
        </div>
      `,
      methods: {
        // 增加toggle方法维护toggle状态
        toggle() {
          this.show = !this.show
        }
      },
      mounted() {
        // 监听关闭事件
        // this.$bus.$on('message-close', () => {
        //   this.$emit('update:show', false)
        // })
        // 修改message-close回调为toggle
        this.$bus.$on('message-close', this.toggle)
      }
    })
const app = new Vue({
    addCourse() {
        if (this.course.name) {
            this.courses.push(this.course)
            this.course = { // 此处需要修改为对象
            	name: ''
          	}
            // this.show = true
            // 使用$refs.msg访问自定义组件
            this.$refs.msg.toggle()
        } else {
            this.showWarn = true
        }
    }
})
</script>
```

注意：

- ref是作为渲染结果被创建的，在初始渲染时不能访问它们
- `$refs`不是响应式的，不要试图用它在模板中做数据绑定
- 当`v-for`用于元素或组件时，引用信息将是包含DOM节点或组件实例的数组

## 过渡&动画

Vue在插入、更新或者移除DOM时，提供多种不同方式的应用过渡效果。

- 在CSS过渡和动画中自动应用class
- 可以配合使用第三方CSS动画库，如Animate.css
- 在过渡钩子中使用JavaScript直接操作DOM
- 可以配合使用第三方JavaScript动画库，如Velocity.js

[过渡&动画](https://cn.vuejs.org/v2/guide/transitions.html)

### CSS过渡动画

transition组件会为嵌套元素自动添加class，可用于做css过渡动画

范例：消息弹框动画，10-transition-css.html

```html
<style>
    /* 定义过渡动画 */
    .fade-enter-active,
    .fade-leave-active {
      transition: opacity .5s;
    }
    .fade-enter,
    .fade-leave-to {
      opacity: 0;
    }
</style>
<script>
Vue.component('message', {
      // 使用transition组件应用过渡动画
      template: `
      <transition name="fade">  
        <div class="message-box" v-if="show">
          <strong>
            <slot name="title"></slot>
          </strong>
          <slot></slot>
          <!-- toggle内部修改显示状态 -->
          <span class="message-box-close" @click="toggle">x</span>
        </div>
      </transition>
      `
})
</script>
```

**过渡类名**

1. `v-enter`：定义**进入过渡的开始状态**。在元素被插入前生效，在元素被插入后的下一帧移除。

   ```css
   .fade-enter { opacity: 0; }
   ```

2. `v-enter-active`：定义**进入过渡生效时的状态**。在元素被插入之前生效，在过渡/动画完成之后移除。

   ```css
   .fade-enter-active { transition: opacity .5s; }
   ```

3. `v-enter-to`：定义**进入过渡的结束状态**。在元素被插入之后的下一帧生效(与此同时，`v-enter`被移除)，在过渡/动画完成之后移除。

   ```css
   .fade-enter-to { opacity: 1; }
   ```

4. `v-leave`：定义**离开过渡的开始状态**。在离开过渡被触发时立刻生效，下一帧被移除。

   ```css
   .fade-leve { opacity: 1; }
   ```

5. `v-leave-active`：定义**离开过渡生效时的状态**。在离开整个过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。

   ```css
   .fade-leave-active { opacity: 0; }
   ```

6. `v-leave-to`：定义**离开过渡的结束状态**。在离开过渡被触发之后下一帧生效(与此同时，`v-leave`被删除)，在过渡/动画完成之后移除。

   ```css
   .fade-leave-to { opacity: 0; }
   ```

### 使用CSS动画库

通过[自定义过渡类名]([https://cn.vuejs.org/v2/guide/transitions.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E8%BF%87%E6%B8%A1%E7%9A%84%E7%B1%BB%E5%90%8D](https://cn.vuejs.org/v2/guide/transitions.html#自定义过渡的类名))可以有效结合[Animate.css](https://animate.style/)这类动画库制作更精美的动画效果。

自定义过渡的类名：enter-class、enter-active-class、enter-to-class、leave-class、leave-active-class、leave-to-class

> 自定义类名的优先级**高于**普通的类名。

范例：用animate.css实现弹窗动画，11-transition-animate.html

引入animate.css

```html
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css">
```

message组件里的template：

```js
 <transition enter-active-class="animate__animated animate__bounceIn" leave-active-class="animate__animated animate__bounceOut">  
</script>
```

> Animate.css v4 brought some **breaking changes**

### JavaScript钩子

可以在\<transition>属性中声明JavaScript钩子，使用JS实现动画。

```html
<transition
	v-on:before-enter="beforeEnter" // 动画开始前，设置初始状态
    v-on:enter="enter" // 执行动画
    v-on:after-enter="afterEnter" // 动画结束，清理工作
    v-on:enter-cancelled="enterCancelled" // 取消动画
    v-on:before-leave="beforeLeave"
    v-on:leave="leave"
    v-on:after-leave="afterLeave"
    v-on:leave-cancelled="leaveCancelled"
></transition>
```

范例：用JS实现消息动画(**js和css结合使用**)，12-transition-js.html

opacity修改不用css做

```html
<style>
    .fade-enter-active,
    .fade-leave-active {
      transition: opacity .5s;
    }
    /* .fade-enter,
    .fade-leave-to {
      opacity: 0;
    } */
</style>
<script>
Vue.component('message', {
    template: `
<transition name="fade" @before-enter="beforeEnter" @enter="enter"  @before-leave="beforeLeave"> ... 
	`,
    methods: {
        beforeEnter(el) {
          el.style.opacity = 0 // 设置初始状态
        },
        enter(el, done) {
          document.body.offsetHeight // 触发回流激活动画
          el.style.opacity = 1
        },
        beforeLeave(el, done) {
          document.body.offsetHeight // 触发回流激活动画
          el.style.opacity = 0
        }
    }
})
</script>
```

> 1. 当与 CSS 结合使用时，回调函数done是可选的
> 2. 当只用JavaScript过渡时，在`enter`和`leave`中必须使用`done`进行回调。否则，它们将被同步调用，过渡会立即完成

**纯js实现(Velocity.js)**

范例：13-transition-velocity.html

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/velocity/1.2.3/velocity.min.js"></script>
<script>
Vue.component('message', {
	template: `
      <transition
        :css="false" // 不使用css过渡类
        @before-enter="beforeEnter"
        @enter="enter"
        @before-leave="beforeLeave"
        @leave="leave"
      >...`,
	methods: {
        beforeEnter(el) {
          el.style.opacity = 0 // 设置初始状态
        },
        enter(el, done) {
          Velocity(el, { opacity: 1 }, { duration: 500, complete: done })
        },
        beforeLeave(el, done) {
          el.style.opacity = 1
        },
        leave(el, done) {
          Velocity(el, { opacity: 0 }, { duration: 500, complete: done })
        }
    }
})
</script>
```

### 列表过渡

利用transition-group可以对v-for渲染的每个元素应用过渡

范例：给列表添加过渡,14-transition-list.html

```html
<style>
    /* 定义过渡动画 */
    .fade-enter-active,
    .fade-leave-active {
      transition: opacity .5s;
    }
    .fade-enter,
    .fade-leave-to {
      opacity: 0;
    }
</style>
```

```js
// 模板添加transition-group
<transition-group name="fade">
    <li
        v-for="c in courses"
        :key="c.name"
        :style="{backgroundColor: (selectedCourse === c) ? '#ddd' : 'transparent'}"
        @click="selectedCourse = c"
    >
        {{ c.name }} - ￥ {{ c.price }}
    </li>
</transition-group>
```

## 可复用性

### 过滤器

Vue允许自定义过滤器，可被用于一些常见的文本格式化。过滤器可以用在两个地方：**双花括号插值和v-bind表达式**（后者从2.1.0+开始支持）。过滤器应该被添加在JavaScript表达式的尾部，有“管道”符号表示

```html
<!-- 在双花括号中 -->
{{ message | capitalize}}
<!-- 在v-bind中 -->
<div v-bind="rawId | formatId"></div>
```

范例：course-list显示价格使用货币符号，15-filter.html

```js
{{ c.name }} - ￥ {{ c.price | currentcy('RMB') }}
filters: {
    currentcy(value, symbol = '￥') {
        return symbol + value
    }
}
```

### 自定义指令

除了核心功能默认内置的指令(`v-model`和`v-show`)，Vue也允许注册自定义指令。注意，在Vue2.0中，代码复用和抽象的主要形式是组件。然而，有的情况下，仍然需要对普通DOM元素进行底层操作，这时候就会用到自定义指令。

范例：输入框获取焦点, 15-filter.html

```js
Vue.directive('focus', {
    inserted(el) {
        el.focus()
    }
})
```

使用，course-add

```js
<input v-focus>
```

范例：按钮权限控制,15-filter.html

```js
    // 权限指令
    const role = 'user'
    Vue.directive('permission', {
      inserted(el) {
        if (role !== 'admin') {
          el.parentElement.removeChild(el)
        }
      }
    })
```

使用，

```html
    <!-- 派发关闭事件 -->
    <div class="toolbar" v-permission="'admin'">
      <button @click="$bus.$emit('message-close')">清空提示框</button>
    </div>
```

### 渲染函数

Vue推荐在绝大多数情况下使用模板来创建HTML。然而，在一些场景中，需要JavaScript的完全编程能力。这时可以使用**渲染函数**，它比模板更接近编译器。

```js
render: function(createElement) {
    // createElement函数返回结果是VNode
    return createElement(
    	tag, // 标签名称
        data, // 传递数据
        children // 子节点数据组
    )
}
```

范例：用render实现heading组件,15-filter.html

```html
    // heading组件
    Vue.component('heading', {
      props: ['level', 'title'],
      render(h) {
        return h(
          'h' + this.level,
          // this.$slots.default
          // this.$slots.name
          this.title
        )
      }
    })
```

[属性绑定]([https://cn.vuejs.org/v2/guide/render-function.html#%E6%B7%B1%E5%85%A5%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1](https://cn.vuejs.org/v2/guide/render-function.html#深入数据对象))

使用：

```html
    <!-- heading组件 -->
    <heading :level="level" title="组件上的title">
      <template v-slot:default>默认slot</template>
      <template v-slot:name>这是命名slot</template>
    </heading>
```

#### 虚拟DOM

Vue通过建立一个**虚拟DOM**来追踪自己要如何改变真实DOM。

范例：输出虚拟DOM观察其结构。

```js
const vnode = h(
    'h' + this.level,
    // this.$slots.default
    // this.$slots.name
    this.title
)
console.log(vnode)
```

#### createElement参数

如何在`createElement`函数中使用模板中的那些功能。

```js
createElement(
	// { String | Object | Function }
    // 一个HTML标签、组件选项对象，或者resolve了上述任何一种的一个async函数。必填项
    'div',
    // { Object }
    // 一个与模板中属性对应的对象。可选
    {},
    // { String | Array }
    // 子级虚拟节点(VNodes)，由createElement()构建而成
    // 也可以使用字符串来生成“文本虚拟节点”，可选
    [
        '文本虚拟节点',
        createElement('h1', '一则头条'),
        createElement(MyComponent, {
            props: {
                someProp: 'foobar'
            }
        })
    ]
)
```

范例：处理title、添加icon，16-render.html

```html
<style>
    .icon {
       width: 1em; height: 1em;
       vertical-align: -0.15em;
       fill: currentColor;
       overflow: hidden;
    }
</style>
    <!-- heading组件 -->
    <heading :level="level" title="组件上的title" icon="icon-xin">
      <template v-slot:default>默认slot</template>
      <template v-slot:name>这是命名slot</template>
    </heading>
<script src="../font/iconfont.js"></script>    
// heading组件
    Vue.component('heading', {
      props: ['level', 'title', 'icon'],
      render(h) {
        let children = []
        
        // icon属性处理
        if (this.icon) {
          // <svg class="icon" aria-hidden="true">
          //   <use xlink:href="#icon-xxx"></use>
          // </svg>
          children.push(h(
            'svg',
            { class: 'icon' },
            [h('use', { attrs: { 'xlink:href': '#' + this.icon }})]
          ))
        }

        // 拼接子节点
        children = children.concat(this.$slots.default)
        const vnode = h(
          'h' + this.level,
          { attrs: { title: this.title }},
          // this.$slots.default
          // this.$slots.name
          // this.title
          children
        )
        console.log(vnode)
        return vnode
      }
    })
```

#### 函数式组件

组件**没有管理任何状态**，也**没有监听任何传递给它的状态**，也**没有生命周期方法**时，可以将组件标记为`functional`，这意味着它无状态（没有响应式数据），也没有实例(没有`this`上下文)

范例：函数式组件，17-functional.html

```html
    <!-- heading组件 -->
    <heading :level="level" title="组件上的title" icon="icon-xin">
      默认的title
      <!-- <template v-slot:default>默认slot</template>
      <template v-slot:name>这是命名slot</template> -->
    </heading>
    // heading组件
    Vue.component('heading', {
      functional: true, // 标记函数式组件
      props: ['level', 'title', 'icon'],
      render(h, context) { // 上下文传参
        let children = []
        // 属性获取
        const { level, title, icon } = context.props
        console.log('context', context)
        if (icon) {
          // <svg class="icon" aria-hidden="true">
          //   <use xlink:href="#icon-xxx"></use>
          // </svg>
          children.push(h(
            'svg',
            { class: 'icon' },
            [h('use', { attrs: { 'xlink:href': '#' + icon }})]
          ))
        }

        // 拼接子节点
        children = children.concat(context.children)
        // children = children.concat(context.scopedSlots)
        // for(let key in context.scopedSlots) {
        //   children.push(context.scopedSlots[key])
        // }
        console.log(context.children)
      
        const vnode = h(
          'h' + level,
          { attrs: { title: title }},
          // this.$slots.default
          // this.$slots.name
          // this.title
          children
        )
        return vnode
      }
    })
```

### 混入

混入(mixin)提供了一种非常灵活的方式，来分发Vue组件中的可复用功能。一个混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项。

范例：消息组件混入，18-cart-mixin.html

```js
// 定义一个混入对象
var myMixin = {
    created: function() {
        this.hello()
    },
    methods: {
        hello: function() {
            console.log('hello from minxin')
        }
    }
}
// 定义一个使用混入对象的组件
var Component = Vue.extend({
    mixins: [myMixin]
})
var component = new Component() // => 'hello from mixin'
```

### 插件

插件通常用来为Vue添加全局功能。插件的功能范围一般有下面几种：

1. 添加全局方法或者属性。如[vue-custom-element](https://github.com/karol-f/vue-custom-element)
2. 添加全局资源：指令/过滤器/过渡等。如 [vue-touch](https://github.com/vuejs/vue-touch)
3. 通过全局混入来添加一些组件选项。如 [vue-router](https://github.com/vuejs/vue-router)
4. 添加Vue实例方法，通过把它们添加到 `Vue.prototype`上实现
5. 一个库，提供自己的API，同时提供上面提到的一个或多个功能。如 [vue-router](https://github.com/vuejs/vue-router)

#### 插件声明

Vue.js的插件应该暴露一个`install`方法。这个方法的第一个参数是`Vue`构造器，第二个参数是一个可选的选项对象：

```js
MyPlugin.install = function(Vue, options) {
    // 1. 添加全局方法或属性
    Vue.myGlobalMethod = function() {}
    // 2. 添加全局资源
    Vue.directive('my-directive', {})
    // 3. 注入组件选项
    Vue.mixin({
        created: function() {
            // 逻辑...
        }
    })
    // 4. 添加实例方法
    Vue.prototype.$myMethod = function(methodOptions) {}
}
```

范例：修改heading组件为插件

```html
<script src="../plugins/heading.js"></script>
// heading.js
const Myplugin = {
	install (Vue, options) {
		Vue.component('heading', {...})
	}
}
// 不是必须的，在使用的地方再use也可以
if (typeof window !== 'undefined' && window.Vue) {
  // 插件的使用
  // window.Vue.use(MyPlugin)
}
```

#### 插件的使用

使用Vue.use即可引入插件

```js
Vue.use(MyPlugin)
```

## Vue Cli

### 快速原型开发

可以使用`vue serve`和`vue build`命令对单个`*.vue`文件进行快速原型开发。

需要安装插件`@vue/cli-service-global`

`vue serve`的缺点就是需要安装全局依赖，这使得在不同机器上的一致性得不到保证。因此只适用于快速原型开发

范例：/vuecli/Hello.vue

```js
vue serve Hello.vue
```

### 创建项目

```js
vue create hello-wrold
```

### 插件

Vue CLI使用了一套基于插件的架构。插件可以修改webpack的内部配置，也可以向`vue-cli-service`注入命令。在项目创建的过程中，绝大部分列出的特性都是通过插件来实现的。

#### 在现有的项目中安装插件

在一个已经被创建好的项目中安装一个插件，可以使用`vue add`命令。

```js
vue add router
```

1. 安装插件前，先保存提交代码
2. 安装插件后，可能会对原来的代码造成破坏，在vscode里，把不想被修改的文件discard掉，再提交代码

### 开发

https://learn.kaikeba.com/video/212422

#### 处理资源路径

当在JavaScript、CSS 或*.vue文件中使用相对路径(必须以`.`开头)引用一个静态资源时，该资源将被webpack处理。

##### 转换规则

- 如果URL是一个绝对路径(例如`/images/foo.png`)，它将会保留不变。放到public文件下即可，webpack**不会**对其进行处理。

  ```html
  <img alt="vue logo" src="/assets/logo.png" >
  <img alt="vue logo" src="http://image.xx.com/logo.png" >
  ```

- 如果URL以`.`开头，会作为一个相对模块请求被解释并基于文件系统相对路径，webpack**会**对其进行处理。

  ```html
  <img alt="vue logo" src="./assets/logo.png" >
  ```

- 如果URL以`~`开头，会作为一个模块请求被解析。这意味着甚至可以引用Node模块中的资源：

  ```html
  <img src="~some-npm-package/foo.png" >
  ```

- 如果URL以`@`开头，会作为一个模块请求被解析。Vue-Cli默认会设置一个指向`src`的别名`@`。

  ```html
  import Hello from '@/components/Hello.vue'
  ```

#### 何时使用public文件夹

通过webpack的处理并获得如下好处：

- 脚本和样式表会被压缩且打包在一起，从而避免额外的网络请求。
- 文件丢失会直接在编译时报错，而不是到了用户端才产生404错误。
- 最终生成的文件名包含了内容哈希，因此不必担心浏览器会缓存它们的老版本。

如下情况考虑使用public文件件：

- 需要在构建输出中指定一个固定的文件名字。
- 有上千个图片，需要动态引用它们的路径。
- 有些库可能和webpack不兼容，除了将其用一个独立的`<script>`标签引入没有别的选择。

**使用public文件夹的注意事项**

- 如果应用没有部署在域名的根部，那么需要为URL配置[publicPath](https://cli.vuejs.org/zh/config/#publicpath)前缀

  ```js
  // vue.config.js
  module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/cart/' : '/c'
  }
  ```

- 在`public/index.html`等通过`html-webpack-plugin`用作模块的HTML文件中，需要通过`<%= BASE_URL %>`设置链接前缀

  ```html
  <link rel="icon" href="<%= BASE_URL %>favicon.ico" >
  ```

- 在模板中，先向组件传入BASE_URL

  ```js
  data() {
      return {
          publicPath: process.env.BASE_URL
      }
  }
  ```

  然后：

  ```html
  <img :src="``${publicPath}logo.png" >
  ```

#### CSS相关

使用预处理器

如果创建项目时没有选择需要的预处理器(Sass/Less/Stylus)，则需要手动安装相应loader

```bash
# Sass
npm install -D sass-loader node-sass

# Less
npm install -D less-loader less

# Stylus
npm install -D stylus-loader stylus
```

范例：App.vue修改为Sass

```vue
<style scoped lang="scss">
	$color: #42b983;
    a {
        color: $color;
    }
</style>
```

自动化导入

自动化导入文件(用于颜色、变量、mixin...)，可以使用`style-resources-loader`，

```js
npm i -D style-resources-loader
```

范例：在每个单文件组件和Scss文件中导入`./src/styles/imports.scss`

```js
// vue.config.js
const path = require('path')
function addStyleResource(rule) {
    rule.use('style-resource')
    	.loader('style-resources-loader')
    	.options({
    	patterns: [
            path.resolve(__dirname, './src/styles/imports.scss')
        ]    
    })
}
module.exports = {
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('scss').oneOf(type)))
  }
}
```

##### Scoped CSS

当`<style>`标签有`scoped`属性时，它的CSS只作用于当前组件中的元素。

```vue
<style scoped>
    .red {
        color: red;
    }
</style>
```

> 其原理是通过PostCSS来实现以下转换：
>
> ```vue
> <template>
> 	<div class="red" data-v-7ba5bd90>hi</div>
> </template>
> <style>
>     .red[data-v-7ba5bd90] {
>         color: red;
>     }
> </style>
> ```

混用本地和全局

```vue
<style>
/* 全局样式 */
</style>
<style scoped>
    /* 本地样式 */
</style>
```

深度作用选择器：使用`>>>`操作符可以使`scoped`样式中的一个选择器能够作用得“更深”，例如影响子组件：

```vue
<style scoped>
    #app >>> a {
        color: red;
    }
</style>
```

> Sass之类的预处理器无法正确解析`>>>`，这种情况下可以使用`/deep/`或`::v-deep`操作符取而代之
>
> ```vue
> <style scoped lang="scss">
>     #app {
>         /deep/ a {
>             color: red;
>         }
>         ::v-deep a {
>             color: red;
>         }
>     }
> </style>
> ```

##### Module CSS

CSS Module是一个流行的，用于模块化和组合CSS的系统。`vue-loader`提供了与CSS Modules的 集成，可以作为模拟scoped CSS的替代方案。

添加module

```vue
<style module lang="scss">
    .red {
        color: red;
    }
    .bold {
        font-weight: bold;
    }
</style>
```

> 这个module特性指引vue-loader作为名为`$style`的计算属性，向组件注入CSS Modules局部对象。

模板中通过`$style.xx`访问：

```vue
<a :class="$style.red">hi</a>
<a :class="{[$style.red]: isRed}">hi</a>
<a :clas="[$style.red, $style.bold]"></a>
```

JS中访问：

```vue
<script>
export default {
    created() {
        // -> 'red_adWD-uf'
        //一个基于文件名和类名生成的标识符
        console.log(this.$style.red)
    }
}
</script>
```

#### 数据访问相关

#####　数据模拟

使用开发服务器配置before[选项](https://cli.vuejs.org/zh/config/#devserver)，可以编写接口，提供模拟数据：

```js
  devServer: {
    before(app) {
      // app是一个express实例
      app.get('/api/courses', (req, res) => {
        setTimeout(() => {
          res.json([{ name: 'web全站', price: 9999 }, { name: 'web高', price: '9999'}])
        }, 1000)
      })
    }
  }
```

调用

```js
import axios from 'axios'
export function getCourses() {
  return axios.get('/api/courses').then(res => res.data)
}
```

##### 代理

设置开发服务器代理选项可以有效避免调用接口时出现的跨域问题

```js
  devServer: {
    // before(app) {
    //   // app是一个express实例
    //   app.get('/api/courses', (req, res) => {
    //     setTimeout(() => {
    //       res.json([{ name: 'web全站', price: 9999 }, { name: 'web高', price: '9999'}])
    //     }, 1000)
    //   })
    // },
    proxy: 'http://localhost:3000'
  }
```

新建一个server服务器：

```js
// /server/api.js
// npm i express
const express = require('express')
const app = express()

app.get('/api/courses', (req, res) => {
  setTimeout(() => {
    res.json([{ name: 'web全站', price: 9999 }, { name: 'web高', price: '9999'}])
  }, 1000)
})

app.listen(3000)
```

## 路由

[Vue Router](https://router.vuejs.org/zh/) 是Vue.js官方的路由管理器。

### 路由基础

```vue
    <!-- 导航链接 -->
    <div>
      <router-link to="/">首页</router-link>
      <router-link to="/admin">管理</router-link>
    </div>
    <!-- 路由出口 -->
    <router-view></router-view>
```


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

## Vuex

Vuex是一个专为Vue.js应用程序开发的**状态管理模式**。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以**可预测的方式发生变化**。

### 安装

```js
vue add vuex
```

### 起始

#### State

将全局状态定义在state中

```js
state: {
    isLogin: false
}
```

#### Mutations

修改state只能通过mutations

```js
mutations: {
    login(state) {
        state.isLogin = true
    },
    logout(state) {
        state.isLogin = false
    }
}
```

#### 获取和修改状态

使用store.state获取状态

```vue
<button @click="login" v-if="!$store.state.isLogin">登录</button>
<button @click="logout" v-else>登出</button>
```

修改状态只能通过stroe.dispatch(mutation)

```js
this.$store.commit('login')
this.$store.commit('logout')
```

#### Action

Action类似mutations，不同在于：

- Action提交的是mutation，而不是直接变更状态
- Action可以包含任意异步操作

```js
login({commit}, username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (username === 'admin') {
                commit('login')
                resolve()
            }
        }, 1000)
    })
}
```

派发动作

```js
this.$stroe.dispatch('login', 'admin').then(() => {
    this.$router.push(this.$route.query.redirect)
}).catch(() => {
    alert('用户名或密码错误')
})
```

### 最佳实践

#### 模块化

使用modules定义多个子模块利于组件复杂状态

```js
import user from './user'
export default new Vuex.Store({
    modules: {
        user
    }
})
```

从index.js里移动先前登录状态相关代码到user.js

```js
export default {
    namespaced: true, // 独立命名空间，避免命名冲突
    // ...
}
```

访问方式相应变化

```vue
// Login.vue
<button @click="login" v-if="!$store.state.user.isLogin">登录</button>

this.$store.dispatch('user/login', 'admin').then(() => {
	const redirect = this.$route.query.redirect || '/'
	this.$router.push(redirect)
}).catch(() => alert('用户名或密码错误'))

// router/index.js
store.state.user.isLogin
```

#### mapState/mapMutations/mapActions

通过修改这些映射方法可以让大家少敲几个字，避免对$store直接访问。

state相关修改，Login.vue

```vue
import { mapState } from 'vuex'
computed: {
	...mapState('user', ['isLogin'])
}
```

action相关修改

```js
import { mapActions } from 'vuex'
methods: {
    login() {
        this['user/login']('admin').then(...)
    },
    ...mapActions(['user/login', 'user/logout'])
}
```

#### Getter

可以使用getters从stroe的state中派生出一些状态

```js
export default {
    namespaced: true,
    state: {
        username: ''
    },
    mutations: {
        setUsername(state, username) {
            state.username = username
        }
    },
    getters: {
        welcom: state => {
            return state.username + ', 欢迎回来'
        }
    },
    actions: {
        login({ commit }, username) {
            // 模拟登陆api，1s以后如果用户名是admin则登陆成功
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (username === 'admin') {
                        commit('login', username)
                        resolve()
                    } else {
                        reject()
                    }
                }, 1000)
            })
        }
    }
}
```

#### 严格模式

严格模式下，无论何时发生了状态变更且不是由mutation函数引起的，将会抛出错误。这能保证所有的状态变更都能被调试工具跟踪到。开启严格模式`strict: true`

```js
const store = new Vuex.Store({
    strict: true
})
```

#### 插件

Vuex的store接受`plugins`选项，这个选项暴露出每次mutation的钩子。Vuex插件就是一个函数，它接收store作为唯一参数

```js
const myPlugin = store => {
    // 当store初始化后调用
}
```

注册插件：

```js
const store = new Vuex.Store({
	plugins: [myPlugin]
})
```

范例：实现登录状态持久化，store/plugins/persist.js

```js
export default store => {
  // 初始化时从localStorage获取数据
  if (localStorage) {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      store.commit('user/login')
      store.commit('user/setUsername', user.username)
    }
  }
  // 用户状态发生变化时缓存之
  store.subscribe((mutation, state) => {
    if (mutation.type === ('user/login')) {
      localStorage.setItem('user', JSON.stringify(state.user))
    } else if (mutation.type === 'user/logout') {
      localStorage.removeItem('user')
    }
  })
}
```







