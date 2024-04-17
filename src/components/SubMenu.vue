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
          <span class="menu-label">{{ item.title }}</span>
          <span class="menu-expand">
            <template v-if="item.show">
              <minus-outlined class="color-text-linear" />
            </template>
            <template v-else>
              <plus-outlined />
            </template>
          </span>
        </div>
        <ul class="submenu" v-if="item.show && item.children">
          <li
            v-for="(child, indexChlid) in item.children"
            :key="child.key"
            class="submenu-item"
          >
            <custom-checkbox
              :status="child.check"
              @check="checkChild(items, indexChlid, indexItem)"
            />
            <a
              class="submenu-link"
              :class="{
                'color-text-linear': child.check,
                'color-text-white': !child.check,
              }"
              @click="checkChild(items, indexChlid, indexItem)"
            >
              {{ child.label }}
            </a>
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

<style scoped>
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
  height: 60px;
  display: flex;
  align-items: center;
  text-decoration: none;
  background: #000;
  font-family: Newsreader;
  font-size: 20px;
  font-weight: 400;
  line-height: 28px;
  text-align: left;
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

.menu-label {
  font-size: 16px;
}

.menu-expand {
  margin-left: auto;
  font-size: 14px;
}

.menu-item.active .menu-expand {
  transform: rotate(90deg);
}

.submenu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.submenu-item {
  height: 54px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.submenu-link {
  color: #fff;
  text-decoration: none;
  font-family: Newsreader;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  text-align: left;
}
</style>
