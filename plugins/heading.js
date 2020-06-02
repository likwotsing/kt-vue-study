const MyPlugin = {
  // 插件需要实现install
  install(Vue, options) {
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
  }
}

// 不是必须的，在使用的地方再use也可以
if (typeof window !== 'undefined' && window.Vue) {
  // 插件的使用
  // window.Vue.use(MyPlugin)
}