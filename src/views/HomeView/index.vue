<template>
  <a-layout class="container">
    <div class="sider-container">
      <sidebar-category />
    </div>
    <a-layout class="layout-container">
      <div class="wine-container">
        <div class="overlay"></div>
        <div class="search-container">
          <div class="search">
            <a-input placeholder="Search for wine" class="search-input">
              <template #prefix>
                <search-outlined />
              </template>
            </a-input>
          </div>
          <a-tabs
            v-model:activeKey="activeKey"
            class="tabs-container"
            size="small"
          >
            <tab-pane key="1" tab="Recommend" style="overflow-y: auto">
              <a-row :gutter="[0, 32]" style="width: 100%">
                <a-col v-for="item in 2" :key="item.toString()" :span="12">
                  <card-item />
                </a-col>
                <a-col v-for="item in 2" :key="item.toString()" :span="12">
                  <card-item />
                </a-col>
                <a-col v-for="item in 2" :key="item.toString()" :span="12">
                  <card-item />
                </a-col>
                <a-col v-for="item in 2" :key="item.toString()" :span="12">
                  <card-item />
                </a-col>
              </a-row>
            </tab-pane>
            <tab-pane key="2" tab="Today's special">
              Content of Tab Pane 2
            </tab-pane>
            <tab-pane key="3" tab="Top choices">
              Content of Tab Pane 3
            </tab-pane>
            <tab-pane key="4" tab="Discounts">Content of Tab Pane 3</tab-pane>
          </a-tabs>
        </div>
      </div>
      <cart-footer />
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { ref } from "vue";
import { TabPane } from "ant-design-vue";
import { SearchOutlined } from "@ant-design/icons-vue";
import SidebarCategory from "@/components/SidebarCategory.vue";
import CardItem from "@/components/CardItem.vue";
import CartFooter from "@/components/CartFooter.vue";

export default {
  components: {
    TabPane,
    SearchOutlined,
    SidebarCategory,
    CardItem,
    CartFooter,
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
