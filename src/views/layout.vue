<template>
  <a-layout class="container">
    <div class="overlay"></div>
    <!-- <a-layout-sider width="259px" style="background: #000">
      <sidebar-category />
    </a-layout-sider> -->
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
import SidebarCategory from "../components/SidebarCategory.vue";
import Cart from "../components/Cart.vue";

export default {
  components: {
    SidebarCategory,
    Cart,
  },
};
</script>

<style lang="scss" scoped>
.layout-sider {
  display: none;
}

@media screen and (min-width: 768px) {
  .container {
    height: 100vh;
    display: flex;
    flex-direction: row;
    overflow: hidden;
    background-image: image-set("../assets/image/onboard.png");
    background-size: cover;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0) -17.92%,
      rgba(0, 0, 0, 0.75) -3.58%,
      #000000 63.96%
    );
  }

  .layout-container {
    width: calc(100% - 259px);
    height: 100%;
    overflow-y: auto;
    background-size: cover;
    background: transparent;
    position: relative;
  }

  .layout-sider {
    display: block;
    width: 259px;
    height: 100%;
    background: #000;
    flex: 0 0 259px;
    position: relative;
  }
}
</style>
