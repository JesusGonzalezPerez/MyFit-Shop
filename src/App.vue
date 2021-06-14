<template>
  <div id="app">
    <notifications/>
    <router-view>
      <Home/>
    </router-view>
  </div>
</template>

<script>

import Home from './components/Home/Home'

export default {
  name: "App",
  components:{
    Home
  }
};
</script>

<style lang="scss">
@import "scss/_variables.scss";
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-family:Verdana, Geneva, Tahoma, sans-serif;
}
* {
  font-family: Helvetica;
}
textarea:focus, input:focus, input[type]:focus {
    border-color: $secondaryColor;
    box-shadow: 0 1px 1px rgba(229, 103, 23, 0.075)inset, 0 0 1px $secondaryColorT;
    outline: 0 none;
}
</style>
