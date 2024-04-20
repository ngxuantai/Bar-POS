<template>
  <a-layout class="container">
    <div class="overlay"></div>
    <a-layout-sider width="259px" style="background: #000">
      <sidebar-category />
    </a-layout-sider>
    <a-layout class="layout-container">
      <router-view />
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import SidebarCategory from "@/components/SidebarCategory.vue";

export default {
  components: {
    SidebarCategory,
  },
};
</script>

<style lang="scss" scoped>
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

.sider-container {
  width: 276px;
  height: 100%;
  background: #181818;
}

.layout-container {
  width: calc(100% - 259px);
  height: 100%;
  overflow-y: auto;
  background-size: cover;
  background: transparent;
  position: relative;
}
</style>
