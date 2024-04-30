<template>
  <a-layout-header class="header-container">
    <div class="search">
      <search-outlined />
      <input
        placeholder="Search for wine"
        :value="searchText"
        @input="changeSearch"
        @keyup.enter="enterSearch"
      />
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
import { defineComponent, ref } from "vue";
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
      type: Array as () => Tab[],
      required: true,
    },
  },
  setup(props, { emit }) {
    const searchText = ref<string>("");
    const changeSearch = (e: Event) => {
      const target = e.target as HTMLInputElement;
      searchText.value = target.value;
      setTimeout(() => {
        emit("changeSearch", searchText.value);
      }, 1000);
    };
    const enterSearch = (e: Event) => {
      const target = e.target as HTMLInputElement;
      searchText.value = target.value;
      emit("changeSearch", searchText.value);
    };
    const selectTab = (tab: Tab) => {
      emit("selectTab", tab);
    };
    return {
      searchText,
      listItems: props.listTabs,
      changeSearch,
      enterSearch,
      selectTab,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
