<template>
  <router-view />
  <cart />
</template>

<script lang="ts">
import Cart from "./components/Cart.vue";

export default {
  components: {
    Cart,
  },
};
</script>

<style>
#app {
  font-family: Merriweather;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
</style>
