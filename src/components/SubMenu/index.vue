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
import CustomCheckbox from "../CustomCheckbox/index.vue";

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
          item.children.forEach((child) => {
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
@import "./style.scss";
</style>
