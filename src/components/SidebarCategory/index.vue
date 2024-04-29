<template>
  <div class="sider-category">
    <div class="logo">
      <img src="../../assets/image/logo.png" alt="logo" @click="navigateHome" />
    </div>
    <sub-menu :items="items" />
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import SubMenu from "../SubMenu/index.vue";

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
  },
  setup() {
    const router = useRouter();
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

    const navigateHome = () => {
      router.push("/home");
    };
    return {
      items,
      navigateHome,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
