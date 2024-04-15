<template>
  <a-layout class="container">
    <div class="sider-container">
      <sidebar-category />
    </div>
    <a-layout class="layout-container">
      <div class="wine-container">
        <div class="back">
          <a-button>
            <img src="../../assets/icon/ArrowLeft.png" alt="arrow-left" />
            Back
          </a-button>
        </div>
      </div>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { ref } from "vue";
import SidebarCategory from "@/components/SidebarCategory.vue";

export default {
  components: {
    SidebarCategory,
  },
  setup() {
    return {};
  },
};
</script>

<style scoped>
@import "./style.css";
</style>
