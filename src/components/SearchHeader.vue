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
.header-container {
  height: 124px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 37px 64px;
  background: #000;
}
.search {
  height: 50px;
  max-width: 518px;
  width: 518px;
  padding: 15px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  background: #181818;
  span {
    font-size: 20px;
    font-weight: 400;
    text-align: center;
    color: #bfbfbf;
  }
  input {
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 0;
    background: #181818;
    font-family: Newsreader;
    font-size: 16px;
    font-weight: 400;
    line-height: 26px;
    color: #bfbfbf;
    &:focus-visible {
      outline: none;
    }
  }
}
.tabs {
  height: 100%;
  display: flex;
  align-items: center;
  gap: 40px;
  .item-tab {
    height: 100%;
    display: flex;
    align-items: center;
    p {
      cursor: pointer;
      font-family: Newsreader;
      font-size: 20px;
      font-weight: 400;
      line-height: 28px;
      color: #bfbfbf;
      margin: 0;
    }
  }
  .selected {
    border-bottom: 2px solid;
    border-image-source: linear-gradient(
      268.43deg,
      #fdeec3 3.58%,
      #efdcac 49.93%,
      #dcc29e 98.97%
    );
    border-image-slice: 1;
    p {
      background: linear-gradient(
        268.43deg,
        #fdeec3 3.58%,
        #efdcac 49.93%,
        #dcc29e 98.97%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
}
</style>
