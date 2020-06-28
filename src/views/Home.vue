<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <!-- <icon-svg icon-class="edit" /> -->
    <svg>
      <use xlink:href="#icon-edit"></use>
    </svg>
    <svg>
      <use xlink:href="#icon-view"></use>
    </svg>
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import HelloWorld from 'comps/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
