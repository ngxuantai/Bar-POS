<template>
  <search-header :listTabs="listTabs" @selectTab="changeTab" />
  <div v-for="tab in listTabs" :key="tab.id">
    <list-card-item v-if="tab.id === 1 && tab.isActive" />
  </div>
</template>

<script lang="ts">
import { ref, reactive } from "vue";
import SearchHeader from "../../components/SearchHeader/index.vue";
import ListCardItem from "../../components/ListCardItem/index.vue";

interface Tab {
  id: number;
  title: string;
  isActive: boolean;
}

export default {
  components: {
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

<!-- <style lang="scss" scoped>
@import "./style.scss";
</style> -->
