<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <NavBar></NavBar>
  <router-view/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import NavBar from './components/NavBar.vue';
import { router } from './router/router';

export default {
  name: 'App',
  components: {
    HelloWorld,
    NavBar,
    router
}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
