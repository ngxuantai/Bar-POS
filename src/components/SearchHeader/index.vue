<template>
  <a-layout-header class="header-container">
    <div class="search">
      <search-outlined />
      <input placeholder="Search for wine" />
    </div>
    <div class="tabs">
      <div
        v-for="tab in listItems"
        :key="tab.id"
        class="item-tab"
        :class="{ selected: tab.isActive }"
        @click="selectTab(tab)"
      >
        <p>{{ tab.title }}</p>
      </div>
    </div>
  </a-layout-header>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { SearchOutlined } from "@ant-design/icons-vue";

interface Tab {
  id: number;
  title: string;
  isActive: boolean;
}

export default defineComponent({
  components: {
    SearchOutlined,
  },
  props: {
    listTabs: {
      type: Array as PropType<Tab[]>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const selectTab = (tab: Tab) => {
      emit("selectTab", tab);
    };
    return {
      listItems: props.listTabs,
      selectTab,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
