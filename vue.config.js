const port = 7070
const path = require('path')

// resolve定义一个绝对路径获取函数
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '/best/practice', // 部署应用时的基本 URL
  devServer: {
    port
  },
  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       comps: path.join(__dirname, './src/components')
  //     }
  //   },
  //   name: 'vue项目最佳实践'
  // }
  // 传递一个函数给configureWebpack
  // 可以直接修改，或返回一个用于合并的配置对象
  configureWebpack: config => {
    config.resolve.alias.comps = path.join(__dirname, './src/components')
    if (process.env.NODE_ENV === 'development') {
      config.name = 'vue项目最佳实践'
    } else {
      config.name = 'Vue Best practice'
    }
  },
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
}
