<template>
  <a-layout class="container">
    <div class="overlay"></div>
    <a-layout-sider width="259px" style="background: #000">
      <sidebar-category />
    </a-layout-sider>
    <a-layout class="layout-container">
      <search-header :listTabs="listTabs" @selectTab="changeTab" />
      <div v-for="tab in listTabs" :key="tab.id">
        <list-card-item v-if="tab.id === 1 && tab.isActive" />
      </div>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { ref, reactive } from "vue";
import SidebarCategory from "@/components/SidebarCategory.vue";
import SearchHeader from "@/components/SearchHeader.vue";
import ListCardItem from "@/components/ListCardItem.vue";

interface Tab {
  id: number;
  title: string;
  isActive: boolean;
}

export default {
  components: {
    SidebarCategory,
    SearchHeader,
    ListCardItem,
  },
  setup() {
    const listTabs = reactive<Tab[]>([
      { id: 1, title: "Today's special", isActive: true },
      { id: 2, title: "Customer Favorite", isActive: false },
      { id: 3, title: "Discounts", isActive: false },
    ]);
    const changeTab = (tab: Tab) => {
      listTabs.forEach((item) => {
        item.isActive = item.id === tab.id;
      });
    };
    return {
      listTabs,
      changeTab,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
