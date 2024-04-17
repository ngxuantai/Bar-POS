<template>
  <div class="menu">
    <ul class="menu-list">
      <li v-for="(item, indexItem) in items" :key="item.key" class="menu-item">
        <div
          class="menu-title"
          :class="{
            'color-text-linear': item.show,
            'color-text-white': !item.show,
          }"
          @click="showSubMenu(items, indexItem)"
        >
          <h3>{{ item.title }}</h3>
          <template v-if="item.show">
            <minus-outlined style="font-size: 12px; color: #efdcac" />
          </template>
          <template v-else>
            <plus-outlined style="font-size: 12px" />
          </template>
        </div>
        <ul class="submenu" v-if="item.show && item.children">
          <li v-for="(child, indexChlid) in item.children" :key="child.key">
            <custom-checkbox
              :status="child.check"
              @check="checkChild(items, indexChlid, indexItem)"
            />
            <p
              :class="{
                'color-text-linear': child.check,
                'color-text-white': !child.check,
              }"
              @click="checkChild(items, indexChlid, indexItem)"
            >
              {{ child.label }}
            </p>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons-vue";
import CustomCheckbox from "./CustomCheckbox.vue";

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
  props: {
    items: {
      type: Array as () => Item[],
      required: true,
    },
  },
  components: {
    PlusOutlined,
    MinusOutlined,
    CustomCheckbox,
  },
  setup() {
    const show = ref<boolean>(false);
    const showSubMenu = (items: Item[], index: number) => {
      items.forEach((item, i) => {
        if (i !== index) {
          item.show = false;
        } else {
          items[index].show = !items[index].show;
        }
      });
    };
    const checkChild = (
      items: Item[],
      indexChlid: number,
      indexItem: number
    ) => {
      items.forEach((item, i) => {
        if (i === indexItem) {
          item.children.forEach((child, j) => {
            if (j === indexChlid) {
              child.check = !child.check;
            } else {
              child.check = false;
            }
          });
        } else {
          item.children.forEach((child, j) => {
            child.check = false;
          });
        }
      });
    };
    return {
      show,
      showSubMenu,
      checkChild,
    };
  },
};
</script>

<style lang="scss" scoped>
.menu {
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #000;
}

.menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-item {
  padding: 0 24px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.menu-title {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
  background: #000;
  h3 {
    font-family: Newsreader;
    font-size: 20px;
    font-weight: 400;
    line-height: 28px;
    text-align: left;
    margin: 0;
  }
}

.submenu {
  list-style: none;
  padding: 0;
  margin: 0;
  li {
    height: 54px;
    display: flex;
    align-items: center;
    gap: 12px;
    p {
      color: #fff;
      text-decoration: none;
      font-family: Newsreader;
      font-size: 14px;
      font-weight: 400;
      line-height: 22px;
      text-align: left;
      margin: 0;
      margin-left: 14px;
    }
  }
}

.color-text-white {
  color: #fff;
}
.color-text-linear {
  background: linear-gradient(
    268.43deg,
    #fdeec3 3.58%,
    #efdcac 49.93%,
    #dcc29e 98.97%
  );
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
