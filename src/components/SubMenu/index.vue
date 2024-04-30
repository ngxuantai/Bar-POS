<template>
  <div class="menu">
    <ul class="menu-list">
      <li
        v-for="(item, indexItem) in itemCategories"
        :key="item.id"
        class="menu-item"
      >
        <div
          class="menu-title"
          :class="{
            'color-text-linear': item.check,
            'color-text-white': !item.check,
          }"
          @click="showSubMenu(itemCategories, indexItem)"
        >
          <h3>{{ item.name }}</h3>
          <template v-if="item.check">
            <minus-outlined style="font-size: 12px; color: #efdcac" />
          </template>
          <template v-else>
            <plus-outlined style="font-size: 12px" />
          </template>
        </div>
        <ul class="submenu" v-if="item.check && item.children">
          <li v-for="(child, indexChlid) in item.children" :key="child.id">
            <custom-checkbox
              :status="child.check"
              @check="checkChild(itemCategories, indexChlid, indexItem)"
            />
            <p
              :class="{
                'color-text-linear': child.check,
                'color-text-white': !child.check,
              }"
              @click="checkChild(itemCategories, indexChlid, indexItem)"
            >
              {{ child.name }}
            </p>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, watch, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons-vue";
import CustomCheckbox from "../CustomCheckbox/index.vue";
import { Category } from "types";

// interface Item {
//   key: string;
//   title: string;
//   show: boolean;
//   children: SubItem[];
// }
// interface SubItem {
//   key: string;
//   label: string;
//   check: boolean;
// }

export default defineComponent({
  props: {
    items: {
      type: Array as () => Category[],
      required: true,
    },
  },
  components: {
    PlusOutlined,
    MinusOutlined,
    CustomCheckbox,
  },
  setup(props) {
    const router = useRouter();
    const route = useRoute();
    const show = ref<boolean>(false);
    const itemCategories = computed(() => props.items);

    watch(
      () => route.path,
      (newVal) => {
        if (!newVal.startsWith("/home")) {
          itemCategories.value.forEach((item) => {
            item.check = false;
            item.children?.forEach((child) => {
              child.check = false;
            });
          });
        }
      }
    );
    watch(
      () => route.query,
      (newVal) => {
        if (newVal.id === undefined && newVal.id_sub === undefined) {
          itemCategories.value.forEach((item) => {
            item.check = false;
            item.children?.forEach((child) => {
              child.check = false;
            });
          });
        }
      }
    );
    const showSubMenu = (items: Category[], index: number) => {
      // items.forEach((item, i) => {
      //   if (i !== index) {
      //     item.check = false;
      //     item.children?.forEach((child) => {
      //       child.check = false;
      //     });
      //   } else {
      //     if (items[index].check) {
      //       router.push("/home");
      //       items[index].check = false;
      //       items[index].children?.forEach((child) => {
      //         child.check = false;
      //       });
      //     } else {
      //       router.push({
      //         path: "/home",
      //         query: {
      //           id: items[index].id,
      //         },
      //       });
      //       items[index].check = true;
      //     }
      //   }
      // });
      items.forEach((item, i) => {
        if (i === index) {
          if (items[index].check) {
            router.push("/home");
          } else {
            router.push({ path: "/home", query: { id: items[index].id } });
          }
          items[index].check = !items[index].check;
        } else {
          item.check = false;
          item.children?.forEach((child) => {
            child.check = false;
          });
        }
      });
    };
    const checkChild = (
      items: Category[],
      indexChlid: number,
      indexItem: number
    ) => {
      const item = items[indexItem];
      item.children?.forEach((child, j) => {
        if (j === indexChlid) {
          if (child.check) {
            child.check = false;
            router.push({
              path: "/home",
              query: {
                id: item.id,
              },
            });
          } else {
            router.push({
              path: "/home",
              query: {
                id_sub: child.id,
              },
            });
            child.check = true;
          }
        } else {
          child.check = false;
        }
      });
    };
    return {
      show,
      itemCategories,
      showSubMenu,
      checkChild,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
