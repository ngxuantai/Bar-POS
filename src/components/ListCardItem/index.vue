<template>
  <div class="items-container" ref="itemsContainerRef">
    <div class="sort">
      <h3>Sort by:</h3>
      <div class="custom-select" @click="toggleShow">
        <h4>{{ selected.text }}</h4>
        <down-outlined />
        <div v-if="show" class="list-option">
          <div
            class="option"
            v-for="option in options"
            :key="option.value"
            @click="selectOption(option)"
          >
            {{ option.text }}
          </div>
        </div>
      </div>
    </div>
    <div class="list-items" v-if="listItems.length > 0">
      <card-item v-for="item in listItems" :key="item.id" :data="item" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  ref,
  defineComponent,
  onMounted,
  onBeforeUnmount,
  computed,
} from "vue";
import { DownOutlined } from "@ant-design/icons-vue";
import CardItem from "../CardItem/index.vue";
import { ProductWithAttributes } from "types";
interface Option {
  value: string;
  text: string;
}

export default defineComponent({
  props: {
    listItemsProp: {
      type: Array as () => ProductWithAttributes[],
      default: () => [],
    },
  },
  components: {
    DownOutlined,
    CardItem,
  },
  setup(props, { emit }) {
    const itemsContainerRef = ref<HTMLElement | null>(null);
    const colCount = ref<number>(4);
    const show = ref<boolean>(false);
    const selected = ref<Option>({
      value: "option1",
      text: "All products",
    });
    const options = [
      { value: "option1", text: "All products" },
      { value: "option2", text: "Latest" },
      { value: "option3", text: "Price low to high" },
      { value: "option4", text: "Price hight to low" },
    ];

    const listItems = computed(() => {
      return props.listItemsProp;
    });

    onMounted(() => {
      updateColCount();
      window.addEventListener("resize", updateColCount);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("resize", updateColCount);
    });

    const toggleShow = () => {
      show.value = !show.value;
    };
    const selectOption = (option: Option) => {
      selected.value = option;
      emit("changeOption", option.value);
    };

    const updateColCount = () => {
      const width = itemsContainerRef.value?.clientWidth;
      const minColCount = 2;
      const maxColCount = Math.floor((width as number) / 280);
      colCount.value = Math.max(minColCount, maxColCount);
    };
    return {
      itemsContainerRef,
      colCount,
      show,
      selected,
      options,
      listItems,
      toggleShow,
      selectOption,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
