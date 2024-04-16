<template>
  <a-layout class="container">
    <div class="overlay"></div>
    <a-layout-sider width="259px" style="background: #000">
      <sidebar-category />
    </a-layout-sider>
    <a-layout class="layout-container">
      <div class="search">
        <a-input placeholder="Search for wine" class="search-input">
          <template #prefix>
            <search-outlined />
          </template>
        </a-input>
      </div>
      <a-tabs v-model:activeKey="activeKey" class="tabs-container" size="small">
        <tab-pane key="1" tab="Today's special">
          <list-card-item />
        </tab-pane>
        <tab-pane key="2" tab="Customer Favorite">
          <h1 style="color: #fff">111111111111111</h1>
        </tab-pane>
        <tab-pane key="3" tab="Discounts"> Content of Tab Pane 3 </tab-pane>
      </a-tabs>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { ref } from "vue";
import { TabPane } from "ant-design-vue";
import { SearchOutlined } from "@ant-design/icons-vue";
import SidebarCategory from "@/components/SidebarCategory.vue";
import ListCardItem from "@/components/ListCardItem.vue";

export default {
  components: {
    TabPane,
    SearchOutlined,
    SidebarCategory,
    ListCardItem,
  },
  setup() {
    const activeKey = ref("1");
    return {
      activeKey,
    };
  },
};
</script>

<style scoped>
@import "./style.css";
</style>
