<template>
  <div class="sider-category">
    <div class="logo">
      <img src="../assets/image/logo.png" alt="logo" />
    </div>
    <!-- <div class="menu">
      <ul class="menu-list">
        <li class="menu-item">
          <div class="menu-link" @click="showSubMenu">
            <span class="menu-label">1</span>
            <span class="menu-expand">+</span>
          </div>
          <ul class="submenu" v-if="show">
            <li class="submenu-item">
              <a class="submenu-link"> 12 </a>
            </li>
            <li class="submenu-item">
              <a class="submenu-link"> 13 </a>
            </li>
            <li class="submenu-item">
              <a class="submenu-link"> 14 </a>
            </li>
          </ul>
        </li>
      </ul>
    </div> -->
    <sub-menu :items="items" />
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import SubMenu from "./SubMenu.vue";

interface Item {
  key: string;
  title: string;
  show: boolean;
  children: SubItem[];
}
interface SubItem {
  key: string;
  label: string;
  check: boolean;
}

export default {
  components: {
    SubMenu,
    // MenuItem,
  },
  setup() {
    const items = ref<Item[]>([
      {
        key: "1",
        title: "Whisky",
        show: false,
        children: [
          { key: "1", label: "Single Male Whisky", check: false },
          { key: "2", label: "Hush Whisky", check: false },
          { key: "3", label: "American Whisky", check: false },
          { key: "4", label: "Blended Whisky", check: false },
        ],
      },
      {
        key: "2",
        title: "Classic Cocktails",
        show: false,
        children: [
          { key: "1", label: "Single Male Whisky", check: false },
          { key: "2", label: "Hush Whisky", check: false },
          { key: "3", label: "American Whisky", check: false },
          { key: "4", label: "Blended Whisky", check: false },
        ],
      },
      {
        key: "3",
        title: "Wines",
        show: false,
        children: [
          { key: "1", label: "Single Male Whisky", check: false },
          { key: "2", label: "Hush Whisky", check: false },
          { key: "3", label: "American Whisky", check: false },
          { key: "4", label: "Blended Whisky", check: false },
        ],
      },
      {
        key: "4",
        title: "Beers",
        show: false,
        children: [
          { key: "1", label: "Single Male Whisky", check: false },
          { key: "2", label: "Hush Whisky", check: false },
          { key: "3", label: "American Whisky", check: false },
          { key: "4", label: "Blended Whisky", check: false },
        ],
      },
      {
        key: "5",
        title: "Jusices & Water",
        show: false,
        children: [
          { key: "1", label: "Single Male Whisky", check: false },
          { key: "2", label: "Hush Whisky", check: false },
          { key: "3", label: "American Whisky", check: false },
          { key: "4", label: "Blended Whisky", check: false },
        ],
      },
    ]);
    return {
      items,
    };
  },
};
</script>

<style scoped>
.sider-category {
  padding: 24px 16px 0 16px;
}

.logo {
  width: 100%;
  height: 82px;
  padding: 7px 122px 7px 24px;
  margin-bottom: 36px;
}

.logo img {
  width: 81px;
  height: auto;
  object-fit: cover;
}

.submenu-container {
  position: relative;
  margin-bottom: 20px;
}
.submenu-container .ant-menu {
  background-color: #000;
  /* color: #fff; */
}

.item-category {
  width: 100%;
  height: 110px;
  display: flex;
  align-items: center;
  padding: 28px 44px;
  gap: 24px;
}

.img-container {
  width: 43px;
  height: 54px;
  position: relative;
}

.img-container img {
  width: auto;
  height: 66px;
  position: relative;
  top: -12px;
  left: 4.5px;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  color: #ffffff;
}

.content h4 {
  font-family: Merriweather;
  font-size: 20px;
  font-weight: 400;
  margin: 0;
  line-height: 26px;
}

.content p {
  font-family: Inter;
  font-size: 12px;
  font-weight: 400;
  margin: 0;
  line-height: 16.8px;
}
</style>
