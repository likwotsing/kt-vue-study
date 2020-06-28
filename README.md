# vue-cli最佳实践

## 项目配置策略

基础配置：指定应用上下文、端口号，vue.config.js

```js
const port = 7070

module.exports = {
  publicPath: '/best/practice', // 部署应用时的基本 URL
  devServer: {
    port
  }
}
```

配置webpack：`configureWebpack`

范例：设置一个组件存放路径的别名，vue.config.js

```js
// vue.config.js 
configureWebpack: {
    resolve: {
      alias: {
        comps: path.join(__dirname, './src/components')
      }
    }
  }
// Home.vue
import HelloWorld from 'comps/HelloWorld.vue'
```

范例：设置一个webpack配置项用于页面title

```js
// vue.config.js
module.exports = {
    configureWebpack: {
        name: 'vue项目最佳实践'
    }
}
// 宿主页面public/index.html，使用lodash插值语法使用它，
<title><%= webpackConfig.name %></title>
```



[webpack-merge](https://github.com/survivejs/webpack-merge)合并出最终选项

范例：基于环境有条件地配置

```js
  // 传递一个函数给configureWebpack
  // 可以直接修改，或返回一个用于合并的配置对象
  configureWebpack: config => {
    config.resolve.alias.comps = path.join(__dirname, './src/components')
    if (process.env.NODE_ENV === 'development') {
      config.name = 'vue项目最佳实践'
    } else {
      config.name = 'Vue Best practice'
    }
  }
```

配置webpack：`chainWebpack`

[webpack-chain](https://github.com/neutrinojs/webpack-chain)称为链式操作，可以更细粒度控制webpack内部配置。

范例：svg icon引入

- [下载图标](https://www.iconfont.cn/)，存入src/icons/svg中

- 安装依赖：svg-sprite-loader

  ```js
  npm install svg-sprite-loader -D
  ```

- 修改规则和新增规则

  ```js
    chainWebpack: config => {
      // 配置svg规则排除icons目录中svg文件处理
      // 给svg规则增加一个排除选项exclude: ['path/to/icon']
      // set svg-sprite-loader
      config.module
        .rule('svg')
        .exclude.add(resolve('src/icons'))
        .end()
      config.module
        .rule('icons')
        .test(/\.svg$/)
        .include.add(resolve('src/icons'))
        .end()
        .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .options({
          symbolId: 'icon-[name]'
        })
        .end()
    }
  ```

  使用图标：

  ```vue
  <template>
      <svg>
      	<use xlink:href="#icon-edit" />
      </svg>
  </template>
  <script>
  	import '@/icons/svg/edit.svg'
  </script>
  ```

- 自动导入

  - 创建icons/index.js

    ```js
    const req = require.context('./svg', false, /\.svg$/)
    req.keys().map(req)
    ```

  - 创建IconSvg组件，components/IconSvg.vue

    ```vue
    <template>
      <svg class="svg-icon" :class="svgClass" v-on="$listeners">
        <use :xlink:href="iconName"></use>
      </svg>
    </template>
    
    <script>
    
    export default {
      name: 'icon-svg',
      props: {
        iconClass: {
          type: String,
          required: true
        },
        className: {
          type: String,
          default: ''
        }
      },
      computed: {
        iconName () {
          return `#icon-${this.iconClass}`
        },
        svgClass () {
          if (this.className) {
            return 'svg-icon ' + this.className
          } else {
            return 'svg-icon'
          }
        }
      }
    }
    </script>
    
    <style>
    .svg-icon {
      width: 1em;
      height: 1em;
      vertical-align: -0.15em;
      fill: currentColor;
      overflow: hidden;
    }
    </style>
    ```

    

  