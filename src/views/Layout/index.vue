<template>
  <a-layout class="container">
    <div class="overlay"></div>
    <div class="layout-sider">
      <sidebar-category />
    </div>
    <a-layout class="layout-container">
      <router-view />
    </a-layout>
    <cart />
  </a-layout>
</template>

<script lang="ts">
import SidebarCategory from "../../components/SidebarCategory/index.vue";
import Cart from "../../components/Cart/index.vue";

export default {
  components: {
    SidebarCategory,
    Cart,
  },
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
