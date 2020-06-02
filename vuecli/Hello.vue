<template>
  <div>
    这是一个快速原型开发的demo
  </div>
</template>

<script>
  export default {
    data() {
      return {
        message: '快速原型开发'
      }
    },
    methods: {
      hello() {
        console.log(this.message)
      }
    },
    mounted () {
      this.hello()
    }
  }
</script>

<style lang="scss" scoped>

</style>